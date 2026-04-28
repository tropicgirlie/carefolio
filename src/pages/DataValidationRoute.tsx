import { useParams, Navigate, useNavigate } from 'react-router';
import { DataValidationInterface } from '../components/DataValidationInterface';
import { toast } from 'sonner@2.0.3';

export function DataValidationRoute() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();

  if (!symbol) {
    return <Navigate to="/data-quality" replace />;
  }

  return (
    <DataValidationInterface
      companySymbol={symbol}
      onBack={() => navigate('/data-quality')}
      onValidationComplete={(sym, validated) => {
        console.log(`Validation completed for ${sym}:`, validated);
        toast.success('Validation Complete', {
          description: `${sym} data has been validated successfully`,
          duration: 3000,
        });
        navigate('/data-quality');
      }}
    />
  );
}
