import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlockSC = ({ children, className = '' }) => {
  return (
    <Box sx={{ fontSize: 'small' }}>
      <SyntaxHighlighter
        language={className.replace('language-', '')}
        wrapLines={true}
        wrapLongLines={true}
        style={darcula}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
};

CodeBlockSC.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CodeBlockSC;
