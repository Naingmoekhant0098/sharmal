import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify"; // Ensure you have this package installed

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const GetAdsPageAPI = async (setAdsPagePlacements) => {
  try {
    const endpoint = `${API_BASE_URL}feature-ads-page`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.get(endpoint, { headers });

    if (res.data.StatusCode === 200) {
      
      toast.success("Ad retrieved successfully.");
    
      setAdsPagePlacements(res.data.Data.DataLst);
    } else {
      toast.error(res.data.Message || "Failed to retrieve the ad.");
    }
  } catch (err) {
 
    toast.error("Unknown Error");
  }
};

/**
 * Retrieves ads with pagination.
 * @param {number} pageNo - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {Function} setData - Callback to set the retrieved data.
 * @param {Function} toast - Toastify instance for showing notifications.
 * @param {Function} setTotalCount - Callback to set the total count of records.
 * * @param {Function} setIsLoading - Callback to set the total count of records.
 */

const GetAdsAPI = async (payload, setData, toast, setTotalCount, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}feature-ads/filter`;
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
    } 
  } catch (err) {
 
  } finally {
    setIsLoading(false); // Set loading to false after the API call is complete
  }
};




/**
 * Deletes an ad by its ID.
 * @param {string} adId - The ID of the ad to delete.
 * @param {Function} onSuccess - Callback function to call on successful deletion.
 */
const DeleteAdsAPI = async (UserId,adId, toast, setData,  setTotalCount, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}feature-ads?id=${adId}`;


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("Ads deleted successfully!");     
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


const CreateAdsAPI = async (adsData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-ads`; 


    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: 'Title', value: adsData.Title },
      { key: 'TargetUrl', value: adsData.TargetUrl },
      { key: 'StartDate', value: adsData.StartDate },
      { key: 'EndDate', value: adsData.EndDate },
      { key: 'CreatedBy', value: adsData.CreatedBy },
      { key: 'AdsLayout', value: adsData.AdsLayout }
    ];

    // Generate and append key-value pairs using map
    keyValuePairs.map(pair => {
      formData.append(pair.key, pair.value);
      return pair; 
    });

    adsData.AdsplacementIndex.forEach((index, i) => {
      const placement = adsData.AdsPagePlacements[index];
      if (placement) {
        formData.append(`AdsPagePlacements[${i}].AdsPageId`, placement.AdsPageId);
      }
    });
    // Generate and append files using map
    adsData.Files.map(file => {
      formData.append('Files', file);
      return file; 
    });

    const res = await axios.post(endpoint, formData, { headers: headers });

    if (res.data.StatusCode === 200) {
 
      toast.success("Ad created successfully.");
    
    } else {
      toast.error(res.data.Message || "Failed to create the ad.");
    
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
};

const UpdateAdsApi = async(adsData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-ads?id=${adsData.adsId}`; 
    

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: 'Title', value: adsData.Title },
      { key: 'TargetUrl', value: adsData.TargetUrl },
      { key: 'StartDate', value: adsData.StartDate },
      { key: 'EndDate', value: adsData.EndDate },
      { key: 'UpdatedBy', value: adsData.UpdatedBy },
      { key: 'AdsLayout', value: adsData.AdsLayout }
    ];

    // Generate and append key-value pairs using map
    keyValuePairs.map(pair => {
      formData.append(pair.key, pair.value);
      return pair; 
    });

    adsData.AdsplacementIndex.forEach((index, i) => {
      const placement = adsData.AdsPagePlacements[index];
      if (placement) {
        formData.append(`AdsPagePlacements[${i}].AdsPageId`, placement.AdsPageId);
      }
    });
    // Generate and append files using map
    adsData.Files.map(file => {
      formData.append('Files', file);
      return file; 
    });

    const res = await axios.put(endpoint, formData, { headers: headers });

    if (res.data.StatusCode === 200) {

      toast.success("Ad Update successfully.");
    
    } else {
      toast.error(res.data.Message || "Failed to create the ad.");
    
    }
  } catch (err) {

    toast.error("Unknown Error");
  }
}



export { GetAdsAPI, DeleteAdsAPI, CreateAdsAPI, GetAdsPageAPI, UpdateAdsApi };
