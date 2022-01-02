import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LinkIcon from '@mui/icons-material/Link';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import StuffIcon from '@mui/icons-material/Toys';
import WebIcon from '@mui/icons-material/Web';
import PropTypes from 'prop-types';
import * as React from 'react';

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
