import { Headline1, Subtitle1 } from './Typography';
import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    mixBlendMode: 'difference',
  },
}));

const Headlines = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.title && (
        <Headline1 className={classes.root}>{props.title}</Headline1>
      )}
      {props.lead && (
        <Subtitle1 className={classes.root}>{props.lead}</Subtitle1>
      )}
    </React.Fragment>
  );
};

Headlines.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default Headlines;
