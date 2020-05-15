import * as React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
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
}));

const Layout = (props) => {
  const { children, image, lead, title } = props;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className={classes.main} maxWidth={'md'} component={'main'}>
        {image && <Img fluid={image.childImageSharp.fluid} />}
        {title && <Headline1>{title}</Headline1>}
        {lead && <Subtitle1>{lead}</Subtitle1>}
        {children}
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
