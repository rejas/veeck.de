import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Headline1, Subtitle1 } from './Typography';

const Headline1Root = styled(Headline1)(({ theme }) => ({
  color: 'white',
  mixBlendMode: 'difference',
}));

const Subtitle1Root = styled(Subtitle1)(({ theme }) => ({
  color: 'white',
  mixBlendMode: 'difference',
}));

const Headlines = (props) => {
  return (
    <React.Fragment>
      {props.title && <Headline1Root>{props.title}</Headline1Root>}
      {props.lead && <Subtitle1Root>{props.lead}</Subtitle1Root>}
    </React.Fragment>
  );
};

Headlines.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default Headlines;
