import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Headline2Styled = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

const Headline3Styled = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Subtitle1Styled = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
}));

const ParagraphStyled = styled(Typography)(({ theme }) => ({
  textAlign: 'justify',
}));

export const Headline1 = (props) => <Typography variant="h1" gutterBottom component="h1" {...props} />;
export const Headline2 = (props) => <Headline2Styled variant="h2" gutterBottom component="h2" {...props} />;
export const Headline3 = (props) => <Headline3Styled variant="h3" gutterBottom component="h3" {...props} />;
export const Headline4 = (props) => <Typography variant="h4" gutterBottom component="h4" {...props} />;
export const Headline5 = (props) => <Typography variant="h5" gutterBottom component="h5" {...props} />;
export const Headline6 = (props) => <Typography variant="h6" gutterBottom component="h6" {...props} />;
export const Subtitle1 = (props) => <Subtitle1Styled variant="subtitle1" gutterBottom {...props} />;
export const Paragraph = (props) => <ParagraphStyled variant="body1" gutterBottom {...props} />;
