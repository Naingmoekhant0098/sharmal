import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;
  
const GetUserAPI = async (pageNo, pageSize, setData, toast, setTotalCount, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}admin-account?pageNo=${pageNo}&pageSize=${pageSize}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };
    setIsLoading(true);
    const res = await axios.get(endpoint, { headers: headers });
    
    if (res.data.StatusCode === 200) {

      setData(res?.data?.Data?.DataLst || []);
      const totalRecords = res?.data?.Data?.PageSetting?.TotalCount || 0;
      setTotalCount(totalRecords);


    } else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace('/admin/login');
    } else {
      toast.error(res.data.Message);
    }
    setIsLoading(false);
  } catch (err) {

    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

const UpdateAccountProfileAPI = async (payload,UserId,toast,onClose) => {
  try {
    const endpoint = `${API_BASE_URL}admin-account/update-profile?id=${UserId}`;
    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.put(endpoint, payload, { headers: headers });
    if (res.data.StatusCode === 200) {

      toast.success("User profile Update successfully!");
      onClose()
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {

      toast.error("Unknown Error");
  }
};



const UpdatePasswordAPI = async (payload, userId, toast, onClose) => {
  try {
    const endpoint = `${API_BASE_URL}feature-account/update-password?id=${userId}`;
    const token = _DecryptService(sessionStorage.getItem("token"));
    
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios.put(endpoint, payload, { headers });

    if (res.data.StatusCode === 200) {

      toast.success("User updated successfully!");
      onClose();
    } else {
      toast.error(res.data.Message || "Update failed.");
    }
  } catch (err) {

    toast.error("An error occurred while updating the password.");
  }
};

export default UpdatePasswordAPI;





const CreateUserAPI = async (userData, toast, onClose) => {
  try {
    const endpoint = `${API_BASE_URL}admin-account/register`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.post(endpoint, userData, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("User created successfully!");
      onClose(); // Close the dialog
    } else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace('/admin/login');
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
};

const DeleteUserAPI = async (userId, toast, setData, pageNo, pageSize, setTotalCount, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}admin-account?id=${userId}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("User deleted successfully!"); 
      GetUserAPI(pageNo,pageSize,setData,toast,setTotalCount,setIsLoading);     
    } else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace('/admin/login');
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
};

const ResetCountFail = async (userId,toast) => {
  try {
    const endpoint = `${API_BASE_URL}admin-account?id=${userId}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.patch(endpoint,{}, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("reset successful");
    } 
  } catch (err) {

    toast.error("Unknown Error");
  }
}

export { GetUserAPI, CreateUserAPI, DeleteUserAPI,UpdateAccountProfileAPI,UpdatePasswordAPI,ResetCountFail };
