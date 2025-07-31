import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const GetExchangeRateAPI = async (setData, toast) => {
  try {
    const endpoint = API_BASE_URL + "feature-exchange-rate";

    // const headers = {
    //   "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token"))
    // };
    const res = await axios.get(endpoint);
    if (res.data.StatusCode === 200) {
      setData(res.data.Data.DataLst);

    } else if(res.data.StatusCode==401) {    

      alert(res.data.Message);
      window.location.replace('/admin/login')
    }
    else{

      if (toast) toast.error(res.data.Message);
    }
  } catch (err) {

    if (toast) toast.error("Unknown Error");
  }
};

const UpdateExchangeRateAPI = async (payload, toast) => {
  try {
    const endpoint = API_BASE_URL + "feature-exchange-rate";

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };
    const res = await axios.put(endpoint, payload, { headers: headers });
    if (res.data.StatusCode === 200) {
      toast.success("Exchange rates updated successfully");
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
};

export { GetExchangeRateAPI, UpdateExchangeRateAPI };
