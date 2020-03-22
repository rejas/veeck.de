import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem',
  },
}));

const CodeBlock = (props) => {
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

CodeBlock.defaultProps = {
  className: '',
};

CodeBlock.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CodeBlock;
