
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
  },
}));

const DetailBox = styled(Box)(({ theme }) => ({
  mt: theme.spacing(2),
  textAlign: 'center',
}));

const Grievance = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('ongoing');
  const [expandedComplaints, setExpandedComplaints] = useState({});

  // Fetch complaints from server
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/complaints');
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching complaints.');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const markAsComplete = async (complaint) => {
    try {
      await axios.put(`http://localhost:3000/api/complaints/${complaint._id}/status`, { status: 'Completed' });
      setComplaints(prevComplaints =>
        prevComplaints.map(c => (c._id === complaint._id ? { ...c, status: 'Completed' } : c))
      );
      setExpandedComplaints(prev => ({ ...prev, [complaint._id]: false })); // Collapse after marking complete
    } catch (error) {
      console.error('Failed to mark as complete:', error);
      setError('Failed to mark as complete.');
    }
  };

  const handleExpandToggle = (id) => {
    setExpandedComplaints(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  const ongoingComplaints = complaints.filter(complaint => complaint.status === 'Ongoing');
  const completedComplaints = complaints.filter(complaint => complaint.status === 'Completed');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grievance
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color={view === 'ongoing' ? 'primary' : 'inherit'}
          onClick={() => setView('ongoing')}
          sx={{ marginRight: 2 }}
        >
          Ongoing Complaints
        </Button>
        <Button
          variant="contained"
          color={view === 'completed' ? 'primary' : 'inherit'}
          onClick={() => setView('completed')}
        >
          Completed Complaints
        </Button>
      </Box>
      {view === 'ongoing' && (
        <Box>
          <Typography variant="h5">Ongoing Complaints</Typography>
          {ongoingComplaints.length === 0 ? (
            <Typography>No ongoing complaints.</Typography>
          ) : (
            ongoingComplaints.map((complaint) => (
              <StyledPaper key={complaint._id} sx={{ mb: 2 }}>
                <Typography><strong>ID:</strong> {complaint._id}</Typography>
                <Typography><strong>Description:</strong> {complaint.description}</Typography>
                <Typography><strong>Status:</strong> {complaint.status}</Typography>
                <Typography><strong>Hostel:</strong> {complaint.hostel || 'Not specified'}</Typography>
                <Typography><strong>Type of Grievance:</strong> {complaint.grievanceType || 'Not specified'}</Typography>
                {expandedComplaints[complaint._id] && (
                  <DetailBox>
                    <Typography><strong>Name:</strong> {complaint.name || 'Not specified'}</Typography>
                    <Typography><strong>Mobile Number:</strong> {complaint.mobileNumber || 'Not specified'}</Typography>
                    <Typography><strong>Details:</strong> {complaint.details || 'No additional details available'}</Typography>
                    <Typography><strong>Class:</strong> {complaint.class || 'Not specified'}</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => markAsComplete(complaint)}
                      sx={{ mt: 2 }}
                    >
                      Mark as Complete
                    </Button>
                  </DetailBox>
                )}
                <Button
                  variant="outlined"
                  color={expandedComplaints[complaint._id] ? 'secondary' : 'primary'}
                  onClick={() => handleExpandToggle(complaint._id)}
                  sx={{ mt: 2 }}
                >
                  {expandedComplaints[complaint._id] ? 'Show Less' : 'Show More'}
                </Button>
              </StyledPaper>
            ))
          )}
        </Box>
      )}
      {view === 'completed' && (
        <Box>
          <Typography variant="h5">Completed Complaints</Typography>
          {completedComplaints.length === 0 ? (
            <Typography>No completed complaints.</Typography>
          ) : (
            completedComplaints.map((complaint) => (
              <StyledPaper key={complaint._id} sx={{ mb: 2 }}>
                <Typography><strong>ID:</strong> {complaint._id}</Typography>
                <Typography><strong>Description:</strong> {complaint.description}</Typography>
                <Typography><strong>Status:</strong> {complaint.status}</Typography>
                <Typography><strong>Hostel:</strong> {complaint.hostel || 'Not specified'}</Typography>
                <Typography><strong>Type of Grievance:</strong> {complaint.grievanceType || 'Not specified'}</Typography>
                {expandedComplaints[complaint._id] && (
                  <DetailBox>
                    <Typography><strong>Name:</strong> {complaint.name || 'Not specified'}</Typography>
                    <Typography><strong>Mobile Number:</strong> {complaint.mobileNumber || 'Not specified'}</Typography>
                    <Typography><strong>Details:</strong> {complaint.details || 'No additional details available'}</Typography>
                    <Typography><strong>Class:</strong> {complaint.class || 'Not specified'}</Typography>
                  </DetailBox>
                )}
                <Button
                  variant="outlined"
                  color={expandedComplaints[complaint._id] ? 'secondary' : 'primary'}
                  onClick={() => handleExpandToggle(complaint._id)}
                  sx={{ mt: 2 }}
                >
                  {expandedComplaints[complaint._id] ? 'Show Less' : 'Show More'}
                </Button>
              </StyledPaper>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default Grievance;
