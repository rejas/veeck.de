import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
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
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
          <Box className={classes.info}>{props.children}</Box>
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
            {props.categoryImage && (
              <Img fluid={props.categoryImage} className={classes.cover} />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
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
