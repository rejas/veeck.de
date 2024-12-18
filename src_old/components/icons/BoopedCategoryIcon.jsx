import * as React from 'react';

import Boop from '../ui/Boop';
import CategoryIcon from './CategoryIcon';

const BoopedCategoryIcon = ({ category, color }) => {
  return (
    <Boop rotation={20} timing={200}>
      <CategoryIcon category={category} color={color} />
    </Boop>
  );
};

export default BoopedCategoryIcon;
