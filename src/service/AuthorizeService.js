export const _AdminAuthorizeService = () => {    
    // const userName = sessionStorage.getItem("userName");
    // const email = sessionStorage.getItem("email");
    // const userRole = sessionStorage.getItem("userRole");
    const token = sessionStorage.getItem("token");
  
  
    // if (!userName || !email || !userRole || !token) {
    //   window.location.replace('/admin/login');
    // }

    if (!token) {
      window.location.replace('/admin/login');
    }
  };
  
  export const _UserAuthorizeService=()=>{

  }
  