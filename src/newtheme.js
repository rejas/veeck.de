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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
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
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
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
    primary: {
      main: '#939597',
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
