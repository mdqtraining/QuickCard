import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import productsImage from "../assets/products.png";
import {
  send_otp,
  forgot_pwd_otp,
  forgot_password,
} from "../Api service/APIvariables";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  // Validate Password
  const validateInput = () => {
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setError(false);
      } else {
        setErrorMsg("Passwords do not match");
        setError(true);
      }
    } else {
      setErrorMsg("");
      setError(false);
    }
  };

  // Validate Email
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    const regex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}(?:\.[a-zA-Z]{2,})?$/;
    setIsValid(regex.test(emailValue));
    setEmail(emailValue);
  };

  // Handle OTP sending
  const sendOtp = () => {
    if (isValid) {
      const formData = new FormData();
      formData.append("email", email);
      axios
        .post(send_otp, formData)
        .then((response) => {
          if (response.data.error) {
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          } else {
            setIsOtpSent(true);
            setSnackbarMessage("OTP sent successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setEmail("");
          }
        })
        .catch((err) => {
          setSnackbarMessage("Failed to send OTP. Please try again.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    } else {
      setSnackbarMessage("Invalid Email ID");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle OTP validation
  const validateOtp = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    axios
      .post(forgot_pwd_otp, formData)
      .then((response) => {
        if (response.data.error) {
          setSnackbarMessage(response.data.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        } else {
          setIsOtpValidated(true);
          setSnackbarMessage("OTP validated successfully.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setOtp("");
        }
      })
      .catch((err) => {
        setSnackbarMessage("Failed to validate OTP. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  // Handle password update
  const submit = () => {
    if (isValid) {
      if (password === confirmPassword) {
        const formData = new FormData();
        formData.append("newPassword", password);
        formData.append("confirmNewPassword", confirmPassword);
        formData.append("email", email);
        axios
          .post(forgot_password, formData)
          .then((res) => {
            if (res.data.error) {
              setSnackbarMessage(res.data.message);
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
            } else {
              setSnackbarMessage(res.data.message);
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              setPassword("");
              setConfirmPassword("");
              navigate("/account");
            }
          })
          .catch((err) => {
            setSnackbarMessage("Oops, something went wrong " + err);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          });
      } else {
        setSnackbarMessage("Passwords do not match");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Invalid Email ID");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Divider sx={{ borderColor: "silver" }} />
      <Container>
        <Box py={5}>
          <Grid container display="flex" justifyContent="center">
            {/* Left Column: Image */}
            <Grid
              item
              xs={0}
              md={6}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <img
                  src={productsImage}
                  alt="Products"
                  style={{
                    maxWidth: "80%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column: Forgot Password Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  px: { xs: 4, sm: 6, md: 5 },
                  width: { xs: "100%", sm: "90%", md: "80%" },
                  mt: { xs: -10, sm: 0 }, // Move up by 10 units on mobile
                }}
              >
                <Box
                  sx={{
                    border: "1px solid gray",
                    borderRadius: "8px",
                    p: 4,
                    width: "100%",
                  }}
                >
                  <Stack spacing={2} width="100%">
                    {/* Forgot Password Heading */}
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="#52459f"
                      gutterBottom
                    >
                      Forgot Password
                    </Typography>
                    <Typography color="#707070">
                      Enter your email address to receive an OTP and reset your
                      password.
                    </Typography>

                    {!isOtpSent ? (
                      <>
                        <Typography fontWeight={500} color="#707070">
                          Enter your Email ID
                        </Typography>
                        <TextField
                          sx={{
                            width: "100%",
                            marginBottom: 5,
                          }}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          fullWidth
                          onChange={handleEmailChange}
                          size="small"
                          required
                          value={email}
                          label="Your Email ID here" // Added label
                        />
                        <Button
                          variant="contained"
                          onClick={sendOtp}
                          sx={{
                            height: 40,
                            boxShadow: "none",
                            bgcolor: "#52459f", // Updated button color
                          }}
                        >
                          Send OTP
                        </Button>
                      </>
                    ) : !isOtpValidated ? (
                      <>
                        <Typography fontWeight={500} color="#707070">
                          Enter OTP
                        </Typography>
                        <TextField
                          sx={{
                            width: "100%",
                            marginBottom: 5,
                          }}
                          size="small"
                          id="otp"
                          variant="outlined"
                          name="otp"
                          type="text"
                          onChange={(e) => setOtp(e.target.value)}
                          value={otp}
                          label="Enter OTP" // Added label
                        />
                        <Button
                          variant="contained"
                          onClick={validateOtp}
                          sx={{
                            height: 40,
                            boxShadow: "none",
                            bgcolor: "#52459f", // Updated button color
                          }}
                        >
                          Validate OTP
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography fontWeight={500} color="#707070">
                          New Password
                        </Typography>
                        <TextField
                          sx={{
                            width: "100%",
                            marginBottom: 5,
                          }}
                          size="small"
                          id="password"
                          variant="outlined"
                          name="password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={validateInput}
                          value={password}
                          label="New Password*" // Added label
                        />
                        <Typography fontWeight={500} color="#707070">
                          Confirm New Password
                        </Typography>
                        <TextField
                          sx={{
                            width: "100%",
                            marginBottom: 5,
                          }}
                          size="small"
                          id="confirmPassword"
                          variant="outlined"
                          name="confirmPassword"
                          type="password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          helperText={errorMsg}
                          error={error}
                          onBlur={validateInput}
                          value={confirmPassword}
                          label="Confirm New Password*" // Added label
                        />
                        <Button
                          variant="contained"
                          onClick={submit}
                          sx={{
                            height: 40,
                            boxShadow: "none",
                            bgcolor: "#52459f", // Updated button color
                          }}
                        >
                          Update Password
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
