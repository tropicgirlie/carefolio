// Countries Data Structure for Carefolio
// Includes Global Care Index scores and key pillars

export interface Country {
  id: string;
  name: string;
  code: string; // ISO country code (e.g., "US", "SE", "NO")
  flag: string; // Flag emoji
  region: string;
  careIndexScore: number; // 0-100
  careIndexBand: 'A' | 'B' | 'C' | 'D' | 'E';
  
  // Key Care Pillars
  pillars: {
    parentalLeave: {
      score: number; // 0-100
      weeks: number; // Total weeks available
      description: string;
    };
    childcare: {
      score: number; // 0-100
      publicSupport: number; // % of GDP spent on childcare
      description: string;
    };
    womensHealth: {
      score: number; // 0-100
      maternalMortalityRate: number; // per 100k births
      description: string;
    };
    representation: {
      score: number; // 0-100
      parliamentWomen: number; // % women in parliament
      description: string;
    };
  };
  
  // Harm Offsets
  harmOffsets: {
    payGap: {
      score: number; // 0-100 (higher is better, less gap)
      gapPercentage: number; // Actual pay gap %
    };
    childPoverty: {
      score: number; // 0-100 (higher is better, less poverty)
      rate: number; // % of children in poverty
    };
    violence: {
      score: number; // 0-100 (higher is better, less violence)
      rate: number; // Rate of gender-based violence
    };
  };
  
  // Overall Health Status
  healthStatus: 'blooming' | 'growing' | 'needs-nurturing' | 'transforming';
  
  // Additional metadata
  population: number;
  gdpPerCapita: number;
  lastUpdated: string;
  
  // Narrative
  careStory: string;
  keyInsights: string[];
  challenges: string[];
  innovations: string[];
}

