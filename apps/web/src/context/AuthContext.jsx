import { createContext, useReducer, useEffect, useCallback, useRef } from 'react';
import api, { getToken, setToken, clearToken } from '../lib/api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false };
    case 'LOGOUT':
      return { ...initialState, token: null, isLoading: false };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const validatingRef = useRef(false);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // token may already be invalid — still clear locally
    } finally {
      clearToken();
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      if (validatingRef.current) return;
      validatingRef.current = true;
      const token = getToken();
      if (!token) {
        validatingRef.current = false;
        dispatch({ type: 'LOGOUT' });
        return;
      }
      try {
        const response = await api.get('/auth/me');
        dispatch({ type: 'SET_USER', payload: response.data.data });
      } catch (error) {
        if (error.response?.status === 401) {
          clearToken();
          dispatch({ type: 'LOGOUT' });
        }
      } finally {
        validatingRef.current = false;
      }
    };
    validateToken();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch, logout }}>{children}</AuthContext.Provider>;
}

export default AuthContext;