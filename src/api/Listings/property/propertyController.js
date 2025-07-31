import axios from "axios";
import { toast } from "react-toastify";
import { _DecryptService } from "../../../service/EncryptDecryptService";
import set from "date-fns/esm/set/index";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

/**
 * Retrieves ads with pagination.
 * @param {number} pageNo - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {Function} setData - Callback to set the retrieved data.
 * @param {Function} toast - Toastify instance for showing notifications.
 * @param {Function} setTotalCount - Callback to set the total count of records.
 * * @param {Function} setIsLoading - Callback to set the total count of records.
 */
const GetPropertyAPI = async (
  payload,
  setData,
  setTotalCount,
  toast,
  setIsLoading
) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property/filter`;

    const res = await axios.post(endpoint, payload);

    if (res.data.StatusCode === 200) {
      setData(res?.data?.Data?.DataLst || []);
      const totalRecords = res?.data?.Data?.PageSetting?.TotalCount || 0;
      setTotalCount(totalRecords);
    } else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace("/admin/login");
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    toast.error("Unknown Error");
  } finally {
    if (typeof setIsLoading === "function") {
      setIsLoading(false); // Call setIsLoading(false) only if it's provided
    }
  }
};

const CreatePropertyAPI = async (propertyData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: "Code", value: propertyData.Code },
      { key: "Title", value: propertyData.Title },
      { key: "Status", value: propertyData.Status },
      { key: "Type", value: propertyData.Type },
      { key: "Price", value: propertyData.Price },
      { key: "PaymentOption", value: propertyData.PaymentOption },
      { key: "Location", value: propertyData.Location },
      { key: "City", value: propertyData.City },
      { key: "NumberOfViewers", value: propertyData.NumberOfViewers },
      { key: "Bedrooms", value: propertyData.Bedrooms },
      { key: "Bathrooms", value: propertyData.Bathrooms },
      { key: "Area", value: propertyData.Area },
      { key: "Condition", value: propertyData.Condition },
      { key: "Description", value: propertyData.Description },
      { key: "Furnished", value: propertyData.Furnished },
      { key: "SellerName", value: propertyData.SellerName },
      { key: "PrimaryPhoneNumber", value: propertyData.PrimaryPhoneNumber },
      { key: "SecondaryPhoneNumber", value: propertyData.SecondaryPhoneNumber },
      { key: "Email", value: propertyData.Email },
      { key: "Address", value: propertyData.Address },
      { key: "CreatedBy", value: propertyData.CreatedBy },
      { key: "IsHotDeal", value: propertyData.IsHotDeal },
      { key: "Floor", value: propertyData.Floor },
      { key: "MapUrl", value: propertyData.MapUrl },
    ];

    // Append key-value pairs to formData
    keyValuePairs.map((pair) => {
      formData.append(pair.key, pair.value);
      return pair;
    });

    // Append property features
    propertyData.PropertyFeaturesIndex.map((index, i) => {
      const feature = propertyData.PropertyFeatures[index];
      if (feature) {
        formData.append(`Features[${i}].FeatureId`, feature.FeatureId);
      }
    });

    // Append files
    propertyData.Files.map((file) => {
      formData.append("Files", file);
      return file;
    });

    const res = await axios.post(endpoint, formData, { headers: headers });

    if (res?.data?.StatusCode === 200) {
      toast.success("Property created successfully.");
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const DeletePropertyAPI = async (propertyId, toast, setData, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property?id=${propertyId}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {
      toast.success("property deleted successfully!");
    } else if (res.data.StatusCode === 401) {
      alert(res.data.Message);
      window.location.replace("/admin/login");
    } else {
      toast.error(res.data.Message);
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const GetPropertyFeaturesAPI = async (setPropertyFeatures) => {
  try {
    const endpoint = `${API_BASE_URL}feature-feature`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.get(endpoint, { headers });

    if (res.data.StatusCode === 200) {
      toast.success("Property Features retrieved successfully.");

      setPropertyFeatures(res.data.Data.DataLst);
    } else {
      toast.error(
        res.data.Message || "Failed to retrieve the Property Features ."
      );
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const UpdatePropertyAPI = async (propertyData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property?id=${propertyData.PropertyId}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: "Code", value: propertyData.Code },
      { key: "Title", value: propertyData.Title },
      { key: "Status", value: propertyData.Status },
      { key: "Type", value: propertyData.Type },
      { key: "Price", value: propertyData.Price },
      { key: "PaymentOption", value: propertyData.PaymentOption },
      { key: "Location", value: propertyData.Location },
      { key: "City", value: propertyData.City },
      { key: "NumberOfViewers", value: propertyData.NumberOfViewers },
      { key: "Bedrooms", value: propertyData.Bedrooms },
      { key: "Bathrooms", value: propertyData.Bathrooms },
      { key: "Area", value: propertyData.Area },
      { key: "Condition", value: propertyData.Condition },
      { key: "Description", value: propertyData.Description },
      { key: "Furnished", value: propertyData.Furnished },
      { key: "SellerName", value: propertyData.SellerName },
      { key: "PrimaryPhoneNumber", value: propertyData.PrimaryPhoneNumber },
      {
        key: "SecondaryPhoneNumber",
        value: propertyData.SecondaryPhoneNumber || "",
      },
      { key: "Email", value: propertyData.Email },
      { key: "Address", value: propertyData.Address },
      { key: "CreatedBy", value: propertyData.CreatedBy },
      { key: "UpdatedBy", value: propertyData.UpdatedBy },
      { key: "IsHotDeal", value: propertyData.IsHotDeal },
      { key: "Floor", value: propertyData.Floor },
    ];

    // Append key-value pairs to formData
    keyValuePairs.map((pair) => {
      formData.append(pair.key, pair.value);
      return pair;
    });

    // Append property features
    propertyData.PropertyFeaturesIndex.map((index, i) => {
      const feature = propertyData.PropertyFeatures[index];
      if (feature) {
        formData.append(`Features[${i}].FeatureId`, feature.FeatureId);
      }
    });

    // Append files
    propertyData.Files.map((file) => {
      formData.append("Files", file);
      return file;
    });

    // Append RemoveImages[] to match: RemoveImages[0].ImageId="filename.jpg"
    if (propertyData.RemovedImages && propertyData.RemovedImages.length > 0) {
      propertyData.RemovedImages.forEach((filename, index) => {
        formData.append(`RemoveImages[${index}].ImageId`, filename);
      });
    }

    const res = await axios.put(endpoint, formData, { headers: headers });

    if (res?.data?.StatusCode === 200) {
      toast.success("Property update successfully.");
    } else {
      toast.error(res.data.Message || "Failed to create the property.");
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const GetAllNeededDataForProperty = async (
  totalRecord,
  setcountForBedroom,
  setcountForBathroom
) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property/filter`;
    const payload = {
      pageNo: 1,
      pageSize: totalRecord,
    };

    const res = await axios.post(endpoint, payload);

    // Check for status and expected data structure
    if (res.data.StatusCode === 200) {
      // Extract the Bedrooms data from each property
      const bedrooms = res.data.Data.DataLst.map(
        (property) => property.Property.Bedrooms
      );
      const bathrooms = res.data.Data.DataLst.map(
        (property) => property.Property.Bathrooms
      );
      const distinctSortedBedrooms = [...new Set(bedrooms)].sort(
        (a, b) => a - b
      );
      const distinctSortedBathroms = [...new Set(bathrooms)].sort(
        (a, b) => a - b
      );
      setcountForBedroom(distinctSortedBedrooms);
      setcountForBathroom(distinctSortedBathroms);
    }
  } catch (err) {}
};

const GetAllNeededDataForPropertyforHomepage = async (
  TotalRecordForProperty,
  setTypeForProperty
) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property/filter`;
    const payload = {
      pageNo: 1,
      pageSize: TotalRecordForProperty,
    };

    const res = await axios.post(endpoint, payload);

    // Check for status and expected data structure
    if (res.data.StatusCode === 200) {
      // Extract the Bedrooms data from each property
      const type = res.data.Data.DataLst.map(
        (property) => property.Property.Type
      );

      const distinctSortedtype = [...new Set(type)].sort();

      setTypeForProperty(distinctSortedtype);
    }
  } catch (err) {}
};

const GetPropertyByid = async (propertyId, setData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-property/property-id?propertyId=${propertyId}`;

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.get(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {
      setData(res?.data?.Data || []);
    }
  } catch (err) {}
};

export {
  GetPropertyAPI,
  UpdatePropertyAPI,
  GetAllNeededDataForPropertyforHomepage,
  DeletePropertyAPI,
  GetPropertyFeaturesAPI,
  CreatePropertyAPI,
  GetAllNeededDataForProperty,
  GetPropertyByid,
};
