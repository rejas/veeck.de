import * as React from 'react';

import ErrorCard from '../components/cards/ErrorCard';
import BasicLayout from '../components/layout/BasicLayout';
import MetaData from '../components/page/MetaData';

const NotFoundPage = () => {
  return (
    <BasicLayout title="404: Not found">
      <ErrorCard message="I cannot let you find this page..." />
    </BasicLayout>
  );
};

export const Head = () => <MetaData title="404: Not found" />;

export default NotFoundPage;
