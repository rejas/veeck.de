import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const useStyles = makeStyles(theme => ({
  audio: {
    marginBottom: theme.spacing(3),
  },
}));

const AudioElement = props => {
  const classes = useStyles();
  const { file, caption } = props;

  return (
    <React.Fragment>
      <Typography variant={'h5'} gutterBottom>
        {caption}
      </Typography>
      <Box className={classes.audio}>
        <AudioPlayer src={file} download />
      </Box>
    </React.Fragment>
  );
};

export default AudioElement;
