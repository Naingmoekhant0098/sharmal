import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          padding: 2,
          minWidth: 220,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
            {title}
          </Typography>
          {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
        </Box>

        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {typeof value === 'number' ? (
            <CountUp end={value} duration={1.2} />
          ) : (
            value
          )}
        </Typography>

        {description && (
          <Typography variant="caption" mt={1} color="text.secondary">
            {description}
          </Typography>
        )}
      </Card>
    </motion.div>
  );
};

export default DashboardCard;
