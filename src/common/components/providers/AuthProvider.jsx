import React, { useState, useContext, createContext, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { validateUserAuthentication } from '../../../helpers/utils';
import { lStorage } from '../../../helpers/utils/constants';
import { setUser } from '../../../redux/actions';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  message: '',
  setState: () => {},
  refreshUserInfo: () => {},
};

export const AuthContext = createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const clearLocalStorage = () => {
    localStorage.removeItem('user-token');
    setState((prev) => ({ ...prev, isLoading: false }));
  };

  const validateAuth = async () => {
    try {
      // Check if token exist
      const { token } = lStorage;

      if (token) {
        const { exp, companyId } = jwtDecode(token);
        // Validate token expiration time
        const currentTime = Date.now() / 1000;
        if (exp > currentTime) {
          const { isAuthenticated, data } =
            await validateUserAuthentication(companyId);
          if (isAuthenticated) {
            dispatch(setUser(data));
            setState((prev) => ({ ...prev, isLoading: false, user: data }));
          } else {
            setState((prev) => ({ ...prev, message: 'invalid token' }));
            clearLocalStorage();
          }
        } else {
          // Logout
          setState((prev) => ({ ...prev, message: 'invalid token' }));
          clearLocalStorage();
        }
      } else {
        // Logout
        setState((prev) => ({ ...prev, message: 'invalid token' }));
        clearLocalStorage();
      }
    } catch (error) {
      // Logout
      setState((prev) => ({ ...prev, message: 'invalid token' }));
      clearLocalStorage();
    }
  };

  useEffect(() => {
    validateAuth();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