export const mockCountries: Country[] = [
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    region: 'Nordic',
    careIndexScore: 89,
    careIndexBand: 'A',
    pillars: {
      parentalLeave: {
        score: 95,
        weeks: 68,
        description: '480 days shared parental leave with high income replacement'
      },
      childcare: {
        score: 92,
        publicSupport: 1.8,
        description: 'Universal childcare from age 1, heavily subsidized'
      },
      womensHealth: {
        score: 88,
        maternalMortalityRate: 4,
        description: 'Comprehensive maternal care and reproductive health services'
      },
      representation: {
        score: 85,
        parliamentWomen: 47,
        description: 'Strong female political representation and leadership roles'
      }
    },
    harmOffsets: {
      payGap: {
        score: 78,
        gapPercentage: 12.2
      },
      childPoverty: {
        score: 93,
        rate: 3.5
      },
      violence: {
        score: 82,
        rate: 18.5
      }
    },
    healthStatus: 'blooming',
    population: 10423000,
    gdpPerCapita: 54608,
    lastUpdated: '2024-12-01',
    careStory: 'Sweden leads global care innovation with its comprehensive parental leave system and universal childcare, creating a model for work-life balance that other nations aspire to replicate.',
    keyInsights: [
      'World\'s most generous parental leave system',
      'Gender-neutral parental leave policies',
      'Strong childcare infrastructure',
      'High female workforce participation'
    ],
    challenges: [
      'Pay gap still exists in private sector',
      'Some regions lack childcare capacity',
      'Integration challenges for immigrant families'
    ],
    innovations: [
      'Gender-neutral parental leave',
      'Daddy days encouragement',
      'Flexible work arrangements',
      'Digital parenting support platforms'
    ]
  },
  {
    id: 'norway',
    name: 'Norway',
    code: 'NO',
    flag: '🇳🇴',
    region: 'Nordic',
    careIndexScore: 86,
    careIndexBand: 'A',
    pillars: {
      parentalLeave: {
        score: 93,
        weeks: 59,
        description: '49-59 weeks parental leave with income support'
      },
      childcare: {
        score: 90,
        publicSupport: 1.6,
        description: 'Universal childcare with income-based fees'
      },
      womensHealth: {
        score: 90,
        maternalMortalityRate: 2,
        description: 'Excellent maternal health outcomes and support'
      },
      representation: {
        score: 82,
        parliamentWomen: 45,
        description: 'Strong female representation in government and business'
      }
    },
    harmOffsets: {
      payGap: {
        score: 80,
        gapPercentage: 11.8
      },
      childPoverty: {
        score: 95,
        rate: 2.8
      },
      violence: {
        score: 85,
        rate: 16.2
      }
    },
    healthStatus: 'blooming',
    population: 5425000,
    gdpPerCapita: 89154,
    lastUpdated: '2024-12-01',
    careStory: 'Norway combines oil wealth with progressive care policies, creating a society where families thrive and gender equality flourishes through systemic support.',
    keyInsights: [
      'Oil fund supports generous family policies',
      'Mandatory father\'s quota in parental leave',
      'Low child poverty rates',
      'Strong work-life balance culture'
    ],
    challenges: [
      'Regional disparities in service access',
      'Aging population pressures',
      'Integration of immigrant communities'
    ],
    innovations: [
      'Sovereign wealth fund supporting families',
      'Mandatory paternal leave quotas',
      'Digital government services for families',
      'Flexible work arrangements'
    ]
  },
  {
    id: 'iceland',
    name: 'Iceland',
    code: 'IS',
    flag: '🇮🇸',
    region: 'Nordic',
    careIndexScore: 88,
    careIndexBand: 'A',
    pillars: {
      parentalLeave: {
        score: 91,
        weeks: 52,
        description: '6 months shared parental leave with equal father/mother quotas'
      },
      childcare: {
        score: 87,
        publicSupport: 1.4,
        description: 'Universal childcare with strong public investment'
      },
      womensHealth: {
        score: 92,
        maternalMortalityRate: 3,
        description: 'World-class maternal health care system'
      },
      representation: {
        score: 88,
        parliamentWomen: 48,
        description: 'World leader in gender equality and female leadership'
      }
    },
    harmOffsets: {
      payGap: {
        score: 85,
        gapPercentage: 8.5
      },
      childPoverty: {
        score: 92,
        rate: 4.1
      },
      violence: {
        score: 90,
        rate: 12.3
      }
    },
    healthStatus: 'blooming',
    population: 376000,
    gdpPerCapita: 68384,
    lastUpdated: '2024-12-01',
    careStory: 'Iceland pioneered gender-equal parental leave policies and continues to lead global efforts in closing gender gaps across all sectors of society.',
    keyInsights: [
      'First country with gender-equal parental leave',
      'Smallest gender pay gap globally',
      'High female workforce participation',
      'Strong social cohesion and trust'
    ],
    challenges: [
      'Small population limits service diversity',
      'Geographic isolation affects access',
      'Limited childcare capacity in rural areas'
    ],
    innovations: [
      'Equal parental leave quotas',
      'Pay transparency legislation',
      'Gender equality certification for companies',
      'Community-based childcare models'
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    region: 'Central Europe',
    careIndexScore: 72,
    careIndexBand: 'B',
    pillars: {
      parentalLeave: {
        score: 78,
        weeks: 58,
        description: '14 months parental leave with partner sharing incentives'
      },
      childcare: {
        score: 75,
        publicSupport: 1.1,
        description: 'Universal childcare with regional variations in quality'
      },
      womensHealth: {
        score: 85,
        maternalMortalityRate: 7,
        description: 'Strong healthcare system with comprehensive maternal care'
      },
      representation: {
        score: 68,
        parliamentWomen: 35,
        description: 'Moderate female representation, improving gradually'
      }
    },
    harmOffsets: {
      payGap: {
        score: 65,
        gapPercentage: 18.3
      },
      childPoverty: {
        score: 82,
        rate: 8.2
      },
      violence: {
        score: 75,
        rate: 22.1
      }
    },
    healthStatus: 'growing',
    population: 83200000,
    gdpPerCapita: 46259,
    lastUpdated: '2024-12-01',
    careStory: 'Germany is transforming from a traditional breadwinner model to a more egalitarian system, with ongoing reforms to support working families and gender equality.',
    keyInsights: [
      'Major shift from traditional family model',
      'Expanding childcare infrastructure',
      'Growing father participation in parenting',
      'Strong economic foundation for family support'
    ],
    challenges: [
      'Persistent gender pay gap',
      'Regional disparities in childcare',
      'Cultural resistance to change',
      'East-West differences in family policies'
    ],
    innovations: [
      'Partner months in parental leave',
      'Childcare expansion programs',
      'Flexible work arrangements',
      'Digital parenting services'
    ]
  },
  {
    id: 'united-states',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    region: 'North America',
    careIndexScore: 45,
    careIndexBand: 'D',
    pillars: {
      parentalLeave: {
        score: 15,
        weeks: 0,
        description: 'No federal paid parental leave mandate, varies by state and employer'
      },
      childcare: {
        score: 38,
        publicSupport: 0.4,
        description: 'Limited public childcare support, high private costs'
      },
      womensHealth: {
        score: 55,
        maternalMortalityRate: 23.8,
        description: 'High maternal mortality rates, uneven access to care'
      },
      representation: {
        score: 62,
        parliamentWomen: 28,
        description: 'Moderate female representation in Congress and leadership'
      }
    },
    harmOffsets: {
      payGap: {
        score: 58,
        gapPercentage: 22.1
      },
      childPoverty: {
        score: 45,
        rate: 16.9
      },
      violence: {
        score: 52,
        rate: 35.6
      }
    },
    healthStatus: 'needs-nurturing',
    population: 331900000,
    gdpPerCapita: 70249,
    lastUpdated: '2024-12-01',
    careStory: 'The United States faces significant care challenges despite its economic strength, with growing awareness and state-level innovations pointing toward potential transformation.',
    keyInsights: [
      'State-level policy innovation leading change',
      'Growing corporate parental leave offerings',
      'Increasing awareness of care crisis',
      'Strong economic potential for care investment'
    ],
    challenges: [
      'No federal paid parental leave',
      'Extremely high childcare costs',
      'Significant health disparities',
      'Political polarization on family policies'
    ],
    innovations: [
      'State-level paid leave programs',
      'Corporate family benefit expansion',
      'Community-based childcare initiatives',
      'Digital health platforms for families'
    ]
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    region: 'Western Europe',
    careIndexScore: 76,
    careIndexBand: 'B',
    pillars: {
      parentalLeave: {
        score: 82,
        weeks: 42,
        description: '16 weeks maternity + 25 days paternity with income support'
      },
      childcare: {
        score: 85,
        publicSupport: 1.3,
        description: 'Extensive public childcare system from age 3'
      },
      womensHealth: {
        score: 88,
        maternalMortalityRate: 8,
        description: 'Universal healthcare with strong maternal support'
      },
      representation: {
        score: 65,
        parliamentWomen: 37,
        description: 'Improving female representation with parity laws'
      }
    },
    harmOffsets: {
      payGap: {
        score: 70,
        gapPercentage: 15.8
      },
      childPoverty: {
        score: 78,
        rate: 11.3
      },
      violence: {
        score: 68,
        rate: 26.4
      }
    },
    healthStatus: 'growing',
    population: 67750000,
    gdpPerCapita: 40493,
    lastUpdated: '2024-12-01',
    careStory: 'France balances strong family support traditions with modern gender equality goals, creating a comprehensive care system that supports working families.',
    keyInsights: [
      'Strong childcare infrastructure',
      'Generous family allowances',
      'Cultural support for work-life balance',
      'Universal healthcare system'
    ],
    challenges: [
      'Traditional gender role expectations persist',
      'Regional disparities in services',
      'Economic pressures on family benefits',
      'Integration challenges for diverse communities'
    ],
    innovations: [
      'Family allowance system',
      'Universal preschool education',
      'Flexible work arrangements',
      'Parental education programs'
    ]
  }
];

