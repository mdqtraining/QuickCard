import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Dummy function to simulate sending OTP
const sendOTP = (email) => {
  console.log(`Sending OTP to ${email}`);
  return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
};

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email) {
      const otp = sendOTP(email);
      setGeneratedOtp(otp);
      setIsOtpSent(true);
      alert(`OTP sent to ${email}`);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleSignUp = () => {
    if (otp === generatedOtp?.toString() && password) {
      alert("Signup Successful! Redirecting to SignIn...");
      // Redirect to SignIn screen or perform further actions
    } else {
      alert("Invalid OTP or Password!");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
        Create an Account
      </Typography>

      {/* Full Name */}
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* Email */}
      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* OTP */}
      {isOtpSent && (
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}

      {/* Send OTP Button */}
      {!isOtpSent ? (
        <Button
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          onClick={handleSendOtp}
        >
          Send OTP
        </Button>
      ) : (
        <Button
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          onClick={handleSendOtp}
          disabled
        >
          OTP Sent
        </Button>
      )}

      {/* Password */}
      <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      {/* SignUp Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          my: 2,
          backgroundColor: "#52459f",
          color: "white",
          "&:hover": { backgroundColor: "#41378e" },
        }}
        onClick={handleSignUp}
        disabled={!otp || !password || otp !== generatedOtp?.toString()}
      >
        Sign Up
      </Button>

      {/* Redirect to SignIn */}
      <Typography
        variant="body2"
        sx={{ textAlign: "center", marginTop: 2 }}
        color="text.secondary"
      >
        Already have an account?{" "}
        <Button
          variant="text"
          onClick={() => alert("Redirect to Sign In screen")}
          sx={{ textTransform: "none" }}
        >
          Sign In
        </Button>
      </Typography>
    </Box>
  );
}
