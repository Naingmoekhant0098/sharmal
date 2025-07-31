import React from 'react';
import { Box, Stepper, Step, Typography, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import { stepConnectorClasses } from '@mui/material/StepConnector';

// Custom StepConnector styled component
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 50,
    left: 'calc(-105% + 16px)',
    right: 'calc(100% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.Stepper.border.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.Stepper.border.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3.5,
    borderRadius: 1,
  },
}));

function StepperComponent({ activeStep, steps, colors }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '80%', margin: '0 auto', paddingLeft: '15%' }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector stepIndex={activeStep} colors={colors} />}>
          {steps.map((label, index) => (
            <Step key={index}>
              <Typography variant='h5' sx={{ fontSize: '12px', display: 'inline-block', width: '51%' }}>
                {label}
              </Typography>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  )
}

export default StepperComponent
