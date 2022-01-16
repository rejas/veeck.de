import { Box, Typography } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';

const ErrorCard = (props) => {
  const { message } = props;

  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        I am sorry Dave
      </Typography>
      <Box sx={{ m: 3 }}>
        <StaticImage src="../images/hal_404.png" alt="HAL9000" />
      </Box>
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
