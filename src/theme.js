import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3E0F56", // deep purple from text
      contrastText: "#ffffff",
      dark: "#280837", // darker shade for hover states
    },
    secondary: {
      main: "#A033A6", // purple-magenta from car gradient
    },
    accent: {
      main: "#E3B1F3", // light magenta highlight
    },
    text: {
      main: "#001619",
      secondary: "#000000",
    },
    success: {
      main: "#008080", // teal (unchanged)
    },
    warning: {
      main: "#FFA700", // orange (unchanged)
    },
    error: {
      main: "#C30000", // red (unchanged)
    },
    default: {
      main: "#ffffff",
    },
    card: {
      main: "#f6eef6", // soft lavender background
    },
    background: {
      splash: "#fdfcfd", // off-white background from the splash/logo image
    },
    footer: {
    main: '#FBB96F',
    text: '#ffffff',
    border: '#0405053D'
  }
  },

  components: {
    dashboard: {
      titleColor: "#7A165B",
      saleCircleIcon: "#6FD195",
      rentCircleIcon: "#FFAE4C",
      saleCarCircleIcon: "#FFAE4C",
      inquiryOtherCircleIcon: "#ea615e",
      welcomeTextColor: "#AC2582",
      inquiryTitleColor: "#001619B2",
    },
    card: {
      backgroundColor: "#f6eef6",
    },
  },
  typography: {
    h4: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
  },
  shape: {
    button: {
      borderRadius: 20,
      textTransform: "none",
    },
    borderRadius: 20,
    textTransform: "none",
  },
  Stepper: {
    border: {
      main: "#ea625e",
    },
  },
  homePage: {
    navbar: "#eef0f3",
    backgroundColor: "#e3e1f7",
  },
});
export default theme;
