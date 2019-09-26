import React from "react";
const axios = require("axios");
import "./reviews.css";
import FiveStars from "./FiveStars";

//the toggle is built to switch between original API and SDC API
import { toggle } from "../../../../toggle";
let endpoint;
if (toggle) {
  endpoint = "/reviews";
} else {
  endpoint = "http://18.217.220.129/reviews";
}

class ReviewsMetaData extends React.Component {
  ratingData(ratings) {
    //Parse rating data and calculate certain things like avg and rating percentages
    let total = 0;
    let count = 0;
    for (let i = 1; i < 6; i++) {
      //Go 1 through 5
      if (ratings[i] !== undefined) {
        count = count + ratings[i];
        total = total + i * ratings[i];
      } else {
        ratings[i] = 0;
      }
    }
    let average = parseFloat(parseFloat(total / count).toFixed(1));
    let stars = [];
    stars.push((parseFloat(ratings[5] / count) * 100).toFixed(0));
    stars.push((parseFloat(ratings[4] / count) * 100).toFixed(0));
    stars.push((parseFloat(ratings[3] / count) * 100).toFixed(0));
    stars.push((parseFloat(ratings[2] / count) * 100).toFixed(0));
    stars.push((parseFloat(ratings[1] / count) * 100).toFixed(0));
    return {
      average: average,
      count: count,
      stars: stars
    };
  }

  recommended(recs) {
    //Get percentage of reviews recommending product
    let yes = recs[1] || 0;
    let no = recs[0] || 0;
    let total = yes + no;
    return (parseFloat(yes / total) * 100).toFixed(0);
  }

  parseCharacteristics(chars) {
    //As said in name, this is to find what characterstics exist for the product and what their values are
    let characteristics = [];
    let possibles = Object.keys(this.props.store.reviewsDefaults.charsTable);
    for (let i = 0; i < possibles.length; i++) {
      if (chars[possibles[i]] !== undefined) {
        characteristics.push({
          name: possibles[i],
          value: chars[possibles[i]].value,
          id: chars[possibles[i]].id
        });
      }
    }
    return characteristics;
  }

  getMetaData(product_id) {
    axios
      .get(
        // `http://18.217.220.129/reviews/${product_id}/meta`
        `${endpoint}/${product_id}/meta`
      )
      .then(data => {
        //Process Meta Data first
        let newObj = {};
        let metaData = data.data;
        //console.log(metaData);
        let ratings = metaData.ratings;
        let ratingData = this.ratingData(ratings); //Get the average rating and counts for #stars
        Object.assign(newObj, ratingData);
        this.props.reviewsMetaAction(newObj);
        let recs = this.recommended(metaData.recommended); //Get the percent recommended
        newObj.recs = recs;
        newObj.characteristics = this.parseCharacteristics(
          metaData.characteristics
        );
        newObj.product_id = this.props.store.mainItem.product_id;
        this.props.reviewsMetaAction(newObj);
      });
  }

  render() {
    let metaData = this.props.store.reviewsMeta;
    let charsTable = this.props.store.reviewsDefaults.charsTable;
    if (
      parseInt(metaData.product_id) !==
      parseInt(this.props.store.mainItem.product_id)
    ) {
      this.getMetaData(this.props.store.mainItem.product_id);
    }
    if (metaData.total === 0 && metaData.count === 0) {
      return <div className="ReviewsMeta"></div>;
    }
    return (
      <div className="ReviewsMeta">
        RATINGS &amp; REVIEWS
        <br />
        <div>
          <div className="review-average">{metaData.average.toFixed(1)}</div>
          <FiveStars rating={metaData.average} />
          <br />
        </div>
        <br /> <br />
        <div> {metaData.recs}% of reviews recommended this product</div>
        <br />
        {metaData.stars.map((item, i) => {
          return (
            <div className="starPercentage" key={5 - i}>
              <div className="percentage-text">{5 - i} Stars </div>
              <div className="percentage-bar">
                <div
                  className="percentage-fill"
                  style={{ width: `${item}%` }}
                ></div>
              </div>{" "}
              <div className="percentage-num"> {item}% </div>
            </div>
          );
        })}
        <br />
        {metaData.characteristics.map(item => {
          return (
            <div className="characteristic" key={item.name}>
              <div className="characteristic-name">{item.name}</div>
              <div className="characteristic-bar">
                <div
                  className="characteristic-triangle"
                  style={{ left: `${parseInt(item.value * 70) - 10}px` }}
                />
              </div>
              <div className="characteristic-text-left">
                {charsTable[item.name][1]}
              </div>
              <div className="characteristic-text-right">
                {charsTable[item.name][5]}
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ReviewsMetaData;
