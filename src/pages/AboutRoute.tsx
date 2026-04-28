import { AboutPage } from '../components/AboutPage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function AboutRoute() {
  const nav = useAppNavigation();
  return <AboutPage {...nav.pageProps} />;
}
