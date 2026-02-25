import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    black: string;
    white: string;
    blackColor: string;
    darkBlue: string;
    darkGray: string;
    darkGreen: string;
    listGrey: string;
    green: string;
  }

  interface PaletteOptions {
    black: string;
    white: string;
    blackColor: string;
    darkBlue: string;
    darkGray: string;
    darkGreen: string;
    listGrey: string;
    green: string;
  }

  interface TypeText {
    link: string;
    unselected: string;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    black: string;
    white: string;
    blackColor: string;
    darkBlue: string;
    darkGray: string;
    darkGreen: string;
    listGrey: string;
    green: string;
  }
}
