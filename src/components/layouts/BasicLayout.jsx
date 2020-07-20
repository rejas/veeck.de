import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Headlines from '../page/Headlines';
import Layout from '../page/Layout';

const useStyles = makeStyles((theme) => ({
  children: {
    marginTop: '5vh',
  },
}));

const BasicLayout = (props) => {
  const { children, lead, title } = props;
  const classes = useStyles();

  return (
    <Layout>
      <Headlines title={title} lead={lead} />
      <div className={classes.children}>{children}</div>
    </Layout>
  );
};

BasicLayout.defaultProps = {
  title: null,
  lead: null,
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default BasicLayout;
