import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          color: '#fff',
          fontFamily: 'Montserrat, sans-serif',
          body: {
            margin: '0',
            color: '#fff',
            boxSizing: 'content-box',
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: '#000',
          },
        },
      },
    },
  },
});

export default theme;
