import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  mixins: {
    glas: {
      backgroundColor: 'transparent',
      backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
      backdropFilter: 'blur(10px)',
      boxShadow: '10px 10px 10px rgb(30 30 30 / 50%)',
    },
  },
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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
          backdropFilter: 'blur(10px)',
          boxShadow: '10px 10px 10px rgb(30 30 30 / 50%)',
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
      fontFamily: ['Comforter Brush', 'serif'].join(','),
      fontSize: '4rem',
    },
    h2: {
      fontFamily: ['Comforter Brush', 'serif'].join(','),
      fontSize: '3rem',
    },
    h3: {
      fontSize: '1.666rem',
    },
    h4: {
      fontSize: '1rem',
      //fontWeight: 'bold',
    },
    h5: {
      //fontWeight: 'bold',
    },
    h6: {},
    button: {
      // fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '1.666rem',
    },
  },
});

export default baseTheme;
