import * as React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../page/Header';
import Headlines from '../page/Headlines';
import Footer from '../page/Footer';
import Layout from '../page/Layout';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  children: {
    marginTop: '5vh',
  },
}));

const LogoLayout = (props) => {
  const { children, logo, lead, title } = props;
  const classes = useStyles();

  return (
    <Layout>
      <CssBaseline />
      <Header />
      <Container className={classes.main} maxWidth="md" component="main">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            {logo}
          </Grid>
          <Grid item xs={12} sm={9}>
            <Headlines title={title} lead={lead} />
          </Grid>
        </Grid>
        <div className={classes.children}>{children}</div>
      </Container>
      <Footer />
    </Layout>
  );
};

LogoLayout.defaultProps = {
  logo: null,
  title: null,
  lead: null,
};

LogoLayout.propTypes = {
  children: PropTypes.node.isRequired,
  logo: PropTypes.node,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default LogoLayout;
