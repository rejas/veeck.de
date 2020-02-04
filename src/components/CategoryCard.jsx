import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headline: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const CategoryCard = props => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant={'h2'} className={classes.headline}>
          <CategoryIcon category={props.category} />
          {props.categoryName}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        {props.children}
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={`Latest Entry: ${props.title}`} />
          <CardActionArea to={props.slug}>
            <CardContent>
              <Typography variant={'body1'} gutterBottom>
                {props.excerpt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
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
