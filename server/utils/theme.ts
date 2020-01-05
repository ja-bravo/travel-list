import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#219575',
    },
    secondary: {
      main: '#214560',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fafafa',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        background: 'white',
      },
    },
    MuiListItemText: {
      root: {
        color: '#777777',
      },
    },
  },
});

export default theme;
