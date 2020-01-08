import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      fontFamily: ['Girassol', 'sans-serif'].join(','),
    },
    h2: {
      fontSize: '2rem',
      fontFamily: ['Girassol', 'sans-serif'].join(','),
    },
    h3: {
      fontSize: '1.666rem',
      fontFamily: ['Girassol', 'sans-serif'].join(','),
    },
    button: {
      fontWeight: 700,
    },
  },
  palette: {
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
      default: '#efeeee',
    },
  },
});

export default theme;
