import React, { useState } from "react";
import axios from "axios";
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
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  send_otp,
  validate_otp,
  user_signup,
} from "../Api service/APIvariables";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Added to reset countdown

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post(send_otp, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert(`OTP sent successfully to ${email}`);
        setOtpSent(true);
        setTimerKey((prevKey) => prevKey + 1); // Reset the timer on each OTP send
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Validate OTP
  const handleValidateOtp = async () => {
    if (!otp || !email) {
      alert("Please enter OTP and email.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      const response = await axios.post(validate_otp, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.success) {
        alert("OTP validated successfully!");
        setOtpValidated(true);
      } else {
        alert(response.data.message || "Invalid OTP or validation failed.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      alert("OTP validation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit function
  const submit = async () => {
    if (password === confirmPassword) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);

      try {
        const response = await axios.post(user_signup, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.error) {
          alert(response.data.message);
        } else {
          alert(response.data.message);

          // Store user data in localStorage
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("email", email);
          localStorage.setItem("Userauth", true);
          localStorage.setItem("userId", response.data.userId);

          // Clear form data after successful signup
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Signup failed. Please try again.");
      }
    } else {
      alert("Error: Passwords do not match.");
    }
  };

  // Show/Hide password function
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handle password input change and validate strength
  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    if (isPasswordTouched) {
      validatePasswordStrength(passwordValue);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Validate password strength
  const validatePasswordStrength = (password) => {
    const length = password.length;
    if (length < 6) {
      setPasswordStrengthText("Password is too weak");
    } else if (length < 8) {
      setPasswordStrengthText("Password is medium strength");
    } else {
      setPasswordStrengthText("Password is strong");
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordTouched(true);
    validatePasswordStrength(password);
  };

  // SignInLink component
  function SignInLink() {
    const navigate = useNavigate();
    return (
      <Button
        variant="text"
        sx={{ textTransform: "none", marginTop: 2 }}
        onClick={() => navigate("sign-in")}
      >
        Already have an account? Sign In
      </Button>
    );
  }

  // Countdown renderer function
  const countdownRenderer = ({ seconds }) => {
    return <Typography>{seconds} seconds remaining</Typography>;
  };

  return (
    <div className="sign-up" style={{ height: "100vh" }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              Sign Up & Get Started Today
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name *"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name *"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              label="Email Address *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                width: "150px",
                height: "auto",
                padding: "6px",
                marginBottom: "20px",
                marginTop: "10px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#52459f",
                marginLeft: "130px",
                boxShadow: "0 4px 8px rgba(82, 69, 159, 255)",
                color: "white",
                "&:hover": { backgroundColor: "#41378e" },
              }}
              onClick={handleSendOtp}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
            {otpSent && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Enter OTP *"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      width: "150px",
                      height: "auto",
                      padding: "6px",
                      marginTop: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#52459f",
                      marginLeft: "130px",
                      boxShadow: "0 4px 8px rgba(82, 69, 159, 255)",
                      color: "white",
                      "&:hover": { backgroundColor: "#41378e" },
                    }}
                    onClick={handleValidateOtp}
                  >
                    {isLoading ? "Validating..." : "Validate OTP"}
                  </Button>
                  {/* Countdown timer here */}
                  <Countdown
                    key={timerKey} // This will reset the timer on each OTP request
                    date={Date.now() + 60000} // Countdown from 60 seconds
                    renderer={countdownRenderer}
                  />
                </Grid>
              </Grid>
            )}
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Password *</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password *"
              />
              {isPasswordTouched && (
                <FormHelperText>{passwordStrengthText}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Confirm Password *</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password *"
              />
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              onClick={submit}
              sx={{
                marginTop: 2,
                padding: "6px",
                backgroundColor: "#52459f",
                "&:hover": { backgroundColor: "#41378e" },
              }}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* SignIn Link component */}
            <SignInLink />
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
