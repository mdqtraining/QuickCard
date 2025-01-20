import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, InputAdornment, Snackbar, Alert, Link, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { user_signin } from '../Api service/APIvariables'; 
import productsImage from '../assets/products.png'; 

function SignIn({ setsuccessOpen, setsuccessMessage, setsuccessStatus, setsuccessColor }) {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState('error'); 
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  // Effect to check if the user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data); // Debugging line

    const serverData = new FormData();
    for (const key in data) {
      serverData.append(key, data[key]);
    }

    if (!navigator.onLine) {
      setMessage('Your internet is offline');
      setOpen(true);
      setStatus(false);
      setColor('error');
    } else {
      axios({
        method: 'POST', // Update to 'POST' method for login
        url: user_signin, // Use the user_signin URL imported from config.js
        data: serverData,
      }).then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setOpen(true);
          setStatus(false);
          setColor('error');
        } else {
          // On successful login, store authentication token and redirect to dashboard
          localStorage.setItem('auth', true);
          navigate('/dashboard');  // Redirect to dashboard after login
          setsuccessOpen(true);
          setsuccessMessage(res.data.message);
          setsuccessStatus(true);
          setsuccessColor(true);
        }
      }).catch((err) => {
        setMessage('Oops, something went wrong: ' + err.message);
        setOpen(true);
        setStatus(false);
        setColor('error');
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ bgcolor: '#eaf4fc', height: '100vh' }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity={status ? 'success' : color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Box>
        <Grid container sx={{ height: '100vh' }} alignItems={'center'}>
          
          <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
              <img
                src={productsImage}
                alt="Products"
                style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', px: { xs: 4, sm: 6, md: 5 }, width: { xs: '100%', sm: '90%', md: '80%' } }}>
              <Box>
                <Box sx={{ py: 2 }}>
                  <Typography fontSize={{ lg: 30, md: 26, sm: 23, xs: 20 }} color="primary" variant="h5">
                    Welcome
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ py: 2 }}>
                    <TextField
                      error={errors.email ? true : false}
                      helperText={errors.email && errors.email.type === 'required' ? 'Email is required' : ''}
                      fullWidth
                      label="Email"
                      variant="filled"
                      {...register('email', { required: true })}
                    />
                  </Box>
                  <Box sx={{ py: 2 }}>
                    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
                      <InputLabel size="small" htmlFor="outlined-adornment-password" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        Password*
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        size="small"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, whiteSpace: 'nowrap' }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ py: 2 }}>
                    <Button
                      type="submit"
                      sx={{ p: 2 }}
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ boxShadow: '0 4px 8px rgba(82, 69, 159, 255)', backgroundColor: '#52459f', color: 'white' }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>

                <Box sx={{ py: 2 }}>
                  <Link href="/forgot-password" variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, whiteSpace: 'nowrap' }}>
                    Forgot password?
                  </Link>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: 'none',
                      marginTop: 2,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => navigate('/sign-up')}
                  >
                    Don’t have an account? Sign Up
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignIn;
