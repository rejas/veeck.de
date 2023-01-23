import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlockSC = (props) => {
  const { children, className } = props;

  return (
    <Box sx={{ fontSize: 'small' }}>
      <SyntaxHighlighter
        language={className ? className.replace('language-', '') : ''}
        wrapLines={true}
        wrapLongLines={true}
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
