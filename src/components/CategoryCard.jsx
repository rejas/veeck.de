import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import * as React from 'react';

const BoxStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  padding: theme.spacing(2),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const CardActionAreaContent = styled(CardActionArea)(({ theme }) => ({
  flexDirection: 'column',
  flex: '1 0 50%',
}));

const GatsbyImageCover = styled(GatsbyImage)(({ theme }) => ({
  flex: '1 0 50%',
}));

const CategoryCard = (props) => {
  const image = getImage(props.categoryImage);

  return (
    <BoxStyled>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Latest Update in {props.categoryName}:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardStyled>
            <CardActionAreaContent to={props.slug}>
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
            {props.categoryImage && (
              <GatsbyImageCover alt={props.categoryName} image={image} />
            )}
          </CardStyled>
        </Grid>
      </Grid>
    </BoxStyled>
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
  categoryLink: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryCard;
