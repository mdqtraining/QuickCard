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
import ProductImg from "../assets/products.png";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = () => {
    alert(`OTP sent to ${email}`);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      {/* Left Column: Product Image */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#white",
          }}
        >
          <img
            src={ProductImg}
            alt="Product"
            style={{
              width: "75%",
              height: "75%",
              marginTop: "60px",
              boxShadow: "0 8px 20px rgba(82, 69, 159, 255)",
            }}
          />
        </Box>
      </Grid>

      {/* Right Column: Sign-Up Form */}
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

            {/* First Name & Last Name */}
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

            {/* Email */}
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
              Send OTP
            </Button>

            {/* OTP & Password Fields */}
            <Grid container spacing={2}>
              {/* OTP Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Enter OTP *"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password *
                  </InputLabel>
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
                    label="Password *"
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Sign-Up Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                width: "150px",
                height: "auto",
                padding: "6px",
                boxShadow: "0 4px 8px rgba(82, 69, 159, 255)",
                marginLeft: "130px",
                mt: 3,
                backgroundColor: "#52459f",
                color: "white",
                "&:hover": { backgroundColor: "#41378e" },
              }}
              onClick={() => alert("Signup Successful!")}
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
        </Box>
      </Grid>
    </Grid>
  );
}