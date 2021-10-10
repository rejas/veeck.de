import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem',
  },
}));

const CodeBlockSC = (props) => {
  const classes = useStyles();
  const { children, className } = props;

  return (
    <Box className={classes.root}>
      <SyntaxHighlighter
        language={className ? className.replace('language-', '') : ''}
        style={darcula}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
};

CodeBlockSC.defaultProps = {
  className: '',
};

CodeBlockSC.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CodeBlockSC;
