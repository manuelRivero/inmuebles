"use client";
import { createTheme } from "@mui/material";
import { esES } from "@mui/x-data-grid";

const theme = createTheme(
  {
    palette: {
      primary: {
        dark: "#0F7BD3",
        main: "#29A6E5",
        light: "#69C1ED",
        contrastText: "#fff",
      },
      secondary: {
        main: "#E89B26",
        light: "#FFD1AD",
        dark: "#FFA35A",
        contrastText: "#fff",
      },
      background: {
        default: "#e7eff1",
      },
      text: {
        primary: "#2F4858",
      },
    },
    typography: {
      h1: { fontFamily: "Merriweather", fontSize: "3rem" },
      h2: { fontFamily: "Merriweather", fontSize: "2rem" },
      h3: { fontFamily: "Merriweather", fontSize: "1.5rem" },
      h4: { fontFamily: "Merriweather", fontSize: "1.3rem" },
      h5: { fontFamily: "Merriweather", fontSize: "1rem" },
      h6: { fontFamily: "Merriweather" },
      body1: { fontFamily: "OpenSans" },
    },
  },
  esES
);

export { theme };

declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
}
