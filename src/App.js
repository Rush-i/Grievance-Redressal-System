
// export default App;

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import Grievance from './Components/Grievance';
import AddAPO from './Components/AddAPO';
import ComplaintForm from './Components/ComplaintForm';
import APOLoginForm from './Components/APOLoginForm'; // Import APOLoginForm
import APODashboard from './Components/APODashboard';
import ErrorBoundary from './Components/ErrorBoundary';
import './styles.css';

// API instance for making requests
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Theme configuration
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apo-login" element={<APOLoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/add-apo" element={<AddAPO />} />
            <Route path="/complaint-form" element={<ComplaintForm />} />
            <Route path="/apo-dashboard" element={<APODashboard />} /> {/* Route for APO Dashboard */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
