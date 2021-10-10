import * as React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const AudioPlayer = loadable(() => import('material-ui-audio-player'));

const CardRoot = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const AudioSC = (props) => {
  const { file, caption } = props;

  return (
    <CardRoot>
      <Typography variant="h6" component="h2" gutterBottom>
        {caption}
      </Typography>
      <AudioPlayer src={file} download elevation={0} />
    </CardRoot>
  );
};

AudioSC.propTypes = {
  caption: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default AudioSC;
