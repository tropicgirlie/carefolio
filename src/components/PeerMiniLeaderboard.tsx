import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, TrendingUp, Users, Baby, DollarSign, Award, Star, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Company } from '../data/companies';

interface PeerMiniLeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompany: Company | null;
  allCompanies: Company[];
}

export function PeerMiniLeaderboard({ isOpen, onClose, selectedCompany, allCompanies }: PeerMiniLeaderboardProps) {
  console.log('PeerMiniLeaderboard render:', { 
    isOpen, 
    hasSelectedCompany: !!selectedCompany, 
    selectedCompanyName: selectedCompany?.name,
    allCompaniesCount: allCompanies.length 
  });

  if (!selectedCompany || !isOpen) {
    console.log('PeerMiniLeaderboard: Not rendering - missing data or closed');
    return null;
  }

  // Get peers in same sector, sorted by care score
  const sectorPeers = allCompanies
    .filter(company => 
      company.sector === selectedCompany.sector && 
      company.company_id !== selectedCompany.company_id
    )
    .sort((a, b) => b.care_index.score - a.care_index.score)
    .slice(0, 4); // Top 4 peers

  console.log('Found peers:', sectorPeers.length, 'for sector:', selectedCompany.sector);

  // Create leaderboard with selected company
  const leaderboard = [selectedCompany, ...sectorPeers]
    .sort((a, b) => b.care_index.score - a.care_index.score);

  const selectedCompanyRank = leaderboard.findIndex(c => c.company_id === selectedCompany.company_id) + 1;
  const totalCompanies = leaderboard.length;

  console.log('Leaderboard created:', {
    totalInLeaderboard: leaderboard.length,
    selectedCompanyRank,
    selectedCompanyScore: selectedCompany.care_index.score
  });

  // Care band calculation
  const getCareScoreBand = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
  };

  // Band styling
  const getBandInfo = (band: string) => {
    switch (band) {
      case 'A': return { icon: '🌸', name: 'Legendary', color: 'var(--care-vibrant-mint)' };
      case 'B': return { icon: '💎', name: 'Strong', color: 'var(--care-emerald)' };
      case 'C': return { icon: '🟡', name: 'Moderate', color: 'var(--neutral-lilac)' };
      case 'D': return { icon: '🔴', name: 'Needs Care', color: 'var(--harm-coral)' };
      case 'E': return { icon: '🚨', name: 'Critical', color: 'var(--bg-deep-navy)' };
      default: return { icon: '🟡', name: 'Developing', color: 'var(--neutral-lilac)' };
    }
  };

  // Get key stat highlight for each company
  const getKeyStatHighlight = (company: Company) => {
    const parentalLeave = company.care_metrics.parental_leave.weeks_paid;
    const womenBoard = company.care_metrics.women_leadership.board_percentage;
    const payScore = company.care_metrics.pay_transparency.transparency_score;

    // Determine the strongest metric to highlight
    if (parentalLeave >= 16) {
      return { label: `${parentalLeave}w Leave`, icon: Baby, color: 'var(--care-emerald)' };
    } else if (womenBoard >= 40) {
      return { label: `${womenBoard}% Women`, icon: Users, color: 'var(--care-teal)' };
    } else if (payScore >= 8) {
      return { label: `Pay Score ${payScore}`, icon: DollarSign, color: 'var(--care-vibrant-mint)' };
    } else {
      return { label: `${parentalLeave}w Leave`, icon: Baby, color: 'var(--text-secondary)' };
    }
  };

  // Rank suffix
  const getRankSuffix = (rank: number) => {
    if (rank % 10 === 1 && rank % 100 !== 11) return 'st';
    if (rank % 10 === 2 && rank % 100 !== 12) return 'nd';
    if (rank % 10 === 3 && rank % 100 !== 13) return 'rd';
    return 'th';
  };

  // Get sector display name (remove long descriptors)  
  const getSectorDisplayName = (sector: string) => {
    return sector.split(' ')[0]; // Take first word (e.g., "Technology" from "Technology Software")
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-[var(--outline-variant)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--care-emerald)] to-[var(--care-vibrant-mint)] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="headline-h3 text-[var(--text-primary)]">
                  {getSectorDisplayName(selectedCompany.sector)} Champions
                </DialogTitle>
                <DialogDescription className="body-small text-[var(--text-secondary)]">
                  Compare {selectedCompany.name} with top performers in the {getSectorDisplayName(selectedCompany.sector)} sector. 
                  Currently ranking #{selectedCompanyRank}{getRankSuffix(selectedCompanyRank)} out of {totalCompanies} companies.
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-[var(--bg-secondary)]">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Performance Context Banner */}
          <div className="bg-gradient-to-r from-[var(--care-emerald)]/10 to-[var(--care-vibrant-mint)]/10 rounded-lg p-4 border border-[var(--care-emerald)]/20">
            <div className="flex items-center gap-3 mb-2">
              {selectedCompanyRank === 1 && <Crown className="w-5 h-5 text-[var(--cta-orange)]" />}
              {selectedCompanyRank === 2 && <Award className="w-5 h-5 text-[var(--neutral-lilac)]" />}
              {selectedCompanyRank === 3 && <Star className="w-5 h-5 text-[var(--harm-coral)]" />}
              {selectedCompanyRank > 3 && <TrendingUp className="w-5 h-5 text-[var(--care-emerald)]" />}
              <span className="body-medium-medium text-[var(--text-primary)]">Performance Context</span>
            </div>
            <p className="body-medium text-[var(--text-secondary)]">
              {selectedCompanyRank === 1 ? (
                `🏆 ${selectedCompany.name} leads the ${getSectorDisplayName(selectedCompany.sector)} sector with exceptional care practices.`
              ) : selectedCompanyRank <= 2 ? (
                `🥈 ${selectedCompany.name} ranks among the top care leaders in ${getSectorDisplayName(selectedCompany.sector)}.`
              ) : selectedCompanyRank <= 3 ? (
                `🥉 ${selectedCompany.name} shows strong care momentum in the ${getSectorDisplayName(selectedCompany.sector)} sector.`
              ) : (
                `📈 ${selectedCompany.name} has opportunities to advance its care practices within ${getSectorDisplayName(selectedCompany.sector)}.`
              )}
            </p>
          </div>

          {/* Compact Peer Leaderboard Table */}
          <div className="overflow-hidden rounded-lg border border-[var(--outline-variant)]">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  <th className="text-left p-3 body-small-medium">Rank</th>
                  <th className="text-left p-3 body-small-medium">Company</th>
                  <th className="text-center p-3 body-small-medium">Care Score</th>
                  <th className="text-center p-3 body-small-medium">Band</th>
                  <th className="text-center p-3 body-small-medium">Key Strength</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((company, index) => {
                  const careBand = getCareScoreBand(company.care_index.score);
                  const bandInfo = getBandInfo(careBand);
                  const keyStatHighlight = getKeyStatHighlight(company);
                  const isCurrentCompany = company.company_id === selectedCompany.company_id;
                  
                  return (
                    <motion.tr 
                      key={company.company_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-[var(--outline-variant)] transition-colors ${
                        isCurrentCompany ? 
                        'bg-gradient-to-r from-[var(--care-emerald)]/15 to-[var(--care-vibrant-mint)]/15 border-[var(--care-emerald)]' : 
                        'hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {/* Rank */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Crown className="w-4 h-4 text-[var(--cta-orange)]" />}
                          {index === 1 && <Award className="w-4 h-4 text-[var(--neutral-lilac)]" />}
                          {index === 2 && <Star className="w-4 h-4 text-[var(--harm-coral)]" />}
                          <Badge 
                            variant={isCurrentCompany ? "default" : "outline"} 
                            className={`font-mono text-xs ${isCurrentCompany ? 'bg-[var(--care-emerald)] text-white' : ''}`}
                          >
                            #{index + 1}
                          </Badge>
                          {isCurrentCompany && (
                            <Badge variant="default" className="bg-[var(--cta-orange)] text-white text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--outline-variant)]">
                            <span className="text-xs font-bold text-[var(--care-emerald)]">
                              {company.symbol.substring(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className={`body-small font-medium truncate max-w-[140px] ${isCurrentCompany ? 'text-[var(--care-emerald)]' : ''}`}>
                              {company.name.length > 18 ? `${company.name.substring(0, 18)}...` : company.name}
                              {isCurrentCompany && <span className="text-[var(--care-emerald)] ml-1">•</span>}
                            </div>
                            <div className="text-xs text-[var(--text-secondary)]">
                              ${(company.market_cap / 1000000000).toFixed(0)}B
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Care Score */}
                      <td className="p-3 text-center">
                        <span 
                          className="data-medium font-bold"
                          style={{ 
                            color: isCurrentCompany ? 'var(--care-emerald)' : 
                                   company.care_index.score >= 80 ? 'var(--care-emerald)' :
                                   company.care_index.score >= 70 ? 'var(--care-teal)' :
                                   company.care_index.score >= 60 ? 'var(--neutral-lilac)' : 'var(--harm-coral)'
                          }}
                        >
                          {company.care_index.score}
                        </span>
                      </td>

                      {/* Care Band */}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: bandInfo.color }}
                          >
                            {careBand}
                          </div>
                          <span className="text-sm">{bandInfo.icon}</span>
                        </div>
                      </td>

                      {/* Key Strength */}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <keyStatHighlight.icon 
                            className="w-3 h-3" 
                            style={{ color: keyStatHighlight.color }}
                          />
                          <span 
                            className="text-xs font-medium"
                            style={{ color: keyStatHighlight.color }}
                          >
                            {keyStatHighlight.label}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} className="md3-btn-outlined">
              Close
            </Button>
            <Button className="md3-btn-filled">
              <TrendingUp className="w-4 h-4" />
              View Full Sector Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}