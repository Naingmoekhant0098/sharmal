import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have this package installed
import { _DecryptService } from "../../../service/EncryptDecryptService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

// const GetCarApi = async (UserId, pageNo, pageSize, setData, setTotalCount, setIsLoading) => {
//   try {
//     const endpoint = `${API_BASE_URL}feature-car?userId=${UserId}&pageNo=${pageNo}&pageSize=${pageSize}`;

//     const headers = {
//       "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
//       "Content-Type": "application/json"
//     };

//     const res = await axios.get(endpoint, { headers: headers });

//     if (res.data.StatusCode === 200) {

//       setData(res?.data?.Data?.DataLst || []);
//       const totalRecords = res?.data?.Data?.PageSetting?.TotalCount || 0;
//       setTotalCount(totalRecords);
//       setIsLoading(false);

//     } else if (res.data.StatusCode === 401) {
//       alert(res.data.Message);
//       window.location.replace('/admin/login');
//     } else {
//       toast.error(res.data.Message);
//       setIsLoading(false);
//     }
//   } catch (err) {

//     setIsLoading(false);
//   }
// }

/**
 * Retrieves ads with pagination.
 * @param {number} pageNo - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {Function} setData - Callback to set the retrieved data.
 * @param {Function} toast - Toastify instance for showing notifications.
 * @param {Function} setTotalCount - Callback to set the total count of records.
 * * @param {Function} setIsLoading - Callback to set the total count of records.
 */
