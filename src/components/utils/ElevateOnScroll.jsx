import * as React from 'react';
import PropTypes from 'prop-types';
import { useScrollTrigger } from '@mui/material';

const ElevateOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: trigger
      ? {
          backgroundColor: 'rgba(255,255,255,0.75',
        }
      : {
          backgroundColor: 'rgba(255,255,255,0.25',
        },
  });
};

ElevateOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ElevateOnScroll;
