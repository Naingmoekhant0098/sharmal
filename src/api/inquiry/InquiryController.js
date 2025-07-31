import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";


const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;


const GetInquiryAPI = async (payload, setData, toast, setTotalCount) => {
  try {
    const endpoint = API_BASE_URL + "feature-inquiry/filter";

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };
    
    const res = await axios.post(endpoint, payload, { headers: headers });
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
  } catch (err) {

    toast.error("Unknown Error");
  }
};

const UpdateInquiryAPI = async (inquiryId, updatedData, toast) => {
  try {
    const endpoint = `${API_BASE_URL}feature-inquiry?id=${inquiryId}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.patch(endpoint, updatedData, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("Inquiry updated successfully");
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

const DeleteInquiryAPI = async (inquiryId, toast,setData,setIsLoading,payload) => {
  try {
    const endpoint = `${API_BASE_URL}feature-inquiry?id=${inquiryId}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("Inquiry deleted successfully");            
      setIsLoading(true);
      await GetInquiryAPI(payload, setData, toast);          
      setIsLoading(false);
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

const CreateInquaryAPI = async (payload) => {
  try {
    const endpoint = API_BASE_URL + "feature-inquiry";


    const res = await axios.post(endpoint, payload);
    if (res.data.StatusCode === 200) {

    }

  } catch (err) {

  }
}

export { GetInquiryAPI, UpdateInquiryAPI, DeleteInquiryAPI,CreateInquaryAPI };
