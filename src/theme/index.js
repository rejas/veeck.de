import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { default as darkTheme } from './dark';
import { default as lightTheme } from './light';

export const getTheme = (darkMode) => {
  let theme = darkMode ? darkTheme : lightTheme;

  return responsiveFontSizes(
    createTheme({
      ...theme,
      // Make md breakpoint a little wider than standard
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1200,
          xl: 1536,
        },
      },
      components: {
        MuiDivider: {
          styleOverrides: {
            root: {
              marginBottom: '1rem',
              marginTop: '1rem',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '4px',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },
        },
        MuiLink: {
          defaultProps: {
            underline: 'hover',
          },
        },
      },
      typography: {
        fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
        h1: {
          fontFamily: ['Bricolage Grotesque', 'serif'].join(','),
          fontSize: '4rem',
          fontVariationSettings: '"opsz" 96, "wdth" 100, "wght" 800',
        },
        h2: {
          fontFamily: ['Bricolage Grotesque', 'serif'].join(','),
          fontSize: '3rem',
          fontVariationSettings: '"opsz" 96, "wdth" 100, "wght" 600',
        },
        h3: {
          fontSize: '1.666rem',
        },
        h4: {
          fontSize: '1rem',
          //fontWeight: 'bold',
        },
        h5: {
          //fontWeight: 'bold',
        },
        h6: {},
        button: {
          // fontWeight: 'bold',
        },
        subtitle1: {
          fontSize: '1.666rem',
        },
      },
    }),
  );
};
