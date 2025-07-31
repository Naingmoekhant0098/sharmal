const _LogoutService = () => {    
    sessionStorage.clear();
    window.location.replace("/admin/login");
};

export default _LogoutService;
