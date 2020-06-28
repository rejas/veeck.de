import * as React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Headlines from './Headlines';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
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

const Layout = (props) => {
  const { children, image, lead, title } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className={classes.main} maxWidth={'md'} component={'main'}>
        {image && (
          <React.Fragment>
            <div className={classes.hero}>
              <BackgroundImage
                className={classes.background}
                fluid={image.childImageSharp.fluid}
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
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  title: null,
  lead: null,
  image: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  lead: PropTypes.string,
  image: PropTypes.object,
};

export default Layout;
