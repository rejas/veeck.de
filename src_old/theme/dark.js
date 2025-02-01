import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
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

export default darkTheme;
