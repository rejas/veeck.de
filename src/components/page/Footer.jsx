import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://github.com/rejas">
          rejas
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {' and '}
        <a href="https://material-ui.com/">Material UI</a>
      </Typography>
    </footer>
  );
};

export default Footer;
