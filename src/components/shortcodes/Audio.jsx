import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const AudioElement = props => {
  const classes = useStyles();
  const { file, caption } = props;

  return (
    <Card className={classes.root}>
      <Typography variant={'h5'} gutterBottom>
        {caption}
      </Typography>
      <AudioPlayer src={file} download elevation={0} />
    </Card>
  );
};

export default AudioElement;
