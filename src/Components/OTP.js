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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import OTP from "./OTP"; // Import OTP component

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
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
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
            setEmail(""); // Clear email field after OTP sent
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
          setOtp(""); // Clear OTP field after successful validation
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
              setPassword(""); // Clear password field after successful update
              setConfirmPassword(""); // Clear confirm password field
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
      <Box>
        <Container>
          <Box py={5}>
            <Grid container display="flex" justifyContent="center">
              <Grid
                item
                xs={12}
                sm={12}
                lg={10}
                xl={10}
                border={1}
                borderColor="silver"
              >
                <Box
                  width="100%"
                  bgcolor="#faa634"
                  textAlign="left"
                  py={3}
                  color="#ffff"
                >
                  <Typography fontSize={20} fontWeight={500} marginLeft={2}>
                    <PersonOutlineIcon
                      fontSize="large"
                      sx={{
                        border: 1,
                        borderRadius: "50%",
                        verticalAlign: "middle",
                        marginRight: 2,
                      }}
                    />
                    Forgot Your Password?
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box textAlign="left" py={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Stack>
                          {!isOtpSent ? (
                            <>
                              <Typography fontWeight={500} color="#707070">
                                Your Email ID
                              </Typography>
                              <TextField
                                sx={{
                                  width: { xs: 250, sm: 300, md: 500, lg: 500 },
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
                                value={email} // Ensure email field is controlled
                              />
                              <Button
                                variant="contained"
                                onClick={sendOtp}
                                sx={{
                                  height: 40,
                                  boxShadow: "none",
                                  bgcolor: "#99B37E",
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
                              <OTP
                                length={6}
                                separator="-"
                                value={otp}
                                onChange={setOtp} // Make sure the OTP is controlled
                              />
                              <Button
                                variant="contained"
                                onClick={validateOtp}
                                sx={{
                                  height: 40,
                                  boxShadow: "none",
                                  bgcolor: "#99B37E",
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
                                  width: { xs: 250, sm: 300, md: 500, lg: 500 },
                                  marginBottom: 5,
                                }}
                                size="small"
                                id="password"
                                variant="outlined"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validateInput}
                                value={password} // Ensure password field is controlled
                              />
                              <Typography fontWeight={500} color="#707070">
                                Confirm New Password
                              </Typography>
                              <TextField
                                sx={{
                                  width: { xs: 250, sm: 300, md: 500, lg: 500 },
                                  marginBottom: 5,
                                }}
                                size="small"
                                id="confirmPassword"
                                variant="outlined"
                                name="confirmPassword"
                                type="password"
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                helperText={errorMsg}
                                error={error}
                                onBlur={validateInput}
                                value={confirmPassword} // Ensure confirmPassword field is controlled
                              />
                              <Button
                                variant="contained"
                                onClick={submit}
                                sx={{
                                  height: 40,
                                  boxShadow: "none",
                                  bgcolor: "#99B37E",
                                }}
                              >
                                Update Password
                              </Button>
                            </>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
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
