import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
    button: {
      textTransform: "none"
    }
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
});
