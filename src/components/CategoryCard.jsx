import * as React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea, Link } from 'gatsby-theme-material-ui';
import { animated } from 'react-spring';
import { useBoop } from '../hooks/use-boop';
import CategoryIcon from './CategoryIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  headline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  content: {
    flexDirection: 'column',
    flex: '1 0 50%',
  },
  cover: {
    flex: '1 0 50%',
  },
}));

const CategoryCard = (props) => {
  const classes = useStyles();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const image = getImage(props.categoryImage);

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to={props.categoryLink}
                className={classes.link}>
            <Typography
              onMouseEnter={trigger}
              variant={'h1'}
              className={classes.headline}
            >
              <animated.span style={style}>
                <CategoryIcon
                  className={classes.icon}
                  category={props.category}
                  color="primary"
                  style={{
                    fontSize: '4rem',
                  }}
                />
              </animated.span>
              {props.categoryName}
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {props.subtitle}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea to={props.slug} className={classes.content}>
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
            </CardActionArea>
            {props.categoryImage && (
              <GatsbyImage
                alt={props.categoryName}
                image={image}
                className={classes.cover}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
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
