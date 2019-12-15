import React from 'react';
import { Typography } from '@material-ui/core';

export const Headline1 = props => (
  <Typography variant="h1" component="h1" {...props} />
);
export const Headline2 = props => (
  <Typography variant="h2" component="h2" {...props} />
);
export const Headline3 = props => (
  <Typography variant="h3" component="h3" {...props} />
);
export const Headline4 = props => (
  <Typography variant="h4" component="h4" {...props} />
);
export const Headline5 = props => (
  <Typography variant="h5" component="h5" {...props} />
);
export const Headline6 = props => (
  <Typography variant="h6" component="h6" {...props} />
);
export const Paragraph = props => <Typography variant="body1" {...props} />;
