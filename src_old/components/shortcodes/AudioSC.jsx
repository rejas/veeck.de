import loadable from '@loadable/component';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

const MuiAudioPlayer = loadable(() => import('mui-audio-player-plus'));

const AudioSC = ({ file, caption }) => {
  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {caption}
      </Typography>
      <MuiAudioPlayer containerWidth={'100%'} display="timeline" src={file} inline />
    </Card>
  );
};

AudioSC.propTypes = {
  caption: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default AudioSC;
