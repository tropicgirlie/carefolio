interface GlassdoorMetrics {
  parental_leave_weeks?: number;
  work_life_balance_rating?: number;
  diversity_inclusion_rating?: number;
  ceo_approval_rating?: number;
  recommend_to_friend_percentage?: number;
}

class GlassdoorConnector {
  private apiKey: string;
  private partnerId: string;
  private baseUrl = 'https://api.glassdoor.com/api/api.htm';

  constructor(apiKey: string, partnerId: string) {
    this.apiKey = apiKey;
    this.partnerId = partnerId;
  }

  async getCompanyData(companyName: string): Promise<GlassdoorMetrics | null> {
    try {
      const params = new URLSearchParams({
        v: '1',
        format: 'json',
        t.p': this.partnerId,
        't.k': this.apiKey,
        action: 'employers',
        q: companyName,
        userip: '192.168.1.1', // Required by Glassdoor
        useragent: 'Mozilla/5.0'
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      const data = await response.json();
      
      if (data.success && data.response.employers.length > 0) {
        const employer = data.response.employers[0];
        
        return {
          work_life_balance_rating: employer.workLifeBalance,
          diversity_inclusion_rating: employer.diversityAndInclusion,
          ceo_approval_rating: employer.ceoApproval,
          recommend_to_friend_percentage: employer.recommendToFriendRating
        };
      }
      
      return null;
    } catch (error) {
      console.error('Glassdoor API error:', error);
      return null;
    }
  }

  // Note: Glassdoor API is restricted and requires approval
  // Alternative: Web scraping (requires careful compliance with ToS)
  async scrapePublicData(companyName: string): Promise<GlassdoorMetrics | null> {
    // Implement ethical web scraping as fallback
    // Must respect robots.txt and rate limits
    console.warn('Glassdoor scraping not implemented - requires API access');
    return null;
  }
}

export const glassdoorConnector = new GlassdoorConnector(
  process.env.GLASSDOOR_API_KEY || 'YOUR_API_KEY_HERE',
  process.env.GLASSDOOR_PARTNER_ID || 'YOUR_PARTNER_ID_HERE'
);