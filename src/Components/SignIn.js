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
import { useNavigate } from "react-router-dom";
import productsImage from "../assets/products.png"; // Ensure the file path is correct

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
      sx={{
        fontSize: { xs: "0.875rem", sm: "1rem" },
        whiteSpace: "nowrap", // Prevent wrapping
      }}
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
      <InputLabel
        size="small"
        htmlFor="outlined-adornment-password"
        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
      >
        Password*
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, whiteSpace: "nowrap" }}
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
      sx={{
        my: 2,
        fontSize: { xs: "0.875rem", sm: "1rem" },
        whiteSpace: "nowrap",
      }}
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
      sx={{
        textTransform: "none",
        marginTop: 2,
        fontSize: { xs: "0.875rem", sm: "1rem" },
        whiteSpace: "nowrap", // Prevent wrapping
      }}
      onClick={() => navigate("/sign-up")}
    >
      Don’t have an account? Sign Up
    </Button>
  );
}

function ForgotPasswordLink() {
  return (
    <Link
      href="/forgot-password"
      variant="body2"
      sx={{
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        whiteSpace: "nowrap", // Prevent wrapping
      }}
    >
      Forgot password?
    </Link>
  );
}

function Title() {
  return (
    <h2
      style={{
        marginBottom: 8,
        fontSize: "1.5rem", // Default font size for desktop
        whiteSpace: "nowrap", // Prevent wrapping
      }}
    >
      Sign In to QuickCard
    </h2>
  );
}

function Subtitle() {
  return (
    <p
      style={{
        fontSize: "1rem", // Default font size for desktop
        whiteSpace: "nowrap", // Prevent wrapping
      }}
    >
      Welcome, Please sign in to continue
    </p>
  );
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
        <Grid container>
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

          {/* Right Column: Sign-In Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                px: { xs: 4, sm: 6, md: 5 },
                width: { xs: "100%", sm: "90%", md: "80%" },
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
