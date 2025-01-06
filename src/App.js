import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Dashboard from './Components/Dashboard';
import TemplateTable from './Components/TemplateTable';
import Template from './Components/Template';
import Status from './Components/Status';
import Publish from './Components/Publish';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ImageUploading from './Components/ImageUploading';

const DragDropArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #1976d2',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  color: '#1976d2',
  cursor: 'pointer',
  marginBottom: '20px',
}));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignInSuccess = () => {
    console.log("Login successful. Updating state...");
    setIsLoggedIn(true); // Change state to show the main app content
  };

  const handleSignupSuccess = () => {
    console.log("Sign up successful. Redirecting to sign-in...");
    setIsLoggedIn(false); // After signup, redirect user to login
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignIn onSignInSuccess={handleSignInSuccess} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={<SignUp onSignupSuccess={handleSignupSuccess} />}
        />

        {/* Protected Routes */}
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/template-table" element={<TemplateTable />} />
            <Route path="/template" element={<Template />} />
            <Route path="/status" element={<Status />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/image-uploading" element={<ImageUploading />} />
          </>
        )}

        {/* Catch-all for undefined routes */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;