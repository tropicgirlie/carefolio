import { useNavigate } from 'react-router';
import { LoginPage } from '../components/LoginPage';
import { useAuth } from '../contexts/AuthContext';

export function LoginRoute() {
  const navigate = useNavigate();
  const { handleLogoClick } = useAuth();

  return (
    <LoginPage
      onNavigateToLanding={() => navigate('/')}
      onLogoClick={handleLogoClick}
    />
  );
}
