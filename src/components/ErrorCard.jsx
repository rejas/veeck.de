import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { StaticImage } from 'gatsby-plugin-image';

const useStyles = makeStyles((theme) => ({
  image: {
    margin: `${theme.spacing(3)} 0`,
  },
}));

const ErrorCard = (props) => {
  const classes = useStyles();
  const { message } = props;

  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        I am sorry Dave
      </Typography>
      <StaticImage
        className={classes.image}
        src="../images/hal_404.png"
        alt="HAL9000"
      />
      <Typography variant="h2" component="h2" align="center">
        {message}
      </Typography>
    </>
  );
};

ErrorCard.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorCard;
