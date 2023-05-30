import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle } from '@mui/material';

export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();


  const navigate = useNavigate();

  async function  handleLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await login(email, password)
      if (currentUser && currentUser.email === "admin@library.com") {
        console.log("Redirecting to dashboard");

        // Redirect to dashboard
        // Replace the URL with your dashboard route or navigation logic
        navigate("/");
      } else {
        // Redirect to user platform
        // Replace the URL with your user platform route or navigation logic
        navigate("/");
      }
    } catch(err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
  };

  if(currentUser) return <Navigate to="/" />

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant='h4' mt={4} textAlign="center">Library Management System</Typography>
      <Container maxWidth="xs"
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && <Typography textAlign="center" color="error" m={2}>Wrong email or password!</Typography>}
        </Box>
        <Alert severity="info">
          <AlertTitle>Use login info</AlertTitle>
          Email Address: <strong>admin@library.com</strong><br /><br />
          Password: <strong>admin123</strong>
        </Alert>
      </Container>
    </Container>
  );
}