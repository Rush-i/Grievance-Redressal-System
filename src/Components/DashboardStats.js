// DashboardStats.js
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for card
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const DashboardStats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                Total Complaints
              </Typography>
              <Typography variant="h5">
                120
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                Resolved Complaints
              </Typography>
              <Typography variant="h5">
                85
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" component="div">
                Pending Complaints
              </Typography>
              <Typography variant="h5">
                35
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStats;
