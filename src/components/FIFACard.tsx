import { motion } from 'motion/react';
import { Star, Heart, Shield, Users, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';
import { Company } from '../data/companies';

interface FIFACardProps {
  company: Company;
  isSelected: boolean;
  onSelect: () => void;
  onDetail: () => void;
  storyMode?: boolean;
}

export function FIFACard({ company, isSelected, onSelect, onDetail, storyMode = false }: FIFACardProps) {
  // Convert care score to MomOps rating (42-99 scale)
  const nurtureRating = Math.min(99, Math.max(42, company.care_index.score));
  
  // Get rarity based on nurture rating
  const getRarity = (rating: number) => {
    if (rating >= 90) return 'gold';
    if (rating >= 75) return 'silver';
    if (rating >= 60) return 'bronze';
    return 'common';
  };

  // Get MomOps gradient with care-focused colors
  const getMomOpsGradient = (rating: number, harmScore: number) => {
    // Base gradient based on nurture score
    let baseGradient = '';
    if (rating >= 90) baseGradient = 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #ffffff 100%)'; // Gold
    else if (rating >= 75) baseGradient = 'linear-gradient(135deg, #3CCF91 0%, #27B5A4 30%, #ffffff 100%)'; // Care green
    else if (rating >= 60) baseGradient = 'linear-gradient(135deg, #27B5A4 0%, #B8A9C9 30%, #ffffff 100%)'; // Turquoise to lilac
    else baseGradient = 'linear-gradient(135deg, #B8A9C9 0%, #D3D3D3 30%, #ffffff 100%)'; // Muted
    
    return baseGradient;
  };

  // Get care overlay for visual emphasis
  const getCareOverlay = (careScore: number, harmScore: number) => {
    if (careScore >= 85) return 'careops-high-care-glow';
    if (careScore <= 50) return 'careops-low-care-fade';
    if (harmScore >= 70) return 'careops-high-harm-smoke';
    return '';
  };

  // Get position based on sector (MomOps themed)
  const getMomOpsPosition = (sector: string) => {
    const positions: Record<string, string> = {
      'Technology': 'TECH',
      'Healthcare': 'CARE', 
      'Financial Services': 'FIN',
      'Consumer Discretionary': 'CONS',
      'Consumer Staples': 'LIFE',
      'Energy': 'PWR',
      'Industrials': 'IND',
      'Communication Services': 'COMM'
    };
    return positions[sector] || 'GEN';
  };

  // Calculate MomOps stats (0-99 scale)
  const momOpsStats = {
    nurture: Math.min(99, company.care_index.score), // How much they invest in women & care
    resilience: Math.min(99, company.net_integrity.score), // Balance between care & harm
    returnStrength: Math.min(99, Math.floor(85 - (company.harm_index.score * 0.3) + (company.care_index.score * 0.2))), // How women return post-maternity
    sustainability: Math.min(99, Math.floor(company.care_index.score * 0.7 + (100 - company.harm_index.score) * 0.3)) // Growth aligned with wellbeing
  };

  // Get care badges based on company data
  const getCareGlyphs = (company: Company) => {
    const glyphs = [];
    
    // Childcare support (high care score + tech/healthcare sector)
    if (company.care_index.score >= 80 && ['Technology', 'Healthcare'].includes(company.sector)) {
      glyphs.push({ icon: '🌱', tooltip: 'Childcare Support' });
    }
    
    // Parental leave (high care score)
    if (company.care_index.score >= 85) {
      glyphs.push({ icon: '🤱', tooltip: 'Strong Parental Leave' });
    }
    
    // Women's health investment (healthcare sector + high care)
    if (company.sector === 'Healthcare' && company.care_index.score >= 75) {
      glyphs.push({ icon: '💊', tooltip: "Women's Health Investment" });
    }
    
    // Harassment prevention (high integrity score)
    if (company.net_integrity.score >= 80) {
      glyphs.push({ icon: '🛡', tooltip: 'Harassment Prevention' });
    }
    
    // High emissions footprint (harm badge)
    if (company.harm_index.score >= 70) {
      glyphs.push({ icon: '🔥', tooltip: 'High Emissions Risk' });
    }
    
    return glyphs.slice(0, 3); // Max 3 glyphs per card
  };

  // Get MomOps story tagline
  const getMomOpsTagline = (company: Company) => {
    const careScore = company.care_index.score;
    const harmScore = company.harm_index.score;
    const sector = company.sector;
    
    // Company-specific taglines based on care/harm profile
    if (company.name.includes('Microsoft')) {
      return "Strong parental leave, but supply chain risks pull resilience down.";
    }
    if (company.name.includes('Johnson')) {
      return "Healthcare giant glowing in nurture, but mixed on footprint.";
    }
    if (company.name.includes('Apple')) {
      return "Tech leader in return support, working on supply chain care.";
    }
    if (company.name.includes('Alphabet') || company.name.includes('Google')) {
      return "Innovation in women's health tech, sustainability improving.";
    }
    if (company.name.includes('Amazon')) {
      return "Expanding parental benefits, logistics footprint needs nurturing.";
    }
    
    // Generic taglines based on care/harm scores
    if (careScore >= 85 && harmScore < 40) {
      return "Exceptional nurture with clean operations - squad captain material.";
    }
    if (careScore >= 80 && harmScore >= 60) {
      return "High care investment, but environmental footprint needs attention.";
    }
    if (careScore >= 70 && harmScore < 50) {
      return "Solid care foundation with responsible growth practices.";
    }
    if (careScore < 60 && harmScore >= 70) {
      return "Limited care investment, high-risk footprint - needs transformation.";
    }
    if (careScore >= 60 && harmScore >= 50 && harmScore < 70) {
      return "Balanced care approach, room for improvement in sustainability.";
    }
    
    return "Developing care infrastructure, potential for growth in nurture practices.";
  };

  const rarity = getRarity(nurtureRating);
  const position = getMomOpsPosition(company.sector);
  const careOverlay = getCareOverlay(company.care_index.score, company.harm_index.score);
  const careGlyphs = getCareGlyphs(company);
  const momOpsTagline = getMomOpsTagline(company);

  return (
    <motion.div
      className={`careops-card ${rarity} ${careOverlay} ${isSelected ? 'selected' : ''}`}
      style={{ background: getMomOpsGradient(nurtureRating, company.harm_index.score) }}
      onClick={onSelect}
      onDoubleClick={onDetail}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.2, 0, 0, 1] }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Shine Effect */}
      <div className="careops-card-shine" />
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="careops-card-selected">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        </div>
      )}

      {/* Top Section - Position & Rating */}
      <div className="careops-card-top">
        <div className="careops-card-rating">
          <div className="careops-rating-number">{nurtureRating}</div>
          <div className="careops-position">{position}</div>
        </div>
        <div className="careops-card-league">
          {company.sector.split(' ')[0]}
        </div>
      </div>

      {/* Company Logo/Symbol */}
      <div className="careops-card-photo">
        <div className="careops-company-circle">
          <span className="careops-company-symbol">
            {company.symbol.slice(0, 3)}
          </span>
        </div>
      </div>

      {/* Company Name */}
      <div className="careops-card-name">
        <div className="careops-company-name">
          {company.name.length > 12 ? `${company.name.slice(0, 12)}...` : company.name}
        </div>
      </div>

      {/* MomOps Stats */}
      <div className="careops-mini-stats">
        <div className="careops-stat-row">
          <div className="careops-stat">
            <span className="careops-stat-value">{momOpsStats.nurture}</span>
            <span className="careops-stat-name">NUR</span>
          </div>
          <div className="careops-stat">
            <span className="careops-stat-value">{momOpsStats.resilience}</span>
            <span className="careops-stat-name">RES</span>
          </div>
        </div>
        <div className="careops-stat-row">
          <div className="careops-stat">
            <span className="careops-stat-value">{momOpsStats.returnStrength}</span>
            <span className="careops-stat-name">RET</span>
          </div>
          <div className="careops-stat">
            <span className="careops-stat-value">{momOpsStats.sustainability}</span>
            <span className="careops-stat-name">SUS</span>
          </div>
        </div>
      </div>

      {/* Market Cap */}
      <div className="careops-card-market-cap">
        ${(company.market_cap / 1000000000).toFixed(0)}B
      </div>

      {/* Care Glyphs */}
      <div className="careops-card-glyphs">
        {careGlyphs.map((glyph, index) => (
          <div key={index} className="careops-glyph" title={glyph.tooltip}>
            <span>{glyph.icon}</span>
          </div>
        ))}
      </div>

      {/* Special Performance Badges */}
      <div className="careops-card-badges">
        {company.care_index.score >= 85 && (
          <div className="careops-badge careops-badge-nurture">
            <Heart className="w-3 h-3" />
          </div>
        )}
        {company.net_integrity.score >= 80 && (
          <div className="careops-badge careops-badge-resilience">
            <Shield className="w-3 h-3" />
          </div>
        )}
        {momOpsStats.sustainability >= 80 && (
          <div className="careops-badge careops-badge-sustainability">
            <Leaf className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Story Mode Tagline */}
      {storyMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="careops-story-tagline"
        >
          <p className="careops-tagline-text">
            {momOpsTagline}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}