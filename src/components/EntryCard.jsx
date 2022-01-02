import { Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';

const CardStyled = styled(Card)(({ theme }) => ({
  height: '100%',
}));

const CardActionAreaStyled = styled(CardActionArea)(({ theme }) => ({
  height: '100%',
}));

const EntryCard = (props) => {
  const { link, title } = props;
  const image = getImage(props.image);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardStyled>
        <CardActionAreaStyled to={link}>
          <GatsbyImage image={image} alt={title} />
          <CardContent>
            <Typography component="h2" variant="subtitle1">
              {title}
            </Typography>
          </CardContent>
        </CardActionAreaStyled>
      </CardStyled>
    </Grid>
  );
};

EntryCard.propTypes = {
  image: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EntryCard;
