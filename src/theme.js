import { createMuiTheme } from '@material-ui/core/styles';
import secondary from '@material-ui/core/colors/pink';
import tertiary from '@material-ui/core/colors/indigo';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary,
    tertiary: tertiary['800'],
  },
  background: {
    primary: '#eceff1',
    secondary,
  },
  typography: {
    fontSize: 13,
    fontFamily: "Ubuntu, sans-serif, Verdana, 'Trebuchet MS', 'Tahoma'",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    useNextVariants: true,
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: 'none',
        },
      },
    },
    MuiInputBase: {
      input: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        '&:focus': {
          '&::placeholder': {
            display: 'none',
          },
        },
      },
    },
    MuiFilledInput: {
      input: {
        padding: '18px 12px 18px',
      },
    },
    MuiMobileStepper: {
      dotActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      },
    },
  },
});
