import { createContext, useContext, useEffect, useState } from 'react';

import { setUser } from '@redux/actions';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { validateUserAuthentication } from '../../../helpers/utils';
import { lStorage } from '../../../helpers/utils/constants';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: APP.IUser | null;
  message: string;
  setState: (state: AuthContextType) => void;
  refreshUserInfo: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  message: '',
  setState: () => {
    /* empty */
  },
  refreshUserInfo: () => {
    /* empty */
  },
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const clearLocalStorage = () => {
    localStorage.removeItem('user-token');
    setState((prev) => ({ ...prev, isLoading: false }));
  };

  useEffect(() => {
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
        console.error('Authentication validation failed:', error);
        setState((prev) => ({ ...prev, message: 'Authentication failed' }));
        clearLocalStorage();
      }
    };
    void validateAuth();
  }, [dispatch]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
