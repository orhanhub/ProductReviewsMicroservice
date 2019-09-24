import React, { Fragment } from "react";
import { validate } from "./ValidateForm";
import { connect } from "react-redux";
import { clickTracker } from "../overview/helpers.js";
import { postQuestion } from "../../actions/postQ";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  TextField,
  Grid,
  Button,
  Slide,
  Box,
  InputLabel,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  checkMark: {
    width: 50,
    height: 50,
    color: "green"
  }
}));

const defaultForm = {
  question: "",
  name: "",
  email: ""
};
const renderErrors = errorList => {
  if (!errorList || errorList.length === 0) {
    return;
  } else {
    return (
      <ul className="errors">
        You must enter the following:
        {Object.values(errorList).map(err => {
          return (
            <li className="error" key={err}>
              {err}
            </li>
          );
        })}
      </ul>
    );
  }
};

const QuestionForm = ({ productName, productId, postQuestion }) => {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(defaultForm);
  const [error, setErrors] = React.useState(false);
  const [success, setSeccess] = React.useState(false);
  const classes = useStyles();

  const handleChange = e => {
    e.persist();
    setForm(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = e => {
    clickTracker("submitQuestionForm", "QandA");
    let errorList = validate(form, "question", null);
    setErrors(errorList);
    if (!errorList) {
      postQuestion(Object.assign(form, { productId: productId }));
      setSeccess(true);
    }
  };

  function handleClickOpen() {
    clickTracker("openQuestionForm", "QandA");
    setOpen(true);
  }

  function handleClose() {
    clickTracker("closeQuestionForm", "QandA");
    setOpen(false);
    setForm(defaultForm);
    setErrors(false);
    setSeccess(false);
  }

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a question +
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth={!success}
        open={open}
        onClose={handleClose}
        onClick={success ? handleClose : () => {}}
        aria-labelledby="form-dialog-title"
      >
        {success ? (
          <Fragment>
            <DialogTitle>Success! Thanks for posting a question.</DialogTitle>
            <Box className={classes.root}></Box>
          </Fragment>
        ) : (
          <Fragment>
            <DialogTitle>Ask Your Question</DialogTitle>
            <DialogContent>
              {renderErrors(error)}
              <form>
                <InputLabel
                  htmlFor="questionarea"
                  required
                  error={error.question ? true : false}
                >
                  Your question
                </InputLabel>
                <TextField
                  id="questionarea"
                  label="Your Question"
                  placeholder="Enter Your Question"
                  multiline
                  required
                  inputProps={{ maxLength: 1000 }}
                  fullWidth
                  onChange={handleChange.bind(this)}
                  value={form.question}
                  error={error.question ? true : false}
                  name="question"
                />
                <InputLabel
                  htmlFor="nickname"
                  required
                  error={error.name ? true : false}
                >
                  What is your nickname
                </InputLabel>
                <TextField
                  id="nickname"
                  required
                  label="What is your nickname"
                  placeholder="Example:jack543!"
                  fullWidth
                  required
                  helperText="For privacy reasons, do not use your full name or email address"
                  onChange={handleChange.bind(this)}
                  value={form.name}
                  name="name"
                  error={error.name ? true : false}
                />
                <InputLabel
                  htmlFor="email"
                  required
                  error={error.email ? true : false}
                >
                  Your email
                </InputLabel>
                <TextField
                  id="email"
                  required
                  fullWidth
                  inputProps={{ maxLength: 60 }}
                  placeholder="email@email.com"
                  helperText="For authentication reasons, you will not be emailed"
                  onChange={handleChange.bind(this)}
                  value={form.email}
                  error={error.email ? true : false}
                  name="email"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Grid container justify="flex-end">
                <Button color="secondary" onClick={handleClose}>
                  cancel
                </Button>
                <Button
                  color="primary"
                  onClick={e => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    product_id: state.mainItem.product_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postQuestion: question => {
      dispatch(postQuestion(question));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm);
