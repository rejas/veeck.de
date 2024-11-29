import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

import BasicCard from './BasicCard';

const EntryCard = ({ image, link, title }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <BasicCard link={link} title={title} imageAlt={title} image={image} />
    </Grid>
  );
};

EntryCard.propTypes = {
  image: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EntryCard;
