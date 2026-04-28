import { motion } from 'motion/react';
import { X, TrendingUp, Heart, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Company } from '../data/companies';

interface ComparisonViewProps {
  companies: Company[];
  onClose: () => void;
  onRemoveCompany: (companyId: string) => void;
}

export function ComparisonView({ companies, onClose, onRemoveCompany }: ComparisonViewProps) {
  if (companies.length === 0) return null;

  // Calculate comparative metrics
  const avgCareScore = Math.round(companies.reduce((sum, c) => sum + c.care_index.score, 0) / companies.length);
  const totalMarketCap = companies.reduce((sum, c) => sum + c.market_cap, 0);
  const avgParentalLeave = Math.round(companies.reduce((sum, c) => sum + c.care_metrics.parental_leave.weeks_paid, 0) / companies.length);
  const avgWomenLeadership = Math.round(companies.reduce((sum, c) => sum + c.care_metrics.women_leadership.board_percentage, 0) / companies.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[var(--gradient-care-glow)] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="headline-h2 mb-2">Portfolio Comparison</h2>
              <p className="body-medium opacity-90">{companies.length} companies selected</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="p-6 bg-[var(--bg-secondary)] border-b border-[var(--outline-variant)]">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="data-large text-[var(--care-emerald)] mb-1">{avgCareScore}</div>
              <div className="caption">Avg Care Score</div>
            </div>
            <div className="text-center">
              <div className="data-large text-[var(--care-emerald)] mb-1">${(totalMarketCap / 1000000000000).toFixed(1)}T</div>
              <div className="caption">Total Market Cap</div>
            </div>
            <div className="text-center">
              <div className="data-large text-[var(--care-emerald)] mb-1">{avgParentalLeave}w</div>
              <div className="caption">Avg Parental Leave</div>
            </div>
            <div className="text-center">
              <div className="data-large text-[var(--care-emerald)] mb-1">{avgWomenLeadership}%</div>
              <div className="caption">Avg Women Leadership</div>
            </div>
          </div>
        </div>

        {/* Company Comparison Table */}
        <div className="overflow-auto max-h-[50vh]">
          <table className="w-full">
            <thead className="bg-[var(--bg-secondary)] sticky top-0">
              <tr>
                <th className="text-left p-4 body-small-medium">Company</th>
                <th className="text-center p-4 body-small-medium">Care Score</th>
                <th className="text-center p-4 body-small-medium">Parental Leave</th>
                <th className="text-center p-4 body-small-medium">Women Leadership</th>
                <th className="text-center p-4 body-small-medium">Pay Transparency</th>
                <th className="text-center p-4 body-small-medium">Market Cap</th>
                <th className="text-center p-4 body-small-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => {
                const careBand = company.care_index.score >= 85 ? 'A' : 
                               company.care_index.score >= 70 ? 'B' :
                               company.care_index.score >= 55 ? 'C' :
                               company.care_index.score >= 40 ? 'D' : 'E';
                return (
                  <tr 
                    key={company.company_id}
                    className={`border-b border-[var(--outline-variant)] ${index % 2 === 1 ? 'bg-[var(--bg-table-alt)]' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                          <span className="caption font-bold text-[var(--care-emerald)]">
                            {company.symbol.substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="body-medium font-medium">{company.name}</div>
                          <div className="caption text-[var(--text-secondary)]">{company.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="data-medium font-bold text-[var(--care-emerald)]">
                          {company.care_index.score}
                        </span>
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white caption font-bold text-xs"
                          style={{ 
                            backgroundColor: careBand === 'A' ? 'var(--care-vibrant-mint)' :
                                           careBand === 'B' ? 'var(--care-emerald)' :
                                           careBand === 'C' ? 'var(--neutral-lilac)' :
                                           careBand === 'D' ? 'var(--harm-coral)' : 'var(--bg-deep-navy)' 
                          }}
                        >
                          {careBand}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="data-medium">{company.care_metrics.parental_leave.weeks_paid}w</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="data-medium">{company.care_metrics.women_leadership.board_percentage}%</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="data-medium">{company.care_metrics.pay_transparency.transparency_score}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="data-medium">${(company.market_cap / 1000000000).toFixed(0)}B</span>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveCompany(company.company_id)}
                        className="text-[var(--harm-coral)] border-[var(--harm-coral)] hover:bg-[var(--harm-coral)] hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--outline-variant)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="body-medium text-[var(--text-secondary)]">
                Portfolio Performance: 
              </span>
              <span className={`body-medium font-medium ${avgCareScore >= 80 ? 'text-[var(--care-emerald)]' : avgCareScore >= 60 ? 'text-[var(--neutral-lilac)]' : 'text-[var(--harm-coral)]'}`}>
                {avgCareScore >= 80 ? 'Excellent Care Leadership' : 
                 avgCareScore >= 60 ? 'Growing Care Practices' : 'Needs Nurturing Attention'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onClose}>
                Close Comparison
              </Button>
              <Button className="md3-btn-filled">
                <Heart className="w-4 h-4" />
                Save Portfolio
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}