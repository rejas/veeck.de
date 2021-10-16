import * as React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { Card, Typography } from '@mui/material';

const AudioPlayer = loadable(() => import('material-ui-audio-player'));

const AudioSC = (props) => {
  const { file, caption } = props;

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {caption}
      </Typography>
      <AudioPlayer src={file} download elevation={0} />
    </Card>
  );
};

AudioSC.propTypes = {
  caption: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default AudioSC;
