import * as React from 'react';

import ErrorCard from '../components/ErrorCard';
import Layout from '../components/page/Layout';
import MetaData from '../components/page/MetaData';

const NotFoundPage = (props) => {
  return (
    <Layout>
      <MetaData title="404: Not found" />
      <ErrorCard message="I cannot let you find this page..." />
    </Layout>
  );
};

export default NotFoundPage;
