import { InsightsPage } from '../components/InsightsPage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function InsightsRoute() {
  const nav = useAppNavigation();
  return <InsightsPage {...nav.pageProps} />;
}
