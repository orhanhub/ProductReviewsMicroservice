import React from "react";
import { clickTracker } from "./overview/helpers.js";
const axios = require("axios");

const BasicList = ({ store, getInitMain, getStyles }) => {
  const getData = (prodId = store.mainItem.product_id) => {
    axios.get(`http://18.217.220.129/products/${prodId}`).then(data => {
      getInitMain(data.data, prodId);
      axios
        .get(`http://18.217.220.129/products/${prodId}/styles`)
        .then(data => {
          getStyles(data.data.results);
        });
    });
  };

  const getInput = e => {
    e.preventDefault();
    clickTracker("Search", "overview");
    let searchText = document.getElementById("inputText").value;
    let searchNum = Number(searchText);
    if (Number.isNaN(searchNum)) {
      alert("Search Input Not a Number, Please Enter a Number");
    } else if (searchNum > 10011 || searchNum < 1) {
      alert("Out of Range, Please Enter ProductId between 1 and 10011");
    } else {
      getData(searchNum);
    }
  };
  const updateSearch = e => {
    return;
  };

  if (!store.mainItem.init) {
    let pageUrl = document.URL;
    if (pageUrl.includes("products/")) {
      let index = pageUrl.indexOf("products/");
      let pID = pageUrl.substring(index + 9);
      if (pID.includes("/")) {
        pID = pID.substring(0, pID.length - 1);
      }
      getData(Number(pID));
    } else {
      getData();
    }

    return (
      <div>
        <h2>Nothing Here!</h2>
      </div>
    );
  } else {
    // console.log('random get productid');
    // console.log(store);
    return (
      <div className="searchbar">
        <div className="siteName">BuyThisStuff.com</div>
        <div className="searchInput">
          <form id="findItem">
            <input id="inputText" type="text" onChange={updateSearch}></input>
          </form>
          <button
            type="submit"
            form="findItem"
            value="Submit"
            onClick={getInput}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
};

export default BasicList;
