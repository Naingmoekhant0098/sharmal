import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StepperComponent from '../../../Stepper/StepperComponent';
import PropertyInformationForm from './create/PropertyInformationForm';
import PropertyDetailedDescriptionForm from './create/PropertyDetailedDescriptionForm';
import PropertyUploadPhotoForm from './create/PropertyUploadPhotoForm';
import PropertySellerInformationForm from './create/PropertySellerInformationForm';
import { CreatePropertyAPI, GetPropertyFeaturesAPI, UpdatePropertyAPI } from '../../../../api/Listings/property/propertyController';
import { _DecryptService } from '../../../../service/EncryptDecryptService';
import _JWTDecodeService from '../../../../service/JWTDecodeService';

const steps = ['Property Information', 'Detailed Description', 'Upload Photos and Floor Plan', 'Seller Information', ''];

function PropertyDialog({ open, onClose, onRefresh, dialogStatus, DataForEdit }) {
  let oldData = {};
  if (dialogStatus == 'edit') {
    oldData = DataForEdit;
  }

  const [propertyInformationData, setpropertyInformationData] = useState({
    Code: '',
    Location: '',
    City: '',
    Status: '',
    Price: '',
    NumberOfViewer: '',
    Bedrooms: '',
    Bathrooms: '',
    Area: '',
    PaymentOption: '',
    IsHotDeal: '',
    Type: '',
    Conditions: '',
    Floor: ''
  });
  const [detailedDescriptionData, setDetailedDescriptionData] = useState({
    title: '',
    description: '',
    mapUrl: '',
    furnished: '',
    features: '',
  });
  const [sellerInformationData, setSellerInformation] = useState({
    name: 'Sharmal',
    primaryPhone: '09752733981',
    backupPhone: '',
    email: '',
    address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.',
  });
  const [PropertyFeatures, setPropertyFeatures] = useState([]);
  const [PropertyFeaturesIndex, setPropertyFeaturesIndex] = useState([]);
  const [PropertyFeaturesId, setPropertyFeaturesId] = useState([]);
  const [Files, setFiles] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [CreatedBy, setCreatedBy] = useState('');
  const [UpdatedBy, setUpdatedBy] = useState('')
  const [RemovedImages, setRemovedImages] = useState([]);

  const handleRemoveImage = (filename) => {
    setRemovedImages(prev => [...prev, filename]);
  };

  const handleCheckedChange = (checkedData) => {
    const selectedIndices = checkedData.map(item => item.index);
    const selectedFeatureIds = checkedData.map(item => item.FeatureId);

    setPropertyFeaturesIndex(selectedIndices);
    setPropertyFeaturesId(selectedFeatureIds);
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
      GetPropertyFeaturesAPI(setPropertyFeatures)
    }
  }, [open]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleClose = () => {
    setActiveStep(1)
    setpropertyInformationData({
      Code: '',
      Location: '',
      City: '',
      Status: '',
      Price: '',
      NumberOfViewer: '',
      Bedrooms: '',
      Bathrooms: '',
      IsHotDeal: '',
      Area: '',
      PaymentOption: '',
      Type: '',
      Conditions: '',
    })
    setDetailedDescriptionData({
      title: '',
      description: '',
      mapUrl: '',
      furnished: '',
      features: '',
    })
    setSellerInformation({
      name: 'Sharmal',
      primaryPhone: '09752733981',
      backupPhone: '',
      email: '',
      address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.',
    })
    onClose()
  }

  const handleFileChange = (selectedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {

    const propertyData = {
      Code: propertyInformationData.Code,
      PropertyId: oldData.PropertyId,
      Title: detailedDescriptionData.title,
      Status: propertyInformationData.Status,
      Type: propertyInformationData.Type,
      Price: propertyInformationData.Price,
      PaymentOption: propertyInformationData.PaymentOption,
      Location: propertyInformationData.Location,
      City: propertyInformationData.City,
      NumberOfViewers: propertyInformationData.NumberOfViewer,
      Bedrooms: propertyInformationData.Bedrooms,
      Bathrooms: propertyInformationData.Bathrooms,
      Area: propertyInformationData.Area,
      Condition: propertyInformationData.Condition,
      Description: detailedDescriptionData.description,
      Furnished: detailedDescriptionData.furnished,
      SellerName: sellerInformationData.name,
      PrimaryPhoneNumber: sellerInformationData.primaryPhone,
      SecondaryPhoneNumber: sellerInformationData.backupPhone,
      Email: sellerInformationData.email,
      Address: sellerInformationData.address,
      Condition: propertyInformationData.Conditions,
      CreatedBy: CreatedBy,
      UpdatedBy: UpdatedBy,
      IsHotDeal: propertyInformationData.IsHotDeal,
      PropertyFeaturesIndex: PropertyFeaturesIndex,
      Files: Files,
      PropertyFeatures: PropertyFeatures,
      MapUrl: detailedDescriptionData.mapUrl,
      Floor: propertyInformationData.Floor,
      RemovedImages: RemovedImages 
    };
    
    console.log("Property Data:", propertyData); // Log the property data to be submitted
    console.log("Removed Images:", RemovedImages); // Log the removed images
    console.log("Files:", Files); // Log the files to be submitted

    try {
      dialogStatus === 'edit' ?
        await UpdatePropertyAPI(propertyData) :
        await CreatePropertyAPI(propertyData);
      onRefresh();
      setActiveStep(1)
      // Reset all state variables to their initial values after submission
      setpropertyInformationData({
        Code: '',
        Location: '',
        City: '',
        Status: '',
        Price: '',
        NumberOfViewer: '',
        Bedrooms: '',
        Bathrooms: '',
        IsHotDeal: '',
        Area: '',
        PaymentOption: '',
        Type: '',
        Conditions: '',
        Floor: ''
      });

      setDetailedDescriptionData({
        title: '',
        description: '',
        mapUrl: '',
        furnished: '',
        features: ''
      });

      setSellerInformation({
        name: 'Sharmal',
        primaryPhone: '09752733981',
        backupPhone: '',
        email: '',
        address: 'No.1217/4th Floor, Pinlon Road, 35 Ward, North Dagon, Yangon.'
      });

      setPropertyFeatures([]);
      setPropertyFeaturesIndex([]);
      setPropertyFeaturesId([]);
      setFiles([]);
      setCreatedBy('');
      setUpdatedBy('');
      onClose();

    } catch (error) {
      onRefresh();

      
    }
  }


  const renderStepContent = () => {
    switch (activeStep - 1) {
      case 0:
        return (
          <PropertyInformationForm
            setpropertyInformationData={setpropertyInformationData}
            handleNext={handleNext}
            handleBack={handleClose}
            propertyInformationData={propertyInformationData}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 1:
        return (
          <PropertyDetailedDescriptionForm
            handleNext={handleNext}
            handleBack={handleBack}
            setDetailedDescriptionData={setDetailedDescriptionData}
            propertyFeatures={PropertyFeatures}
            onCheckedChange={handleCheckedChange}
            detailedDescriptionData={detailedDescriptionData}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 2:
        return (
          <PropertyUploadPhotoForm
            onRemoveImage={handleRemoveImage}
            handleNext={handleNext}
            handleBack={handleBack}
            onFileChange={handleFileChange}
            files={Files}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 3:
        return (
          <PropertySellerInformationForm
            handleBack={handleBack}
            setSellerInformation={setSellerInformation}
            sellerInformationData={sellerInformationData}
            handleSubmit={handleSubmit}
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

export default PropertyDialog;