const GetCarApi = async (
  payload,
  setData,
  setTotalCount,
  toast,
  setIsLoading
) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car/filter`;

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

const CreateCarAPI = async (createCarInfor) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car`; // Update the endpoint as needed

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: "Code", value: createCarInfor.Code },
      { key: "Title", value: createCarInfor.Title },
      { key: "Status", value: "ရောင်းရန်" },
      { key: "Description", value: createCarInfor.Description },
      { key: "Gearbox", value: createCarInfor.Gearbox },
      { key: "SteeringPosition", value: createCarInfor.SteeringPosition },
      { key: "EnginePower", value: createCarInfor.EnginePower },
      { key: "Mileage", value: createCarInfor.Mileage },
      { key: "FuelType", value: createCarInfor.FuelType },
      { key: "BuildType", value: createCarInfor.BuildType },
      { key: "Manufacturer", value: createCarInfor.Manufacturer },
      { key: "Model", value: createCarInfor.Model },
      { key: "Year", value: createCarInfor.Year },
      { key: "PlateDivision", value: createCarInfor.PlateDivision },
      { key: "PlateNo", value: createCarInfor.PlateNo },
      { key: "PlateColor", value: createCarInfor.PlateColor },
      { key: "CarColor", value: createCarInfor.CarColor },
      { key: "Condition", value: createCarInfor.Condition },
      { key: "Price", value: createCarInfor.Price },
      { key: "SpecialStatus", value: createCarInfor.SpecialStatus },
      { key: "NumberOfViewers", value: createCarInfor.NumberOfViewers },
      { key: "Availability", value: createCarInfor.Availability },
      { key: "IsSold", value: createCarInfor.IsSold },
      { key: "Location", value: createCarInfor.Location },
      { key: "City", value: createCarInfor.City },
      { key: "PaymentOption", value: createCarInfor.PaymentOption },
      { key: "TrimName", value: createCarInfor.TrimName },
      { key: "SellerName", value: createCarInfor.SellerName },
      { key: "PrimaryPhoneNumber", value: createCarInfor.PrimaryPhoneNumber },
      {
        key: "SecondaryPhoneNumber",
        value: createCarInfor.SecondaryPhoneNumber,
      },
      { key: "Email", value: createCarInfor.Email },
      { key: "Address", value: createCarInfor.Address },
      { key: "CreatedBy", value: createCarInfor.CreatedBy },
      { key: "IsPopular", value: createCarInfor.IsPopular },
      { key: "IsHotDeal", value: createCarInfor.IsHotDeal },
      { key: "LincenseStatus", value: createCarInfor.LincenseStatus },
    ];

    // Append key-value pairs to formData
    keyValuePairs.forEach((pair) => {
      formData.append(pair.key, pair.value);
    });

    // Append files
    createCarInfor.Files.forEach((file) => {
      formData.append("Files", file);
    });

    const res = await axios.post(endpoint, formData, { headers });

    if (res?.data?.StatusCode === 200) {
      toast.success("Car created successfully.");
    } else {
      toast.error(res.data.Message || "Failed to create the car.");
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const DeleteCarApi = async (carId, toast, setData, setIsLoading) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car?id=${carId}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.delete(endpoint, { headers: headers });

    if (res.data.StatusCode === 200) {
      toast.success("Car deleted successfully!");
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

const UpdateCarAPI = async (createCarInfor) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car?id=${createCarInfor.CarId}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();

    // Define key-value pairs to append
    const keyValuePairs = [
      { key: "Code", value: createCarInfor.Code },
      { key: "Title", value: createCarInfor.Title },
      { key: "Status", value: createCarInfor.Status || null },
      { key: "Description", value: createCarInfor.Description },
      { key: "Gearbox", value: createCarInfor.Gearbox },
      { key: "SteeringPosition", value: createCarInfor.SteeringPosition },
      { key: "EnginePower", value: createCarInfor.EnginePower },
      { key: "Mileage", value: createCarInfor.Mileage },
      { key: "FuelType", value: createCarInfor.FuelType },
      { key: "BuildType", value: createCarInfor.BuildType },
      { key: "Manufacturer", value: createCarInfor.Manufacturer },
      { key: "Model", value: createCarInfor.Model },
      { key: "Year", value: createCarInfor.Year },
      { key: "PlateDivision", value: createCarInfor.PlateDivision },
      { key: "PlateNo", value: createCarInfor.PlateNo },
      { key: "PlateColor", value: createCarInfor.PlateColor },
      { key: "CarColor", value: createCarInfor.CarColor },
      { key: "Condition", value: createCarInfor.Condition },
      { key: "Price", value: createCarInfor.Price },
      { key: "SpecialStatus", value: createCarInfor.SpecialStatus },
      { key: "NumberOfViewers", value: createCarInfor.NumberOfViewers },
      { key: "Availability", value: createCarInfor.Availability },
      { key: "IsSold", value: createCarInfor.IsSold },
      { key: "Location", value: createCarInfor.Location },
      { key: "City", value: createCarInfor.City },
      { key: "PaymentOption", value: createCarInfor.PaymentOption },
      { key: "TrimName", value: createCarInfor.TrimName },
      { key: "SellerName", value: createCarInfor.SellerName },
      { key: "PrimaryPhoneNumber", value: createCarInfor.PrimaryPhoneNumber },
      {
        key: "SecondaryPhoneNumber",
        value: createCarInfor.SecondaryPhoneNumber,
      },
      { key: "Email", value: createCarInfor.Email },
      { key: "Address", value: createCarInfor.Address },
      { key: "CreatedBy", value: createCarInfor.CreatedBy },
      { key: "IsPopular", value: createCarInfor.IsPopular },
      { key: "IsHotDeal", value: createCarInfor.IsHotDeal },
      { key: "UpdatedBy", value: createCarInfor.UpdatedBy },
      { key: "LincenseStatus", value: createCarInfor.LincenseStatus },
    ];

    // Append key-value pairs to formData
    keyValuePairs.forEach((pair) => {
      formData.append(pair.key, pair.value);
    });

    // Append files
    createCarInfor.Files.forEach((file) => {
      formData.append("Files", file);
    });
    // Append RemoveImages as expected: RemoveImages[0].ImageId = "filename"
    if (
      createCarInfor.RemovedImages &&
      createCarInfor.RemovedImages.length > 0
    ) {
      createCarInfor.RemovedImages.forEach((filename, index) => {
        formData.append(`RemoveImages[${index}].ImageId`, filename);
      });
    }
    const res = await axios.put(endpoint, formData, { headers });

    if (res?.data?.StatusCode === 200) {
      toast.success("Car update successfully.");
    } else {
      toast.error(res.data.Message || "Failed to create the car.");
    }
  } catch (err) {
    toast.error("Unknown Error");
  }
};

const GetAllNeededDataFromCarApi = async (
  totalRecord,
  setAvaliableYear,
  setAvaliableCarModel,
  setAvaliableEnginPower
) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car/filter`;
    const payload = {
      pageNo: 1,
      pageSize: totalRecord,
    };

    const res = await axios.post(endpoint, payload);

    if (res.data.StatusCode === 200) {
      const Year = res.data.Data.DataLst.map((car) => car.Car.Year);
      const Model = res.data.Data.DataLst.map((car) => car.Car.Model);
      const EnginePower = res.data.Data.DataLst.map(
        (car) => car.Car.EnginePower
      );

      const distinctSortedYear = [...new Set(Year)].sort((a, b) => a - b);
      const distinctSortedModel = [...new Set(Model)].sort();
      const distinctSortedEnginPower = [...new Set(EnginePower)].sort(
        (a, b) => a - b
      );

      setAvaliableEnginPower(distinctSortedEnginPower);
      setAvaliableYear(distinctSortedYear);
      setAvaliableCarModel(distinctSortedModel);
    }
  } catch (err) {}
};

const GetCarByid = async (carId, setData) => {
  try {
    const endpoint = `${API_BASE_URL}feature-car/car-id?carId=${carId}`;

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
  GetCarApi,
  CreateCarAPI,
  DeleteCarApi,
  UpdateCarAPI,
  GetAllNeededDataFromCarApi,
  GetCarByid,
};
