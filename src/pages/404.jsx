import * as React from 'react';

import ErrorCard from '../components/cards/ErrorCard';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';

const NotFoundPage = (props) => {
  return (
    <Layout title="404: Not found">
      <MetaData title="404: Not found" />
      <ErrorCard message="I cannot let you find this page..." />
    </Layout>
  );
};

export default NotFoundPage;
