import { createTheme } from '@mui/material/styles';

export const theme = createTheme({

  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: '46px',
      lineHeight: '60px',
      textAlign:'center',
      fontWeight: 700,
    },
    h2:{
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 700,
    },
    h3:{
      fontSize: '32px',
      lineHeight: '40px',
    },
    h4:{
      fontSize: '22px',
      lineHeight: '30px',
      fontWeight:600,
      color:'#272D37',
      marginTop:'10px'
    },
    h5:{
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight:600,
      color:'#272D37',
      
    },
    body1: {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight:400,
      color:'#5F6D7E'
    },
    body2: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight:400,
      color:'#5F6D7E',
      marginTop:'10px'
    },
    body3: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight:400,
      color:'#5F6D7E',
      marginTop:'16px'
    },
  },

  palette: {
    primary: {
      light: '#757ce8',
      main: '#437EF7',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        
        },
      },
    },
    MuiButtonOutlined:{
      styleOverrides: {
        root: {
          border: '1px solid #DAE0E6',
        },
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
