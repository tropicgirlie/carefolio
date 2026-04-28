import { useNavigate } from 'react-router';
import { DataQualityDashboard } from '../components/DataQualityDashboard';

export function DataQualityRoute() {
  const navigate = useNavigate();

  return (
    <DataQualityDashboard
      onClose={() => navigate('/dashboard')}
      onNavigateToValidation={(companySymbol: string) =>
        navigate(`/data-validation/${companySymbol}`)
      }
    />
  );
}
