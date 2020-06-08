import * as React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import ExploreIcon from '@material-ui/icons/Explore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LinkIcon from '@material-ui/icons/Link';
import ComputerIcon from '@material-ui/icons/Computer';
import StuffIcon from '@material-ui/icons/Toys';
import WebIcon from '@material-ui/icons/Web';

const CategoryIcon = (props) => {
  const { category } = props;

  switch (category) {
    case 'blog':
      return <EditIcon {...props} />;
    case 'homepage':
      return <WebIcon {...props} />;
    case 'link':
      return <LinkIcon {...props} />;
    case 'memories':
      return <StuffIcon {...props} />;
    case 'opinion':
      return <EditIcon {...props} />;
    case 'photos':
      return <CameraIcon {...props} />;
    case 'projects':
      return <ComputerIcon {...props} />;
    case 'stuff':
      return <StuffIcon {...props} />;
    case 'travels':
      return <ExploreIcon {...props} />;
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
