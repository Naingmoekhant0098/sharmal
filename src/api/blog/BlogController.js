import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify";

const COMMON_API_BASE_URL = process.env.REACT_APP_COMMON_SERVICE;

export const GetBlogAPI = async (toast) => {
  try {
    const endpoint = `${COMMON_API_BASE_URL}get-datalist`;

    const headers = {
      // "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "ProjectId": "2",
      "TableName": "Tbl_Blog",
      "Content-Type": "application/json"
    };

    const res = await axios.post(endpoint, {}, { headers });

    if (res.status === 200) {      
      return res.data;
    } else {
      toast.error(res.data.Message || "Failed to retrieve the data.");
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};
    
export const CreateBlogAPI = async (postBody) => {
    try {
      const endpoint = `${COMMON_API_BASE_URL}create-data`;
  
      const headers = {
        "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
        "ProjectId": "2",
        "TableName": "Tbl_Blog",
        "Content-Type": "application/json"
      };

      const res = await axios.post(endpoint, postBody, { headers });
      if (res.status === 200) {
        toast.success("Blog created successfully");
        return res.data;
      } else {
        toast.error(res.data.Message || "Failed to create blog.");
      }
    } catch (err) {
      toast.error("Unknown Error");
    }
  };

  export const DeleteBlogAPI = async (id,toast) => {
    try {
      const endpoint = `${COMMON_API_BASE_URL}delete-data`;
  
      const headers = {
        "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
        "ProjectId": "2", // Use "2" for blog, or change accordingly
        "TableName": "Tbl_Blog",
        "Content-Type": "application/json"
      };
  
      const body = {
        Id: id
      };
  
      const res = await axios.delete(endpoint, {
        headers,
        data: body, // DELETE with body requires this
      });
  
      if (res.status === 200) {
        toast.success("Blog deleted successfully");
        return res.data;
      } else {
        toast.error(res.data.Message || "Failed to delete blog.");
      }
    } catch (err) {
      toast.error("Unknown Error");
    }
  };

  export const UpdateBlogAPI = async (updateBody, toast) => {
    try {
      const endpoint = `${COMMON_API_BASE_URL}update-data`;
  
      const headers = {
        "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
        "ProjectId": "2", // Use your correct project ID for blogs
        "TableName": "Tbl_Blog",
        "Content-Type": "application/json"
      };
  
      const res = await axios.put(endpoint, updateBody, { headers });
  
      if (res.status === 200) {
        toast.success("Blog updated successfully");
        return res.data;
      } else {
        toast.error(res.data.Message || "Failed to update blog.");
      }
    } catch (err) {
      toast.error("Unknown Error");
    }
  };
  
  