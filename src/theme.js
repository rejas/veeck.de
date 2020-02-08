import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// TODO enhance it like this https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
// maybe switch to something like mentioned here: https://material-ui.com/customization/palette/#user-preference
let prefersDarkMode = false;

// Fix build failure in gatsby
if (typeof window !== `undefined`) {
  prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// TODO disable DarkMode until we are satisfied with the colors
prefersDarkMode = false;

const theme = createMuiTheme({
  overrides: {
    MuiLink: {},
    MuiDivider: {
      root: {
        marginBottom: '1rem',
        marginTop: '1rem',
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
    },
    h2: {
      fontSize: '2rem',
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
      marginTop: '2rem',
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '1.666rem',
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
      marginTop: '1rem',
    },
    h4: {
      fontSize: '1rem',
      fontFamily: ['Shadows Into Light', 'sans-serif'].join(','),
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
  },
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#79394c', //'#95134e',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ff9100',
    },
    background: {
      default: prefersDarkMode ? '#332A27' : '#f0efe9',
      paper: prefersDarkMode ? '#806a62' : '#e4e0d3',
    },
  },
});

export default responsiveFontSizes(theme);
