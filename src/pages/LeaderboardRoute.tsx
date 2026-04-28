import { Leaderboard } from '../components/Leaderboard';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { mockCompanies } from '../data/companies';

export function LeaderboardRoute() {
  const nav = useAppNavigation();

  return (
    <Leaderboard
      companies={mockCompanies}
      {...nav.pageProps}
    />
  );
}
