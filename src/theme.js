import { responsiveFontSizes } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// TODO enhance it like this https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
// maybe switch to something like mentioned here: https://material-ui.com/customization/palette/#user-preference
let prefersDarkMode = false;

// Fix build failure in gatsby
if (typeof window !== 'undefined') {
  prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const theme = createTheme({
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
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: prefersDarkMode ? '#fae34b' : '#939597',
    },
    secondary: {
      main: prefersDarkMode ? '#313131' : '#f1f1f1',
    },
    error: {
      main: prefersDarkMode ? '#cf6679' : '#ff443d',
    },
    background: {
      default: prefersDarkMode ? '#3c3c3c' : '#ededed',
      paper: prefersDarkMode ? '#314151' : '#fcfcfc',
    },
  },
});

export default responsiveFontSizes(theme);
