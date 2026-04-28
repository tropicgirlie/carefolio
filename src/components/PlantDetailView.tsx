import { motion } from 'motion/react';
import { X, Heart, Star, TrendingUp, Users, DollarSign, Shield, BookOpen, AlertTriangle, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Company } from '../data/companies';

interface PlantDetailViewProps {
  company: Company;
  onClose: () => void;
  onCompare: () => void;
  storyMode: boolean;
  onToggleStoryMode: () => void;
}

export function PlantDetailView({ 
  company, 
  onClose, 
  onCompare, 
  storyMode, 
  onToggleStoryMode 
}: PlantDetailViewProps) {

  // Calculate care band
  const getCareScoreBand = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
  };

  const careBand = getCareScoreBand(company.care_index.score);
  
  // Band colors
  const getBandColor = (band: string) => {
    switch (band) {
      case 'A': return 'var(--care-vibrant-mint)';
      case 'B': return 'var(--care-emerald)';
      case 'C': return 'var(--neutral-lilac)';
      case 'D': return 'var(--harm-coral)';
      case 'E': return 'var(--bg-deep-navy)';
      default: return 'var(--neutral-lilac)';
    }
  };

  const bandColor = getBandColor(careBand);

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
        className="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="text-white p-8 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${bandColor}, ${bandColor}CC)` }}
        >
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="data-large font-bold">{company.symbol}</span>
              </div>
              <div>
                <h1 className="headline-h1 mb-2">{company.name}</h1>
                <p className="body-large opacity-90 mb-2">{company.sector}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="data-large font-bold">{company.care_index.score}</span>
                    <span className="body-medium">Care Score</span>
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <span className="body-small-medium">Band {careBand}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleStoryMode}
                className="text-white hover:bg-white/20"
              >
                <BookOpen className="w-4 h-4" />
                {storyMode ? 'Data' : 'Story'}
              </Button>
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
          
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-24 -translate-x-24" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {storyMode ? (
            /* Story Mode */
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📖</div>
                    <div>
                      <h3 className="headline-h3 mb-3 text-[var(--care-emerald)]">Company Story</h3>
                      <p className="body-large mb-4 leading-relaxed">
                        {company.story?.narrative || `${company.name} represents a significant player in the ${company.sector.toLowerCase()} sector, with ${company.care_index.score >= 80 ? 'strong' : company.care_index.score >= 60 ? 'developing' : 'emerging'} care practices that ${company.care_index.score >= 80 ? 'lead industry standards' : company.care_index.score >= 60 ? 'show promising growth' : 'require focused attention'}.`}
                      </p>
                      
                      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-4">
                        <h4 className="body-medium-medium mb-2 text-[var(--care-emerald)]">Maternal Voice</h4>
                        <p className="body-medium italic text-[var(--text-secondary)]">
                          {company.story?.maternal_voice || `When companies like ${company.name} invest in care practices, they create ripple effects that nurture entire communities and future generations.`}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="body-medium-medium text-[var(--care-emerald)]">Impact Story</h4>
                        <p className="body-medium">
                          {company.story?.impact_story || `With a care score of ${company.care_index.score}, ${company.name} demonstrates ${company.care_index.score >= 80 ? 'exceptional commitment' : company.care_index.score >= 60 ? 'solid progress' : 'potential for growth'} in supporting working families and creating sustainable value.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Data Mode */
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-[var(--care-emerald)] mx-auto mb-3" />
                    <div className="data-large text-[var(--care-emerald)] mb-1">${(company.market_cap / 1000000000).toFixed(0)}B</div>
                    <div className="caption">Market Cap</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-[var(--care-emerald)] mx-auto mb-3" />
                    <div className="data-large text-[var(--care-emerald)] mb-1">${company.stock_price.toFixed(2)}</div>
                    <div className="caption">Stock Price</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-[var(--care-emerald)] mx-auto mb-3" />
                    <div className="data-large text-[var(--care-emerald)] mb-1">{company.founded}</div>
                    <div className="caption">Founded</div>
                  </CardContent>
                </Card>
              </div>

              {/* Care Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[var(--care-emerald)]" />
                    Care Metrics Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="body-medium">Parental Leave Support</span>
                      <span className="data-medium text-[var(--care-emerald)]">{company.care_metrics.parental_leave.weeks_paid} weeks paid</span>
                    </div>
                    <Progress value={Math.min(100, (company.care_metrics.parental_leave.weeks_paid / 20) * 100)} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="body-medium">Women Leadership</span>
                      <span className="data-medium text-[var(--care-emerald)]">{company.care_metrics.women_leadership.board_percentage}%</span>
                    </div>
                    <Progress value={company.care_metrics.women_leadership.board_percentage} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="body-medium">Pay Transparency</span>
                      <span className="data-medium text-[var(--care-emerald)]">{company.care_metrics.pay_transparency.transparency_score}/100</span>
                    </div>
                    <Progress value={company.care_metrics.pay_transparency.transparency_score} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="body-medium">Childcare Support</span>
                      <span className="data-medium text-[var(--care-emerald)]">{company.care_metrics.childcare_support.score}/100</span>
                    </div>
                    <Progress value={company.care_metrics.childcare_support.score} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              {company.risk_factors && company.risk_factors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[var(--harm-coral)]" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {company.risk_factors.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-[var(--harm-coral)] mt-2 flex-shrink-0" />
                          <span className="body-medium">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recent Updates */}
              {company.recent_updates && company.recent_updates.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-[var(--care-emerald)]" />
                      Recent Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {company.recent_updates.map((update, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                          <div 
                            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                              update.impact === 'positive' ? 'bg-[var(--care-emerald)]' :
                              update.impact === 'negative' ? 'bg-[var(--harm-coral)]' : 'bg-[var(--neutral-lilac)]'
                            }`}
                          />
                          <div>
                            <div className="body-medium font-medium mb-1">{update.title}</div>
                            <div className="caption text-[var(--text-secondary)]">{update.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--outline-variant)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="body-medium text-[var(--text-secondary)]">
                Care Band {careBand} • {company.health_status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onClose}>
                Close Details
              </Button>
              <Button onClick={onCompare} className="md3-btn-filled">
                <Star className="w-4 h-4" />
                Add to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}