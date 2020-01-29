import React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCameraOutlined';
import ComputerIcon from '@material-ui/icons/MemoryOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecordOutlined';
import LinkIcon from '@material-ui/icons/Link';
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined';
import PencilIcon from '@material-ui/icons/CreateOutlined';
import PlaneIcon from '@material-ui/icons/FlightTakeoff';

const CategoryIcon = props => {
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
      return <FiberManualRecordIcon />;
  }
};

CategoryIcon.defaultProps = {
  category: '',
};

CategoryIcon.propTypes = {
  category: PropTypes.string,
};

export default CategoryIcon;
