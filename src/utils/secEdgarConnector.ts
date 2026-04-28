interface SECFilingData {
  company_name: string;
  cik: string;
  sic: string;
  filings: Array<{
    form: string;
    filing_date: string;
    accession_number: string;
  }>;
}

interface CareMetricsFromSEC {
  women_leadership_percentage?: number;
  board_diversity_score?: number;
  executive_diversity_ratio?: number;
  pay_gap_disclosure?: string;
  esg_metrics?: any;
}

class SECEdgarConnector {
  private baseUrl = 'https://data.sec.gov/api/xbrl';
  private companiesUrl = 'https://www.sec.gov/files/company_tickers.json';
  
  // SEC requires User-Agent header
  private headers = {
    'User-Agent': 'Carefolio Research Platform contact@carefolio.com',
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'www.sec.gov'
  };

  async searchCompanyByCIK(cik: string): Promise<SECFilingData | null> {
    try {
      const paddedCIK = cik.padStart(10, '0');
      const response = await fetch(
        `https://data.sec.gov/submissions/CIK${paddedCIK}.json`,
        { headers: this.headers }
      );
      
      if (!response.ok) {
        throw new Error(`SEC API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('SEC EDGAR API error:', error);
      return null;
    }
  }

  async getCompanyTickers(): Promise<Record<string, any>> {
    try {
      const response = await fetch(this.companiesUrl, { headers: this.headers });
      return await response.json();
    } catch (error) {
      console.error('SEC tickers error:', error);
      return {};
    }
  }

  async extractCareMetrics(filingData: SECFilingData): Promise<CareMetricsFromSEC> {
    // Parse DEF 14A (proxy statements) for board diversity
    // Parse 10-K for workforce demographics
    // This requires parsing XBRL or HTML filings
    
    const metrics: CareMetricsFromSEC = {};
    
    // Look for specific forms that contain diversity data
    const diversityForms = filingData.filings.filter(f => 
      f.form === 'DEF 14A' || f.form === '10-K' || f.form === '8-K'
    );
    
    // Would need to fetch and parse individual filings
    // This is where you'd implement text parsing for diversity metrics
    
    return metrics;
  }

  // Rate limiting: SEC allows 10 requests per second
  private async rateLimitedFetch(url: string) {
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    return fetch(url, { headers: this.headers });
  }
}

export const secEdgarConnector = new SECEdgarConnector();