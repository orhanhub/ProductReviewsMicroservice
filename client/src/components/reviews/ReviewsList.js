import React from "react";
const axios = require("axios");
import FiveStars from "./FiveStars";
import ReviewSubmission from "./ReviewSubmission";
import ImageComponent from "./ImageComponent";
import { clickTracker } from "../overview/helpers";
import "./reviews.css";

//the toggle is built to switch between original API and SDC API
import { toggle } from "../../../../toggle";
let endpoint;
if (toggle) {
  endpoint = "http://localhost:3000/reviews";
} else {
  endpoint = "/reviews";
}

class ReviewsList extends React.Component {
  getReviews(product_id, sort) {
    axios
      .get(
        // `http://18.217.220.129/reviews/${product_id}/list?count=100&sort=${sort}`
        `${endpoint}/${product_id}/list?count=100&sort=${sort}`
      )
      .then(data => {
        console.log(data.data);
        let newData = data.data;
        newData.product_id = this.props.store.mainItem.product_id;
        this.props.reviewsListAction(newData);
        this.props.reviewsLimitAction(2);
        this.props.reviewsPostAction([]);
      });
  }

  handleMoreReviews(event) {
    event.preventDefault();
    let total = this.props.store.reviewsList.list.results.length;
    let limit = this.props.store.reviewsList.limit;
    limit = limit + 2;
    if (limit > total) {
      limit = total;
    }
    this.props.reviewsLimitAction(limit);
    clickTracker("More Reviews Button", "Reviews and Ratings");
  }

  reset() {
    this.props.reviewsListAction({
      list: [],
      limit: 2,
      submit: [],
      product_id: null
    });
    this.props.reviewsMetaAction({
      average: 0.0,
      recs: 0,
      total: 0,
      stars: [],
      product_id: null
    });
  }

  report(event) {
    event.preventDefault();
    let reviewID = event.target.getAttribute("value");
    axios.put(`http://18.217.220.129/reviews/report/${reviewID}`).then(res => {
      this.reset();
    });
    clickTracker("Report a Review", "Reviews and Ratings");
  }

  helpful(event) {
    event.preventDefault();
    let reviewID = event.target.getAttribute("value");
    axios.put(`http://18.217.220.129/reviews/helpful/${reviewID}`).then(res => {
      this.reset();
    });
    clickTracker("Call a Review Helpful", "Reviews and Ratings");
  }

  select(event) {
    event.preventDefault();
    let sort = event.target.value;
    this.props.reviewsSortAction(sort);
    this.reset();
    clickTracker("Select a Sort", "Reviews and Ratings");
  }

  render() {
    let reviews = this.props.store.reviewsList.list.results || [];
    let limit = this.props.store.reviewsList.limit;
    let submission = this.props.store.reviewsList.submit;
    let months = this.props.store.reviewsDefaults.months;
    let details = this.props.store.mainItem.details;
    if (
      parseInt(this.props.store.reviewsList.list.product_id) !==
      parseInt(this.props.store.mainItem.product_id)
    ) {
      this.getReviews(
        this.props.store.mainItem.product_id,
        this.props.store.reviewsList.sort
      );
    }
    if (reviews.length === 0) {
      return (
        <div className="ReviewsList">
          {details !== undefined && (
            <ReviewSubmission
              product_id={this.props.store.mainItem.product_id}
              characteristics={this.props.store.reviewsMeta.characteristics}
              charsTable={this.props.store.reviewsDefaults.charsTable}
              name={details.name}
            />
          )}
        </div>
      );
    }
    return (
      <div className="ReviewsList">
        <br />
        <ul>
          <div className="Reviews-List-Top">
            <div className="Reviews-List-Total">
              {reviews.length} reviews, sorted by{" "}
            </div>
            <select
              className="review-selector"
              onChange={this.select.bind(this)}
              value={this.props.store.reviewsList.sort}
            >
              <option value="newest">newest</option>
              <option value="helpful">helpfulness</option>
              <option value="relevant">relevance</option>
            </select>
          </div>
        </ul>
        {reviews.slice(0, limit).map(item => {
          return (
            <div key={item.review_id}>
              <ul>
                <div className="review-entry-top">
                  <div className="review-entry-fivestars">
                    <FiveStars rating={item.rating} />
                  </div>
                  <div className="review-entry-name-date">
                    {item.reviewer_name +
                      ", " +
                      months[item.date.substring(5, 7) - 1] +
                      " " +
                      parseInt(item.date.substring(8, 10)) +
                      ", " +
                      item.date.substring(0, 4)}
                  </div>
                </div>{" "}
                <br />
                <div className="review-list-summary">{item.summary}</div> <br />
                <div>{item.body}</div> <br />
                {parseInt(item.recommend) === 1 && (
                  <div>
                    <div className="review-list-rec">
                      ✔ I recommend this product
                    </div>
                    <br />
                  </div>
                )}
                {item.response != null &&
                  item.response.length > 0 &&
                  !item.response.includes("null") && (
                    <div>
                      <div className="review-list-res-full">
                        <div className="review-list-res-top">Response:</div>
                        {item.response}
                      </div>
                      <br />
                    </div>
                  )}
                <div className="review-put-options">
                  Helpful?
                  <div
                    className="review-put-option"
                    value={item.review_id}
                    onClick={this.helpful.bind(this)}
                  >
                    Yes({item.helpfulness})
                  </div>{" "}
                  |
                  <div
                    className="review-put-option"
                    value={item.review_id}
                    onClick={this.report.bind(this)}
                  >
                    Report
                  </div>
                </div>
                <div className="review-photos">
                  {item.photos.map(item => {
                    return (
                      <ImageComponent
                        source={item.url}
                        id={item.id}
                        key={item.id}
                      />
                    );
                  })}
                </div>
                <hr className="reviews-list-hr" />
              </ul>
            </div>
          );
        })}
        <ul>
          <div className="review-buttons">
            <button onClick={this.handleMoreReviews.bind(this)}>
              More Reviews
            </button>
            {details !== undefined && (
              <ReviewSubmission
                product_id={this.props.store.mainItem.product_id}
                characteristics={this.props.store.reviewsMeta.characteristics}
                charsTable={this.props.store.reviewsDefaults.charsTable}
                name={details.name}
                getReviews={this.reset.bind(this)}
              />
            )}
          </div>
        </ul>
      </div>
    );
  }
}

export default ReviewsList;
