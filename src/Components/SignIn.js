import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import ProductImg from "../assets/products.png";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure to import the CSS here

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password*
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
      style={{
        boxShadow: "0 4px 8px rgba(82, 69, 159, 255)",
        backgroundColor: "#52459f",
        color: "white",
      }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      sx={{ textTransform: "none", marginTop: 2 }}
      onClick={() => navigate("/sign-up")}
    >
      Don’t have an account? Sign Up
    </Button>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/reset-password" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Sign In to QuickCard</h2>;
}

function Subtitle() {
  return <p>Welcome, Please sign in to continue</p>;
}

export default function SlotsSignIn({ onSignInSuccess }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignIn = (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email && password) {
      onSignInSuccess();
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password!");
    }
  };

  return (
    <div className="sign-in">
      <AppProvider theme={theme}>
        <Grid container spacing={2}>
          {/* Product Image Grid */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "65%",
                display: { xs: "none", lg: "block" },
              }}
            >
              <img
                // className="product-image"
                src={ProductImg}
                alt="Product"
                style={{
                  width: "65%",
                  marginTop: "210px",
                  boxShadow: "0 8px 20px rgba(82, 69, 159, 255)",
                }}
              />
            </Box>
          </Grid>
          {/* Sign-In Form Grid */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <SignInPage
                signIn={handleSignIn}
                slots={{
                  title: Title,
                  subtitle: Subtitle,
                  emailField: CustomEmailField,
                  passwordField: CustomPasswordField,
                  submitButton: CustomButton,
                  forgotPasswordLink: ForgotPasswordLink,
                  signUpLink: SignUpLink,
                }}
                providers={providers}
              />
            </Box>
          </Grid>
        </Grid>
      </AppProvider>
    </div>
  );
}
