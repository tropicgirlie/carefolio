// Rest of World Companies (20) - Care Index Global 100
import { Company } from './types';
import { SECTORS, REGIONS, COUNTRIES } from './constants';

export const restOfWorldCompanies: Company[] = [
  // Asia-Pacific (12 companies)
  {
    id: "toyota",
    symbol: "TM",
    name: "Toyota",
    sector: SECTORS.Automotive,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.Japan,
    market_cap: "$248.2B",
    employees: "372,817",
    care_index: { score: 68, band: "C", trend: "stable", trend_change: 0.5 },
    harm_index: { score: 32, factors: ["Automotive environmental impact", "Traditional culture"] },
    care_metrics: {
      parental_leave: { weeks: 12, flexibility_score: 65, coverage: "Japanese policy plus some enhancements" },
      childcare_support: { score: 62, programs: ["Some childcare support", "Traditional benefits"] },
      women_leadership: { score: 58, percentage: 25 },
      pay_equity: { score: 70, certification: false },
      family_benefits: { score: 68, features: ["Automotive leadership", "Traditional culture", "Quality focus", "Some modernization"] }
    },
    story: {
      maternal_voice: "Toyota's focus on quality and reliability resonates with mothers who want dependable family vehicles, though their traditional Japanese culture is slower to embrace modern family benefits.",
      investment_thesis: "Automotive leader with traditional culture gradually improving family policies",
      risk_factors: ["Traditional Japanese culture", "Slow adaptation to change", "Environmental transition"],
      care_innovations: ["Quality family vehicles", "Gradual modernization", "Environmental initiatives", "Safety leadership"]
    },
    financial: { revenue: "$284.5B", growth_rate: 9.8, esg_rating: "B+" }
  },
  {
    id: "tsmc",
    symbol: "TSM",
    name: "Taiwan Semiconductor",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.Taiwan,
    market_cap: "$543.2B",
    employees: "75,851",
    care_index: { score: 72, band: "B", trend: "up", trend_change: 2.8 },
    harm_index: { score: 18, factors: ["Environmental impact", "Water usage", "Technology complexity"] },
    care_metrics: {
      parental_leave: { weeks: 14, flexibility_score: 75, coverage: "Taiwan policy plus tech enhancements" },
      childcare_support: { score: 72, programs: ["Childcare assistance", "Tech programs", "Education focus", "Health benefits"] },
      women_leadership: { score: 68, percentage: 28 },
      pay_equity: { score: 75, certification: true },
      family_benefits: { score: 72, features: ["Technology innovation", "Education focus", "Asian work culture", "Professional development"] }
    },
    story: {
      maternal_voice: "TSMC's semiconductors power the devices that help families learn and connect, while they're gradually improving family benefits in Taiwan's tech culture.",
      investment_thesis: "Semiconductor leader with essential technology role and improving family benefits",
      risk_factors: ["Geopolitical tensions", "Technology cycles", "Environmental regulations", "Competition"],
      care_innovations: ["14-week parental leave", "Technology leadership", "Education focus", "Innovation culture"]
    },
    financial: { revenue: "$75.9B", growth_rate: 10.4, esg_rating: "B+" }
  },
  {
    id: "samsung",
    symbol: "005930",
    name: "Samsung Electronics",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.SouthKorea,
    market_cap: "$320.5B",
    employees: "267,800",
    care_index: { score: 70, band: "B", trend: "up", trend_change: 2.1 },
    harm_index: { score: 25, factors: ["Traditional work culture", "Environmental impact", "Worker conditions"] },
    care_metrics: {
      parental_leave: { weeks: 12, flexibility_score: 70, coverage: "Korean policy plus some enhancements" },
      childcare_support: { score: 68, programs: ["Childcare assistance", "Technology programs", "Health benefits", "Education focus"] },
      women_leadership: { score: 65, percentage: 26 },
      pay_equity: { score: 72, certification: true },
      family_benefits: { score: 70, features: ["Technology innovation", "Korean work culture", "Global presence", "Professional development"] }
    },
    story: {
      maternal_voice: "Samsung creates the technology that helps families stay connected and capture precious moments, while gradually modernizing their traditional Korean work culture.",
      investment_thesis: "Technology conglomerate with essential consumer products and improving work culture",
      risk_factors: ["Traditional culture", "Technology cycles", "Competition", "Geopolitical tensions"],
      care_innovations: ["12-week parental leave", "Family technology", "Innovation focus", "Gradual modernization"]
    },
    financial: { revenue: "$244.2B", growth_rate: -14.5, esg_rating: "B" }
  },
  {
    id: "alibaba",
    symbol: "BABA",
    name: "Alibaba",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.China,
    market_cap: "$184.7B",
    employees: "245,700",
    care_index: { score: 69, band: "C", trend: "down", trend_change: -1.8 },
    harm_index: { score: 31, factors: ["Data privacy concerns", "Market dominance", "Regulatory pressures"] },
    care_metrics: {
      parental_leave: { weeks: 16, flexibility_score: 72, coverage: "Chinese policy plus tech enhancements" },
      childcare_support: { score: 68, programs: ["Childcare assistance", "E-commerce programs", "Technology support", "Health benefits"] },
      women_leadership: { score: 72, percentage: 35 },
      pay_equity: { score: 70, certification: false },
      family_benefits: { score: 70, features: ["E-commerce empowerment", "Technology innovation", "Chinese culture", "Professional development"] }
    },
    story: {
      maternal_voice: "Alibaba helps small businesses, many run by mothers, reach customers online, though regulatory pressures and data concerns create uncertainty about their family impact.",
      investment_thesis: "E-commerce giant empowering small businesses but facing regulatory and privacy challenges",
      risk_factors: ["Regulatory pressure", "Data privacy", "Competition", "Geopolitical tensions"],
      care_innovations: ["16-week parental leave", "Small business empowerment", "E-commerce innovation", "Technology focus"]
    },
    financial: { revenue: "$109.5B", growth_rate: 2.3, esg_rating: "C+" }
  },
  {
    id: "tencent",
    symbol: "0700",
    name: "Tencent",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.China,
    market_cap: "$438.9B",
    employees: "116,213",
    care_index: { score: 67, band: "C", trend: "stable", trend_change: 0.3 },
    harm_index: { score: 33, factors: ["Gaming concerns", "Data privacy", "Screen time impact"] },
    care_metrics: {
      parental_leave: { weeks: 14, flexibility_score: 70, coverage: "Chinese policy plus tech enhancements" },
      childcare_support: { score: 65, programs: ["Childcare assistance", "Gaming programs", "Technology support", "Health benefits"] },
      women_leadership: { score: 68, percentage: 30 },
      pay_equity: { score: 68, certification: false },
      family_benefits: { score: 68, features: ["Social connectivity", "Gaming innovation", "Chinese culture", "Professional development"] }
    },
    story: {
      maternal_voice: "Tencent's platforms help families stay connected, but concerns about gaming addiction and screen time create maternal anxiety about children's digital wellness.",
      investment_thesis: "Social media and gaming giant with connectivity mission but facing family wellness concerns",
      risk_factors: ["Gaming regulations", "Screen time concerns", "Data privacy", "Regulatory pressure"],
      care_innovations: ["14-week parental leave", "Social connectivity", "Gaming innovation", "Digital focus"]
    },
    financial: { revenue: "$86.2B", growth_rate: 10.0, esg_rating: "C+" }
  },
  {
    id: "sony",
    symbol: "6758",
    name: "Sony",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.Japan,
    market_cap: "$107.8B",
    employees: "108,900",
    care_index: { score: 74, band: "B", trend: "up", trend_change: 1.9 },
    harm_index: { score: 22, factors: ["Content concerns", "Traditional culture", "Environmental impact"] },
    care_metrics: {
      parental_leave: { weeks: 12, flexibility_score: 72, coverage: "Japanese policy plus entertainment enhancements" },
      childcare_support: { score: 72, programs: ["Childcare assistance", "Entertainment programs", "Technology support", "Health benefits"] },
      women_leadership: { score: 68, percentage: 27 },
      pay_equity: { score: 75, certification: true },
      family_benefits: { score: 74, features: ["Entertainment focus", "Technology innovation", "Japanese culture", "Creative programs"] }
    },
    story: {
      maternal_voice: "Sony creates the entertainment and technology that brings families together for movie nights and gaming, while gradually modernizing their traditional Japanese work culture.",
      investment_thesis: "Entertainment and technology conglomerate with family connection focus and improving culture",
      risk_factors: ["Traditional culture", "Entertainment industry cycles", "Competition", "Technology transitions"],
      care_innovations: ["12-week parental leave", "Family entertainment", "Creative focus", "Technology innovation"]
    },
    financial: { revenue: "$84.9B", growth_rate: 16.9, esg_rating: "B+" }
  },
  {
    id: "shopify",
    symbol: "SHOP",
    name: "Shopify",
    sector: SECTORS.Technology,
    region: REGIONS.NorthAmerica,
    country: COUNTRIES.Canada,
    market_cap: "$76.8B",
    employees: "12,600",
    care_index: { score: 84, band: "A", trend: "up", trend_change: 3.2 },
    harm_index: { score: 12, factors: ["E-commerce platform challenges"] },
    care_metrics: {
      parental_leave: { weeks: 35, flexibility_score: 90, coverage: "Canadian policy plus enhancements" },
      childcare_support: { score: 82, programs: ["Childcare assistance", "Remote work support", "Family programs"] },
      women_leadership: { score: 78, percentage: 42 },
      pay_equity: { score: 88, certification: true },
      family_benefits: { score: 85, features: ["E-commerce empowerment", "Remote work culture", "Canadian benefits", "Tech innovation"] }
    },
    story: {
      maternal_voice: "Shopify empowers small businesses, many run by mothers, to build their dreams online. Their progressive benefits and remote culture support the flexibility working parents need.",
      investment_thesis: "E-commerce tech company with progressive family benefits and empowerment focus",
      risk_factors: ["E-commerce competition", "Economic sensitivity", "Platform dependence"],
      care_innovations: ["35-week parental leave", "Small business empowerment", "Remote work leadership", "Family entrepreneurship support"]
    },
    financial: { revenue: "$7.1B", growth_rate: 26.4, esg_rating: "A-" }
  },
  {
    id: "softbank",
    symbol: "9984",
    name: "SoftBank",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.Japan,
    market_cap: "$68.4B",
    employees: "67,000",
    care_index: { score: 66, band: "C", trend: "stable", trend_change: 0.5 },
    harm_index: { score: 28, factors: ["Investment volatility", "Traditional culture", "Technology risks"] },
    care_metrics: {
      parental_leave: { weeks: 12, flexibility_score: 68, coverage: "Japanese policy plus some enhancements" },
      childcare_support: { score: 65, programs: ["Some childcare support", "Technology programs", "Health benefits"] },
      women_leadership: { score: 62, percentage: 24 },
      pay_equity: { score: 68, certification: false },
      family_benefits: { score: 66, features: ["Technology investment", "Innovation focus", "Japanese culture", "Professional development"] }
    },
    story: {
      maternal_voice: "SoftBank invests in technologies that could transform family life, though their traditional Japanese culture and investment volatility create uncertainty for employee families.",
      investment_thesis: "Technology investment company with innovation focus but traditional culture challenges",
      risk_factors: ["Investment volatility", "Traditional culture", "Technology risks", "Economic sensitivity"],
      care_innovations: ["12-week parental leave", "Technology investment", "Innovation focus", "Future technology"]
    },
    financial: { revenue: "$46.3B", growth_rate: 4.8, esg_rating: "C+" }
  },

  // Latin America & Other (8 companies)
  {
    id: "vale",
    symbol: "VALE",
    name: "Vale",
    sector: SECTORS.Industrial,
    region: REGIONS.LatinAmerica,
    country: COUNTRIES.Brazil,
    market_cap: "$52.1B",
    employees: "190,000",
    care_index: { score: 64, band: "C", trend: "up", trend_change: 2.1 },
    harm_index: { score: 36, factors: ["Environmental mining impact", "Safety concerns", "Community relations"] },
    care_metrics: {
      parental_leave: { weeks: 16, flexibility_score: 75, coverage: "Brazilian policy plus mining enhancements" },
      childcare_support: { score: 68, programs: ["On-site childcare", "Community programs", "Health benefits"] },
      women_leadership: { score: 62, percentage: 28 },
      pay_equity: { score: 70, certification: true },
      family_benefits: { score: 66, features: ["Mining community focus", "Safety emphasis", "Brazilian culture", "Community investment"] }
    },
    story: {
      maternal_voice: "Vale's mining operations provide essential materials for family infrastructure, while their community investments show growing awareness of their impact on local families.",
      investment_thesis: "Mining giant with essential materials role and improving community relations",
      risk_factors: ["Environmental impact", "Safety concerns", "Commodity cycles", "Regulatory pressure"],
      care_innovations: ["16-week parental leave", "Community investment", "Safety focus", "Family support programs"]
    },
    financial: { revenue: "$38.2B", growth_rate: -15.2, esg_rating: "C+" }
  },
  {
    id: "mercadolibre",
    symbol: "MELI",
    name: "MercadoLibre",
    sector: SECTORS.Technology,
    region: REGIONS.LatinAmerica,
    country: COUNTRIES.Argentina,
    market_cap: "$85.4B",
    employees: "44,000",
    care_index: { score: 78, band: "B", trend: "up", trend_change: 3.8 },
    harm_index: { score: 18, factors: ["Digital divide concerns", "Economic volatility"] },
    care_metrics: {
      parental_leave: { weeks: 20, flexibility_score: 85, coverage: "Argentine policy plus tech enhancements" },
      childcare_support: { score: 80, programs: ["Childcare assistance", "E-commerce programs", "Technology support", "Flexible work"] },
      women_leadership: { score: 76, percentage: 40 },
      pay_equity: { score: 82, certification: true },
      family_benefits: { score: 80, features: ["E-commerce empowerment", "Financial inclusion", "Latin culture", "Tech innovation"] }
    },
    story: {
      maternal_voice: "MercadoLibre enables Latin American families to participate in e-commerce and financial services, creating opportunities for mothers to build businesses from home.",
      investment_thesis: "Latin American e-commerce leader with financial inclusion mission and strong family benefits",
      risk_factors: ["Economic volatility", "Competition", "Regulatory changes", "Currency fluctuations"],
      care_innovations: ["20-week parental leave", "Financial inclusion", "Small business empowerment", "Technology access"]
    },
    financial: { revenue: "$10.5B", growth_rate: 42.8, esg_rating: "B+" }
  },
  {
    id: "shoprite",
    symbol: "SHP",
    name: "Shoprite",
    sector: SECTORS.ConsumerGoods,
    region: REGIONS.Africa,
    country: COUNTRIES.SouthAfrica,
    market_cap: "$8.9B",
    employees: "147,000",
    care_index: { score: 70, band: "B", trend: "up", trend_change: 2.5 },
    harm_index: { score: 25, factors: ["Economic inequality", "Supply chain challenges"] },
    care_metrics: {
      parental_leave: { weeks: 16, flexibility_score: 78, coverage: "South African policy plus retail enhancements" },
      childcare_support: { score: 72, programs: ["Childcare assistance", "Community programs", "Health benefits", "Education support"] },
      women_leadership: { score: 74, percentage: 42 },
      pay_equity: { score: 76, certification: true },
      family_benefits: { score: 74, features: ["Food security focus", "Community investment", "African culture", "Family nutrition"] }
    },
    story: {
      maternal_voice: "Shoprite provides affordable food access to African families while creating employment opportunities for thousands of mothers in communities across the continent.",
      investment_thesis: "African retail leader with food security mission and strong community employment focus",
      risk_factors: ["Economic volatility", "Currency fluctuations", "Supply chain challenges", "Political instability"],
      care_innovations: ["16-week parental leave", "Food security", "Community employment", "Nutrition programs"]
    },
    financial: { revenue: "$10.2B", growth_rate: 8.7, esg_rating: "B+" }
  },
  {
    id: "naspers",
    symbol: "NPN",
    name: "Naspers",
    sector: SECTORS.Technology,
    region: REGIONS.Africa,
    country: COUNTRIES.SouthAfrica,
    market_cap: "$42.8B",
    employees: "28,000",
    care_index: { score: 72, band: "B", trend: "stable", trend_change: 1.2 },
    harm_index: { score: 22, factors: ["Digital divide concerns", "Investment complexity"] },
    care_metrics: {
      parental_leave: { weeks: 16, flexibility_score: 80, coverage: "South African policy plus tech enhancements" },
      childcare_support: { score: 75, programs: ["Childcare assistance", "Technology education", "Health benefits", "Global support"] },
      women_leadership: { score: 70, percentage: 35 },
      pay_equity: { score: 78, certification: true },
      family_benefits: { score: 74, features: ["Technology investment", "Education focus", "Global presence", "Digital inclusion"] }
    },
    story: {
      maternal_voice: "Naspers invests in technologies that connect African families to global opportunities, while their education focus helps children access digital learning tools.",
      investment_thesis: "African technology investor with education mission and global connectivity focus",
      risk_factors: ["Investment volatility", "Currency fluctuations", "Political risks", "Technology changes"],
      care_innovations: ["16-week parental leave", "Education technology", "Digital inclusion", "Global connectivity"]
    },
    financial: { revenue: "$5.4B", growth_rate: 12.3, esg_rating: "B+" }
  },
  {
    id: "infosys",
    symbol: "INFY",
    name: "Infosys",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.India,
    market_cap: "$78.2B",
    employees: "318,000",
    care_index: { score: 76, band: "B", trend: "up", trend_change: 2.4 },
    harm_index: { score: 18, factors: ["Traditional culture challenges", "Work-life balance concerns"] },
    care_metrics: {
      parental_leave: { weeks: 18, flexibility_score: 82, coverage: "Indian policy plus tech enhancements" },
      childcare_support: { score: 78, programs: ["On-site childcare", "Technology education", "Health benefits", "Family support"] },
      women_leadership: { score: 75, percentage: 38 },
      pay_equity: { score: 82, certification: true },
      family_benefits: { score: 78, features: ["Technology training", "Education focus", "Indian culture", "Global opportunities"] }
    },
    story: {
      maternal_voice: "Infosys provides technology career opportunities for thousands of Indian families while investing in education programs that help children access digital skills training.",
      investment_thesis: "Indian technology leader with education mission and strong family career development focus",
      risk_factors: ["Global competition", "Currency fluctuations", "Technology transitions", "Talent retention"],
      care_innovations: ["18-week parental leave", "Technology education", "Career development", "Family support programs"]
    },
    financial: { revenue: "$16.3B", growth_rate: 15.4, esg_rating: "A-" }
  },
  {
    id: "tcs",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: SECTORS.Technology,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.India,
    market_cap: "$148.7B",
    employees: "616,000",
    care_index: { score: 78, band: "B", trend: "up", trend_change: 2.1 },
    harm_index: { score: 16, factors: ["Work intensity concerns", "Traditional culture"] },
    care_metrics: {
      parental_leave: { weeks: 20, flexibility_score: 85, coverage: "Indian policy plus Tata group enhancements" },
      childcare_support: { score: 82, programs: ["Comprehensive childcare", "Education programs", "Health benefits", "Family support"] },
      women_leadership: { score: 78, percentage: 36 },
      pay_equity: { score: 85, certification: true },
      family_benefits: { score: 82, features: ["Tata values", "Education focus", "Career development", "Community programs"] }
    },
    story: {
      maternal_voice: "TCS embodies Tata Group's century-old values of caring for employees and communities, providing stable technology careers that support hundreds of thousands of Indian families.",
      investment_thesis: "Indian technology giant with strong values-based culture and exceptional employee care focus",
      risk_factors: ["Global competition", "Technology transitions", "Talent costs", "Economic cycles"],
      care_innovations: ["20-week parental leave", "Tata values system", "Community investment", "Family stability focus"]
    },
    financial: { revenue: "$27.9B", growth_rate: 13.7, esg_rating: "A-" }
  },
  {
    id: "reliance",
    symbol: "RIL",
    name: "Reliance Industries",
    sector: SECTORS.Energy,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.India,
    market_cap: "$228.5B",
    employees: "236,000",
    care_index: { score: 69, band: "C", trend: "up", trend_change: 2.8 },
    harm_index: { score: 31, factors: ["Environmental impact", "Traditional energy", "Industrial complexity"] },
    care_metrics: {
      parental_leave: { weeks: 16, flexibility_score: 75, coverage: "Indian policy plus industrial enhancements" },
      childcare_support: { score: 70, programs: ["Childcare assistance", "Community programs", "Health benefits", "Education support"] },
      women_leadership: { score: 68, percentage: 25 },
      pay_equity: { score: 72, certification: true },
      family_benefits: { score: 70, features: ["Industrial benefits", "Community investment", "Indian culture", "Healthcare focus"] }
    },
    story: {
      maternal_voice: "Reliance's diversification into telecommunications and retail brings digital services to Indian families, while their community programs support education and healthcare access.",
      investment_thesis: "Indian conglomerate with digital transformation and community investment focus",
      risk_factors: ["Environmental transition", "Regulatory changes", "Competition", "Industrial cycles"],
      care_innovations: ["16-week parental leave", "Digital services", "Community healthcare", "Education programs"]
    },
    financial: { revenue: "$104.6B", growth_rate: 8.9, esg_rating: "B" }
  },
  {
    id: "hdfc",
    symbol: "HDB",
    name: "HDFC Bank",
    sector: SECTORS.Financial,
    region: REGIONS.AsiaPacific,
    country: COUNTRIES.India,
    market_cap: "$172.8B",
    employees: "177,000",
    care_index: { score: 74, band: "B", trend: "up", trend_change: 1.9 },
    harm_index: { score: 22, factors: ["Financial complexity", "Access challenges"] },
    care_metrics: {
      parental_leave: { weeks: 18, flexibility_score: 80, coverage: "Indian policy plus banking enhancements" },
      childcare_support: { score: 76, programs: ["Childcare assistance", "Financial education", "Health benefits", "Family programs"] },
      women_leadership: { score: 72, percentage: 33 },
      pay_equity: { score: 78, certification: true },
      family_benefits: { score: 76, features: ["Financial inclusion", "Banking services", "Indian culture", "Community programs"] }
    },
    story: {
      maternal_voice: "HDFC Bank provides financial services that help Indian families buy homes, start businesses, and build financial security for their children's futures.",
      investment_thesis: "Indian banking leader with financial inclusion mission and strong family-focused services",
      risk_factors: ["Economic cycles", "Regulatory changes", "Competition", "Credit risks"],
      care_innovations: ["18-week parental leave", "Financial inclusion", "Home ownership", "Family financial planning"]
    },
    financial: { revenue: "$21.2B", growth_rate: 18.7, esg_rating: "B+" }
  }
];