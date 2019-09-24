import { connect } from "react-redux";
import { initializeQA } from "../actions/InitializeQA";
import QA1 from "../components/qa/QA1.js";

const mapStateToProps = store => ({
  store: store
});

const mapDispatchToProps = dispatch => ({
  getQA: questions => dispatch(initializeQA(questions)),
  setKeyword: keyword => dispatch(setSearch(keyword))
});

const QAContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QA1);

export default QAContainer;
