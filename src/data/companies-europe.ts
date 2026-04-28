// European Companies (40) - Care Index Global 100
import { Company } from './types';
import { SECTORS, REGIONS, COUNTRIES } from './constants';

export const europeCompanies: Company[] = [
  // United Kingdom (12 companies)
  {
    id: "ul",
    symbol: "UL",
    name: "Unilever",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$136.2B",
    employees: "190,000",
    care_index: {
      score: 93,
      band: "A",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 12,
      factors: ["Packaging sustainability"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 95,
        coverage: "Full pay with shared parental leave"
      },
      childcare_support: {
        score: 92,
        programs: ["On-site childcare", "Emergency care", "Global support", "Lactation facilities"]
      },
      women_leadership: {
        score: 90,
        percentage: 51
      },
      pay_equity: {
        score: 95,
        certification: true
      },
      family_benefits: {
        score: 93,
        features: ["Sustainable living mission", "Mental health leadership", "Global flexibility", "Purpose-driven culture"]
      }
    },
    story: {
      maternal_voice: "Unilever's sustainable living mission and exceptional parental leave embody the long-term thinking mothers bring to nurturing both families and the planet.",
      investment_thesis: "Sustainability leader with exceptional diversity and family-friendly policies",
      risk_factors: ["Consumer goods competition", "Sustainability costs", "Global operations complexity"],
      care_innovations: ["26-week parental leave", "Sustainable living mission", "Women leadership", "Purpose-driven culture"]
    },
    financial: {
      revenue: "$59.6B",
      growth_rate: 4.2,
      esg_rating: "A+"
    }
  },
  {
    id: "astrazeneca",
    symbol: "AZN",
    name: "AstraZeneca",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$198.4B",
    employees: "89,400",
    care_index: {
      score: 86,
      band: "A",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 14,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 92,
        coverage: "UK statutory plus company enhancements"
      },
      childcare_support: {
        score: 88,
        programs: ["Comprehensive childcare", "Emergency care", "Health programs", "Global support"]
      },
      women_leadership: {
        score: 85,
        percentage: 46
      },
      pay_equity: {
        score: 92,
        certification: true
      },
      family_benefits: {
        score: 88,
        features: ["Healthcare mission", "Mental health focus", "Global flexibility", "Professional development"]
      }
    },
    story: {
      maternal_voice: "AstraZeneca's pharmaceutical innovations protect children's health globally, while their exceptional parental leave shows deep understanding of family care needs.",
      investment_thesis: "Pharmaceutical innovation leader with healthcare mission and outstanding family benefits",
      risk_factors: ["Drug development risks", "Patent cliffs", "Regulatory changes", "Competition"],
      care_innovations: ["39-week parental leave", "Healthcare mission", "Global health access", "Family health focus"]
    },
    financial: {
      revenue: "$45.8B",
      growth_rate: 6.0,
      esg_rating: "A-"
    }
  },
  {
    id: "bp",
    symbol: "BP",
    name: "BP",
    sector: SECTORS.Energy,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$103.2B",
    employees: "66,800",
    care_index: {
      score: 71,
      band: "B",
      trend: "up",
      trend_change: 3.2
    },
    harm_index: {
      score: 35,
      factors: ["Environmental impact", "Climate transition", "Historical spills"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 88,
        coverage: "UK statutory plus enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Family programs", "Health benefits", "Global support"]
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
        score: 74,
        features: ["Energy transition focus", "Health benefits", "Global flexibility", "Professional development"]
      }
    },
    story: {
      maternal_voice: "BP's transition to cleaner energy aligns with maternal concerns about climate impact on children's futures, while their UK benefits show strong family support.",
      investment_thesis: "Energy company in transition with improving sustainability and solid family benefits",
      risk_factors: ["Climate transition", "Environmental regulations", "Energy market volatility", "Stranded assets"],
      care_innovations: ["39-week parental leave", "Clean energy transition", "Sustainability focus", "UK family benefits"]
    },
    financial: {
      revenue: "$241.4B",
      growth_rate: -35.2,
      esg_rating: "B-"
    }
  },
  {
    id: "vodafone",
    symbol: "VOD",
    name: "Vodafone",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$22.8B",
    employees: "96,506",
    care_index: {
      score: 82,
      band: "B",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 18,
      factors: ["Technology complexity", "Digital divide concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 90,
        coverage: "UK statutory plus company enhancements"
      },
      childcare_support: {
        score: 85,
        programs: ["Comprehensive childcare", "Emergency care", "Technology programs", "Global support"]
      },
      women_leadership: {
        score: 80,
        percentage: 38
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 82,
        features: ["Digital connectivity", "Family technology", "Mental health focus", "Flexible work"]
      }
    },
    story: {
      maternal_voice: "Vodafone keeps families connected globally, enabling grandparents to see grandchildren and parents to stay in touch, while their generous parental leave supports new families.",
      investment_thesis: "Telecommunications leader with family connection mission and excellent UK benefits",
      risk_factors: ["Telecom competition", "Technology disruption", "Regulatory pressure", "Economic sensitivity"],
      care_innovations: ["52-week parental leave", "Family connectivity", "Digital inclusion", "Mental health focus"]
    },
    financial: {
      revenue: "$43.8B",
      growth_rate: -4.1,
      esg_rating: "B+"
    }
  },
  {
    id: "diageo",
    symbol: "DGE",
    name: "Diageo",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$78.5B",
    employees: "28,000",
    care_index: {
      score: 78,
      band: "B",
      trend: "stable",
      trend_change: 1.2
    },
    harm_index: {
      score: 32,
      factors: ["Alcohol-related health concerns", "Social responsibility"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 88,
        coverage: "UK statutory plus premium enhancements"
      },
      childcare_support: {
        score: 80,
        programs: ["Childcare assistance", "Family programs", "Health benefits", "Global support"]
      },
      women_leadership: {
        score: 78,
        percentage: 42
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Responsible drinking", "Premium benefits", "Global diversity", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Diageo's responsible drinking initiatives show awareness of alcohol's impact on families, while their premium employee benefits demonstrate care for their own working families.",
      investment_thesis: "Premium spirits company with responsible approach and excellent employee benefits",
      risk_factors: ["Health concerns", "Regulatory pressure", "Economic sensitivity", "Social responsibility expectations"],
      care_innovations: ["52-week parental leave", "Responsible drinking", "Premium benefits", "Global diversity"]
    },
    financial: {
      revenue: "$20.3B",
      growth_rate: 6.5,
      esg_rating: "B+"
    }
  },
  {
    id: "reckitt",
    symbol: "RKT",
    name: "Reckitt",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$48.9B",
    employees: "40,000",
    care_index: {
      score: 85,
      band: "A",
      trend: "up",
      trend_change: 2.4
    },
    harm_index: {
      score: 15,
      factors: ["Product safety concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 90,
        coverage: "UK statutory plus company enhancements"
      },
      childcare_support: {
        score: 88,
        programs: ["Comprehensive childcare", "Health products", "Family programs", "Global support"]
      },
      women_leadership: {
        score: 82,
        percentage: 44
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 86,
        features: ["Family hygiene products", "Health mission", "Mental health focus", "Purpose-driven"]
      }
    },
    story: {
      maternal_voice: "Reckitt makes the products that keep families healthy and safe, from baby formula to cleaning products, while their generous benefits support their employees' families too.",
      investment_thesis: "Health and hygiene company with natural family focus and mission alignment",
      risk_factors: ["Product safety", "Regulatory changes", "Competition", "Supply chain complexity"],
      care_innovations: ["39-week parental leave", "Family health products", "Hygiene mission", "Safety focus"]
    },
    financial: {
      revenue: "$16.5B",
      growth_rate: -1.8,
      esg_rating: "A-"
    }
  },
  {
    id: "bt",
    symbol: "BT.A",
    name: "BT Group",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$12.4B",
    employees: "99,500",
    care_index: {
      score: 73,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 27,
      factors: ["Digital divide concerns", "Legacy infrastructure"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 85,
        coverage: "UK statutory plus telecom enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Family programs", "Technology support", "Flexible work"]
      },
      women_leadership: {
        score: 68,
        percentage: 32
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["Digital connectivity", "Remote work", "Mental health", "Skills development"]
      }
    },
    story: {
      maternal_voice: "BT Group connects families across the UK and globally, enabling remote work that helps parents balance career and family life.",
      investment_thesis: "UK telecommunications leader with strong family connectivity mission",
      risk_factors: ["Infrastructure investment", "Competition", "Regulatory pressure", "Technology transition"],
      care_innovations: ["52-week parental leave", "Family connectivity", "Remote work enablement", "Digital inclusion"]
    },
    financial: {
      revenue: "$23.1B",
      growth_rate: -1.2,
      esg_rating: "B"
    }
  },
  {
    id: "lloy",
    symbol: "LLOY",
    name: "Lloyds Banking Group",
    sector: SECTORS.Financial,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$35.2B",
    employees: "63,000",
    care_index: {
      score: 76,
      band: "B",
      trend: "up",
      trend_change: 1.5
    },
    harm_index: {
      score: 24,
      factors: ["Financial exclusion concerns", "Economic cycles"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 88,
        coverage: "UK statutory plus banking enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare support", "Emergency care", "Family programs", "Financial education"]
      },
      women_leadership: {
        score: 80,
        percentage: 47
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 77,
        features: ["Financial wellness", "Mental health support", "Career flexibility", "Community investment"]
      }
    },
    story: {
      maternal_voice: "Lloyds supports families' financial wellbeing and dreams, helping them buy homes and plan for children's futures while providing excellent family benefits to their own employees.",
      investment_thesis: "UK banking leader with family financial wellbeing focus and strong employee benefits",
      risk_factors: ["Economic cycles", "Interest rate sensitivity", "Regulatory changes", "Competition"],
      care_innovations: ["52-week parental leave", "Family financial wellness", "Women leadership", "Community support"]
    },
    financial: {
      revenue: "$24.8B",
      growth_rate: 8.2,
      esg_rating: "B+"
    }
  },
  {
    id: "rr",
    symbol: "RR",
    name: "Rolls-Royce",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$28.5B",
    employees: "42,000",
    care_index: {
      score: 74,
      band: "B",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 28,
      factors: ["Environmental impact", "Defense industry involvement"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 82,
        coverage: "UK statutory plus aerospace enhancements"
      },
      childcare_support: {
        score: 72,
        programs: ["Childcare assistance", "Engineering programs", "STEM education", "Family support"]
      },
      women_leadership: {
        score: 65,
        percentage: 28
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 74,
        features: ["Engineering excellence", "Innovation focus", "Skills development", "UK manufacturing"]
      }
    },
    story: {
      maternal_voice: "Rolls-Royce's engineering excellence powers the aircraft that safely carry families around the world, while their STEM programs inspire the next generation of engineers.",
      investment_thesis: "Engineering leader in aerospace and power systems with innovation focus",
      risk_factors: ["Aerospace cycles", "Environmental regulations", "Competition", "Economic sensitivity"],
      care_innovations: ["39-week parental leave", "STEM education", "Engineering excellence", "Innovation culture"]
    },
    financial: {
      revenue: "$18.9B",
      growth_rate: 15.4,
      esg_rating: "B"
    }
  },
  {
    id: "gsk",
    symbol: "GSK",
    name: "GSK",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$65.8B",
    employees: "76,000",
    care_index: {
      score: 81,
      band: "B",
      trend: "up",
      trend_change: 2.3
    },
    harm_index: {
      score: 19,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 88,
        coverage: "UK statutory plus pharmaceutical enhancements"
      },
      childcare_support: {
        score: 82,
        programs: ["Comprehensive childcare", "Health programs", "Emergency care", "Global support"]
      },
      women_leadership: {
        score: 78,
        percentage: 42
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 82,
        features: ["Healthcare mission", "Global health access", "Mental health focus", "Science education"]
      }
    },
    story: {
      maternal_voice: "GSK's vaccines and medicines protect children from disease worldwide, while their comprehensive family benefits show they understand the importance of supporting working families.",
      investment_thesis: "Global healthcare company with strong vaccine portfolio and family-friendly policies",
      risk_factors: ["Drug development risks", "Patent cliffs", "Regulatory changes", "Competition"],
      care_innovations: ["39-week parental leave", "Global health mission", "Vaccine development", "Healthcare access"]
    },
    financial: {
      revenue: "$35.2B",
      growth_rate: 12.8,
      esg_rating: "A-"
    }
  },
  {
    id: "aht",
    symbol: "AHT",
    name: "Ashtead Group",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.UK,
    market_cap: "$31.2B",
    employees: "27,000",
    care_index: {
      score: 69,
      band: "C",
      trend: "stable",
      trend_change: 0.5
    },
    harm_index: {
      score: 31,
      factors: ["Construction safety concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 39,
        flexibility_score: 75,
        coverage: "UK statutory plus industrial enhancements"
      },
      childcare_support: {
        score: 68,
        programs: ["Basic childcare support", "Safety programs", "Skills training", "Family assistance"]
      },
      women_leadership: {
        score: 58,
        percentage: 22
      },
      pay_equity: {
        score: 72,
        certification: true
      },
      family_benefits: {
        score: 68,
        features: ["Safety focus", "Skills development", "Construction innovation", "Community support"]
      }
    },
    story: {
      maternal_voice: "Ashtead provides the equipment that builds the infrastructure families depend on, while working to improve safety and support in traditionally male-dominated industries.",
      investment_thesis: "Equipment rental leader with improving safety culture and diversity initiatives",
      risk_factors: ["Construction cycles", "Economic sensitivity", "Safety concerns", "Competition"],
      care_innovations: ["39-week parental leave", "Safety innovation", "Skills development", "Infrastructure building"]
    },
    financial: {
      revenue: "$9.1B",
      growth_rate: 18.2,
      esg_rating: "B-"
    }
  },



  // Germany (10 companies)
  {
    id: "sap",
    symbol: "SAP",
    name: "SAP",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$230.4B",
    employees: "112,100",
    care_index: {
      score: 86,
      band: "A",
      trend: "up",
      trend_change: 2.2
    },
    harm_index: {
      score: 15,
      factors: ["Digital transformation disruption"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 88,
        coverage: "German policy plus company enhancements"
      },
      childcare_support: {
        score: 85,
        programs: ["On-site childcare", "Emergency care", "Global support"]
      },
      women_leadership: {
        score: 80,
        percentage: 35
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 86,
        features: ["German work culture", "Mental health", "Flexible work", "Professional development"]
      }
    },
    story: {
      maternal_voice: "SAP's German work-life balance culture and comprehensive family benefits show they understand that supporting families creates better technology solutions for everyone.",
      investment_thesis: "German tech leader with strong work culture and family-friendly policies",
      risk_factors: ["Enterprise software competition", "Digital transformation challenges", "Economic sensitivity"],
      care_innovations: ["52-week parental leave", "German work culture", "Technology innovation", "Family-work balance"]
    },
    financial: {
      revenue: "$33.3B",
      growth_rate: 2.1,
      esg_rating: "A-"
    }
  },
  {
    id: "sie",
    symbol: "SIE",
    name: "Siemens",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$128.7B",
    employees: "320,000",
    care_index: {
      score: 81,
      band: "B",
      trend: "up",
      trend_change: 1.8
    },
    harm_index: {
      score: 19,
      factors: ["Industrial complexity", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 85,
        coverage: "German policy plus enhancements"
      },
      childcare_support: {
        score: 82,
        programs: ["On-site childcare", "Emergency care", "Industrial programs", "Global support"]
      },
      women_leadership: {
        score: 75,
        percentage: 32
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["German engineering culture", "Industrial innovation", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Siemens builds the infrastructure and technology that makes modern family life possible, while their German work culture provides strong family support.",
      investment_thesis: "Industrial technology leader with German work culture and solid family benefits",
      risk_factors: ["Industrial cycles", "Economic sensitivity", "Technology transitions", "Competition"],
      care_innovations: ["52-week parental leave", "Infrastructure building", "German culture", "Technology innovation"]
    },
    financial: {
      revenue: "$78.6B",
      growth_rate: 11.9,
      esg_rating: "B+"
    }
  },
  {
    id: "bmw",
    symbol: "BMW",
    name: "BMW",
    sector: SECTORS.Automotive,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$58.9B",
    employees: "149,475",
    care_index: {
      score: 79,
      band: "B",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 28,
      factors: ["Environmental impact", "Luxury consumption concerns", "Traditional automotive"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 82,
        coverage: "German policy plus automotive enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare assistance", "Family programs", "Health benefits", "Global support"]
      },
      women_leadership: {
        score: 72,
        percentage: 30
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["German automotive culture", "Premium benefits", "Safety focus", "Professional development"]
      }
    },
    story: {
      maternal_voice: "BMW creates premium vehicles that keep families safe while transitioning to electric mobility for cleaner air for children, supported by strong German family benefits.",
      investment_thesis: "Premium automotive with electric transition and German work culture benefits",
      risk_factors: ["Electric transition", "Luxury market sensitivity", "Competition", "Environmental regulations"],
      care_innovations: ["52-week parental leave", "Electric transition", "Family safety focus", "Premium benefits"]
    },
    financial: {
      revenue: "$155.5B",
      growth_rate: 9.8,
      esg_rating: "B+"
    }
  },
  {
    id: "bas",
    symbol: "BAS",
    name: "BASF",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$42.1B",
    employees: "111,047",
    care_index: {
      score: 76,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 32,
      factors: ["Chemical industry concerns", "Environmental impact", "Safety issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 80,
        coverage: "German policy plus chemical industry enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Chemical safety programs", "Health benefits", "Global support"]
      },
      women_leadership: {
        score: 70,
        percentage: 28
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 75,
        features: ["German chemical culture", "Safety focus", "Health benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "BASF's chemicals are essential for many family products, while their German work culture provides solid family support despite chemical industry concerns.",
      investment_thesis: "Chemical industry leader with essential products and German family benefits",
      risk_factors: ["Chemical safety", "Environmental regulations", "Economic sensitivity", "Sustainability pressure"],
      care_innovations: ["52-week parental leave", "Essential chemicals", "Safety focus", "German benefits"]
    },
    financial: {
      revenue: "$87.3B",
      growth_rate: -12.7,
      esg_rating: "B"
    }
  },
  {
    id: "bay",
    symbol: "BAY",
    name: "Bayer",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$25.8B",
    employees: "99,538",
    care_index: {
      score: 74,
      band: "B",
      trend: "down",
      trend_change: -1.8
    },
    harm_index: {
      score: 38,
      factors: ["Roundup litigation", "Agricultural concerns", "Product liability"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 82,
        coverage: "German policy plus pharmaceutical enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Health programs", "Agricultural safety", "Global support"]
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
        score: 74,
        features: ["Healthcare mission", "Agricultural innovation", "German benefits", "Professional development"]
      }
    },
    story: {
      maternal_voice: "Bayer's healthcare and agricultural innovations help feed and heal families, though litigation concerns about product safety create maternal anxiety about family health.",
      investment_thesis: "Pharmaceutical and agricultural company with essential missions but facing product liability challenges",
      risk_factors: ["Product liability", "Agricultural regulations", "Legal costs", "Reputation concerns"],
      care_innovations: ["52-week parental leave", "Healthcare mission", "Food security", "German family benefits"]
    },
    financial: {
      revenue: "$52.3B",
      growth_rate: 2.5,
      esg_rating: "C+"
    }
  },
  {
    id: "vow3",
    symbol: "VOW3",
    name: "Volkswagen",
    sector: SECTORS.Automotive,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$42.8B",
    employees: "675,000",
    care_index: {
      score: 72,
      band: "B",
      trend: "stable",
      trend_change: 0.3
    },
    harm_index: {
      score: 42,
      factors: ["Dieselgate legacy", "Environmental impact", "Emissions scandal"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 80,
        coverage: "German policy plus automotive enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["On-site childcare", "Family programs", "Automotive training", "Global support"]
      },
      women_leadership: {
        score: 68,
        percentage: 26
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 72,
        features: ["German automotive culture", "Electric transition", "Manufacturing heritage", "Skills development"]
      }
    },
    story: {
      maternal_voice: "Volkswagen is transitioning to electric vehicles for cleaner air for our children, while their strong German work culture supports manufacturing families worldwide.",
      investment_thesis: "Major automotive player transitioning to electric with strong German work culture",
      risk_factors: ["Electric transition costs", "Legacy issues", "Competition", "Environmental regulations"],
      care_innovations: ["52-week parental leave", "Electric vehicle transition", "Manufacturing jobs", "German benefits"]
    },
    financial: {
      revenue: "$328.6B",
      growth_rate: 12.2,
      esg_rating: "C+"
    }
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Mercedes-Benz Group",
    sector: SECTORS.Automotive,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$68.4B",
    employees: "172,425",
    care_index: {
      score: 77,
      band: "B",
      trend: "up",
      trend_change: 1.9
    },
    harm_index: {
      score: 29,
      factors: ["Luxury consumption concerns", "Environmental impact", "Traditional automotive"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 83,
        coverage: "German policy plus premium automotive enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Premium childcare", "Family programs", "Luxury benefits", "Global support"]
      },
      women_leadership: {
        score: 70,
        percentage: 29
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 77,
        features: ["Luxury automotive culture", "Premium benefits", "Safety innovation", "German engineering"]
      }
    },
    story: {
      maternal_voice: "Mercedes-Benz creates the safest luxury vehicles for families while pioneering electric mobility, supported by premium German work culture and family benefits.",
      investment_thesis: "Luxury automotive leader with electric transition and premium German benefits",
      risk_factors: ["Electric transition", "Luxury market cycles", "Competition", "Environmental regulations"],
      care_innovations: ["52-week parental leave", "Safety innovation", "Electric luxury", "Premium benefits"]
    },
    financial: {
      revenue: "$176.2B",
      growth_rate: 7.4,
      esg_rating: "B"
    }
  },
  {
    id: "dte",
    symbol: "DTE",
    name: "Deutsche Telekom",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$98.2B",
    employees: "216,500",
    care_index: {
      score: 75,
      band: "B",
      trend: "stable",
      trend_change: 0.7
    },
    harm_index: {
      score: 25,
      factors: ["Digital divide concerns", "Privacy issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 85,
        coverage: "German policy plus telecom enhancements"
      },
      childcare_support: {
        score: 76,
        programs: ["Childcare support", "Technology programs", "Digital education", "Family connectivity"]
      },
      women_leadership: {
        score: 72,
        percentage: 31
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 75,
        features: ["Digital connectivity", "German work culture", "Technology access", "Remote work support"]
      }
    },
    story: {
      maternal_voice: "Deutsche Telekom keeps families connected across Europe and globally, enabling video calls with grandparents and supporting remote work for better family balance.",
      investment_thesis: "European telecom leader with family connectivity mission and German work culture",
      risk_factors: ["Telecom competition", "Technology disruption", "Regulatory pressure", "Investment costs"],
      care_innovations: ["52-week parental leave", "Family connectivity", "Digital inclusion", "Remote work enablement"]
    },
    financial: {
      revenue: "$114.4B",
      growth_rate: 3.8,
      esg_rating: "B+"
    }
  },
  {
    id: "adidas",
    symbol: "ADS",
    name: "Adidas",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.Germany,
    market_cap: "$32.1B",
    employees: "59,000",
    care_index: {
      score: 73,
      band: "B",
      trend: "stable",
      trend_change: 0.2
    },
    harm_index: {
      score: 27,
      factors: ["Supply chain concerns", "Manufacturing conditions"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 78,
        coverage: "German policy plus sports industry enhancements"
      },
      childcare_support: {
        score: 72,
        programs: ["Sports programs", "Active family initiatives", "Health benefits", "Global support"]
      },
      women_leadership: {
        score: 75,
        percentage: 38
      },
      pay_equity: {
        score: 76,
        certification: true
      },
      family_benefits: {
        score: 73,
        features: ["Sports culture", "Active lifestyle", "Health focus", "German benefits"]
      }
    },
    story: {
      maternal_voice: "Adidas encourages active family lifestyles and sports participation that build healthy habits in children, while providing solid German work culture benefits.",
      investment_thesis: "Global sports brand with active lifestyle mission and improving family benefits",
      risk_factors: ["Fashion cycles", "Supply chain challenges", "Competition", "Economic sensitivity"],
      care_innovations: ["52-week parental leave", "Active family programs", "Sports participation", "Health focus"]
    },
    financial: {
      revenue: "$22.5B",
      growth_rate: -1.1,
      esg_rating: "B-"
    }
  },

  // France (9 companies - including Eurofins)
  {
    id: "or",
    symbol: "OR",
    name: "L'Oréal",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$204.8B",
    employees: "85,412",
    care_index: {
      score: 83,
      band: "B",
      trend: "up",
      trend_change: 2.2
    },
    harm_index: {
      score: 18,
      factors: ["Beauty industry pressures"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 85,
        coverage: "French policy plus beauty industry enhancements"
      },
      childcare_support: {
        score: 82,
        programs: ["Comprehensive childcare", "Beauty industry perks", "Global support"]
      },
      women_leadership: {
        score: 88,
        percentage: 55
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Women-focused industry", "Beauty empowerment", "French culture", "Global diversity"]
      }
    },
    story: {
      maternal_voice: "L'Oréal's women-focused beauty mission and majority-female leadership naturally align with maternal values of empowerment and helping people feel confident and beautiful.",
      investment_thesis: "Beauty company with strong female leadership and women-empowerment focus",
      risk_factors: ["Beauty industry competition", "Sustainability pressure", "Cultural sensitivity"],
      care_innovations: ["26-week parental leave", "Women leadership", "Beauty empowerment", "Global diversity"]
    },
    financial: {
      revenue: "$41.2B",
      growth_rate: 11.2,
      esg_rating: "A-"
    }
  },
  {
    id: "lvmh",
    symbol: "MC",
    name: "LVMH",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$378.2B",
    employees: "213,000",
    care_index: {
      score: 79,
      band: "B",
      trend: "stable",
      trend_change: 1.1
    },
    harm_index: {
      score: 25,
      factors: ["Luxury consumption concerns", "Environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 82,
        coverage: "French policy plus luxury industry enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare assistance", "Luxury benefits", "Global support", "Cultural programs"]
      },
      women_leadership: {
        score: 75,
        percentage: 40
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Luxury craftsmanship", "Cultural appreciation", "French benefits", "Global diversity"]
      }
    },
    story: {
      maternal_voice: "LVMH's luxury craftsmanship celebrates beauty and artistry that families treasure for generations, while their French benefits show commitment to work-life balance.",
      investment_thesis: "Luxury goods leader with craftsmanship focus and French work culture benefits",
      risk_factors: ["Luxury market sensitivity", "Economic cycles", "Sustainability pressure", "Cultural challenges"],
      care_innovations: ["26-week parental leave", "Craftsmanship heritage", "Cultural appreciation", "French benefits"]
    },
    financial: {
      revenue: "$86.2B",
      growth_rate: 9.1,
      esg_rating: "B+"
    }
  },
  {
    id: "sanofi",
    symbol: "SNY",
    name: "Sanofi",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$125.3B",
    employees: "99,412",
    care_index: {
      score: 82,
      band: "B",
      trend: "up",
      trend_change: 1.9
    },
    harm_index: {
      score: 18,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 88,
        coverage: "French policy plus pharmaceutical enhancements"
      },
      childcare_support: {
        score: 85,
        programs: ["Comprehensive childcare", "Health programs", "Global support", "Medical benefits"]
      },
      women_leadership: {
        score: 78,
        percentage: 43
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 83,
        features: ["Healthcare mission", "Global health access", "French culture", "Medical excellence"]
      }
    },
    story: {
      maternal_voice: "Sanofi's pharmaceutical innovations protect children's health worldwide, while their comprehensive family benefits show they care for their employees' families as much as global health.",
      investment_thesis: "Global pharmaceutical company with healthcare mission and strong French family benefits",
      risk_factors: ["Drug development risks", "Patent cliffs", "Regulatory changes", "Access pressures"],
      care_innovations: ["26-week parental leave", "Global health mission", "Medical innovation", "Comprehensive benefits"]
    },
    financial: {
      revenue: "$43.2B",
      growth_rate: 2.8,
      esg_rating: "A-"
    }
  },
  {
    id: "air",
    symbol: "AIR",
    name: "Airbus",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$104.8B",
    employees: "134,000",
    care_index: {
      score: 77,
      band: "B",
      trend: "up",
      trend_change: 1.8
    },
    harm_index: {
      score: 23,
      factors: ["Aviation environmental impact", "Safety concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 80,
        coverage: "French policy plus aerospace enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare assistance", "Aviation programs", "Global support", "Safety focus"]
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
        score: 76,
        features: ["Aviation safety", "Global connectivity", "French culture", "Engineering excellence"]
      }
    },
    story: {
      maternal_voice: "Airbus connects families across the globe safely while working on cleaner aviation technologies, supported by French work culture that values family time.",
      investment_thesis: "Aerospace leader connecting families globally with improving environmental focus",
      risk_factors: ["Aviation cycles", "Environmental regulations", "Safety concerns", "Economic sensitivity"],
      care_innovations: ["26-week parental leave", "Family connectivity", "Safety excellence", "Environmental innovation"]
    },
    financial: {
      revenue: "$70.8B",
      growth_rate: 11.0,
      esg_rating: "B+"
    }
  },
  {
    id: "totalenergies",
    symbol: "TTE",
    name: "TotalEnergies",
    sector: SECTORS.Energy,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$142.5B",
    employees: "105,000",
    care_index: {
      score: 68,
      band: "C",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 45,
      factors: ["Environmental impact", "Fossil fuel concerns", "Climate transition"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 78,
        coverage: "French policy plus energy industry enhancements"
      },
      childcare_support: {
        score: 70,
        programs: ["Childcare assistance", "Energy programs", "Global support", "Safety focus"]
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
        score: 68,
        features: ["Energy transition focus", "French culture", "Global operations", "Safety emphasis"]
      }
    },
    story: {
      maternal_voice: "TotalEnergies is transitioning from fossil fuels to renewable energy for our children's climate future, while their French work culture supports energy families globally.",
      investment_thesis: "Major energy company in transition with improving sustainability focus and French benefits",
      risk_factors: ["Climate transition", "Environmental regulations", "Energy market volatility", "Stranded assets"],
      care_innovations: ["26-week parental leave", "Renewable energy transition", "Climate focus", "Energy innovation"]
    },
    financial: {
      revenue: "$263.3B",
      growth_rate: -25.8,
      esg_rating: "C+"
    }
  },
  {
    id: "bnp",
    symbol: "BNP",
    name: "BNP Paribas",
    sector: SECTORS.Financial,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$72.8B",
    employees: "202,624",
    care_index: {
      score: 74,
      band: "B",
      trend: "stable",
      trend_change: 0.9
    },
    harm_index: {
      score: 26,
      factors: ["Financial complexity", "Economic cycles"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 82,
        coverage: "French policy plus banking enhancements"
      },
      childcare_support: {
        score: 75,
        programs: ["Childcare support", "Financial education", "Family programs", "Global support"]
      },
      women_leadership: {
        score: 78,
        percentage: 41
      },
      pay_equity: {
        score: 80,
        certification: true
      },
      family_benefits: {
        score: 74,
        features: ["Financial services", "French culture", "Professional development", "Global banking"]
      }
    },
    story: {
      maternal_voice: "BNP Paribas helps families achieve their financial dreams and security, while their French work culture and women leadership create supportive environments for working parents.",
      investment_thesis: "Major European bank with strong French culture and improving family benefits",
      risk_factors: ["Economic cycles", "Regulatory changes", "Interest rate sensitivity", "Competition"],
      care_innovations: ["26-week parental leave", "Financial family services", "Women leadership", "French benefits"]
    },
    financial: {
      revenue: "$47.4B",
      growth_rate: 4.2,
      esg_rating: "B+"
    }
  },
  {
    id: "cap",
    symbol: "CAP",
    name: "Capgemini", 
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$24.8B",
    employees: "270,000",
    care_index: {
      score: 76,
      band: "B",
      trend: "up",
      trend_change: 1.6
    },
    harm_index: {
      score: 24,
      factors: ["Digital transformation disruption", "Consulting pressure"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 85,
        coverage: "French policy plus consulting enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Childcare support", "Technology programs", "Global support", "Work-life balance"]
      },
      women_leadership: {
        score: 74,
        percentage: 36
      },
      pay_equity: {
        score: 78,
        certification: true
      },
      family_benefits: {
        score: 76,
        features: ["Technology consulting", "French culture", "Global flexibility", "Digital innovation"]
      }
    },
    story: {
      maternal_voice: "Capgemini helps companies digitally transform to create better work-life balance for families everywhere, while their French culture supports working parents in technology consulting.",
      investment_thesis: "Technology consulting leader with French culture and improving work-life balance focus",
      risk_factors: ["Consulting competition", "Economic sensitivity", "Technology disruption", "Talent retention"],
      care_innovations: ["26-week parental leave", "Digital work solutions", "Global flexibility", "Technology innovation"]
    },
    financial: {
      revenue: "$22.0B",
      growth_rate: 8.9,
      esg_rating: "B+"
    }
  },
  {
    id: "eurofins",
    symbol: "ERF",
    name: "Eurofins Scientific",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$12.4B",
    employees: "61,000",
    care_index: {
      score: 78,
      band: "B",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 22,
      factors: ["Laboratory safety concerns", "Testing complexity"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 83,
        coverage: "French policy plus life sciences enhancements"
      },
      childcare_support: {
        score: 76,
        programs: ["Laboratory childcare support", "STEM education programs", "Health benefits", "Global support"]
      },
      women_leadership: {
        score: 72,
        percentage: 39
      },
      pay_equity: {
        score: 79,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Life sciences mission", "Food safety focus", "Health testing", "Scientific innovation"]
      }
    },
    story: {
      maternal_voice: "Eurofins keeps families safe by testing the food we eat, the water we drink, and the medicines we take, ensuring children grow up in a safer, healthier world.",
      investment_thesis: "Global life sciences testing leader with essential family safety mission and growing market presence",
      risk_factors: ["Regulatory changes", "Testing technology evolution", "Competition", "Quality control demands"],
      care_innovations: ["26-week parental leave", "Food safety testing", "Health protection", "Scientific excellence"]
    },
    financial: {
      revenue: "$6.7B",
      growth_rate: 8.4,
      esg_rating: "B+"
    }
  },
  {
    id: "safran",
    symbol: "SAF",
    name: "Safran",
    sector: SECTORS.Industrial,
    region: REGIONS.Europe,
    country: COUNTRIES.France,
    market_cap: "$68.2B",
    employees: "79,000",
    care_index: {
      score: 75,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 28,
      factors: ["Defense industry involvement", "Aviation environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 26,
        flexibility_score: 80,
        coverage: "French policy plus aerospace enhancements"
      },
      childcare_support: {
        score: 74,
        programs: ["Aerospace childcare", "Engineering programs", "Safety focus", "Global support"]
      },
      women_leadership: {
        score: 68,
        percentage: 27
      },
      pay_equity: {
        score: 76,
        certification: true
      },
      family_benefits: {
        score: 75,
        features: ["Aerospace innovation", "Engineering excellence", "French culture", "Safety leadership"]
      }
    },
    story: {
      maternal_voice: "Safran's aerospace innovations make flying safer for families while advancing cleaner aviation technologies for our children's environmental future.",
      investment_thesis: "Aerospace technology leader with safety focus and French engineering excellence",
      risk_factors: ["Aviation cycles", "Defense market sensitivity", "Environmental regulations", "Competition"],
      care_innovations: ["26-week parental leave", "Aviation safety", "Clean technology", "Engineering excellence"]
    },
    financial: {
      revenue: "$19.0B",
      growth_rate: 18.5,
      esg_rating: "B+"
    }
  },

  // Netherlands (4 companies)
  {
    id: "asml",
    symbol: "ASML",
    name: "ASML",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.Netherlands,
    market_cap: "$318.7B",
    employees: "42,000",
    care_index: {
      score: 84,
      band: "A",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 16,
      factors: ["Technology complexity", "Supply chain concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 42,
        flexibility_score: 90,
        coverage: "Dutch policy plus tech industry enhancements"
      },
      childcare_support: {
        score: 88,
        programs: ["On-site childcare", "Emergency care", "Tech programs", "Global support"]
      },
      women_leadership: {
        score: 76,
        percentage: 33
      },
      pay_equity: {
        score: 85,
        certification: true
      },
      family_benefits: {
        score: 86,
        features: ["Dutch work culture", "Technology innovation", "Mental health focus", "Professional development"]
      }
    },
    story: {
      maternal_voice: "ASML's semiconductor technology powers the devices that connect families and enable remote work, while their Dutch culture provides exceptional work-life balance for tech families.",
      investment_thesis: "Semiconductor technology leader with Dutch work culture and family-friendly tech environment",
      risk_factors: ["Technology cycles", "Geopolitical tensions", "Competition", "Supply chain complexity"],
      care_innovations: ["42-week parental leave", "Technology enablement", "Dutch work culture", "Innovation focus"]
    },
    financial: {
      revenue: "$27.6B",
      growth_rate: 30.1,
      esg_rating: "A-"
    }
  },
  {
    id: "rdsa",
    symbol: "RDSA",
    name: "Shell",
    sector: SECTORS.Energy,
    region: REGIONS.Europe,
    country: COUNTRIES.Netherlands,
    market_cap: "$198.5B",
    employees: "82,000",
    care_index: {
      score: 70,
      band: "B",
      trend: "up",
      trend_change: 2.9
    },
    harm_index: {
      score: 38,
      factors: ["Environmental impact", "Fossil fuel concerns", "Climate transition"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 42,
        flexibility_score: 85,
        coverage: "Dutch policy plus energy industry enhancements"
      },
      childcare_support: {
        score: 72,
        programs: ["Childcare assistance", "Energy programs", "Global support", "Safety focus"]
      },
      women_leadership: {
        score: 68,
        percentage: 30
      },
      pay_equity: {
        score: 75,
        certification: true
      },
      family_benefits: {
        score: 70,
        features: ["Energy transition focus", "Dutch culture", "Global operations", "Environmental innovation"]
      }
    },
    story: {
      maternal_voice: "Shell is transitioning from fossil fuels to renewable energy for cleaner air for our children, while their Dutch work culture supports energy families globally.",
      investment_thesis: "Major energy company in climate transition with Dutch work culture and improving sustainability",
      risk_factors: ["Climate transition", "Environmental regulations", "Energy market volatility", "Stranded assets"],
      care_innovations: ["42-week parental leave", "Energy transition", "Climate innovation", "Dutch benefits"]
    },
    financial: {
      revenue: "$386.2B",
      growth_rate: -22.1,
      esg_rating: "C+"
    }
  },
  {
    id: "phia",
    symbol: "PHIA",
    name: "Philips",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.Netherlands,
    market_cap: "$17.8B",
    employees: "78,000",
    care_index: {
      score: 80,
      band: "B",
      trend: "stable",
      trend_change: 0.5
    },
    harm_index: {
      score: 35,
      factors: ["Product recalls", "Medical device concerns", "Quality issues"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 42,
        flexibility_score: 88,
        coverage: "Dutch policy plus healthcare technology enhancements"
      },
      childcare_support: {
        score: 82,
        programs: ["Healthcare childcare", "Medical programs", "Innovation support", "Global benefits"]
      },
      women_leadership: {
        score: 75,
        percentage: 37
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["Healthcare mission", "Medical innovation", "Dutch culture", "Health technology"]
      }
    },
    story: {
      maternal_voice: "Philips creates healthcare technology that monitors babies' health and supports families through medical challenges, though recent quality concerns create maternal anxiety.",
      investment_thesis: "Healthcare technology company with family health mission despite facing quality challenges",
      risk_factors: ["Product liability", "Regulatory issues", "Quality concerns", "Competition"],
      care_innovations: ["42-week parental leave", "Healthcare technology", "Family health focus", "Medical innovation"]
    },
    financial: {
      revenue: "$19.1B",
      growth_rate: -8.9,
      esg_rating: "B-"
    }
  },
  {
    id: "inga",
    symbol: "INGA",
    name: "ING Group",
    sector: SECTORS.Financial,
    region: REGIONS.Europe,
    country: COUNTRIES.Netherlands,
    market_cap: "$45.2B",
    employees: "57,000",
    care_index: {
      score: 77,
      band: "B",
      trend: "up",
      trend_change: 1.4
    },
    harm_index: {
      score: 23,
      factors: ["Financial complexity", "Economic cycles"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 42,
        flexibility_score: 88,
        coverage: "Dutch policy plus banking enhancements"
      },
      childcare_support: {
        score: 78,
        programs: ["Banking childcare", "Financial education", "Family programs", "Digital support"]
      },
      women_leadership: {
        score: 80,
        percentage: 44
      },
      pay_equity: {
        score: 83,
        certification: true
      },
      family_benefits: {
        score: 78,
        features: ["Digital banking", "Dutch culture", "Financial wellness", "Sustainable banking"]
      }
    },
    story: {
      maternal_voice: "ING provides digital banking that helps families manage their finances efficiently while their Dutch work culture and strong women leadership support working parents.",
      investment_thesis: "Digital banking leader with Dutch work culture and strong family financial services",
      risk_factors: ["Economic cycles", "Digital disruption", "Regulatory changes", "Competition"],
      care_innovations: ["42-week parental leave", "Digital family banking", "Financial wellness", "Dutch benefits"]
    },
    financial: {
      revenue: "$20.1B",
      growth_rate: 12.5,
      esg_rating: "B+"
    }
  },

  // Switzerland (3 companies)
  {
    id: "nesn",
    symbol: "NESN",
    name: "Nestlé",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Europe,
    country: COUNTRIES.Switzerland,
    market_cap: "$348.9B",
    employees: "273,000",
    care_index: {
      score: 84,
      band: "A",
      trend: "up",
      trend_change: 1.8
    },
    harm_index: {
      score: 28,
      factors: ["Water usage concerns", "Infant formula controversies", "Sustainability challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 85,
        coverage: "Swiss policy plus food industry enhancements"
      },
      childcare_support: {
        score: 88,
        programs: ["Comprehensive childcare", "Nutrition programs", "Family health", "Global support"]
      },
      women_leadership: {
        score: 82,
        percentage: 45
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Family nutrition mission", "Child health focus", "Swiss quality", "Global diversity"]
      }
    },
    story: {
      maternal_voice: "Nestlé nourishes families globally with food and beverages, though concerns about infant formula marketing and water usage create maternal anxiety about corporate responsibility.",
      investment_thesis: "Global food company with family nutrition mission and strong Swiss benefits, addressing sustainability concerns",
      risk_factors: ["Sustainability pressure", "Regulatory challenges", "Water concerns", "Market competition"],
      care_innovations: ["18-week parental leave", "Family nutrition", "Child health focus", "Swiss quality standards"]
    },
    financial: {
      revenue: "$103.2B",
      growth_rate: 8.2,
      esg_rating: "B+"
    }
  },
  {
    id: "novn",
    symbol: "NOVN",
    name: "Novartis",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.Switzerland,
    market_cap: "$195.4B",
    employees: "104,000",
    care_index: {
      score: 85,
      band: "A",
      trend: "up",
      trend_change: 2.1
    },
    harm_index: {
      score: 15,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 90,
        coverage: "Swiss policy plus pharmaceutical enhancements"
      },
      childcare_support: {
        score: 90,
        programs: ["Premium childcare", "Health programs", "Medical benefits", "Global support"]
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
        score: 88,
        features: ["Healthcare mission", "Medical innovation", "Swiss quality", "Global health access"]
      }
    },
    story: {
      maternal_voice: "Novartis develops life-saving medicines for children and families worldwide, while their Swiss excellence and comprehensive benefits show deep commitment to employee wellbeing.",
      investment_thesis: "Pharmaceutical innovation leader with healthcare mission and premium Swiss family benefits",
      risk_factors: ["Drug development risks", "Patent cliffs", "Regulatory changes", "Access pressures"],
      care_innovations: ["18-week parental leave", "Medical innovation", "Global health access", "Swiss excellence"]
    },
    financial: {
      revenue: "$50.5B",
      growth_rate: 3.1,
      esg_rating: "A-"
    }
  },
  {
    id: "roche",
    symbol: "ROG",
    name: "Roche",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.Switzerland,
    market_cap: "$288.7B",
    employees: "103,613",
    care_index: {
      score: 87,
      band: "A",
      trend: "up",
      trend_change: 2.4
    },
    harm_index: {
      score: 13,
      factors: ["Drug pricing concerns", "Access challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 18,
        flexibility_score: 92,
        coverage: "Swiss policy plus pharmaceutical premium enhancements"
      },
      childcare_support: {
        score: 92,
        programs: ["Premium childcare", "Health programs", "Medical excellence", "Global support"]
      },
      women_leadership: {
        score: 88,
        percentage: 49
      },
      pay_equity: {
        score: 95,
        certification: true
      },
      family_benefits: {
        score: 90,
        features: ["Healthcare innovation", "Medical breakthroughs", "Swiss excellence", "Patient focus"]
      }
    },
    story: {
      maternal_voice: "Roche creates breakthrough medicines that save children's lives and give families hope, while their exceptional Swiss benefits and nearly equal gender leadership show true commitment to care.",
      investment_thesis: "Healthcare innovation leader with life-saving mission and exceptional Swiss family benefits",
      risk_factors: ["Drug development risks", "Patent cliffs", "Regulatory changes", "Competition"],
      care_innovations: ["18-week parental leave", "Life-saving medicines", "Healthcare innovation", "Swiss excellence"]
    },
    financial: {
      revenue: "$68.3B",
      growth_rate: -4.2,
      esg_rating: "A"
    }
  },

  // Nordic Countries (4 companies) 
  {
    id: "novo",
    symbol: "NOVO",
    name: "Novo Nordisk",
    sector: SECTORS.Healthcare,
    region: REGIONS.Europe,
    country: COUNTRIES.Denmark,
    market_cap: "$486.2B",
    employees: "63,400",
    care_index: {
      score: 91,
      band: "A",
      trend: "up",
      trend_change: 2.8
    },
    harm_index: {
      score: 9,
      factors: ["Drug pricing concerns"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 95,
        coverage: "Danish policy plus pharmaceutical premium enhancements"
      },
      childcare_support: {
        score: 95,
        programs: ["Comprehensive childcare", "Health programs", "Diabetes care", "Nordic support"]
      },
      women_leadership: {
        score: 92,
        percentage: 52
      },
      pay_equity: {
        score: 98,
        certification: true
      },
      family_benefits: {
        score: 94,
        features: ["Diabetes care mission", "Nordic culture", "Health innovation", "Family health focus"]
      }
    },
    story: {
      maternal_voice: "Novo Nordisk's diabetes care helps families manage chronic conditions while their Nordic values and exceptional parental leave show they truly understand family needs.",
      investment_thesis: "Diabetes care leader with Nordic values and exceptional family benefits creating sustainable health solutions",
      risk_factors: ["Drug development risks", "Competition", "Regulatory changes", "Pricing pressure"],
      care_innovations: ["52-week parental leave", "Diabetes family care", "Nordic culture", "Health innovation"]
    },
    financial: {
      revenue: "$26.8B",
      growth_rate: 31.8,
      esg_rating: "A+"
    }
  },
  {
    id: "orsted",
    symbol: "ORSTED",
    name: "Ørsted",
    sector: SECTORS.Energy,
    region: REGIONS.Europe,
    country: COUNTRIES.Denmark,
    market_cap: "$32.4B",
    employees: "7,700",
    care_index: {
      score: 88,
      band: "A",
      trend: "up",
      trend_change: 3.2
    },
    harm_index: {
      score: 12,
      factors: ["Construction environmental impact"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 52,
        flexibility_score: 92,
        coverage: "Danish policy plus renewable energy enhancements"
      },
      childcare_support: {
        score: 90,
        programs: ["Comprehensive childcare", "Environmental programs", "STEM education", "Nordic support"]
      },
      women_leadership: {
        score: 85,
        percentage: 41
      },
      pay_equity: {
        score: 92,
        certification: true
      },
      family_benefits: {
        score: 89,
        features: ["Climate mission", "Renewable energy", "Nordic culture", "Environmental leadership"]
      }
    },
    story: {
      maternal_voice: "Ørsted transforms wind into clean energy for our children's future climate, while their Nordic values create the most family-supportive energy company culture.",
      investment_thesis: "Renewable energy leader with climate mission and exceptional Nordic family benefits",
      risk_factors: ["Energy market volatility", "Construction challenges", "Regulatory changes", "Weather dependency"],
      care_innovations: ["52-week parental leave", "Clean energy mission", "Climate leadership", "Nordic culture"]
    },
    financial: {
      revenue: "$23.0B",
      growth_rate: 22.1,
      esg_rating: "A+"
    }
  },
  {
    id: "volv",
    symbol: "VOLV",
    name: "Volvo",
    sector: SECTORS.Automotive,
    region: REGIONS.Europe,
    country: COUNTRIES.Sweden,
    market_cap: "$28.5B",
    employees: "104,000",
    care_index: {
      score: 83,
      band: "B",
      trend: "up",
      trend_change: 2.5
    },
    harm_index: {
      score: 17,
      factors: ["Manufacturing environmental impact", "Traditional automotive"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 68,
        flexibility_score: 95,
        coverage: "Swedish policy plus automotive enhancements"
      },
      childcare_support: {
        score: 88,
        programs: ["Comprehensive childcare", "Safety programs", "Engineering education", "Nordic support"]
      },
      women_leadership: {
        score: 78,
        percentage: 35
      },
      pay_equity: {
        score: 88,
        certification: true
      },
      family_benefits: {
        score: 85,
        features: ["Safety innovation", "Swedish culture", "Electric transition", "Family safety focus"]
      }
    },
    story: {
      maternal_voice: "Volvo pioneered automotive safety to protect families and is leading the electric transition for cleaner air, while Swedish parental leave culture supports working families exceptionally.",
      investment_thesis: "Safety-focused automotive leader with electric transition and exceptional Swedish family benefits",
      risk_factors: ["Electric transition", "Automotive competition", "Economic cycles", "Supply chain challenges"],
      care_innovations: ["68-week parental leave", "Safety innovation", "Electric vehicles", "Swedish culture"]
    },
    financial: {
      revenue: "$47.2B",
      growth_rate: 11.6,
      esg_rating: "A-"
    }
  },
  {
    id: "nokia",
    symbol: "NOK",
    name: "Nokia",
    sector: SECTORS.Technology,
    region: REGIONS.Europe,
    country: COUNTRIES.Finland,
    market_cap: "$22.8B",
    employees: "86,000",
    care_index: {
      score: 79,
      band: "B",
      trend: "stable",
      trend_change: 0.8
    },
    harm_index: {
      score: 21,
      factors: ["Technology disruption", "Market challenges"]
    },
    care_metrics: {
      parental_leave: {
        weeks: 56,
        flexibility_score: 90,
        coverage: "Finnish policy plus technology enhancements"
      },
      childcare_support: {
        score: 82,
        programs: ["Technology childcare", "STEM programs", "Innovation support", "Nordic benefits"]
      },
      women_leadership: {
        score: 76,
        percentage: 32
      },
      pay_equity: {
        score: 82,
        certification: true
      },
      family_benefits: {
        score: 80,
        features: ["Technology innovation", "Finnish culture", "Global connectivity", "Engineering excellence"]
      }
    },
    story: {
      maternal_voice: "Nokia connects families worldwide through telecommunications technology, while Finnish parental leave culture and technology innovation create supportive environments for tech families.",
      investment_thesis: "Technology connectivity leader with Finnish culture and strong Nordic family benefits",
      risk_factors: ["Technology competition", "Market evolution", "5G transition", "Economic sensitivity"],
      care_innovations: ["56-week parental leave", "Family connectivity", "Technology innovation", "Finnish culture"]
    },
    financial: {
      revenue: "$24.9B",
      growth_rate: 11.2,
      esg_rating: "B+"
    }
  }
];