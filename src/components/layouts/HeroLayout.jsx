import * as React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import { makeStyles } from '@material-ui/core/styles';
import Headlines from '../page/Headlines';
import Layout from '../page/Layout';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50vh',
  },
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  basicChildren: {
    marginTop: '5vh',
  },
  imageChildren: {
    marginTop: '50vh',
  },
}));

const HeroLayout = (props) => {
  const { children, image, lead, title } = props;
  const classes = useStyles();

  return (
    <Layout>
      <React.Fragment>
        {image && (
          <React.Fragment>
            <div className={classes.hero}>
              <BackgroundImage
                className={classes.background}
                fluid={image.childImageSharp.gatsbyImageData}
              >
                <Headlines title={title} lead={lead} />
              </BackgroundImage>
            </div>
            <div className={classes.imageChildren}>{children}</div>
          </React.Fragment>
        )}
        {!image && (
          <React.Fragment>
            <Headlines title={title} lead={lead} />
            <div className={classes.basicChildren}>{children}</div>
          </React.Fragment>
        )}
      </React.Fragment>
    </Layout>
  );
};

HeroLayout.defaultProps = {
  image: null,
  title: null,
  lead: null,
};

HeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default HeroLayout;
