import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Headlines from '../page/Headlines';
import BasicLayout from './BasicLayout';

const ChildrenStyled = styled('div')(({ theme }) => ({
  marginTop: '5vh',
}));

const TitleLayout = (props) => {
  const { children, lead, title, maxWidth } = props;

  return (
    <BasicLayout maxWidth={maxWidth}>
      <Headlines title={title} lead={lead} />
      <ChildrenStyled>{children}</ChildrenStyled>
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
