import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';

const CategoryCard = props => {
  return (
    <Card>
      <CardHeader
        avatar={<CategoryIcon category={props.category} />}
        title={'Latest Entry in ' + props.category}
      />
      <CardActionArea to={props.slug}>
        <CardContent>
          <Typography variant={'body1'} gutterBottom>
            {props.title}
          </Typography>
          <Typography variant={'body1'} gutterBottom>
            {props.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CategoryCard.defaultProps = {
  category: '',
  excerpt: '',
};

CategoryCard.propTypes = {
  category: PropTypes.string,
  excerpt: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryCard;
