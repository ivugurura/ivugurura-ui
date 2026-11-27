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
import type {
  FieldRow,
  FormStateType,
} from '../../../common/components/RRVForm/types';
import { notifier, toLink } from '../../../helpers/utils/constants';
import { actions, setUser, type MutationHook } from '../../../redux/actions';
import type { AppState } from '../../../redux/store';

import { loginSchema } from './schema';

interface LoginResponse {
  message: string;
  data: APP.IUser & { token: string };
}

interface LoginProps {
  shouldRedirect?: boolean;
}

const initialStates: FormStateType = {
  email: '',
  password: '',
};
const redirectToDashboard = () => {
  setTimeout(() => {
    window.location.replace(toLink('', true));
  }, 5000);
};
const Login: React.FC<LoginProps> = ({ shouldRedirect = true }) => {
  const [loginInfo, setLoginInfo] = useState<FormStateType>(initialStates);

  const useLoginSystem = actions.useLoginSystemMutation as unknown as MutationHook<
    LoginResponse,
    FormStateType
  >;
  const [loginUser, res] = useLoginSystem();

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && shouldRedirect) {
      redirectToDashboard();
    }
  }, [isAuthenticated, shouldRedirect]);

  useEffect(() => {
    if (res.isSuccess && res.data) {
      const {
        message,
        data: { token, ...user },
      } = res.data;
      let messageToShow = message;
      if (shouldRedirect) {
        messageToShow += '. Be redirected in 3 seconds';
      }
      notifier.success(messageToShow);
      localStorage.setItem('user-token', token);
      dispatch(setUser(user));
      if (!shouldRedirect) {
        window.location.reload();
      }
    }
  }, [res.isSuccess, shouldRedirect]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(loginInfo);
  };
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
            fields={loginSchema() as FieldRow[][]}
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
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
