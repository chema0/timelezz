export const palette = {
  black: "#000",
  white: "#fff",
  gray: ["#fafafa", "#eaeaea", "#999", "#888", "#666", "#444", "#333", "#111"],
  error: {
    lighter: "#f7d4d6",
    light: "#ff1a1a",
    normal: "#e00",
    dark: "#c50000",
  },
  success: {
    lighter: "#d3e5ff",
    light: "#3291ff",
    normal: "#0070f3",
    dark: "#0761d1",
  },
  warning: {
    lighter: "#ffefcf",
    light: "#f7b955",
    normal: "#f5a623",
    dark: "#ab570a",
  },
  violet: {
    lighter: "#d8ccf1",
    light: "#8a63d2",
    normal: "#7928ca",
    dark: "#4c2889",
  },
  cyan: {
    lighter: "#aaffec",
    light: "#79ffe1",
    normal: "#50e3c2",
    dark: "#29bc9b",
  },
  highlight: {
    purple: "#f81ce5",
    magenta: "#eb367f",
    pink: "#ff0080",
    yellow: "#fff500",
  },
};

export const lightTheme = {
  background: palette.white,
  foreground: palette.black,
  accents: {
    1: palette.gray[0],
    2: palette.gray[1],
    3: palette.gray[2],
    4: palette.gray[3],
    5: palette.gray[4],
    6: palette.gray[5],
    7: palette.gray[6],
    8: palette.gray[7],
  },
  palette,
};

export const darkTheme = {
  background: "#fff",
  foreground: "#000",
  accents: {
    1: palette.gray[7],
    2: palette.gray[6],
    3: palette.gray[5],
    4: palette.gray[4],
    5: palette.gray[3],
    6: palette.gray[2],
    7: palette.gray[1],
    8: palette.gray[0],
  },
  palette,
};
