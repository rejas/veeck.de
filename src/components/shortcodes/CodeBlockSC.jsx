import * as React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const BoxRoot = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
}));

const CodeBlockSC = (props) => {
  const { children, className } = props;

  return (
    <BoxRoot>
      <SyntaxHighlighter
        language={className ? className.replace('language-', '') : ''}
        style={darcula}
      >
        {children}
      </SyntaxHighlighter>
    </BoxRoot>
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
