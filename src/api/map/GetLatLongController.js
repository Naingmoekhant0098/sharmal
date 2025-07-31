import axios from 'axios';

const API_KEY = process.env.REACT_APP_GEO_API_KEY;

const GetLatLongMapAPI = async (townships = []) => {
  const cityCoordinates = {};

  for (const township of townships) {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: `${township}, Yangon, Myanmar`,
          key: API_KEY,
          language: 'my',
          limit: 1
        }
      });

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        // Round to 4 digits
        cityCoordinates[township] = [
          parseFloat(lat.toFixed(4)),
          parseFloat(lng.toFixed(4))
        ];
      } else {
        console.warn(`❗ No result found for ${township}`);
      }

    } catch (error) {
      console.error(`❌ Error fetching ${township}:`, error.message);
    }
  }

  console.log("✅ Final Coordinates:\n", cityCoordinates);
  return cityCoordinates;
};

export default GetLatLongMapAPI;
