import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "../services/api";

interface AuthContextType {
  error: string | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      error: null,
      token: null,
      isLoading: false,
      login: async () => {},
      logout: async () => {},
    };
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem("authToken");
      const storedUser = await AsyncStorage.getItem("authUser");

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          apiService.setToken(storedToken);
        } catch (parseError) {
          console.error("Error parsing stored user data:", parseError);
          await AsyncStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      console.error("Error loading stored auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);

      setToken(response.token);
      apiService.setToken(response.token);

      if (error) {
        setError(null);
      }

      await AsyncStorage.setItem("authToken", response.token);
    } catch (error) {
      setError("No account with this email");
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      apiService.clearToken();
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value: AuthContextType = {
    error,
    token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