// Helper functions for countries
export const getCountryByCode = (code: string): Country | undefined => {
  return mockCountries.find(country => country.code === code);
};

export const getCountriesByRegion = (region: string): Country[] => {
  return mockCountries.filter(country => country.region === region);
};

export const getCountriesByBand = (band: 'A' | 'B' | 'C' | 'D' | 'E'): Country[] => {
  return mockCountries.filter(country => country.careIndexBand === band);
};

export const getCountriesByHealthStatus = (status: Country['healthStatus']): Country[] => {
  return mockCountries.filter(country => country.healthStatus === status);
};

// Care Index Band Colors (same as companies for consistency)
export const getCountryBandColor = (band: 'A' | 'B' | 'C' | 'D' | 'E'): string => {
  switch (band) {
    case 'A': return 'var(--carefolio-band-a)'; // Vibrant Mint
    case 'B': return 'var(--carefolio-band-b)'; // Emerald  
    case 'C': return 'var(--carefolio-band-c)'; // Lavender
    case 'D': return 'var(--carefolio-band-d)'; // Coral
    case 'E': return 'var(--carefolio-band-e)'; // Deep Navy
    default: return 'var(--neutral-lilac)';
  }
};

export const getCountryHealthStatusColor = (status: Country['healthStatus']): string => {
  switch (status) {
    case 'blooming': return 'var(--garden-blooming)';
    case 'growing': return 'var(--garden-growing)';
    case 'needs-nurturing': return 'var(--garden-needs-nurturing)';
    case 'transforming': return 'var(--garden-transforming)';
    default: return 'var(--neutral-lilac)';
  }
};

export const getCountryHealthStatusEmoji = (status: Country['healthStatus']): string => {
  switch (status) {
    case 'blooming': return '🌸';
    case 'growing': return '🌱';
    case 'needs-nurturing': return '🛑';
    case 'transforming': return '🔄';
    default: return '🌿';
  }
};