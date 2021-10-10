import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },
  cardAction: {
    height: '100%',
  },
}));

const EntryCard = (props) => {
  const classes = useStyles();
  const { link, title } = props;
  const image = getImage(props.image);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea to={link} className={classes.cardAction}>
          <GatsbyImage image={image} alt={title} />
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
