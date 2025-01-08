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
import Countdown from "react-countdown";
import OTP from "./OTP"; // Import your OTP component here

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
  const [timerKey, setTimerKey] = useState(0);

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
        setTimerKey((prevKey) => prevKey + 1); // Increment timer key to reset countdown
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

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

  // Timer renderer for Countdown component
  const countdownRenderer = ({ minutes, seconds }) => {
    return (
      <Typography>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    );
  };

  const handleResendOtp = () => {
    setOtpSent(false); // Reset OTP sent status
    setOtp(""); // Clear the OTP field
    setTimerKey((prevKey) => prevKey + 1); // Reset the timer
    handleSendOtp(); // Send the OTP again
  };

  return (
    <div className="sign-up" style={{ height: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            maxWidth: 500,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 3,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
                sx={{
                  marginTop: "10px",
                }}
                InputProps={{
                  sx: {
                    height: "40px", // Ensure consistent height
                    padding: "0 14px", // Padding for the input text
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px", // Adjust font size for label
                    transform: "translate(14px, 12px) scale(1)", // Default position
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -5px) scale(0.75)", // Adjusted for focused/shrink state
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name *"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  marginTop: "10px",
                }}
                InputProps={{
                  sx: {
                    height: "40px", // Ensure consistent height
                    padding: "0 14px", // Padding for the input text
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px", // Adjust font size for label
                    transform: "translate(14px, 12px) scale(1)", // Default position
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -5px) scale(0.75)", // Adjusted for focused/shrink state
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Email Address Field */}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Email Address *"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  marginTop: "10px",
                }}
                InputProps={{
                  sx: {
                    height: "40px", // Ensure consistent height
                    padding: "0 14px", // Padding for the input text
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px", // Adjust font size for label
                    transform: "translate(14px, 12px) scale(1)", // Default position
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -5px) scale(0.75)", // Adjusted for focused/shrink state
                    },
                  },
                }}
              />
            </Grid>

            {/* Send OTP Button */}
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSendOtp}
                sx={{
                  height: "40px", // Adjust button height
                  marginTop: "10px", // Align with the email field
                  backgroundColor: "#52459f",
                  "&:hover": { backgroundColor: "#41378e" },
                }}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </Grid>
          </Grid>

          {/* Timer and Resend OTP Below Email */}
          {otpSent && (
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Countdown
                  key={timerKey}
                  date={Date.now() + 120000} // 2 minutes timer (120,000 ms)
                  renderer={countdownRenderer}
                />
              </Grid>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="text"
                  onClick={handleResendOtp}
                  sx={{
                    textTransform: "none",
                    color: "#52459f",
                    "&:hover": { backgroundColor: "#f2f2f2" },
                  }}
                >
                  Resend OTP
                </Button>
              </Grid>
            </Grid>
          )}

          {/* OTP Input */}
          {otpSent && (
            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              <OTP
                separator={<span>-</span>}
                value={otp}
                onChange={setOtp}
                length={5}
              />
            </Box>
          )}

          {/* OTP Validation Button */}
          {otpSent && (
            <Button
              variant="contained"
              disabled={isLoading}
              sx={{
                width: "100%",
                height: "40px", // Adjust height of button
                marginTop: "10px",
                padding: "6px",
                marginTop: 2,
                backgroundColor: "#52459f",
                "&:hover": { backgroundColor: "#41378e" },
              }}
              onClick={handleValidateOtp}
            >
              {isLoading ? "Validating..." : "Validate OTP"}
            </Button>
          )}

          {/* Password & Confirm Password */}
          <FormControl fullWidth margin="normal">
            <InputLabel
              htmlFor="password"
              sx={{
                fontSize: "14px", // Adjust label font size
                transform: "translate(14px, 12px) scale(1)", // Default position
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -5px) scale(0.75)", // Shrink state
                },
              }}
            >
              Password *
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                height: "40px", // Adjust height
                padding: "0 14px", // Padding for input text
              }}
              label="Password"
            />
            {password && isPasswordTouched && (
              <FormHelperText>{passwordStrengthText}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel
              htmlFor="confirmPassword"
              sx={{
                fontSize: "14px", // Adjust label font size
                transform: "translate(14px, 12px) scale(1)", // Default position
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -5px) scale(0.75)", // Shrink state
                },
              }}
            >
              Confirm Password *
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                height: "40px", // Adjust height of the input field
                padding: "0 14px", // Padding for input text
              }}
              label="Confirm Password"
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={submit}
            sx={{
              width: "100%",
              height: "40px", // Adjust height of button
              marginTop: "10px",
              backgroundColor: "#52459f",
              "&:hover": { backgroundColor: "#41378e" },
            }}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>

          {/* Sign In Link */}
          <SignInLink />
        </Box>
      </Grid>
    </div>
  );
}
