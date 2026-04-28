// US Companies (40) - Care Index Global 100
import { Company } from './types';
import { SECTORS, REGIONS, COUNTRIES } from './constants';

export const usCompanies: Company[] = [
  // Technology (15 companies)
  {
    id: "nflx",
    symbol: "NFLX",
    name: "Netflix",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$196.8B",
    employees: "13,000",
    care_index: {
      score: 92,
      band: "A",
      trend: "up",
      trend_change: 3.2
    },
    harm_index: {
      score: 15,
      factors: ["Content concerns", "Screen time impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 95,
        coverage: "Full pay for birth/adoption parents"
      },
      childcare_support: {
        score: 88,
        programs: ["On-site childcare", "Childcare stipends", "Backup care"]
      },
      women_leadership: {
        score: 85,
        percentage: 47
      },
      pay_equity: {
        score: 92,
        certification: true
      },
      family_benefits: {
        score: 90,
        features: ["Fertility support", "Mental health", "Flexible work", "Family leave sharing"]
      }
    },
    story: {
      maternal_voice: "Netflix's unlimited parental leave shows they understand that nurturing families creates stronger communities. Their culture-first approach resonates with maternal values of putting people before profits.",
      investment_thesis: "Industry-leading care policies drive talent retention and creative excellence",
      risk_factors: ["Content controversies", "Competitive streaming market"],
      care_innovations: ["52-week parental leave", "Culture-focused management", "Mental health priority"]
    },
    financial: {
      revenue: "$31.6B",
      growth_rate: 8.2,
      esg_rating: "A-"
    }
  },
  {
    id: "crm",
    symbol: "CRM",
    name: "Salesforce",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$248.5B",
    employees: "79,000",
    care_index: {
      score: 89,
      band: "A",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 12,
      factors: ["Data privacy concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 90,
        coverage: "Full pay plus adoption support"
      },
      childcare_support: {
        score: 85,
        programs: ["Childcare reimbursement", "On-site services", "Emergency backup"]
      },
      women_leadership: {
        score: 88,
        percentage: 33
      },
      pay_equity: {
        score: 95,
        certification: true
      },
      family_benefits: {
        score: 87,
        features: ["Ohana culture", "V2MOM goal setting", "Mindfulness programs", "Volunteer time off"]
      }
    },
    story: {
      maternal_voice: "Salesforce's Ohana culture embodies the village it takes to raise a child. Their equality initiatives and family-focused benefits show deep understanding of care work's value.",
      investment_thesis: "Equality pioneer with strong diversity metrics driving innovation",
      risk_factors: ["Economic downturn impact on enterprise software", "Intense competition"],
      care_innovations: ["Ohana family culture", "Pay equity audits", "Mindfulness at work", "V2MOM alignment"]
    },
    financial: {
      revenue: "$31.4B",
      growth_rate: 11.2,
      esg_rating: "A+"
    }
  },
  {
    id: "msft",
    symbol: "MSFT",
    name: "Microsoft",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$2.8T",
    employees: "221,000",
    care_index: {
      score: 85,
      band: "A",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 18,
      factors: ["Privacy concerns", "Market dominance"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 85,
        coverage: "Full pay for all parents"
      },
      childcare_support: {
        score: 82,
        programs: ["Childcare assistance", "Backup care", "Lactation support"]
      },
      women_leadership: {
        score: 78,
        percentage: 29
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Inclusive hiring", "Accessibility focus", "Mental health", "Hybrid work"]
      }
    },
    story: {
      maternal_voice: "Microsoft's growth mindset mirrors how mothers approach child development - focusing on potential and inclusive growth. Their accessibility commitment shows care for all families.",
      investment_thesis: "Inclusive culture and strong benefits support long-term talent retention",
      risk_factors: ["Regulatory scrutiny", "Cloud competition"],
      care_innovations: ["20-week parental leave", "Accessibility leadership", "Growth mindset culture", "Daily pulse surveys"]
    },
    financial: {
      revenue: "$211.9B",
      growth_rate: 7.5,
      esg_rating: "A"
    }
  },
  {
    id: "googl",
    symbol: "GOOGL",
    name: "Alphabet (Google)",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$1.7T",
    employees: "174,000",
    care_index: {
      score: 83,
      band: "B",
      trend: "stable",
      trend_change: 1.1
    },
    harm_index: {
      score: 25,
      factors: ["Privacy concerns", "Market dominance", "Content moderation"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 82,
        coverage: "Full pay with benefits continuation"
      },
      childcare_support: {
        score: 88,
        programs: ["On-site childcare", "Backup care", "Lactation support", "Family events"]
      },
      women_leadership: {
        score: 75,
        percentage: 27
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 82,
        features: ["Comprehensive health", "Mental health", "Flexible work", "Learning programs"]
      }
    },
    story: {
      maternal_voice: "Google's mission to organize the world's information resonates with mothers who constantly seek knowledge to help their families. Their campus benefits create community connections.",
      investment_thesis: "Tech innovation leader with comprehensive campus benefits and family support",
      risk_factors: ["Regulatory scrutiny", "Privacy concerns", "Market competition"],
      care_innovations: ["18-week parental leave", "On-site childcare", "Campus family community", "Comprehensive benefits"]
    },
    financial: {
      revenue: "$307.4B",
      growth_rate: 8.7,
      esg_rating: "B+"
    }
  },
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$3.0T",
    employees: "164,000",
    care_index: {
      score: 81,
      band: "B",
      trend: "up",
      trend_change: 2.3
    },
    harm_index: {
      score: 22,
      factors: ["Supply chain concerns", "Privacy debates"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 80,
        coverage: "Full pay for birth parents, 6 weeks for partners"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare assistance", "Backup care", "Lactation support"]
      },
      women_leadership: {
        score: 72,
        percentage: 28
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["Comprehensive health", "Mental health", "Fitness programs", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Apple's focus on intuitive design mirrors how mothers think about making life easier for their families. Their premium approach to employee benefits shows investment in people.",
      investment_thesis: "Premium brand with strong employee benefits and family-focused design philosophy",
      risk_factors: ["Supply chain complexity", "Intense competition", "Regulatory pressure"],
      care_innovations: ["16-week parental leave", "Family-focused design", "Premium benefits", "Health focus"]
    },
    financial: {
      revenue: "$394.3B",
      growth_rate: 2.8,
      esg_rating: "B+"
    }
  },
  {
    id: "meta",
    symbol: "META",
    name: "Meta Platforms",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$845.2B",
    employees: "67,317",
    care_index: {
      score: 79,
      band: "B",
      trend: "down",
      trend_change: -1.8
    },
    harm_index: {
      score: 35,
      factors: ["Social media impact", "Privacy concerns", "Content moderation"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 78,
        coverage: "Full pay plus return flexibility"
      },
      childcare_support: {
        score: 82,
        programs: ["Childcare assistance", "Backup care", "Family programs"]
      },
      women_leadership: {
        score: 73,
        percentage: 25
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Comprehensive health", "Mental health focus", "Campus amenities", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Meta's mission to connect people appeals to mothers who value family connections, though concerns about social media's impact on children create maternal ambivalence.",
      investment_thesis: "Social connection platform with strong benefits but facing family-impact scrutiny",
      risk_factors: ["Social media concerns", "Regulatory pressure", "Platform safety", "Metaverse uncertainty"],
      care_innovations: ["16-week parental leave", "Connection focus", "Campus family amenities", "Mental health programs"]
    },
    financial: {
      revenue: "$134.9B",
      growth_rate: 15.7,
      esg_rating: "C+"
    }
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$1.8T",
    employees: "29,600",
    care_index: {
      score: 77,
      band: "B",
      trend: "up",
      trend_change: 3.5
    },
    harm_index: {
      score: 18,
      factors: ["AI ethics concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 85,
        coverage: "Full pay with gradual return options"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Backup care", "Family events"]
      },
      women_leadership: {
        score: 68,
        percentage: 22
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 76,
        features: ["Tech innovation focus", "Health benefits", "Professional development", "Stock programs"]
      }
    },
    story: {
      maternal_voice: "NVIDIA's AI innovation could transform how families access education and healthcare, though the rapid pace of change requires careful consideration of family impacts.",
      investment_thesis: "AI leader with growing focus on family benefits as talent competition intensifies",
      risk_factors: ["AI ethics debates", "Talent competition", "Market volatility", "Regulatory uncertainty"],
      care_innovations: ["20-week parental leave", "AI innovation focus", "Growing family benefits", "Tech leadership"]
    },
    financial: {
      revenue: "$126.0B",
      growth_rate: 35.7,
      esg_rating: "B"
    }
  },
  {
    id: "intc",
    symbol: "INTC",
    name: "Intel",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$198.5B",
    employees: "124,800",
    care_index: {
      score: 75,
      band: "B",
      trend: "stable",
      trend_change: 0.5
    },
    harm_index: {
      score: 20,
      factors: ["Environmental impact", "Supply chain complexity"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 78,
        coverage: "Full pay with return support"
      },
      childcare_support: {
        score: 72,
        programs: ["Childcare assistance", "Backup care", "Family programs"]
      },
      women_leadership: {
        score: 70,
        percentage: 26
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 74,
        features: ["Manufacturing focus", "Health benefits", "Professional development", "Community programs"]
      }
    },
    story: {
      maternal_voice: "Intel's role in powering family technology resonates with mothers, though their traditional tech culture is gradually adapting to modern family needs.",
      investment_thesis: "Semiconductor foundational company with improving family benefits and diversity focus",
      risk_factors: ["Intense competition", "Manufacturing complexity", "Economic sensitivity", "Technology transitions"],
      care_innovations: ["16-week parental leave", "Manufacturing innovation", "Community focus", "Diversity initiatives"]
    },
    financial: {
      revenue: "$79.0B",
      growth_rate: -0.5,
      esg_rating: "B+"
    }
  },
  {
    id: "adbe",
    symbol: "ADBE",
    name: "Adobe",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$240.8B",
    employees: "28,000",
    care_index: {
      score: 82,
      band: "B",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 15,
      factors: ["Creative industry pressures", "Subscription model concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 88,
        coverage: "Full pay with extended leave options"
      },
      childcare_support: {
        score: 80,
        programs: ["Childcare assistance", "Backup care", "Creative programs for families"]
      },
      women_leadership: {
        score: 76,
        percentage: 32
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 81,
        features: ["Creative empowerment", "Mental health focus", "Flexible work", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Adobe's creative tools help families capture and share precious moments, while their employee benefits show they understand that creativity flourishes when families are supported.",
      investment_thesis: "Creative software leader with strong family benefits supporting talent retention",
      risk_factors: ["Creative industry competition", "Economic sensitivity", "Subscription fatigue"],
      care_innovations: ["26-week parental leave", "Creative family focus", "Mental health priority", "Flexible work culture"]
    },
    financial: {
      revenue: "$19.4B",
      growth_rate: 10.1,
      esg_rating: "A-"
    }
  },
  {
    id: "amzn",
    symbol: "AMZN",
    name: "Amazon",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$1.5T",
    employees: "1,525,000",
    care_index: {
      score: 68,
      band: "C",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 35,
      factors: ["Worker conditions", "Market dominance", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 70,
        coverage: "Full pay for birth parents, 6 weeks for partners"
      },
      childcare_support: {
        score: 65,
        programs: ["Childcare assistance", "Emergency backup care", "Some family programs"]
      },
      women_leadership: {
        score: 62,
        percentage: 24
      },
      pay_equity: {
        score: 72,
        certification: true
      },
      family_benefits: {
        score: 68,
        features: ["Career advancement focus", "Health benefits", "Some flexibility", "Stock programs"]
      }
    },
    story: {
      maternal_voice: "Amazon's convenience helps busy families manage daily life, but concerns about worker conditions and work-life balance create tension with maternal values of caring for all families.",
      investment_thesis: "E-commerce giant with improving family benefits but facing worker relations challenges",
      risk_factors: ["Worker relations", "Regulatory scrutiny", "Competition", "Work culture concerns"],
      care_innovations: ["20-week parental leave", "Career advancement", "Family convenience focus", "Growing benefits"]
    },
    financial: {
      revenue: "$574.8B",
      growth_rate: 9.4,
      esg_rating: "C+"
    }
  },
  {
    id: "tsla",
    symbol: "TSLA",
    name: "Tesla",
    sector: SECTORS.Automotive,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$789.3B",
    employees: "140,473",
    care_index: {
      score: 65,
      band: "C",
      trend: "down",
      trend_change: -2.1
    },
    harm_index: {
      score: 38,
      factors: ["Work culture concerns", "Leadership volatility", "Safety issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 12,
        flexibility_score: 65,
        coverage: "Full pay with some flexibility"
      },
      childcare_support: {
        score: 58,
        programs: ["Limited childcare support", "Some family programs"]
      },
      women_leadership: {
        score: 58,
        percentage: 21
      },
      pay_equity: {
        score: 68,
        certification: false
      },
      family_benefits: {
        score: 62,
        features: ["Innovation focus", "Stock programs", "Health benefits", "Some flexibility"]
      }
    },
    story: {
      maternal_voice: "Tesla's mission to accelerate sustainable transport aligns with maternal instincts to protect the planet for future generations, though work culture concerns raise questions about family support.",
      investment_thesis: "Sustainable transportation leader with environmental mission but challenging work culture",
      risk_factors: ["Work culture issues", "Leadership volatility", "Production challenges", "Market competition"],
      care_innovations: ["Environmental mission", "Innovation focus", "Stock benefits", "Gradual improvements"]
    },
    financial: {
      revenue: "$96.8B",
      growth_rate: 18.8,
      esg_rating: "B-"
    }
  },
  {
    id: "orcl",
    symbol: "ORCL",
    name: "Oracle",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$342.1B",
    employees: "164,000",
    care_index: {
      score: 73,
      band: "B",
      trend: "stable",
      trend_change: 0.3
    },
    harm_index: {
      score: 22,
      factors: ["Traditional culture", "Data privacy concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 75,
        coverage: "Full pay with standard benefits"
      },
      childcare_support: {
        score: 70,
        programs: ["Childcare assistance", "Some family programs", "Health benefits"]
      },
      women_leadership: {
        score: 68,
        percentage: 25
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["Traditional benefits", "Health focus", "Professional development", "Stock programs"]
      }
    },
    story: {
      maternal_voice: "Oracle's database technology supports many family-focused applications, though their traditional corporate culture is slowly adapting to modern family needs.",
      investment_thesis: "Enterprise technology leader with stable benefits and gradual modernization",
      risk_factors: ["Traditional culture", "Cloud competition", "Economic sensitivity"],
      care_innovations: ["16-week parental leave", "Technology foundation", "Stable benefits", "Gradual modernization"]
    },
    financial: {
      revenue: "$50.0B",
      growth_rate: 2.9,
      esg_rating: "B"
    }
  },
  {
    id: "cisco",
    symbol: "CSCO",
    name: "Cisco Systems",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$202.4B",
    employees: "84,900",
    care_index: {
      score: 78,
      band: "B",
      trend: "up",
      trend_change: 1.9
    },
    harm_index: {
      score: 18,
      factors: ["Cybersecurity challenges", "Technology complexity"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 82,
        coverage: "Full pay with gradual return support"
      },
      childcare_support: {
        score: 76,
        programs: ["Childcare assistance", "Backup care", "Family programs", "Health support"]
      },
      women_leadership: {
        score: 74,
        percentage: 28
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Network technology focus", "Health benefits", "Professional development", "Community programs"]
      }
    },
    story: {
      maternal_voice: "Cisco's networking technology keeps families connected globally, while their employee benefits show growing understanding of modern family needs in the tech industry.",
      investment_thesis: "Networking technology leader with improving family benefits and strong community focus",
      risk_factors: ["Technology transitions", "Competition", "Economic sensitivity"],
      care_innovations: ["18-week parental leave", "Connection technology", "Community focus", "Growing family benefits"]
    },
    financial: {
      revenue: "$57.0B",
      growth_rate: 0.2,
      esg_rating: "B+"
    }
  },
  {
    id: "pltr",
    symbol: "PLTR",
    name: "Palantir Technologies",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$48.2B",
    employees: "3,500",
    care_index: {
      score: 42,
      band: "D",
      trend: "down",
      trend_change: -2.8
    },
    harm_index: {
      score: 58,
      factors: ["Warfare data mining", "Government surveillance", "Privacy concerns", "Military contracts"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 12,
        flexibility_score: 65,
        coverage: "Standard policy with limited flexibility"
      },
      childcare_support: {
        score: 45,
        programs: ["Basic childcare assistance", "Limited family programs"]
      },
      women_leadership: {
        score: 38,
        percentage: 18
      },
      pay_equity: {
        score: 55,
        certification: false
      },
      family_benefits: {
        score: 48,
        features: ["Tech industry basics", "Some health benefits", "Stock compensation", "Limited work flexibility"]
      }
    },
    story: {
      maternal_voice: "Palantir's data mining for warfare and surveillance creates deep maternal concern about a future where children are constantly monitored and families' privacy is compromised for military purposes.",
      investment_thesis: "Data analytics company with concerning military applications and poor family-care practices",
      risk_factors: ["Ethical concerns", "Military dependence", "Privacy violations", "Public scrutiny", "Limited care culture"],
      care_innovations: ["Basic tech benefits", "Limited modernization", "Minimal family focus", "Surveillance optimization"]
    },
    financial: {
      revenue: "$2.2B",
      growth_rate: 22.1,
      esg_rating: "D+"
    }
  },

  // Healthcare (8 companies)
  {
    id: "jnj",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$445.2B",
    employees: "152,700",
    care_index: {
      score: 88,
      band: "A",
      trend: "stable",
      trend_change: 1.2
    },
    harm_index: {
      score: 22,
      factors: ["Product liability concerns", "Pricing pressures"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 17,
        flexibility_score: 85,
        coverage: "Full pay with gradual return"
      },
      childcare_support: {
        score: 88,
        programs: ["On-site childcare", "Backup care", "Lactation support", "Adoption assistance"]
      },
      women_leadership: {
        score: 82,
        percentage: 44
      },
      pay_equity: {
        score: 90,
        certification: true
      },
      family_benefits: {
        score: 90,
        features: ["Comprehensive healthcare", "Mental health", "Elder care", "Fertility support"]
      }
    },
    story: {
      maternal_voice: "J&J's healthcare mission aligns perfectly with maternal instincts to heal and nurture. Their comprehensive family benefits show they understand health starts at home.",
      investment_thesis: "Healthcare mission naturally aligns with family-focused values and benefits",
      risk_factors: ["Product liability lawsuits", "Healthcare regulatory changes", "Patent cliffs"],
      care_innovations: ["17-week parental leave", "On-site childcare", "Comprehensive family health", "Mental health leadership"]
    },
    financial: {
      revenue: "$85.2B",
      growth_rate: 6.8,
      esg_rating: "A-"
    }
  },
  {
    id: "unh",
    symbol: "UNH",
    name: "UnitedHealth Group",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$527.8B",
    employees: "440,000",
    care_index: {
      score: 74,
      band: "B",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 28,
      factors: ["Healthcare access concerns", "Insurance complexity"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 78,
        coverage: "Full pay with benefits continuation"
      },
      childcare_support: {
        score: 72,
        programs: ["Childcare assistance", "Backup care", "Health programs"]
      },
      women_leadership: {
        score: 70,
        percentage: 42
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 74,
        features: ["Healthcare focus", "Mental health", "Comprehensive benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "UnitedHealth's mission to help people live healthier lives resonates with mothers, though healthcare complexity can create stress for families navigating the system.",
      investment_thesis: "Healthcare services leader with mission alignment but facing access and complexity challenges",
      risk_factors: ["Healthcare reform", "Regulatory pressure", "Cost concerns", "Access issues"],
      care_innovations: ["16-week parental leave", "Healthcare mission", "Mental health focus", "Comprehensive benefits"]
    },
    financial: {
      revenue: "$371.6B",
      growth_rate: 14.2,
      esg_rating: "B+"
    }
  },
  {
    id: "pfizer",
    symbol: "PFE",
    name: "Pfizer",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$158.9B",
    employees: "83,000",
    care_index: {
      score: 80,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 20,
      factors: ["Drug pricing concerns", "Access issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 80,
        coverage: "Full pay with health benefits"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare assistance", "Health programs", "Family support"]
      },
      women_leadership: {
        score: 76,
        percentage: 38
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["Pharmaceutical mission", "Health focus", "Mental health", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Pfizer's pharmaceutical innovations help protect families' health, while their employee benefits show commitment to supporting the families who develop these life-saving medicines.",
      investment_thesis: "Pharmaceutical innovation leader with health-focused mission and growing family benefits",
      risk_factors: ["Drug pricing pressure", "Patent cliffs", "Regulatory changes", "Development risks"],
      care_innovations: ["16-week parental leave", "Health innovation", "Family health focus", "Research excellence"]
    },
    financial: {
      revenue: "$58.5B",
      growth_rate: -42.5,
      esg_rating: "B+"
    }
  },
  {
    id: "abbv",
    symbol: "ABBV",
    name: "AbbVie",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$285.4B",
    employees: "50,000",
    care_index: {
      score: 79,
      band: "B",
      trend: "up",
      trend_change: 1.8
    },
    harm_index: {
      score: 21,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 82,
        coverage: "Full pay with extended options"
      },
      childcare_support: {
        score: 76,
        programs: ["Childcare assistance", "Health programs", "Family wellness"]
      },
      women_leadership: {
        score: 74,
        percentage: 36
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Biopharmaceutical mission", "Health focus", "Wellness programs", "Professional development"]
      }
    },
    story: {
      maternal_voice: "AbbVie's focus on treating serious diseases shows deep care for families facing health challenges, while their employee benefits support the families creating these breakthrough treatments.",
      investment_thesis: "Biopharmaceutical specialist with mission-driven culture and improving family benefits",
      risk_factors: ["Patent cliff risks", "Drug pricing pressure", "Regulatory changes", "Competition"],
      care_innovations: ["18-week parental leave", "Disease treatment focus", "Family wellness", "Mission-driven culture"]
    },
    financial: {
      revenue: "$58.1B",
      growth_rate: 4.1,
      esg_rating: "B+"
    }
  },
  {
    id: "tmo",
    symbol: "TMO",
    name: "Thermo Fisher Scientific",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$208.3B",
    employees: "130,000",
    care_index: {
      score: 76,
      band: "B",
      trend: "stable",
      trend_change: 0.9
    },
    harm_index: {
      score: 18,
      factors: ["Research complexity", "Cost pressures"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 78,
        coverage: "Full pay with research flexibility"
      },
      childcare_support: {
        score: 74,
        programs: ["Childcare assistance", "Research programs", "Health focus"]
      },
      women_leadership: {
        score: 72,
        percentage: 34
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 76,
        features: ["Scientific mission", "Health innovation", "Research focus", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Thermo Fisher's scientific tools help advance medical research that protects children's health, while their employee benefits show commitment to supporting scientific families.",
      investment_thesis: "Life sciences tools leader with research mission and solid family benefits",
      risk_factors: ["Research funding cycles", "Economic sensitivity", "Competition", "Technology changes"],
      care_innovations: ["16-week parental leave", "Scientific mission", "Health research focus", "Innovation culture"]
    },
    financial: {
      revenue: "$44.9B",
      growth_rate: 0.5,
      esg_rating: "B+"
    }
  },
  {
    id: "mrk",
    symbol: "MRK",
    name: "Merck & Co",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$278.1B",
    employees: "68,000",
    care_index: {
      score: 81,
      band: "B",
      trend: "up",
      trend_change: 1.6
    },
    harm_index: {
      score: 19,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 85,
        coverage: "Full pay with comprehensive support"
      },
      childcare_support: {
        score: 80,
        programs: ["Childcare assistance", "Health programs", "Family wellness", "Lactation support"]
      },
      women_leadership: {
        score: 78,
        percentage: 40
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 82,
        features: ["Pharmaceutical innovation", "Health mission", "Mental health focus", "Comprehensive benefits"]
      }
    },
    story: {
      maternal_voice: "Merck's commitment to developing medicines that save lives aligns with maternal instincts to protect and heal, while their strong family benefits support the families behind these innovations.",
      investment_thesis: "Pharmaceutical innovation leader with strong mission alignment and comprehensive family benefits",
      risk_factors: ["Patent expirations", "Drug pricing pressure", "Regulatory changes", "Development risks"],
      care_innovations: ["18-week parental leave", "Life-saving mission", "Family wellness focus", "Mental health priority"]
    },
    financial: {
      revenue: "$60.1B",
      growth_rate: 2.0,
      esg_rating: "A-"
    }
  },
  {
    id: "lly",
    symbol: "LLY",
    name: "Eli Lilly",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$687.2B",
    employees: "39,000",
    care_index: {
      score: 84,
      band: "A",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 16,
      factors: ["Drug pricing concerns", "Access issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 88,
        coverage: "Full pay with extended leave options"
      },
      childcare_support: {
        score: 82,
        programs: ["Comprehensive childcare", "Health programs", "Family wellness", "Adoption support"]
      },
      women_leadership: {
        score: 80,
        percentage: 42
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Diabetes/mental health focus", "Comprehensive health", "Family wellness", "Mental health leadership"]
      }
    },
    story: {
      maternal_voice: "Eli Lilly's focus on diabetes and mental health directly addresses conditions affecting many families, while their exceptional family benefits show they truly understand care work.",
      investment_thesis: "Pharmaceutical leader addressing critical family health needs with exceptional employee benefits",
      risk_factors: ["Drug pricing pressure", "Competition", "Regulatory changes", "Development risks"],
      care_innovations: ["20-week parental leave", "Family health focus", "Mental health mission", "Comprehensive care"]
    },
    financial: {
      revenue: "$34.1B",
      growth_rate: 19.9,
      esg_rating: "A-"
    }
  },
  {
    id: "bmy",
    symbol: "BMY",
    name: "Bristol Myers Squibb",
    sector: SECTORS.Healthcare,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$107.8B",
    employees: "34,300",
    care_index: {
      score: 77,
      band: "B",
      trend: "stable",
      trend_change: 0.6
    },
    harm_index: {
      score: 20,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 80,
        coverage: "Full pay with health focus"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Health programs", "Family support"]
      },
      women_leadership: {
        score: 74,
        percentage: 37
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 77,
        features: ["Oncology focus", "Health innovation", "Mental health", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Bristol Myers Squibb's oncology focus brings hope to families facing cancer, while their employee benefits show commitment to supporting the families developing these life-changing treatments.",
      investment_thesis: "Oncology-focused pharmaceutical company with mission-driven culture and solid family benefits",
      risk_factors: ["Patent cliff risks", "Oncology competition", "Regulatory changes", "Development risks"],
      care_innovations: ["16-week parental leave", "Cancer treatment focus", "Hope mission", "Family health support"]
    },
    financial: {
      revenue: "$45.0B",
      growth_rate: 0.5,
      esg_rating: "B+"
    }
  },

  // Consumer Goods (8 companies)
  {
    id: "pg",
    symbol: "PG",
    name: "Procter & Gamble",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$381.2B",
    employees: "106,000",
    care_index: {
      score: 91,
      band: "A",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 15,
      factors: ["Environmental packaging concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 24,
        flexibility_score: 92,
        coverage: "Full pay with flexible return"
      },
      childcare_support: {
        score: 90,
        programs: ["On-site childcare", "Backup care", "Lactation support", "Adoption assistance"]
      },
      women_leadership: {
        score: 88,
        percentage: 48
      },
      pay_equity: {
        score: 95,
        certification: true
      },
      family_benefits: {
        score: 92,
        features: ["Family-focused products", "Comprehensive health", "Elder care", "Mental health leadership"]
      }
    },
    story: {
      maternal_voice: "P&G makes the products that help families care for each other every day. Their industry-leading parental leave and women's leadership show they truly understand family needs.",
      investment_thesis: "Consumer products company with natural family focus and women leadership",
      risk_factors: ["Consumer spending sensitivity", "Sustainability pressure", "Private label competition"],
      care_innovations: ["24-week parental leave", "Family product mission", "Women leadership", "Comprehensive family benefits"]
    },
    financial: {
      revenue: "$82.0B",
      growth_rate: 2.4,
      esg_rating: "A"
    }
  },
  {
    id: "ko",
    symbol: "KO",
    name: "Coca-Cola",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$266.3B",
    employees: "82,500",
    care_index: {
      score: 72,
      band: "B",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 28,
      factors: ["Health concerns", "Environmental impact", "Sugar content"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 75,
        coverage: "Full pay with standard benefits"
      },
      childcare_support: {
        score: 70,
        programs: ["Childcare assistance", "Some family programs", "Health focus"]
      },
      women_leadership: {
        score: 72,
        percentage: 35
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["Global presence", "Community focus", "Health initiatives", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Coca-Cola brings families together in moments of celebration, though health concerns about sugar content create tension with maternal desires for family wellness.",
      investment_thesis: "Global beverage leader with improving health focus and family benefits",
      risk_factors: ["Health concerns", "Sugar regulations", "Environmental pressure", "Changing consumer preferences"],
      care_innovations: ["16-week parental leave", "Community connection", "Health initiatives", "Global family reach"]
    },
    financial: {
      revenue: "$45.8B",
      growth_rate: 12.0,
      esg_rating: "B+"
    }
  },
  {
    id: "pep",
    symbol: "PEP",
    name: "PepsiCo",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$228.9B",
    employees: "315,000",
    care_index: {
      score: 75,
      band: "B",
      trend: "up",
      trend_change: 2.3
    },
    harm_index: {
      score: 25,
      factors: ["Health concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 80,
        coverage: "Full pay with health focus"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Family programs", "Health initiatives"]
      },
      women_leadership: {
        score: 78,
        percentage: 38
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 76,
        features: ["Health transformation", "Community focus", "Sustainability", "Professional development"]
      }
    },
    story: {
      maternal_voice: "PepsiCo's shift toward healthier options and sustainability shows they're listening to mothers' concerns about family nutrition and environmental impact.",
      investment_thesis: "Food and beverage company transforming toward health and sustainability with improving family benefits",
      risk_factors: ["Health concerns", "Sustainability pressure", "Competition", "Changing preferences"],
      care_innovations: ["18-week parental leave", "Health transformation", "Sustainability focus", "Community programs"]
    },
    financial: {
      revenue: "$91.5B",
      growth_rate: 9.5,
      esg_rating: "B+"
    }
  },
  {
    id: "wmt",
    symbol: "WMT",
    name: "Walmart",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$639.5B",
    employees: "2,100,000",
    care_index: {
      score: 69,
      band: "C",
      trend: "up",
      trend_change: 3.2
    },
    harm_index: {
      score: 32,
      factors: ["Worker wage concerns", "Small business impact", "Labor relations"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 70,
        coverage: "Full pay for birth parents, 6 weeks for partners"
      },
      childcare_support: {
        score: 65,
        programs: ["Childcare assistance", "Some family programs", "Health initiatives"]
      },
      women_leadership: {
        score: 68,
        percentage: 32
      },
      pay_equity: {
        score: 72,
        certification: true
      },
      family_benefits: {
        score: 68,
        features: ["Affordable retail", "Community presence", "Health initiatives", "Career advancement"]
      }
    },
    story: {
      maternal_voice: "Walmart helps families access affordable essentials, though concerns about worker wages create tension with maternal values of fair compensation for all families.",
      investment_thesis: "Retail giant serving family needs with improving worker benefits but facing wage pressure",
      risk_factors: ["Wage pressure", "Labor relations", "Competition", "Economic sensitivity"],
      care_innovations: ["16-week parental leave", "Affordable family access", "Health initiatives", "Career programs"]
    },
    financial: {
      revenue: "$648.1B",
      growth_rate: 6.0,
      esg_rating: "B"
    }
  },
  {
    id: "hd",
    symbol: "HD",
    name: "Home Depot",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$406.8B",
    employees: "504,000",
    care_index: {
      score: 73,
      band: "B",
      trend: "stable",
      trend_change: 1.1
    },
    harm_index: {
      score: 22,
      factors: ["Worker safety concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 12,
        flexibility_score: 72,
        coverage: "Full pay with some flexibility"
      },
      childcare_support: {
        score: 68,
        programs: ["Childcare assistance", "Some family programs", "Health benefits"]
      },
      women_leadership: {
        score: 70,
        percentage: 30
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["Home improvement focus", "Community programs", "Health benefits", "Career advancement"]
      }
    },
    story: {
      maternal_voice: "Home Depot helps families improve their homes and create safe spaces for children, while their employee benefits show growing commitment to supporting working families.",
      investment_thesis: "Home improvement leader serving family needs with solid benefits and community focus",
      risk_factors: ["Economic sensitivity", "Housing market cycles", "Competition", "Safety concerns"],
      care_innovations: ["12-week parental leave", "Home safety focus", "Community programs", "Family home improvement"]
    },
    financial: {
      revenue: "$157.4B",
      growth_rate: 6.8,
      esg_rating: "B+"
    }
  },
  {
    id: "nke",
    symbol: "NKE",
    name: "Nike",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$158.7B",
    employees: "83,700",
    care_index: {
      score: 76,
      band: "B",
      trend: "up",
      trend_change: 2.0
    },
    harm_index: {
      score: 24,
      factors: ["Supply chain concerns", "Labor practices"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 82,
        coverage: "Full pay with gradual return"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare assistance", "Family programs", "Health initiatives", "Sports programs"]
      },
      women_leadership: {
        score: 76,
        percentage: 36
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Sports empowerment", "Health focus", "Diversity initiatives", "Community programs"]
      }
    },
    story: {
      maternal_voice: "Nike's mission to inspire athletes resonates with mothers who want their children to be active and healthy, while their employee benefits show commitment to supporting athletic families.",
      investment_thesis: "Athletic brand with health and empowerment mission plus solid family benefits",
      risk_factors: ["Supply chain issues", "Labor concerns", "Competition", "Economic sensitivity"],
      care_innovations: ["18-week parental leave", "Youth sports focus", "Health mission", "Empowerment programs"]
    },
    financial: {
      revenue: "$51.2B",
      growth_rate: 0.3,
      esg_rating: "B+"
    }
  },
  {
    id: "cost",
    symbol: "COST",
    name: "Costco",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$376.2B",
    employees: "304,000",
    care_index: {
      score: 82,
      band: "B",
      trend: "up",
      trend_change: 1.8
    },
    harm_index: {
      score: 18,
      factors: ["Bulk consumption concerns", "Limited accessibility"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 85,
        coverage: "Full pay with excellent benefits"
      },
      childcare_support: {
        score: 80,
        programs: ["Childcare assistance", "Family programs", "Health benefits", "Educational support"]
      },
      women_leadership: {
        score: 78,
        percentage: 40
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Family value focus", "Excellent wages", "Comprehensive health", "Employee ownership culture"]
      }
    },
    story: {
      maternal_voice: "Costco's family value pricing and excellent employee treatment align with maternal values of both saving for families and ensuring fair treatment of all workers.",
      investment_thesis: "Warehouse club with exceptional employee treatment and family-focused value proposition",
      risk_factors: ["Economic sensitivity", "Competition", "Real estate costs", "Membership model challenges"],
      care_innovations: ["16-week parental leave", "Family value focus", "Exceptional wages", "Employee-first culture"]
    },
    financial: {
      revenue: "$242.3B",
      growth_rate: 7.2,
      esg_rating: "A-"
    }
  },
  {
    id: "sbux",
    symbol: "SBUX",
    name: "Starbucks",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$108.4B",
    employees: "380,000",
    care_index: {
      score: 80,
      band: "B",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 20,
      factors: ["Worker relations", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 85,
        coverage: "Full pay with comprehensive support"
      },
      childcare_support: {
        score: 82,
        programs: ["Childcare assistance", "Family programs", "Health benefits", "Educational support"]
      },
      women_leadership: {
        score: 80,
        percentage: 41
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 82,
        features: ["Community focus", "Educational benefits", "Mental health", "Comprehensive healthcare"]
      }
    },
    story: {
      maternal_voice: "Starbucks creates community spaces where families gather and connect, while their comprehensive employee benefits show understanding of working parent needs.",
      investment_thesis: "Community-focused coffee company with strong employee benefits and family gathering mission",
      risk_factors: ["Labor relations", "Competition", "Economic sensitivity", "Unionization challenges"],
      care_innovations: ["18-week parental leave", "Community spaces", "Educational benefits", "Mental health focus"]
    },
    financial: {
      revenue: "$36.0B",
      growth_rate: 11.5,
      esg_rating: "B+"
    }
  },

  // Financial Services (5 companies)
  {
    id: "jpm",
    symbol: "JPM",
    name: "JPMorgan Chase",
    sector: SECTORS.Financial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$631.4B",
    employees: "309,926",
    care_index: {
      score: 74,
      band: "B",
      trend: "up",
      trend_change: 1.9
    },
    harm_index: {
      score: 26,
      factors: ["Financial complexity", "Regulatory concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 78,
        coverage: "Full pay with gradual return"
      },
      childcare_support: {
        score: 72,
        programs: ["Childcare assistance", "Backup care", "Health programs"]
      },
      women_leadership: {
        score: 70,
        percentage: 34
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 74,
        features: ["Financial services", "Community investment", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "JPMorgan Chase helps families manage their finances and achieve homeownership dreams, while their employee benefits show growing commitment to supporting working families in finance.",
      investment_thesis: "Financial services leader with community focus and improving family benefits",
      risk_factors: ["Economic sensitivity", "Regulatory pressure", "Interest rate risk", "Competition"],
      care_innovations: ["16-week parental leave", "Community investment", "Financial family services", "Career advancement"]
    },
    financial: {
      revenue: "$162.4B",
      growth_rate: 22.1,
      esg_rating: "B+"
    }
  },
  {
    id: "bac",
    symbol: "BAC",
    name: "Bank of America",
    sector: SECTORS.Financial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$335.8B",
    employees: "217,000",
    care_index: {
      score: 72,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 28,
      factors: ["Financial complexity", "Economic impact concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 75,
        coverage: "Full pay with standard benefits"
      },
      childcare_support: {
        score: 70,
        programs: ["Childcare assistance", "Some family programs", "Health benefits"]
      },
      women_leadership: {
        score: 68,
        percentage: 32
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["Banking services", "Community programs", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Bank of America provides essential banking services that help families manage money and plan for the future, while their employee benefits show commitment to financial family stability.",
      investment_thesis: "Major bank with community focus and solid employee benefits supporting family financial needs",
      risk_factors: ["Economic sensitivity", "Regulatory pressure", "Interest rate risk", "Competition"],
      care_innovations: ["16-week parental leave", "Community banking", "Family financial services", "Stability focus"]
    },
    financial: {
      revenue: "$94.9B",
      growth_rate: 4.4,
      esg_rating: "B+"
    }
  },
  {
    id: "wfc",
    symbol: "WFC",
    name: "Wells Fargo",
    sector: SECTORS.Financial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$212.5B",
    employees: "238,000",
    care_index: {
      score: 68,
      band: "C",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 32,
      factors: ["Regulatory issues", "Trust concerns", "Past scandals"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 72,
        coverage: "Full pay with improving support"
      },
      childcare_support: {
        score: 65,
        programs: ["Childcare assistance", "Growing family programs", "Health benefits"]
      },
      women_leadership: {
        score: 65,
        percentage: 30
      },
      pay_equity: {
        score: 72,
        certification: true
      },
      family_benefits: {
        score: 68,
        features: ["Community banking", "Recovery focus", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Wells Fargo is working to rebuild trust with families after past issues, while their improving employee benefits show commitment to supporting both customers and employees better.",
      investment_thesis: "Major bank in recovery mode with improving family benefits and community focus",
      risk_factors: ["Trust issues", "Regulatory pressure", "Economic sensitivity", "Reputation concerns"],
      care_innovations: ["16-week parental leave", "Trust rebuilding", "Community focus", "Improving culture"]
    },
    financial: {
      revenue: "$82.9B",
      growth_rate: 2.4,
      esg_rating: "B"
    }
  },
  {
    id: "gs",
    symbol: "GS",
    name: "Goldman Sachs",
    sector: SECTORS.Financial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$141.2B",
    employees: "45,300",
    care_index: {
      score: 71,
      band: "B",
      trend: "up",
      trend_change: 1.5
    },
    harm_index: {
      score: 29,
      factors: ["Work culture intensity", "Economic inequality concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 80,
        coverage: "Full pay with premium benefits"
      },
      childcare_support: {
        score: 75,
        programs: ["Premium childcare", "Backup care", "Family programs", "Concierge services"]
      },
      women_leadership: {
        score: 72,
        percentage: 28
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 75,
        features: ["Premium benefits", "Financial services", "Professional development", "High compensation"]
      }
    },
    story: {
      maternal_voice: "Goldman Sachs offers premium family benefits that support high-achieving parents, though the intense work culture can create challenges for work-life balance.",
      investment_thesis: "Investment bank with premium family benefits but facing work culture challenges",
      risk_factors: ["Work culture intensity", "Economic sensitivity", "Regulatory pressure", "Market volatility"],
      care_innovations: ["20-week parental leave", "Premium benefits", "High compensation", "Professional development"]
    },
    financial: {
      revenue: "$44.9B",
      growth_rate: -1.6,
      esg_rating: "B"
    }
  },
  {
    id: "ams",
    symbol: "AXP",
    name: "American Express",
    sector: SECTORS.Financial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$184.3B",
    employees: "77,300",
    care_index: {
      score: 78,
      band: "B",
      trend: "up",
      trend_change: 2.2
    },
    harm_index: {
      score: 22,
      factors: ["Credit complexity", "Economic sensitivity"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 20,
        flexibility_score: 85,
        coverage: "Full pay with comprehensive support"
      },
      childcare_support: {
        score: 80,
        programs: ["Childcare assistance", "Backup care", "Family programs", "Travel support"]
      },
      women_leadership: {
        score: 78,
        percentage: 39
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["Premium services", "Travel benefits", "Comprehensive health", "Professional development"]
      }
    },
    story: {
      maternal_voice: "American Express helps families manage finances and travel safely together, while their strong employee benefits show commitment to supporting working parents in financial services.",
      investment_thesis: "Premium financial services with strong family benefits and travel focus appealing to families",
      risk_factors: ["Economic sensitivity", "Competition", "Credit risk", "Technology disruption"],
      care_innovations: ["20-week parental leave", "Family travel focus", "Premium benefits", "Comprehensive support"]
    },
    financial: {
      revenue: "$60.5B",
      growth_rate: 9.0,
      esg_rating: "B+"
    }
  },

  // Industrial & Energy (4 companies)
  {
    id: "ge",
    symbol: "GE",
    name: "General Electric",
    sector: SECTORS.Industrial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$178.9B",
    employees: "172,000",
    care_index: {
      score: 70,
      band: "B",
      trend: "up",
      trend_change: 2.3
    },
    harm_index: {
      score: 30,
      factors: ["Industrial safety", "Environmental impact", "Restructuring impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 16,
        flexibility_score: 75,
        coverage: "Full pay with engineering culture"
      },
      childcare_support: {
        score: 68,
        programs: ["Childcare assistance", "Some family programs", "Health benefits"]
      },
      women_leadership: {
        score: 65,
        percentage: 25
      },
      pay_equity: {
        score: 72,
        certification: true
      },
      family_benefits: {
        score: 70,
        features: ["Industrial innovation", "Engineering culture", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "GE's industrial innovations power the infrastructure that supports family life, while their evolving benefits show commitment to modernizing their traditional engineering culture.",
      investment_thesis: "Industrial conglomerate with essential infrastructure focus and improving family benefits",
      risk_factors: ["Industrial cycles", "Economic sensitivity", "Competition", "Restructuring challenges"],
      care_innovations: ["16-week parental leave", "Infrastructure focus", "Engineering excellence", "Modernizing culture"]
    },
    financial: {
      revenue: "$68.0B",
      growth_rate: -1.2,
      esg_rating: "B"
    }
  },
  {
    id: "cat",
    symbol: "CAT",
    name: "Caterpillar",
    sector: SECTORS.Industrial,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$167.8B",
    employees: "110,000",
    care_index: {
      score: 68,
      band: "C",
      trend: "stable",
      trend_change: 0.7
    },
    harm_index: {
      score: 32,
      factors: ["Industrial safety", "Environmental impact", "Traditional culture"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 12,
        flexibility_score: 70,
        coverage: "Full pay with traditional benefits"
      },
      childcare_support: {
        score: 65,
        programs: ["Some childcare assistance", "Traditional programs", "Health benefits"]
      },
      women_leadership: {
        score: 62,
        percentage: 23
      },
      pay_equity: {
        score: 70,
        certification: true
      },
      family_benefits: {
        score: 67,
        features: ["Industrial strength", "Global presence", "Traditional benefits", "Safety focus"]
      }
    },
    story: {
      maternal_voice: "Caterpillar builds the machines that construct safe communities for families, though their traditional industrial culture is slowly adapting to modern family needs.",
      investment_thesis: "Industrial equipment leader with essential infrastructure role and traditional benefits",
      risk_factors: ["Economic cycles", "Traditional culture", "Environmental pressure", "Competition"],
      care_innovations: ["12-week parental leave", "Infrastructure building", "Safety focus", "Global stability"]
    },
    financial: {
      revenue: "$67.1B",
      growth_rate: 12.7,
      esg_rating: "B"
    }
  },
  {
    id: "xom",
    symbol: "XOM",
    name: "ExxonMobil",
    sector: SECTORS.Energy,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$456.2B",
    employees: "62,000",
    care_index: {
      score: 65,
      band: "C",
      trend: "down",
      trend_change: -1.5
    },
    harm_index: {
      score: 42,
      factors: ["Environmental impact", "Climate concerns", "Traditional energy"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 12,
        flexibility_score: 68,
        coverage: "Full pay with traditional benefits"
      },
      childcare_support: {
        score: 62,
        programs: ["Some childcare assistance", "Traditional programs", "Health benefits"]
      },
      women_leadership: {
        score: 58,
        percentage: 21
      },
      pay_equity: {
        score: 68,
        certification: false
      },
      family_benefits: {
        score: 65,
        features: ["Energy industry", "Traditional benefits", "Global presence", "Engineering focus"]
      }
    },
    story: {
      maternal_voice: "ExxonMobil provides energy that powers family life, but environmental concerns about climate impact create tension with maternal instincts to protect the planet for children.",
      investment_thesis: "Energy giant with essential role but facing environmental transition pressures",
      risk_factors: ["Environmental pressure", "Climate regulations", "Energy transition", "Traditional culture"],
      care_innovations: ["12-week parental leave", "Energy provision", "Engineering excellence", "Traditional stability"]
    },
    financial: {
      revenue: "$365.0B",
      growth_rate: 17.5,
      esg_rating: "C"
    }
  },
  {
    id: "cvx",
    symbol: "CVX",
    name: "Chevron",
    sector: SECTORS.Energy,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.US,
    market_cap: "$294.8B",
    employees: "47,600",
    care_index: {
      score: 67,
      band: "C",
      trend: "stable",
      trend_change: 0.2
    },
    harm_index: {
      score: 40,
      factors: ["Environmental impact", "Climate concerns", "Traditional energy"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 14,
        flexibility_score: 70,
        coverage: "Full pay with improving benefits"
      },
      childcare_support: {
        score: 65,
        programs: ["Childcare assistance", "Some family programs", "Health benefits"]
      },
      women_leadership: {
        score: 60,
        percentage: 22
      },
      pay_equity: {
        score: 70,
        certification: true
      },
      family_benefits: {
        score: 67,
        features: ["Energy provision", "Global presence", "Traditional benefits", "Safety focus"]
      }
    },
    story: {
      maternal_voice: "Chevron provides reliable energy for families while working on cleaner technologies, though the pace of environmental transition raises concerns about long-term planetary health.",
      investment_thesis: "Energy company with improving benefits and gradual transition to cleaner energy",
      risk_factors: ["Environmental pressure", "Climate regulations", "Energy transition", "Competition"],
      care_innovations: ["14-week parental leave", "Energy reliability", "Safety focus", "Gradual modernization"]
    },
    financial: {
      revenue: "$200.5B",
      growth_rate: -14.8,
      esg_rating: "C+"
    }
  }
];