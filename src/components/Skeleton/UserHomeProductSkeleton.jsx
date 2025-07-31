import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const UserHomeProductSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: 0, width: { xl: '80%' } }}>
      <Typography
        variant='p'
        className='UserPageTitleStyle'
        sx={{
          paddingLeft: { xs: '20px', md: '95px' }, // Adjust padding for mobile
          marginBottom: '20px',
          marginTop: '20px',
          textAlign: { xs: 'center', md: 'left' }, // Center title on mobile
        }}
      >
        <Skeleton variant="text" width={200} height={20} />
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: '20px', md: '5%' }, // Reduce gap on mobile
          paddingLeft: { xs: '20px', md: '49px' },
          justifyContent: { xs: 'flex-start', md: 'flex-start' }, // Left-align on mobile
          overflowX: 'auto', // Allow horizontal scrolling
          scrollSnapType: 'x mandatory', // Enable snap scrolling
        }}
      >
        {/* Skeleton cards (you can create multiple cards based on how many loading items you want to display) */}
        {[1, 2, 3, 4].map((_, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#FFFFFF',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              padding: '10px 0',
              marginBottom: '20px',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              boxShadow: '14px 15px 19px -14px rgba(194,187,192,1)',
            }}
          >
            {/* Image Skeleton */}
            <Skeleton variant="rectangular" width={260} height={260} sx={{ marginBottom: '10px' }} />

            {/* Content Skeleton */}
            <Box sx={{ padding: '10px', width: '80%' }}>
              <Skeleton variant="text" width={180} height={20} sx={{ marginBottom: '10px' }} />

              {/* Location Skeleton */}
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <Skeleton variant="circular" width={15} height={15} />
                <Skeleton variant="text" width={120} height={10} />
              </Box>

              {/* Features Skeleton */}
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Skeleton variant="rectangular" width={60} height={20} />
                <Skeleton variant="rectangular" width={60} height={20} />
                <Skeleton variant="rectangular" width={60} height={20} />
              </Box>

              {/* Additional Details Skeleton */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: 'start',
                  alignItems: "center",
                  gap: '10px',
                  borderBottom: '1px solid #C2C2C2',
                  paddingBottom: '7px',
                  marginTop: '10px',
                }}
              >
                <Skeleton variant="rectangular" width={18} height={18} />
                <Skeleton variant="text" width={40} height={13} />
                <Skeleton variant="rectangular" width={18} height={18} />
                <Skeleton variant="text" width={40} height={13} />
              </Box>

              {/* Price Skeleton */}
              <Box sx={{ display: 'flex', justifyContent: 'left', gap: "5px", marginY: '10px' }}>
                <Skeleton variant="text" width={80} height={30} />
                <Skeleton variant="text" width={30} height={20} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserHomeProductSkeleton;
