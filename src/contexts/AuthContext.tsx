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
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastLoginAttempt, setLastLoginAttempt] = useState(0);
  const [showTechDocs, setShowTechDocs] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = useCallback(async (username: string, password: string) => {
    const now = Date.now();
    const timeSinceLastAttempt = now - lastLoginAttempt;

    // Rate limiting
    if (loginAttempts >= 3 && timeSinceLastAttempt < 60000) {
      const remainingTime = Math.ceil((60000 - timeSinceLastAttempt) / 1000);
      setLoginError(`Too many attempts. Please wait ${remainingTime} seconds.`);
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (username === 'admin' && password === 'carefolio123') {
        setIsAuthenticated(true);
        setUser({ username, role: 'admin' });
        setLoginAttempts(0);
        setLastLoginAttempt(0);

        toast.success('Welcome to Carefolio Dashboard', {
          description: 'Successfully signed in as Administrator',
          duration: 3000,
        });
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setLastLoginAttempt(now);

        const attemptsLeft = Math.max(0, 3 - newAttempts);
        setLoginError(
          newAttempts >= 3
            ? 'Account temporarily locked. Please wait 1 minute before trying again.'
            : `Invalid credentials. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.`
        );

        toast.error('Authentication Failed', {
          description: 'Invalid username or password',
          duration: 4000,
        });
      }
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
  }, [loginAttempts, lastLoginAttempt]);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setIsAuthenticated(false);
      setUser(null);
      setLoginAttempts(0);
      setLastLoginAttempt(0);
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
