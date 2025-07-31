import axios from 'axios';
import { _DecryptService, _EncryptService } from '../../service/EncryptDecryptService';

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;
const Common_API_BASE_URL = process.env.REACT_APP_COMMON_SERVICE;

export const LoginAPI = async (postBody, toast, history) => {
  const endpoint = API_BASE_URL + "feature-account/login";

  try {
    const res = await axios.post(endpoint, postBody);

    if (res.data.StatusCode === 200) { // Compare status code as a number
      // const userName = res.data.Data.UserName;
      // const userRole = res.data.Data.UserRole;
      const token=res.data.Token;
      // const userId = res.data.Data.UserId;
      // const decodedToken= _DecryptService(token)
      // const userId = decodedToken?.UserId;
      // sessionStorage.setItem("UserId", userId)
      // sessionStorage.setItem("userName", _EncryptService(userName));
      // sessionStorage.setItem("email",_EncryptService(email));
      // sessionStorage.setItem("userRole", _EncryptService(userRole));
      sessionStorage.setItem("token",_EncryptService(token));
    

      // sessionStorage.setItem("userId", userId);
      
      toast.success("Login Successful");
      window.location.replace('/admin/manage')
    }
    else if(res.data.StatusCode==401) {      
      alert(res.data.Message);
      window.location.replace('/admin/login')
    }
    else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    
    toast.error("Unknown Error");
  }
}


export const MemberLoginAPI = async (postBody, toast, history) => {
  const endpoint = `${API_BASE_URL}feature-account/login`;

  try {
    const res = await axios.post(endpoint, postBody);

    if (res.data.StatusCode === 200) {
      const token = res.data.Token;
      sessionStorage.setItem('token', _EncryptService(token));

      toast.success('Login Successful');
      window.location.replace('/member/manage'); // Adjust redirect if needed
    }
    else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace('/member/login');
    }
    else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

export const MemberRegisterAPI = async (postBody, toast, history) => {
  const endpoint = `${API_BASE_URL}admin-account/register`;

  try {
    const res = await axios.post(endpoint, postBody);

    if (res.data.StatusCode === 200) {
      toast.success("Register Successful");
      window.location.replace('/member/login'); // Or use history.push('/member/login') if preferred
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

export const SendOtpEmailAPI = async (toEmail) => {
  const endpoint = `${Common_API_BASE_URL}email`;

  const payload = {
    ToMail: toEmail,
    CCMail: 'nksoftwarehouse@gmail.com', // or make dynamic
    Subject: 'Account Activate',
    projectName: 'NK Mini POS',
    mailType: 'Activate'
  };

  return await axios.post(endpoint, payload);
};


