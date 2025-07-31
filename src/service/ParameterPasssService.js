const _parameterPassService = (item) => {

  

  // Extract the property data and features
  const propertyData = item.Property || {};
  const propertyFeatures = propertyData.PropertyFeatures || [];
  const propertyImages = propertyData.Images || []; // Ensure Images are accessed from PropertyData

  // Create query parameters from property data
  const queryParams = [];

  // Add properties to query params
  if (propertyData.PropertyId) {
    queryParams.push(`PropertyId=${propertyData.PropertyId}`);
  }
  
  if (propertyData.Title) {
    queryParams.push(`Title=${propertyData.Title}`);
  }
  
  if (propertyData.Status) {
    queryParams.push(`Status=${propertyData.Status}`);
  }
  
  if (propertyData.Type) {
    queryParams.push(`Type=${propertyData.Type}`);
  }
  
  if (propertyData.Price) {
    queryParams.push(`Price=${propertyData.Price}`);
  }

  // Create lists to store feature names and image names
  const featureNames = propertyFeatures.map(feature => feature.FeatureName);
  const imageNames = propertyImages.map(image => image.ImageName);

  // Add property feature names to query params
  featureNames.forEach(featureName => {
    queryParams.push(`PropertyFeatures[]=${featureName}`);
  });

  // Add image names to query params
  imageNames.forEach(imageName => {
    queryParams.push(`Images[]=${imageName}`);
  });

  // Join all query parameters
  const queryString = queryParams.join('&');

  // Log the query string

  
}

export default _parameterPassService;
