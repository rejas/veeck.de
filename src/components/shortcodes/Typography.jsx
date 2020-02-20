import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  h2: {
    paddingTop: theme.spacing(3),
  },
  h3: {
    paddingTop: theme.spacing(2),
  },
  paragraph: {
    '& img': {
      display: 'block',
      margin: '0 auto',
    },
  },
}));

export const Headline1 = props => (
  <Typography variant="h1" gutterBottom component="h1" {...props} />
);
export const Headline2 = props => {
  const classes = useStyles();
  return (
    <Typography
      variant="h2"
      className={classes.h2}
      gutterBottom
      component="h2"
      {...props}
    />
  );
};
export const Headline3 = props => {
  const classes = useStyles();
  return (
    <Typography
      variant="h3"
      className={classes.h3}
      gutterBottom
      component="h3"
      {...props}
    />
  );
};
export const Headline4 = props => (
  <Typography variant="h4" gutterBottom component="h4" {...props} />
);
export const Headline5 = props => (
  <Typography variant="h5" gutterBottom component="h5" {...props} />
);
export const Headline6 = props => (
  <Typography variant="h6" gutterBottom component="h6" {...props} />
);
export const Paragraph = props => {
  const classes = useStyles();
  return (
    <Typography
      variant="body1"
      className={classes.paragraph}
      gutterBottom
      {...props}
    />
  );
};
