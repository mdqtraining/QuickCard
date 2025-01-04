import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import TemplateTable from './Components/TemplateTable';
import Template from './Components/Template';
import Status from './Components/Status';
import Publish from './Components/Publish';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignInSuccess = () => {
    console.log("Login successful. Updating state...");
    setIsLoggedIn(true); // Change state to show the main app content
  };

  const handleSignupSuccess = () => {
    console.log("Sign up successfully. Proceeding to login...");
    // Redirect to the login page or show success message
  };

  console.log("isLoggedIn:", isLoggedIn); // Debug log for state

  return (
    <Router> {/* Ensure the entire app is wrapped with Router */}
      <Routes>
        {!isLoggedIn ? (
          <Route
            path="/"
            element={<SignIn onSignInSuccess={handleSignInSuccess} />} // Pass the onSignInSuccess to handle successful sign-in
          />
        ) : (
          <>
            <Route path="/sign-up" element={<SignUp onSignupSuccess={handleSignupSuccess} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/template-table" element={<TemplateTable />} />
            <Route path="/template" element={<Template />} />
            <Route path="/status" element={<Status />} />
            <Route path="/publish" element={<Publish />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
