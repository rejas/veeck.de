import * as React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import { CardActionArea, Link } from 'gatsby-theme-material-ui';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBoop } from '../hooks/use-boop';
import CategoryIcon from './CategoryIcon';

const BoxStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  padding: theme.spacing(2),
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  '&:hover': {
    textDecoration: 'none',
  },
}));

const HeadlineStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CategoryIconStyled = styled(CategoryIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.down('xs')]: {
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
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const image = getImage(props.categoryImage);

  return (
    <BoxStyled>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LinkStyled to={props.categoryLink}>
            <HeadlineStyled onMouseEnter={trigger} variant={'h1'}>
              <animated.span style={style}>
                <CategoryIconStyled
                  category={props.category}
                  color="primary"
                  style={{
                    fontSize: '4rem',
                  }}
                />
              </animated.span>
              {props.categoryName}
            </HeadlineStyled>
          </LinkStyled>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {props.subtitle}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CardStyled>
            <CardActionAreaContent to={props.slug}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Latest Update:
                </Typography>
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
  subtitle: PropTypes.string,
};

export default CategoryCard;
