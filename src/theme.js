import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
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
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
  typography: {
    fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Gilroy', 'sans-serif'].join(','),
      fontSize: '4rem',
      fontWeight: 'bold',
      lineHeight: '1',
      textAlign: 'center',
      textTransform: 'uppercase',
      wordBreak: 'break-word',
    },
    h2: {
      fontFamily: ['Gilroy', 'sans-serif'].join(','),
      fontSize: '2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
      fontSize: '1.666rem',
    },
    h4: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
    },
    button: {
      fontWeight: 'bold',
    },
    subtitle1: {
      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
      fontSize: '1.666rem',
      lineHeight: '1',
      textAlign: 'center',
      textTransform: 'lowercase',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
    text: {
      primary: '#f2f2f2',
      secondary: '#E6E6E6',
    },
    primary: {
      main: '#fae34b',
    },
    secondary: {
      main: '#313131',
    },
    error: {
      main: '#cf6679',
    },
    background: {
      default: '#3c3c3c',
      paper: '#314151',
    },
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    text: {
      primary: '#0d0d0d',
      secondary: '#1a1a1a',
    },
    primary: {
      main: '#e60045',
    },
    secondary: {
      main: '#f1f1f1',
    },
    error: {
      main: '#ff443d',
    },
    background: {
      default: '#ededed',
      paper: '#fcfcfc',
    },
  },
});

export { darkTheme, lightTheme };
