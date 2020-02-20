import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea } from 'gatsby-theme-material-ui';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  cardAction: {
    height: '100%',
  },
}));

const EntryCard = props => {
  const classes = useStyles();
  const { image, link, title } = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea to={link} className={classes.cardAction}>
          <Img fluid={image} />
          <CardContent>
            <Typography component="h2" variant="subtitle1">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

EntryCard.propTypes = {
  image: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EntryCard;
