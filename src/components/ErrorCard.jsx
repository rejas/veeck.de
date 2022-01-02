import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StaticImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import * as React from 'react';

const StaticImageStyled = styled(StaticImage)(({ theme }) => ({
  margin: `${theme.spacing(3)} 0`,
}));

const ErrorCard = (props) => {
  const { message } = props;

  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        I am sorry Dave
      </Typography>
      <StaticImageStyled src="../images/hal_404.png" alt="HAL9000" />
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
