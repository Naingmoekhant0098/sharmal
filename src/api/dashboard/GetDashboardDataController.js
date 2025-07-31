import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify"; // Ensure you have this package installed


const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const GetDashboardDataAPI = async (setDashboardData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-dashboard`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.get(endpoint, { headers });

    if (res.data.StatusCode === 200) {

    

      setDashboardData(res.data.Data);
    } else {
      toast.error(res.data.Message || "Failed to retrieve the data.");
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
};

export {GetDashboardDataAPI};