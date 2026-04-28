import { CompliancePage } from '../components/CompliancePage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function ComplianceRoute() {
  const nav = useAppNavigation();
  return <CompliancePage {...nav.pageProps} />;
}
