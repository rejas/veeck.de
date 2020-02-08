import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  headline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const CategoryCard = props => {
  const classes = useStyles();

  console.log(props);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} alignContent="center">
        <Typography variant={'h1'} className={classes.headline}>
          <CategoryIcon
            className={classes.icon}
            category={props.category}
            color="primary"
            style={{ fontSize: '4rem' }}
          />
          {props.categoryName}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        {props.children}
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardActionArea to={props.slug}>
            {props.categoryImage && <Img fluid={props.categoryImage} />}

            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant={'caption'} gutterBottom>
                Latest Update: {props.title}
              </Typography>
              <Typography variant={'body1'} gutterBottom>
                {props.excerpt}
              </Typography>
              <Typography variant={'caption'} gutterBottom>
                ...
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
