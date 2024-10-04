import React, { useState, useEffect } from 'react';
import {
    CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Box, Button,
    ThemeProvider, createTheme, CircularProgress, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, IconButton
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import GrievancesByDepartment from './GrievancesByDepartment';
import axios from 'axios';
import 'chart.js/auto';

const drawerWidth = 240;

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

function AOPDashboard() {
    const [selectedSection, setSelectedSection] = useState('dashboard');
    const [ongoingCount, setOngoingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});
    const [viewType, setViewType] = useState('monthly'); // 'daily' or 'monthly'
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('apoDepartment');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('apoDepartment');
        navigate('/');
    };

    useEffect(() => {
        if (selectedSection === 'dashboard') {
            fetchComplaintStatistics();
        }
    }, [selectedSection, viewType]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const fetchComplaintStatistics = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/complaints', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token for authentication
                }
            });

            const apoDepartment = localStorage.getItem('apoDepartment');

            const filteredComplaints = response.data.filter(
                complaint => complaint.grievanceType === apoDepartment
            );

            const ongoing = filteredComplaints.filter(complaint => complaint.status === 'Ongoing').length;
            const completed = filteredComplaints.filter(complaint => complaint.status === 'Completed').length;

            const labels = [];
            const ongoingData = [];
            const completedData = [];

            filteredComplaints.forEach(complaint => {
                const date = new Date(complaint.createdAt);
                if (isNaN(date.getTime())) {
                    console.error('Invalid date:', complaint.createdAt);
                    return;
                }

                let label;
                if (viewType === 'monthly') {
                    label = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                } else {
                    label = date.toLocaleDateString();
                }

                if (!labels.includes(label)) {
                    labels.push(label);
                }

                const index = labels.indexOf(label);

                if (complaint.status === 'Ongoing') {
                    ongoingData[index] = (ongoingData[index] || 0) + 1;
                } else if (complaint.status === 'Completed') {
                    completedData[index] = (completedData[index] || 0) + 1;
                }
            });

            const sortedLabels = labels.sort((a, b) => new Date(a) - new Date(b));
            const sortedOngoingData = sortedLabels.map(label => ongoingData[labels.indexOf(label)] || 0);
            const sortedCompletedData = sortedLabels.map(label => completedData[labels.indexOf(label)] || 0);

            setOngoingCount(ongoing);
            setCompletedCount(completed);

            setChartData({
                labels: sortedLabels,
                datasets: [
                    {
                        label: 'Ongoing Complaints',
                        data: sortedOngoingData,
                        fill: false,
                        borderColor: '#FF5722',
                    },
                    {
                        label: 'Completed Complaints',
                        data: sortedCompletedData,
                        fill: false,
                        borderColor: '#4CAF50',
                    },
                ],
            });

            setLoading(false);
        } catch (err) {
            setError('Error fetching complaint statistics.');
            setLoading(false);
        }
    };

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewType(newView);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem button onClick={() => setSelectedSection('dashboard')}>
                        <ListItemIcon sx={{ color: darkTheme.palette.text.primary }}><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedSection('grievance')}>
                        <ListItemIcon sx={{ color: darkTheme.palette.text.primary }}><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Grievance" />
                    </ListItem>
                </List>
            </Box>
        </div>
    );

    const renderContent = () => {
        switch (selectedSection) {
            case 'dashboard':
                return (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Dashboard
                        </Typography>
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography variant="h6" color="error">{error}</Typography>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{ bgcolor: '#FF5722', color: '#fff' }}>
                                            <CardContent>
                                                <Typography variant="h5">
                                                    Ongoing Complaints
                                                </Typography>
                                                <Typography variant="h3">
                                                    {ongoingCount}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{ bgcolor: '#4CAF50', color: '#fff' }}>
                                            <CardContent>
                                                <Typography variant="h5">
                                                    Completed Complaints
                                                </Typography>
                                                <Typography variant="h3">
                                                    {completedCount}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                                    <Grid item xs={12}>
                                        <ToggleButtonGroup
                                            value={viewType}
                                            exclusive
                                            onChange={handleViewChange}
                                            aria-label="view type"
                                        >
                                            <ToggleButton value="monthly">Monthly</ToggleButton>
                                            <ToggleButton value="daily">Daily</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ marginTop: '16px' }}>
                                    <Grid item xs={12}>
                                        <Card sx={{ height: '300px' }}>
                                            <CardContent sx={{ height: '100%' }}>
                                                <Typography variant="h6" gutterBottom>
                                                    Complaints Status Over Time
                                                </Typography>
                                                <Box sx={{ height: '100%' }}>
                                                    <Line
                                                        data={chartData}
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            scales: {
                                                                x: {
                                                                    title: {
                                                                        display: true,
                                                                        text: viewType === 'monthly' ? 'Month' : 'Date',
                                                                    },
                                                                },
                                                                y: {
                                                                    title: {
                                                                        display: true,
                                                                        text: 'Number of Complaints',
                                                                    },
                                                                    beginAtZero: true,
                                                                },
                                                            },
                                                            plugins: {
                                                                tooltip: {
                                                                    callbacks: {
                                                                        title: function (tooltipItems) {
                                                                            const index = tooltipItems[0].dataIndex;
                                                                            return chartData.labels[index];
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                            layout: {
                                                                padding: {
                                                                    left: 10,
                                                                    right: 10,
                                                                    top: 10,
                                                                    bottom: 10,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Box>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </>
                );
            case 'grievance':
                return <GrievancesByDepartment />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Grievance Redressal System
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={darkTheme}>
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                backgroundColor: darkTheme.palette.background.paper,
                                color: darkTheme.palette.text.primary,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                backgroundColor: darkTheme.palette.background.paper,
                                color: darkTheme.palette.text.primary,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </ThemeProvider>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#f5f5f5',
                    p: 3,
                    marginLeft: { md: `${drawerWidth}px` },
                    marginTop: '64px',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {renderContent()}
            </Box>
        </Box>
    );
}

export default AOPDashboard;
