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

const GatsbyImageCover = styled(GatsbyImage)(css`
  flex: 1 0 50%;
`);

const BasicCard = (props) => {
  const { image, imageAlt, link, excerpt, title } = props;
  const bgImage = getImage(image);

  return (
    <CardStyled>
      <CardActionAreaStyled to={link}>
        {image && <GatsbyImageCover alt={imageAlt} image={bgImage} />}
        <CardContent>
          {title && (
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
          )}
          {excerpt && (
            <>
              <Typography variant="body1" gutterBottom>
                {excerpt}
              </Typography>
              <Typography variant="caption" gutterBottom>
                more...
              </Typography>
            </>
          )}
        </CardContent>
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
