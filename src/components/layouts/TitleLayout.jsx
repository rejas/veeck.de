import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Headlines from '../page/Headlines';
import BasicLayout from './BasicLayout';

const useStyles = makeStyles((theme) => ({
  children: {
    marginTop: '5vh',
  },
}));

const TitleLayout = (props) => {
  const { children, lead, title, maxWidth } = props;
  const classes = useStyles();

  return (
    <BasicLayout maxWidth={maxWidth}>
      <Headlines title={title} lead={lead} />
      <div className={classes.children}>{children}</div>
    </BasicLayout>
  );
};

TitleLayout.defaultProps = {
  title: null,
  lead: null,
  maxWidth: 'md',
};

TitleLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  lead: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TitleLayout;
