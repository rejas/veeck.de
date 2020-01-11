import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// TODO enhance it like this https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
const colorScheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const theme = createMuiTheme({
  overrides: {
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
    fontFamily: ['Lora', 'serif'].join(','),
    h1: {
      fontFamily: ['Concert One', 'sans-serif'].join(','),
      fontSize: '3rem',
      lineHeight: '1',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '2rem',
      fontFamily: ['Concert One', 'sans-serif'].join(','),
      marginTop: '2rem',
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '1.666rem',
      fontFamily: ['Concert One', 'sans-serif'].join(','),
      marginTop: '1rem',
    },
    h4: {
      fontFamily: ['Concert One', 'sans-serif'].join(','),
      fontWeight: 'bold',
    },
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    type: colorScheme,
    primary: {
      main: '#19857b',
    },
    secondary: {
      main: '#1093e9',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colorScheme === 'dark' ? '#303030' : '#efeeee',
    },
  },
});

export default responsiveFontSizes(theme);
