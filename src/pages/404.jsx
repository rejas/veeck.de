import * as React from 'react';
import TitleLayout from '../components/layouts/TitleLayout';
import MetaData from '../components/page/MetaData';
import ErrorCard from '../components/ErrorCard';

const NotFoundPage = (props) => {
  return (
    <TitleLayout maxWidth="sm">
      <MetaData title="404: Not found" />
      <ErrorCard message="I cannot let you find this page..." />
    </TitleLayout>
  );
};

export default NotFoundPage;
