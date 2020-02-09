import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  headline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  card: {
    display: 'flex',
  },
  content: {
    flexDirection: 'column',
    flex: '1 0 50%',
  },
  cover: {
    flex: '1 0 50%',
  },
}));

const CategoryCard = props => {
  const classes = useStyles();

  console.log(props);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
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

        <Grid item xs={12} md={4}>
          {props.children}
        </Grid>

        <Grid item xs={12} md={8}>
          <Card className={classes.card}>
            <CardActionArea to={props.slug} className={classes.content}>
              <CardContent>
                <Typography variant={'h2'} gutterBottom>
                  Latest Update: {props.title}
                </Typography>
                <Typography variant={'body1'} gutterBottom>
                  {props.excerpt}
                </Typography>
                <Typography variant={'caption'} gutterBottom>
                  read more...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardMedia className={classes.cover}>
              {props.categoryImage && <Img fluid={props.categoryImage} />}
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
    </Paper>
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
