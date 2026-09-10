import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface AuthUser {
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  loginError: string;
  showTechDocs: boolean;
  logoClickCount: number;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleLogoClick: () => void;
  setShowTechDocs: (show: boolean) => void;
  setLoginError: (error: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showTechDocs, setShowTechDocs] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // A browser-bundled credential is not an authentication boundary. Keep
      // the route protected until a server-side identity provider is wired.
      void username;
      void password;
      setLoginError('Administrative authentication has not been configured for this preview.');
      toast.error('Admin access is not configured', {
        description: 'Connect an approved server-side identity provider before publishing.',
        duration: 4000,
      });
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Authentication service temporarily unavailable. Please try again.');

      toast.error('Login Error', {
        description: 'Service temporarily unavailable',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setIsAuthenticated(false);
      setUser(null);
      setLoginError('');

      toast.success('Signed Out', {
        description: 'You have been successfully signed out',
        duration: 2000,
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (logoClickTimeout.current) {
      clearTimeout(logoClickTimeout.current);
    }

    if (newCount === 3) {
      setShowTechDocs(true);
      setLogoClickCount(0);

      toast.success('Tech Docs Unlocked!', {
        description: 'Developer documentation is now accessible',
        duration: 3000,
      });
    } else {
      logoClickTimeout.current = setTimeout(() => {
        setLogoClickCount(0);
      }, 2000);
    }
  }, [logoClickCount]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        loginError,
        showTechDocs,
        logoClickCount,
        handleLogin,
        handleLogout,
        handleLogoClick,
        setShowTechDocs,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
