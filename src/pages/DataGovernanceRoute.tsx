import { DataGovernancePage } from '../components/DataGovernancePage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function DataGovernanceRoute() {
  const nav = useAppNavigation();
  return <DataGovernancePage {...nav.pageProps} />;
}
