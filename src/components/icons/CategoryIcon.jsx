import React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCameraOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecordOutlined';
import LinkIcon from '@material-ui/icons/Link';
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined';
import CreateIcon from '@material-ui/icons/CreateOutlined';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import LightBulbIcon from './LightBulb';

const CategoryIcon = props => {
  const { category } = props;

  switch (category) {
    case 'camera':
      return <CameraIcon />;
    case 'link':
      return <LinkIcon />;
    case 'computer':
    case 'project':
      return <LightBulbIcon />;
    case 'life':
      return <LocalFloristIcon />;
    case 'travel':
      return <ExploreIcon />;
    case 'pencil':
      return <CreateIcon />;
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
