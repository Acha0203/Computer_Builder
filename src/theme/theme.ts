import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          color: 'white',
          fontFamily: 'Montserrat, sans-serif',
          body: {
            margin: '0',
            color: 'white',
            boxSizing: 'content-box',
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: '#E3E3E3',
          },
        },
      },
    },
  },
});

export default theme;
