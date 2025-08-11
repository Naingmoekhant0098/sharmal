import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

const UserProductSkeletonLoader = ({count}) => {
   
  return (
    <Grid container
    columnSpacing={1}
    rowSpacing={5} 
    marginTop={{sm : -20 , md : -70 , lg : -70 , xl : -70}} 
    >
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              p: 2,
              height: '100%',
            }}
          >
           
            <Skeleton variant="rectangular" width="100%" height={150} />

          
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" width="40%" height={30} />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Skeleton variant="text" width={30} height={20} />
                <Skeleton variant="text" width={30} height={20} />
                <Skeleton variant="text" width={50} height={20} />
              </Box>
            </Box>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
              <Skeleton variant="rectangular" width={12} height={14} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>

            {/* Title + Desc */}
            <Skeleton variant="text" width="90%" height={20} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="60%" height={15} />

            {/* Created Date */}
            <Skeleton variant="text" width="70%" height={15} sx={{ mt: 3 }} />

            {/* Footer Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Skeleton variant="rectangular" width={60} height={30} />
              <Skeleton variant="rectangular" width={100} height={30} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserProductSkeletonLoader;
