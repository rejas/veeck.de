import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://material-ui.com/">
          rejas
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Typography>
    </footer>
  );
}
