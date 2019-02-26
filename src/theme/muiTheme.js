import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 18
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#495F69",
      dark: "#26A69A",
      button: "#26A69A",
      contrastText: "#fff"
    },
    secondary: {
      light: "#63ccff",
      main: "#009688",
      dark: "#0D7C71",
      contrastText: "#fff"
    }
  },
  shape: {
    borderRadius: 2
  },
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "none"
      }
    }
  }
});

export default theme;
