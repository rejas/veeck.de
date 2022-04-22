import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';

const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const CardActionAreaContent = styled(CardActionArea)(({ theme }) => ({
  flexDirection: 'column',
  flex: '1 0 300px',
  maxWidth: '100%',
}));

const GatsbyImageCover = styled(GatsbyImage)(({ theme }) => ({
  flex: '1 0 50%',
}));

const CategoryCard = (props) => {
  const image = getImage(props.categoryImage);

  return (
    <CardStyled to={props.slug}>
      <CardActionAreaContent>
        {props.categoryImage && (
          <GatsbyImageCover alt={props.categoryName} image={image} />
        )}
        <CardContent>
          <Typography variant="h2" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.excerpt}
          </Typography>
          <Typography variant="caption" gutterBottom>
            more...
          </Typography>
        </CardContent>
      </CardActionAreaContent>
    </CardStyled>
  );
};

CategoryCard.defaultProps = {
  category: '',
  excerpt: '',
  subtitle: '',
};

CategoryCard.propTypes = {
  category: PropTypes.string,
  categoryImage: PropTypes.object,
  categoryName: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryCard;
