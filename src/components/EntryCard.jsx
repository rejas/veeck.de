import { Card, CardContent, Grid, Typography } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';

const CardStyled = styled(Card)(css`
  height: 100%;
`);

const CardActionAreaStyled = styled(CardActionArea)(css`
  height: 100%;
`);

const EntryCard = (props) => {
  const { image, link, title } = props;
  const cardImage = getImage(image);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardStyled>
        <CardActionAreaStyled to={link}>
          <GatsbyImage image={cardImage} alt={title} />
          <CardContent>
            <Typography variant="subtitle1" component="h2">
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
