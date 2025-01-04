import * as React from "react";
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
  Box
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import ProductImg from '../assets/products.png'; // Product image
import { useNavigate } from "react-router-dom";

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
        Password
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
      style={{ boxShadow: "0 4px 8px rgba(82, 69, 159, 255)", backgroundColor: "#52459f", color: "white", width:"100px", height:"auto", padding:"4px", alignItems:"center", justifyContent:"center", margin:"80px", marginTop:"20px", marginBottom:"20px" }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/sign-up" variant="body2">
      Don’t have an account? Sign Up
    </Link>
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
  const navigate = useNavigate(); // Initialize useNavigate

  // Dummy email and password values
  const defaultEmail = "dummy@example.com";
  const defaultPassword = "dummyPassword123";

  // Handle SignIn
  const handleSignIn = (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if the email and password match the dummy values
    if (email && password) {
      // Simulate login success (no specific check required)
      if (email === defaultEmail && password === defaultPassword) {
        onSignInSuccess(); // Notify App.js that login was successful
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        // Optional: You can still show this message if needed
        alert("Invalid email or password!");
      }
    } else {
      alert("Please enter both email and password!");
    }
  };

  return (
    <AppProvider theme={theme}>
      <Grid container spacing={2}>
        {/* First column: Product image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={ProductImg} alt="Product" style={{ width: "75%", height: "75%" }} />
          </Box>
        </Grid>

        {/* Second column: Sign In card */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* Sign-In Form */}
            <SignInPage
              signIn={handleSignIn} // Use the custom sign-in handler
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
  );
}
 