import React from 'react';
import PropTypes from 'prop-types';
import CropIcon from '@material-ui/icons/Crop32';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

const BlogIcon = props => {
  const { category } = props;

  switch (category) {
    case 'life':
      return <LocalFloristIcon />;
    default:
      return <CropIcon />;
  }
};

BlogIcon.defaultProps = {
  category: '',
};

BlogIcon.propTypes = {
  category: PropTypes.string,
};

export default BlogIcon;
