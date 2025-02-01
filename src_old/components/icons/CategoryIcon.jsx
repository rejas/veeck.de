import ComputerIcon from '@mui/icons-material/Computer';
import HomeIcon from '@mui/icons-material/Cottage';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LinkIcon from '@mui/icons-material/Link';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import StuffIcon from '@mui/icons-material/Toys';
import WebIcon from '@mui/icons-material/Web';
import PropTypes from 'prop-types';
import * as React from 'react';

const CategoryIcon = ({ category, color }) => {
  switch (category) {
    case 'home':
      return <HomeIcon color={color} />;
    case 'blog':
      return <EditIcon color={color} />;
    case 'homepage':
      return <WebIcon color={color} />;
    case 'link':
      return <LinkIcon color={color} />;
    case 'memories':
      return <StuffIcon color={color} />;
    case 'opinion':
      return <EditIcon color={color} />;
    case 'photos':
      return <CameraIcon color={color} />;
    case 'projects':
      return <ComputerIcon color={color} />;
    case 'stuff':
      return <StuffIcon color={color} />;
    case 'travels':
      return <ExploreIcon color={color} />;
    default:
      return <FiberManualRecordIcon color={color} />;
  }
};

CategoryIcon.defaultProps = {
  category: '',
  color: 'gray',
};

CategoryIcon.propTypes = {
  category: PropTypes.string,
  color: PropTypes.string,
};

export default CategoryIcon;
