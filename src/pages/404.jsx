import * as React from 'react';

import ErrorCard from '../components/ErrorCard';
import HeroLayout from '../components/layouts/HeroLayout';
import MetaData from '../components/page/MetaData';

const NotFoundPage = (props) => {
  return (
    <HeroLayout>
      <MetaData title="404: Not found" />
      <ErrorCard message="I cannot let you find this page..." />
    </HeroLayout>
  );
};

export default NotFoundPage;
