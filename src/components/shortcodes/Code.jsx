import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '0.875rem',
  },
}));

const CodeBlock = props => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <SyntaxHighlighter
        language={props.className.replace('language-', '')}
        style={darcula}
      >
        {props.children}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;
