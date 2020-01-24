import React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import ComputerIcon from '@material-ui/icons/Memory';
import CropIcon from '@material-ui/icons/Crop32';
import LinkIcon from '@material-ui/icons/Link';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import PencilIcon from '@material-ui/icons/Create';
import PlaneIcon from '@material-ui/icons/FlightTakeoff';

const BlogIcon = props => {
  const { category } = props;

  switch (category) {
    case 'camera':
      return <CameraIcon />;
    case 'chain':
      return <LinkIcon />;
    case 'computer':
      return <ComputerIcon />;
    case 'life':
      return <LocalFloristIcon />;
    case 'plane':
      return <PlaneIcon />;
    case 'pencil':
      return <PencilIcon />;
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
