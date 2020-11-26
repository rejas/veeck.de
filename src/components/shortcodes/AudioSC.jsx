import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const AudioSC = (props) => {
  const classes = useStyles();
  const { file, caption } = props;

  return (
    <Card className={classes.root}>
      <Typography variant={'h6'} component={'h2'} gutterBottom>
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
