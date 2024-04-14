import React, { useEffect, useState } from 'react';

import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Copyright } from '../../../common/components/Copyright';
import { RRVForm } from '../../../common/components/RRVForm/index';
import { notifier, toLink } from '../../../helpers/utils/constants';
import { actions, setUser } from '../../../redux/actions';

import { loginSchema } from './schema';

const initialStates = {
  email: '',
  password: '',
};
const redirectToDashboard = () => {
  setTimeout(() => {
    window.location.replace(toLink('', true));
  }, 5000);
};
export const Login = () => {
  const [loginInfo, setLoginInfo] = useState(initialStates);

  const [loginUser, res] = actions.useLoginSystemMutation();

  const dispatch = useDispatch();

  const { isAuthenticated, info } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      redirectToDashboard();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (res.isSuccess) {
      const {
        message,
        data: { token, ...user },
      } = res.data;
      notifier.success(`${message}. Be redirected in 3 seconds`);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      dispatch(setUser(user));
    }
  }, [res.isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(loginInfo);
  };
  console.log({ isAuthenticated, info });
  return (
    <Container component="main" maxWidth="xs">
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
          <RRVForm
            fields={loginSchema()}
            states={loginInfo}
            setStates={setLoginInfo}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={res.isLoading}
          >
            {res.isLoading ? 'Signing in,...' : 'Sign In'}
          </Button>
          {/* <Grid container>
              <Grid item xs>
                <Link href="j" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="n" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};