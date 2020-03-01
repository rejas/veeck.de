import * as React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LinkIcon from '@material-ui/icons/Link';
import CreateIcon from '@material-ui/icons/Create';
import ExploreIcon from '@material-ui/icons/Explore';
import ComputerIcon from '@material-ui/icons/Computer';
import StuffIcon from '@material-ui/icons/Toys';

const CategoryIcon = (props) => {
  const { category } = props;

  switch (category) {
    case 'photos':
      return <CameraIcon {...props} />;
    case 'link':
      return <LinkIcon {...props} />;
    case 'projects':
      return <ComputerIcon {...props} />;
    case 'travels':
      return <ExploreIcon {...props} />;
    case 'blog':
      return <CreateIcon {...props} />;
    case 'stuff':
      return <StuffIcon {...props} />;
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
