import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d7d4c8",
      contrastText: "#171717"
    },
    secondary: {
      main: "#57534e"
    },
    text: {
      primary: "#1f2937",
      secondary: "#4b5563"
    },
    background: {
      default: "#faf9f6",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: "var(--font-savoycaps), Arial, Helvetica, sans-serif",
    h1: {
      fontFamily: "var(--font-savoycaps), Arial, Helvetica, sans-serif",
      letterSpacing: "0.06em"
    },
    h2: {
      fontFamily: "var(--font-savoycaps), Arial, Helvetica, sans-serif"
    },
    h3: {
      fontFamily: "var(--font-savoycaps), Arial, Helvetica, sans-serif"
    },
    button: {
      fontFamily: "var(--font-savoycaps), Arial, Helvetica, sans-serif",
      fontWeight: 600
    },
    subtitle1: {
      fontFamily: "var(--font-optima), Arial, Helvetica, sans-serif",
      fontWeight: 400
    },
  },
  shape: {
    borderRadius: 0
  }
});
