import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StepperComponent from '../../../Stepper/StepperComponent';
import CarInformationForm from './create/CarInformationForm';
import CarDetailedDescription from './create/CarDetailedDescription';
import CarUploadPhotoForm from './create/CarUploadPhotoForm';
import CarSellerInformationForm from './create/CarSellerInformatonForm';
import { _DecryptService } from '../../../../service/EncryptDecryptService';
import _JWTDecodeService from '../../../../service/JWTDecodeService';
import { useEffect } from 'react';
import { CreateCarAPI, UpdateCarAPI } from '../../../../api/Listings/car/carController';


const steps = ['Car Information', 'Detailed Description', 'Upload Photos', 'Seller Information', ''];

function CarDialog({ open, onClose, onRefresh, dialogStatus, DataForEdit }) {
  let oldData = {};
  if (dialogStatus == 'edit') {
    oldData = DataForEdit;
  }

  console.log('DataForEdit', DataForEdit);

  const [Files, setFiles] = useState([]);
  const [isSold, setisSold] = useState('false')
  const [IsPopular, setIsPopular] = useState('true')
  const [IsHotDeal, setIsHotDeal] = useState('true')
  const [carData, setCarData] = useState({
    Code: '',
    Location: '',
    City: '',
    Condition: '',
    Price: '',
    Manufacturer: '',
    Model: '',
    Year: '',
    BuildType: '',
    TrimName: '',
    CarColor: '',
    NumberOfViewer: '',
    PaymentOption: ''
  });

  const [descriptionData, setDescriptionData] = useState({
    Division: '',
    PlateColor: '',
    PlateNo: '',
    FuelType: '',
    LicenseStatus: '',
    Gearbox: '',
    SteeringPosition: '',
    EnginePower: '',
    Mileage: '',
    Title: '',
    Description: ''
  });

  const [carSellerData, setCarSellerData] = useState({
    sellerName: 'Sharmal',
    primaryPhoneNumber: '09752733981',
    backupPhoneNumber: '',
    emailAddress: '',
    address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.'
  });

  const [CreatedBy, setCreatedBy] = useState('');
  const [UpdatedBy, setUpdatedBy] = useState('')

  const [activeStep, setActiveStep] = useState(1); // Start with the first step
  const [IsLoading, setIsLoading] = useState(false)
  const [RemovedImages, setRemovedImages] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleFileChange = (selectedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };


  useEffect(() => {
    if (open) {
      // Step 1: Decrypt the token from session storage
      const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

      // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userId = _DecryptService(decodedToken?.UserId);

      if (dialogStatus == 'edit') {
        setCreatedBy(oldData.CreatedBy)
      } else {
          setCreatedBy(userId)
      }
      setUpdatedBy(userId)
    }
  }, [open]);

  const handleSubmit = async () => {

    const createCarInfor = {
      Code: carData.Code,
      CarId: oldData.CarId,
      Title: descriptionData.Title,
      Description: descriptionData.Description,
      Gearbox: descriptionData.Gearbox,
      SteeringPosition: descriptionData.SteeringPosition,
      EnginePower: descriptionData.EnginePower,
      FuelType: descriptionData.FuelType,
      Mileage: descriptionData.Mileage,
      Manufacturer: carData.Manufacturer,
      BuildType: carData.BuildType,
      Model: carData.Model,
      Year: carData.Year,
      PlateDivision: descriptionData.Division,
      PlateNo: descriptionData.PlateNo,
      PlateColor: descriptionData.PlateColor,
      CarColor: carData.CarColor,
      Condition: carData.Condition,
      Price: carData.Price,
      SpecialStatus: isSold, // Assuming this is a status you're tracking
      NumberOfViewers: carData.NumberOfViewer,
      Availability: isSold === 'true' ? 'Sold' : 'Available', // Example of conditional status
      IsSold: isSold,
      Location: carData.Location,
      City: carData.City,
      PaymentOption: carData.PaymentOption,
      TrimName: carData.TrimName,
      SellerName: carSellerData.sellerName,
      PrimaryPhoneNumber: carSellerData.primaryPhoneNumber,
      SecondaryPhoneNumber: carSellerData.backupPhoneNumber,
      Email: carSellerData.emailAddress,
      Address: carSellerData.address,
      CreatedBy: CreatedBy,
      IsPopular: IsPopular,
      IsHotDeal: IsHotDeal,
      Files: Files,
      UpdatedBy: UpdatedBy,
      LincenseStatus: descriptionData.LicenseStatus,
      RemovedImages: RemovedImages 
    };
    try {
      dialogStatus === 'edit' ?
        await UpdateCarAPI(createCarInfor) :
        await CreateCarAPI(createCarInfor);
      // Reset all state variables to their initial values after submission
      setFiles([]);
      setisSold('false');
      setIsPopular('true');
      setIsHotDeal('true');
      setCarData({
        Code: '',
        Location: '',
        City: '',
        Condition: '',
        Price: '',
        Manufacturer: '',
        Model: '',
        Year: '',
        BuildType: '',
        TrimName: '',
        CarColor: '',
        NumberOfViewer: '',
        PaymentOption: ''
      });
      setDescriptionData({
        Division: '',
        PlateColor: '',
        PlateNo: '',
        FuelType: '',
        LicenseStatus: '',
        Gearbox: '',
        SteeringPosition: '',
        EnginePower: '',
        Mileage: '',
        Title: '',
        Description: ''
      });
      setCarSellerData({
        sellerName: 'Sharmal',
        primaryPhoneNumber: '09752733981',
        backupPhoneNumber: '',
        emailAddress: '',
        address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.'
      });
      setActiveStep(1)
      onRefresh();
      onClose();
    } catch (error) {
      onRefresh();

    }
  };

  const handleClose = () => {
    setActiveStep(1)
    setCarData({
      Code: '',
      Location: '',
      City: '',
      Condition: '',
      Price: '',
      Manufacturer: '',
      Model: '',
      Year: '',
      BuildType: '',
      TrimName: '',
      CarColor: '',
      NumberOfViewer: '',
      PaymentOption: ''
    })
    setDescriptionData({
      Division: '',
      PlateColor: '',
      PlateNo: '',
      FuelType: '',
      LicenseStatus: '',
      Gearbox: '',
      SteeringPosition: '',
      EnginePower: '',
      Mileage: '',
      Title: '',
      Description: ''
    })
    setCarSellerData({
      sellerName: 'Sharmal',
      primaryPhoneNumber: '09752733981',
      backupPhoneNumber: '',
      emailAddress: '',
      address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.'
    })
    onClose()
  }



  const renderStepContent = () => {
    switch (activeStep - 1) {
      case 0:
        return (
          <CarInformationForm
            handleNext={handleNext}
            handleBack={handleClose}
            setCarData={setCarData}
            carData={carData}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 1:
        return (
          <CarDetailedDescription
            handleNext={handleNext}
            handleBack={handleBack}
            descriptionData={descriptionData}
            setDescriptionData={setDescriptionData}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 2:
        return (
          <CarUploadPhotoForm
            handleNext={handleNext}
            handleBack={handleBack}
            onFileChange={handleFileChange}
            files={Files}
            status={dialogStatus}
            oldData={oldData}
            onRemoveImage={(filename) => setRemovedImages(prev => [...prev, filename])}
          />
        );
      case 3:
        return (
          <CarSellerInformationForm
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            carSellerData={carSellerData}
            setSellerInformation={setCarSellerData}
            status={dialogStatus}
            oldData={oldData}
      
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={null} fullWidth maxWidth="lg">
      <DialogActions>
        <Button onClick={handleClose}><CloseIcon /></Button>
      </DialogActions>
      <DialogContent sx={{ paddingTop: 0, paddingBottom: 5 }}>
        <StepperComponent activeStep={activeStep} steps={steps} />
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}

export default CarDialog;
