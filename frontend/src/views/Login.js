import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SubmitButton from '../components/SubmitButton.js';
import UserApi from "../services/UserApi.js"
import { UserContext } from '../userContext.js';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
const url = process.env.REACT_APP_BACKEND + "/api/user/login";


const theme = createTheme();

export default function Login() {
  const { login } = React.useContext(UserContext)
  const navigate = useNavigate();
  const [error,setError]=React.useState({})
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('username')
    let password = data.get('password')
    console.log(data)

    let response = await UserApi.login(username, password);
    console.log(response)
    if (response.success) {
      console.log(response)
      login(response)
      setError({error:false,message:"successfully logged in"})
      setTimeout(()=>navigate("/main"), 1000);
    }
    else{
      setError({error:true,message:response.message})
    }

  }
  return (
    <Container >
      <Box>
        <Typography variant="h2">
          Sign in
        </Typography>
        {error.error?<Alert variant="filled" severity="error">
  {error}
</Alert>:<></>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="user name"
            name="username"
            autoComplete="Admin"
            autoFocus
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
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </SubmitButton>
        </Box>
      </Box>

    </Container>

  );
}