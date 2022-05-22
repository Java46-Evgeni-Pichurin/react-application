import { Avatar, Box, Container, createTheme, CssBaseline, Link, ThemeProvider, Typography, TextField, FormControlLabel, Checkbox, Button, Alert, AlertTitle, Stack, Dialog } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from "react";
import LoginData from "../../models/LoginData";
import { accounts } from "../../config/accounts";
type Props = {
    submitFn: (loginData: LoginData)=>void;
}
function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Evgeni Pichurin
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const emptyLog: LoginData = {email: '', password: ''};
  const theme = createTheme();

  const LoginForm: React.FC<Props> = ({submitFn}) => {
    const [loginData, setLogitData] = React.useState(emptyLog)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitFn(loginData);
    };
    function handlerLog(event: any) {
        const loginCopy = { ...loginData };
        loginCopy.email = event.target.value
        setLogitData(loginCopy);
    }
    function handlerPas(event: any) {
        const loginCopy = { ...loginData };
        loginCopy.password = event.target.value;
        setLogitData(loginCopy);
    }
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handlerLog}
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
                onChange={handlerPas}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
export default LoginForm;