import React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LinkIcon from '@material-ui/icons/Link';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import CreateIcon from '@material-ui/icons/Create';
import ExploreIcon from '@material-ui/icons/Explore';
import ComputerIcon from '@material-ui/icons/Computer';

const CategoryIcon = props => {
  const { category } = props;

  switch (category) {
    case 'camera':
      return <CameraIcon {...props} />;
    case 'link':
      return <LinkIcon {...props} />;
    case 'computer':
    case 'projects':
      return <ComputerIcon {...props} />;
    case 'life':
      return <LocalFloristIcon {...props} />;
    case 'travels':
      return <ExploreIcon {...props} />;
    case 'pencil':
      return <CreateIcon {...props} />;
    default:
      return <FiberManualRecordIcon {...props} />;
  }
};

CategoryIcon.defaultProps = {
  category: '',
};

CategoryIcon.propTypes = {
  category: PropTypes.string,
};

export default CategoryIcon;
