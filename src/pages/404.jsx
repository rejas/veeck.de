import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Typography } from '@material-ui/core';

import TitleLayout from '../components/layouts/TitleLayout';
import MetaData from '../components/page/MetaData';

const NotFoundPage = (props) => {
  return (
    <TitleLayout>
      <MetaData title="404: Not found" />
      <Typography variant="h2" component="h2" gutterBottom>
        I am sorry Dave
      </Typography>
      <StaticImage src="../images/hal_404.png" alt="" />
      <p>I cannot let you find this page...</p>
    </TitleLayout>
  );
};

export default NotFoundPage;
