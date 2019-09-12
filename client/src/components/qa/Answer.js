import React, { useState, Fragment } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import Moment from 'react-moment';

const Answer = props => {
  const [disabled, setDisabled] = useState(false);
  console.log('inside answer');
  return (
    <Fragment>
      <Typography variant='body1'>{props.answer.body} </Typography>
      {/* {props.answer.photos.length > 0 ? ( */}
      {/* // // <ImageGallery photos={props.answer.photos} /> */}
      {/* // ) : ( // <Fragment /> */}
      {/* // )} */}
      <Grid container direction='row' justify='flex-start' alignItems='center'>
        <Typography variant='subtitle2'>
          by{' '}
          <span
            className={
              props.answer.answerer_name.toLowerCase() == 'seller'
                ? 'seller'
                : ''
            }>
            {props.answer.answerer_name}
          </span>
          ,
          <Moment format='MM/DD/YYYY' date={props.answer.date} />| Helpful?
        </Typography>
        <Button
          disabled={disabled}
          onClick={() => {
            props.voteA(props.answer.answer_id);
            setDisabled(!disabled);
          }}>
          Yes ({+props.answer.helpfulness})
        </Button>
        <Typography component='h4'> | </Typography>
        <Button
          onClick={() => {
            props.reportA(props.answer.answer_id);
          }}>
          Report
        </Button>
      </Grid>
    </Fragment>
  );
};

export default Answer;
