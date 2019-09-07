import React from 'react';
import './reviews.css';

class ReviewSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starsArr: [0,0,0,0,0],
            oldArr: [0,0,0,0,0]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStarsHover = this.handleStarsHover.bind(this);
        this.handleStarsClick = this.handleStarsClick.bind(this);
        this.handleStarsLeave = this.handleStarsLeave.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props);
        console.log(document.getElementById("form").value);
    }

    handleStarsHover(event) {
        event.preventDefault();
        let rating = parseInt(event.target.getAttribute("value"))+1;
        let newArr = [];
        while (newArr.length < 5) {
            if (rating > 0) {
                rating--;
                newArr.push(1);
            } else {
                newArr.push(0);
            }
        }
        this.setState({
            starsArr: newArr
        });
    }

    handleStarsClick(event) {
        event.preventDefault();
        this.setState({
            oldArr: this.state.starsArr
        });
    }

    handleStarsLeave(event) {
        event.preventDefault();
        this.setState({
            starsArr: this.state.oldArr
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div>
                {this.state.starsArr.map((item, i) => {
                    return (
                        <div className="single-star-container" value={i} key={i} onMouseOver={this.handleStarsHover} onClick={this.handleStarsClick} onMouseLeave={this.handleStarsLeave}>
                            <div className="single-star-fill" style={{"width" : `${parseInt(item*20)}px`}}>
                                <img className="single-star-outline" src="singlestar.png" value={i} ></img>
                            </div>
                        </div>
                    );
                })}
            </div>
            <label> Name:
                <input type="text" id="form" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
    }
}

export default ReviewSubmission
