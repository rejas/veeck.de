import { Card, CardContent, Typography } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';

const CardStyled = styled(Card)(css`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`);

const CardActionAreaStyled = styled(CardActionArea)(css`
  flex: 1 0 300px;
  flex-direction: column;
  max-width: 100%;
`);

const CardContentStyled = styled(CardContent)(css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`);

const GatsbyImageCover = styled(GatsbyImage)(css`
  aspect-ratio: 4 / 3;
  flex: 1 0 50%;
`);

const BasicCard = ({ image, imageAlt, link, excerpt, title }) => {
  const bgImage = getImage(image);

  return (
    <CardStyled>
      <CardActionAreaStyled to={link}>
        {image && <GatsbyImageCover alt={imageAlt} image={bgImage} />}
        <CardContentStyled>
          {title && <Typography variant="h3">{title}</Typography>}
          {excerpt && (
            <>
              <Typography variant="body1">{excerpt}</Typography>
              <Typography variant="caption">more...</Typography>
            </>
          )}
        </CardContentStyled>
      </CardActionAreaStyled>
    </CardStyled>
  );
};

BasicCard.propTypes = {
  excerpt: PropTypes.string,
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BasicCard;
