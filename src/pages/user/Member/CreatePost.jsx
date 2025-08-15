import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import theme from '../../../theme'
import CarForm from './Form/CarForm';
import ProperlyForm from './Form/ProperlyForm';

function CreatePost() {
  
  const types = [
    {
      label : "Properly",
      value : "properly"
    },
    {
      label : "Car",
      value : "car"
    }
  ];
  const [current,setCurrent] = useState(types[0].value);
  return (
    <Box>
       <Box sx={{
        display :"flex",
         gap :2
       }}>

        {
          types.map((ty,index)=>{
            return  <Box onClick={()=>setCurrent(ty.value)} sx={{
    
             border : current===ty.value ? "1px solid #6F1D8E" : "1px solid gray",
             background : current===ty.value ? "#6F1D8E" : "white",
             color : current===ty.value ? "white" : "black",
             transition : "all .3s ease",
              p : "8px 14px",
              width : "80px",
              cursor :"pointer",
              textAlign :'center',
              borderRadius : "20px",
              fontWeight : 600,
            
             }}>
                  <Typography>
                     {ty.label}
                  </Typography>
              </Box>
          })
        }
      
        
       </Box>


       {
        current=='properly' ? (
          <Box sx={{mt:2}}>
     <ProperlyForm />
          </Box>
        ) :(
          <Box sx={{mt:2}}>
           <CarForm />
          </Box>
        )
       }
    </Box>
  )
}

export default CreatePost