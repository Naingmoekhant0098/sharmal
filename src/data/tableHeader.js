const tableHeaders = {
    Property: [
      "InquiresId",
      "PropertyId",      
      "Status",      
      "UserName",
      "PhoneNumber",
      "Email",
      "InquiryStatus",
      "Done",
      "CreatedDate",
      "Actions"
    ],
    Car:[
      "InquiresId",          
      "CardId",           
      "UserName",
      "PhoneNumber",
      "Email",
      "InquiryStatus",
      "Done",
      "CreatedDate",
      "Actions"
    ],
    Other:[
      "InquiresId",
      "PropertyId",
      "CardId",
      // "Status",      
      "UserName",
      "PhoneNumber",
      "Email",
      "InquiryStatus",
      "Done",
      "CreatedDate",
      "Actions"
    ],
    Ads:[
      "AdsId",
      "ImageName",
      "Title",
      "TargetUrl",
      "AdsLayout",
      "StartDate",
      "EndDate",
      "CreatedBy",
      "UpdatedBy",
      "Status",
      "Actions"
    ],
    // You can add more categories here
    ListingsProperty: [
      "Code",
      "PropertyId",
      "Title",
      "Status",
      "Type",
      "Location",
      "Price",
      "Furnished",
      // "Special Status",
      "NumberOfViewers",
      // "Availability",
      // "Sold/Rented",
      "Actions"
    ],
    ListingsCar: [
      "Code",
      "CarId",
      "Status",
      "Title",
      "Gearbox",
      "Manufacturer",
      "Model",
      "Year",
      "FuelType",
      "Condition",
      "Price",
      "SteeringPosition",
      "CarColor",
      // "Special Status",
      "NumberOfViewers",
      "Availability",
      // "Sold",
      "Actions"
    ],
    User:[
      "UserId",
      "UserName",
      "Email",
      "UserRole",
      "CreatedDate",
      "FailedCount",
      "CreatedBy",
      "UpdatedBy",
      "Actions"
    ],
    Blog:[
      "Id",
      "Title",
      "Description",
      "Actions"
    ]
  };
  
  export default tableHeaders;
  