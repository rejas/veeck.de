import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
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

export default lightTheme;
