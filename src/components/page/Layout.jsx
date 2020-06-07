import * as React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Header from './Header';
import Footer from './Footer';
import { Headline1, Subtitle1 } from '../shortcodes/Typography';

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
  children: {
    marginTop: '50vh',
  },
  headlines: {
    color: 'white',
    textShadow: `0 3px 1px ${theme.palette.primary.main}`,
    mixBlendMode: 'difference',
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
          <div className={classes.hero}>
            <BackgroundImage
              className={classes.background}
              fluid={image.childImageSharp.fluid}
            >
              {title && (
                <Headline1 className={classes.headlines}>{title}</Headline1>
              )}
              {lead && (
                <Subtitle1 className={classes.headlines}>{lead}</Subtitle1>
              )}
            </BackgroundImage>
          </div>
        )}
        {!image && (
          <React.Fragment>
            {title && (
              <Headline1 className={classes.headlines}>{title}</Headline1>
            )}
            {lead && (
              <Subtitle1 className={classes.headlines}>{lead}</Subtitle1>
            )}
          </React.Fragment>
        )}
        <div className={image && classes.children}>{children}</div>
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
