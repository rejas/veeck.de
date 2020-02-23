import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// TODO enhance it like this https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
// maybe switch to something like mentioned here: https://material-ui.com/customization/palette/#user-preference
let prefersDarkMode = false;

// Fix build failure in gatsby
if (typeof window !== 'undefined') {
  prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const theme = createMuiTheme({
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        minWidth: 0,
      },
    },
    MuiDivider: {
      root: {
        marginBottom: '1rem',
        marginTop: '1rem',
      },
    },
    MuiLink: {
      root: {
        fontWeight: 'bold',
      },
    },
    MuiList: {
      root: {
        fontSize: '1rem',
      },
    },
  },
  typography: {
    fontFamily: ['Lato', 'serif'].join(','),
    h1: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
      fontSize: '4rem',
      fontWeight: 'bold',
      lineHeight: '1',
      textAlign: 'center',
      textTransform: 'uppercase',
      wordBreak: 'break-word',
    },
    h2: {
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
      fontSize: '2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
      fontSize: '1.666rem',
    },
    h4: {
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
    },
    button: {
      fontWeight: 'bold',
    },
    subtitle1: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
      fontSize: '1.666rem',
      lineHeight: '1',
      textAlign: 'center',
      textTransform: 'lowercase',
    },
  },
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: prefersDarkMode ? '#4bb2f9' : '#95134e',
    },
    secondary: {
      main: prefersDarkMode ? '#313131' : '#f1f1f1',
    },
    error: {
      main: prefersDarkMode ? '#cf6679' : '#ff443d',
    },
    background: {
      default: prefersDarkMode ? '#3c3c3c' : '#fcfcfc',
      paper: prefersDarkMode ? '#314152' : '#f1f1f1',
    },
  },
});

export default responsiveFontSizes(theme);
