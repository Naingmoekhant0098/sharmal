import theme from "./theme";
const commonStyles = {
    container: {
      height: '100vh',
      backgroundColor: theme.homePage.backgroundColor,
    },
    cardWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      width: '75%',
      height: '75%',
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '20px',
    },
    header: {
      textAlign: 'left',
      marginBottom: '20px',
    },
    logoContainer: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'row',
    },
    logo: {
      width: '100px',
      marginBottom: '10px',
    },
    contactInfo: {
      marginBottom: '20px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    mapContainer: {
      width: '100%',
      height: '300px',
      marginTop: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputLabel: {
      fontSize: '16px',
      height:200
    },
  };
  export default commonStyles;