import * as React from 'react';
import Boop from './Boop';
import CategoryIcon from './CategoryIcon';

const BoopedCategoryIcon = (props) => {
  return (
    <Boop rotation={20} timing={200}>
      <CategoryIcon {...props} />
    </Boop>
  );
};

export default BoopedCategoryIcon;
