import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdsPlacementForm from './create/AdsPlacementForm';
import AdsLayoutForm from './create/AdsLayoutForm';
import AdsDescriptionForm from './create/AdsDescriptionForm';
import AdsUploadPhotoForm from './create/AdsUploadPhotoForm';
import { CreateAdsAPI, GetAdsPageAPI, UpdateAdsApi } from '../../../api/ads/AdsController';
import StepperComponent from '../../Stepper/StepperComponent';
import { _DecryptService } from '../../../service/EncryptDecryptService';
import { useEffect } from 'react';
import _JWTDecodeService from '../../../service/JWTDecodeService';

const steps = ['Ads Placement', 'Choose Ads Layout', 'Upload Photos', 'Detailed Description', ''];

function AdsDialog({ open, onClose, onRefresh, dialogStatus, adsDataForEdit }) {

  let oldData = {};
  if (dialogStatus == 'edit') {
    oldData = adsDataForEdit;
  }



  const [Title, setTitle] = useState('');
  const [TargetUrl, setTargetUrl] = useState('');
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [CreatedBy, setCreatedBy] = useState('');
  const [Files, setFiles] = useState([]);
  const [AdsLayout, setAdsLayout] = useState('');
  const [AdsPagePlacements, setAdsPagePlacements] = useState([]);
  const [AdsplacementIndex, setAdsplacementIndex] = useState([]);
  const [AdsplacementId, setAdsplacementId] = useState([])
  // Step 1: Decrypt the token from session storage
  const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

  // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
  const decodedToken = _JWTDecodeService(decryptedToken);
  const userId = _DecryptService(decodedToken?.UserId);

  const [activeStep, setActiveStep] = useState(1);
  useEffect(() => {
    if (open) {
      // Step 1: Decrypt the token from session storage
      const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

      // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userId = _DecryptService(decodedToken?.UserId);

      setCreatedBy(userId)
      GetAdsPageAPI(setAdsPagePlacements); // Fetch data when the dialog is opened
    }
    setActiveStep(1)
  }, [open]);

   // Start with the first step

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleFileChange = (file) => {
    setFiles([file]); // Update files state with the selected file
  };

  const handleLayoutChange = (layout) => {
    setAdsLayout(layout); 
  };

  const handleCheckedChange = (checkedData) => {
    setAdsplacementIndex(checkedData.map(item => item.index));

    setAdsplacementId(checkedData.map(item => item.AdsPageId));

  };

  // For submit create new ads
  const handleSubmit = async ({ title, targetUrl, startDate, endDate }) => {

    if (dialogStatus === 'edit') {
      // Assuming you might need to include `AdsPagePlacements`, `Files`, etc., from `oldData`
      const adsData = {
        adsId: oldData.AdsId,
        Title: title,
        TargetUrl: targetUrl,
        StartDate: startDate,
        EndDate: endDate,
        UpdatedBy: CreatedBy,
        AdsPagePlacements: AdsPagePlacements,
        Files: Files,
        AdsLayout: AdsLayout,
        AdsplacementIndex: AdsplacementIndex
      };
      
      // Update ad with `adsData`
      try {
        await UpdateAdsApi(adsData); // Ensure you have an `UpdateAdsAPI` function
        
        onRefresh();
        setActiveStep(1);
        setFiles([])
        onClose();
      } catch (error) {

      }
    } else {
      // For creating a new ad
      const adsData = {
        Title: title,
        TargetUrl: targetUrl,
        StartDate: startDate,
        EndDate: endDate,
        CreatedBy: CreatedBy,
        AdsPagePlacements: AdsPagePlacements,
        Files: Files,
        AdsLayout: AdsLayout,
        AdsplacementIndex: AdsplacementIndex
      };  
      try {
        await CreateAdsAPI(adsData);
        onRefresh();
        setActiveStep(1);
        setFiles([])
        onClose();
        
      } catch (error) {

      }
    }
  };

  const renderStepContent = () => {
    switch (activeStep - 1) {
      case 0:
        return (
          <AdsPlacementForm
            handleNext={handleNext}
            handleBack={onClose}
            adsPagePlacements={AdsPagePlacements}
            onCheckedChange={handleCheckedChange}
            status={dialogStatus}
            oldData={oldData}
          />
        );
      case 1:
        return (
          <AdsLayoutForm
            handleNext={handleNext}
            handleBack={handleBack}
            onLayoutChange={handleLayoutChange}
            status={dialogStatus}
            oldData={oldData}
          />);
      case 2:
        return (
          <AdsUploadPhotoForm
            handleNext={handleNext}
            handleBack={handleBack}
            onFileChange={handleFileChange}
            files={Files}
            status={dialogStatus}
            oldData={oldData}
            initialCheckedPlacements={AdsplacementId}
          />
        );
      case 3:
        return (
          <AdsDescriptionForm
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            Title={Title}
            TargetUrl={TargetUrl}
            StartDate={StartDate}
            EndDate={EndDate}
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
        <Button onClick={onClose}><CloseIcon /></Button>
      </DialogActions>
      <DialogContent sx={{ paddingTop: 0, paddingBottom: 5 }}>
        <StepperComponent activeStep={activeStep} steps={steps} />
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}

export default AdsDialog;
