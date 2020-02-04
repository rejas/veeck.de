import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import CategoryIcon from './icons/CategoryIcon';
import { CardActionArea } from 'gatsby-theme-material-ui';

const CategoryCard = props => {
  console.log(props.category);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ListItem>
          <ListItemIcon>
            <CategoryIcon category={props.category} />
          </ListItemIcon>
          <ListItemText primary={props.categoryName} />
        </ListItem>
      </Grid>

      <Grid item xs={12} md={6}>
        {props.children}
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={'Latest Entry'} />
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
