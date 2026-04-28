import { PrivacyPolicyPage } from '../components/PrivacyPolicyPage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function PrivacyRoute() {
  const nav = useAppNavigation();
  return <PrivacyPolicyPage {...nav.pageProps} />;
}
