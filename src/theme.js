import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  MuiTypography: {
    question: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
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
      fontWeight: "bold"
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

export default responsiveFontSizes(theme);
