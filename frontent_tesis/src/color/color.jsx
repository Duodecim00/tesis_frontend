import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FDFDFB',
      lightdark: '#ECECEC',
      main: '#3f50b5',
      dark: '#1E1F25',
      contrastText: '#fff',
      denied: '#F31313',
      successful: '#06E206',
      
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;