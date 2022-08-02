import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SubmitButton from '../components/SubmitButton.js';
import UserApi from "../services/UserApi.js"
import { UserContext } from '../userContext.js';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import {useTranslation} from "react-i18next"


export default function Login() {
  const {t}=useTranslation()
  const { login } = React.useContext(UserContext)
  const navigate = useNavigate();
  const [error,setError]=React.useState({})
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('username')
    let password = data.get('password')
    

    let response = await UserApi.login(username, password);
    if (response.success) {
      
      login(response)
      setError({error:false,message:"successfully logged in"})
      setTimeout(()=>navigate("/"), 1000);
    }
    else{
      setError({error:true,message:response.message})
    }

  }
  return (
    <Container >
      <Box>
        <Typography variant="h2">
          {t("signin")}
        </Typography>
        {error.error?<Alert variant="filled" severity="error">
  {error.message}
</Alert>:<></>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            InputLabelProps={{ required: false }}
            margin="normal"
            required
            fullWidth
            id="username"
            label={t("useradd.username.label")}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            InputLabelProps={{ required: false }}
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("useradd.password.label")}
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
          </SubmitButton>
        </Box>
      </Box>

    </Container>

  );
}