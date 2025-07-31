import axios from "axios";
import { LocationOn } from '@mui/icons-material';


const GetDivisionTownshipAPI=async(setDataForDivision)=>{
    await axios.get('https://nksoftware-001-site17.dtempurl.com/MM_StateDivisionDistrictsTownships.json')
    .then((res)=>{

        const Location = res.data?.data;

        setDataForDivision(Location)
    })
}

// const GetPropertyTypeAPI = async (setTypeForProperty) => {
//     await axios.get('https://nksoftware-001-site17.dtempurl.com/PropertyTypes.json')
//     .then((res) => {

//         const PropertyType = res.data;

//         setTypeForProperty(PropertyType)
//     })
// }

const GetFloorsAPI = async (setFloors) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/Floors.json')
    .then((res) => {

        const Floors = res.data.PropertyFloors;

        setFloors(Floors)
    })
}

const GetPropertyCondition = async (setPropertyCondition) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/PropertyCondition.json')
    .then((res) => {

        const PropertyConditon = res.data.PropertyCondition;
        console.log(PropertyConditon)
        setPropertyCondition(PropertyConditon)
    })
}

const GetPropertyFurnished = async (setPropertyFurnished) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/PropertyFurnished.json')
    .then((res) => {

        const PropertyFurnished = res.data.PropertyFurnished;

        setPropertyFurnished(PropertyFurnished)
    })
}

const GetPropertyTypes = async (setPropertyTypes) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/PropertyTypes.json')
    .then((res) => {

        const PropertyTypes = res.data.PropertyTypes;

        setPropertyTypes(PropertyTypes)
    })
}

const GetBuildType = async (setBuildType) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/BuildType.json')
    .then((res) => {

        const BuildType = res.data.BuildTypes;

        setBuildType(BuildType)
    })
}

const GetCarColor = async (setCarColors) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/CarColor.json')
    .then((res) => {

        const CarColor = res.data.Colors;

        setCarColors(CarColor)
    })
}

const GetManufacturers = async (setManufacturers) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/Manufacturer.json')
    .then((res) => {

        const Manufacturer = res.data.Manufacturers;

        setManufacturers(Manufacturer)
    })
}

const GetFuelTypes = async (setFuelTypes) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/FuelType.json')
    .then((res) => {

        const FuelType = res.data.fuel_type;

        setFuelTypes(FuelType)
    })
}

const GetLincenseStatus = async (setLincenseStatus) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/LincenseStatus.json')
    .then((res) => {

        const LincenseStatus = res.data.LincenseStatus;

        setLincenseStatus(LincenseStatus)
    })
}

const GetPlateColors = async (setPlateColors) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/PlateColor.json')
    .then((res) => {

        const PlateColors = res.data.PlateColors;

        setPlateColors(PlateColors)
    })
}

const GetPlateDivision = async (setPlateDivision) => {
    await axios.get('https://nksoftware-001-site17.dtempurl.com/PlateDivision.json')
    .then((res) => {

        const PlateDivisions = res.data.PlateDivisions;

        setPlateDivision(PlateDivisions)
    })
}

export {GetDivisionTownshipAPI, GetFloorsAPI, GetPropertyCondition, GetPropertyFurnished, GetPropertyTypes, GetBuildType, GetCarColor, GetManufacturers, GetFuelTypes, GetLincenseStatus, GetPlateColors, GetPlateDivision};