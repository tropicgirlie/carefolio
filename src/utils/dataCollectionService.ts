export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'scraping' | 'manual' | 'filing' | 'survey';
  reliability: number; // 0-1
  lastUpdated: Date;
  avgResponseTime: number; // ms
  successRate: number; // 0-1
  endpoint?: string;
  rateLimits?: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
}

export interface DataCollectionResult {
  companyId: string;
  companySymbol: string;
  companyName: string;
  metrics: {
    [key: string]: {
      value: any;
      confidence: number; // 0-1
      sources: string[]; // source IDs
      collectedAt: Date;
      validatedAt?: Date;
      validatedBy?: string; // user ID or 'system'
      validationMethod?: 'human' | 'cross_reference' | 'pattern_match' | 'ai';
    };
  };
  overallConfidence: number; // 0-1
  validationStatus: 'verified' | 'pending' | 'flagged' | 'failed';
  lastUpdated: Date;
  nextUpdateDue: Date;
}

export interface AccuracyMetrics {
  totalCompanies: number;
  companiesWithData: number;
  averageConfidence: number;
  verifiedDataPoints: number;
  pendingValidation: number;
  flaggedDataPoints: number;
  sourceReliability: { [sourceId: string]: number };
  accuracyByMetric: { [metric: string]: number };
  dataFreshness: {
    fresh: number; // < 30 days
    stale: number; // 30-90 days
    outdated: number; // > 90 days
  };
  validationQueue: {
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
}

class DataCollectionService {
  private sources: Map<string, DataSource> = new Map();
  private collectionResults: Map<string, DataCollectionResult> = new Map();
  private isCollecting: boolean = false;

  constructor() {
    this.initializeDataSources();
  }

  private initializeDataSources() {
    const sources: DataSource[] = [
      {
        id: 'sec_filings',
        name: 'SEC Filings API',
        type: 'api',
        reliability: 0.95,
        lastUpdated: new Date(),
        avgResponseTime: 800,
        successRate: 0.92,
        endpoint: 'https://api.sec.gov/v1/',
        rateLimits: { requestsPerMinute: 10, requestsPerDay: 1000 }
      },
      {
        id: 'glassdoor_api',
        name: 'Glassdoor Company API',
        type: 'api',
        reliability: 0.85,
        lastUpdated: new Date(),
        avgResponseTime: 1200,
        successRate: 0.78,
        endpoint: 'https://api.glassdoor.com/v1/',
        rateLimits: { requestsPerMinute: 30, requestsPerDay: 5000 }
      },
      {
        id: 'company_websites',
        name: 'Company Website Scraping',
        type: 'scraping',
        reliability: 0.70,
        lastUpdated: new Date(),
        avgResponseTime: 2500,
        successRate: 0.65
      },
      {
        id: 'linkedin_data',
        name: 'LinkedIn Company Data',
        type: 'api',
        reliability: 0.88,
        lastUpdated: new Date(),
        avgResponseTime: 1500,
        successRate: 0.82,
        endpoint: 'https://api.linkedin.com/v2/',
        rateLimits: { requestsPerMinute: 20, requestsPerDay: 2000 }
      },
      {
        id: 'esg_databases',
        name: 'ESG Rating Databases',
        type: 'api',
        reliability: 0.92,
        lastUpdated: new Date(),
        avgResponseTime: 600,
        successRate: 0.89,
        rateLimits: { requestsPerMinute: 50, requestsPerDay: 10000 }
      },
      {
        id: 'manual_research',
        name: 'Manual Research Team',
        type: 'manual',
        reliability: 0.98,
        lastUpdated: new Date(),
        avgResponseTime: 86400000, // 24 hours
        successRate: 0.95
      }
    ];

    sources.forEach(source => this.sources.set(source.id, source));
  }

  async collectCompanyData(companySymbol: string): Promise<DataCollectionResult> {
    const startTime = Date.now();
    console.log(`Starting data collection for ${companySymbol}`);

    try {
      // Simulate data collection from multiple sources
      const collectionPromises = Array.from(this.sources.entries()).map(
        ([sourceId, source]) => this.collectFromSource(companySymbol, source)
      );

      const sourceResults = await Promise.allSettled(collectionPromises);
      
      // Aggregate results and calculate confidence
      const result = this.aggregateResults(companySymbol, sourceResults);
      
      // Store result
      this.collectionResults.set(companySymbol, result);
      
      console.log(`Data collection completed for ${companySymbol} in ${Date.now() - startTime}ms`);
      console.log(`Overall confidence: ${(result.overallConfidence * 100).toFixed(1)}%`);
      
      return result;
    } catch (error) {
      console.error(`Data collection failed for ${companySymbol}:`, error);
      
      // Return empty result with failed status
      const failedResult: DataCollectionResult = {
        companyId: `company_${companySymbol.toLowerCase()}`,
        companySymbol,
        companyName: 'Unknown Company',
        metrics: {},
        overallConfidence: 0,
        validationStatus: 'failed',
        lastUpdated: new Date(),
        nextUpdateDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      };
      
      this.collectionResults.set(companySymbol, failedResult);
      return failedResult;
    }
  }

  private async collectFromSource(
    companySymbol: string, 
    source: DataSource
  ): Promise<{ sourceId: string; data: any; confidence: number; error?: string }> {
    try {
      // Simulate different collection methods
      switch (source.type) {
        case 'api':
          return await this.collectFromAPI(companySymbol, source);
        case 'scraping':
          return await this.collectFromScraping(companySymbol, source);
        case 'manual':
          return await this.collectFromManualResearch(companySymbol, source);
        default:
          throw new Error(`Unsupported source type: ${source.type}`);
      }
    } catch (error) {
      return {
        sourceId: source.id,
        data: null,
        confidence: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async collectFromAPI(
    companySymbol: string, 
    source: DataSource
  ): Promise<{ sourceId: string; data: any; confidence: number }> {
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, source.avgResponseTime + Math.random() * 500));

    // Simulate success/failure based on source reliability
    if (Math.random() > source.successRate) {
      throw new Error(`API request failed for ${source.name}`);
    }

    // Simulate realistic data based on source
    let simulatedData: any = {};
    let confidence = source.reliability;

    switch (source.id) {
      case 'sec_filings':
        simulatedData = {
          women_leadership_percentage: Math.random() * 50,
          board_diversity_score: Math.random() * 100,
          executive_diversity_ratio: Math.random() * 0.5
        };
        confidence *= 0.95; // SEC filings are highly reliable
        break;

      case 'glassdoor_api':
        simulatedData = {
          parental_leave_weeks: Math.floor(Math.random() * 16) + 4,
          work_life_balance_rating: Math.random() * 5,
          diversity_inclusion_rating: Math.random() * 5
        };
        confidence *= 0.85; // Employee reviews can be subjective
        break;

      case 'linkedin_data':
        simulatedData = {
          employee_growth_rate: Math.random() * 20,
          diversity_hiring_trends: Math.random() * 100,
          company_size: Math.floor(Math.random() * 50000) + 1000
        };
        confidence *= 0.88;
        break;

      case 'esg_databases':
        simulatedData = {
          esg_score: Math.random() * 100,
          social_responsibility_rating: Math.random() * 10,
          governance_score: Math.random() * 100
        };
        confidence *= 0.92;
        break;
    }

    return {
      sourceId: source.id,
      data: simulatedData,
      confidence: Math.min(confidence, 1)
    };
  }

  private async collectFromScraping(
    companySymbol: string, 
    source: DataSource
  ): Promise<{ sourceId: string; data: any; confidence: number }> {
    // Simulate scraping delay
    await new Promise(resolve => setTimeout(resolve, source.avgResponseTime + Math.random() * 1000));

    if (Math.random() > source.successRate) {
      throw new Error(`Scraping failed for ${source.name}`);
    }

    // Simulate scraped data with lower confidence
    const simulatedData = {
      company_benefits: ['parental_leave', 'healthcare', 'flexible_work'],
      diversity_statement: 'commitment_found',
      sustainability_initiatives: Math.floor(Math.random() * 10)
    };

    return {
      sourceId: source.id,
      data: simulatedData,
      confidence: source.reliability * 0.8 // Lower confidence for scraped data
    };
  }

  private async collectFromManualResearch(
    companySymbol: string, 
    source: DataSource
  ): Promise<{ sourceId: string; data: any; confidence: number }> {
    // Simulate manual research delay (much longer)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Manual research has highest accuracy but lowest speed
    const simulatedData = {
      comprehensive_care_score: Math.random() * 100,
      detailed_policy_analysis: 'comprehensive_review_completed',
      researcher_notes: 'verified_through_multiple_sources',
      validation_level: 'expert_verified'
    };

    return {
      sourceId: source.id,
      data: simulatedData,
      confidence: source.reliability * 1.0 // Highest confidence for manual research
    };
  }

  private aggregateResults(
    companySymbol: string, 
    sourceResults: PromiseSettledResult<{ sourceId: string; data: any; confidence: number; error?: string }>[]
  ): DataCollectionResult {
    const successfulResults = sourceResults
      .filter((result): result is PromiseFulfilledResult<{ sourceId: string; data: any; confidence: number }> => 
        result.status === 'fulfilled' && result.value.data !== null
      )
      .map(result => result.value);

    const failedResults = sourceResults
      .filter(result => result.status === 'rejected' || result.value.error)
      .length;

    // Calculate overall confidence based on successful sources
    const avgConfidence = successfulResults.length > 0 
      ? successfulResults.reduce((sum, result) => sum + result.confidence, 0) / successfulResults.length
      : 0;

    // Adjust confidence based on coverage (how many sources succeeded)
    const coverageRatio = successfulResults.length / this.sources.size;
    const adjustedConfidence = avgConfidence * (0.5 + coverageRatio * 0.5);

    // Aggregate metrics from all sources
    const aggregatedMetrics: { [key: string]: any } = {};
    
    successfulResults.forEach(result => {
      Object.entries(result.data).forEach(([key, value]) => {
        if (!aggregatedMetrics[key]) {
          aggregatedMetrics[key] = {
            values: [],
            sources: [],
            confidences: []
          };
        }
        aggregatedMetrics[key].values.push(value);
        aggregatedMetrics[key].sources.push(result.sourceId);
        aggregatedMetrics[key].confidences.push(result.confidence);
      });
    });

    // Process aggregated metrics
    const processedMetrics: DataCollectionResult['metrics'] = {};
    
    Object.entries(aggregatedMetrics).forEach(([key, data]) => {
      // Use weighted average for numeric values, most reliable source for others
      let finalValue;
      let confidence;

      if (typeof data.values[0] === 'number') {
        // Weighted average for numeric values
        const totalWeight = data.confidences.reduce((sum: number, conf: number) => sum + conf, 0);
        finalValue = data.values.reduce((sum: number, val: number, idx: number) => 
          sum + (val * data.confidences[idx]), 0) / totalWeight;
        confidence = totalWeight / data.values.length;
      } else {
        // Use most reliable source for non-numeric values
        const maxConfidenceIdx = data.confidences.indexOf(Math.max(...data.confidences));
        finalValue = data.values[maxConfidenceIdx];
        confidence = data.confidences[maxConfidenceIdx];
      }

      processedMetrics[key] = {
        value: finalValue,
        confidence: Math.min(confidence, 1),
        sources: data.sources,
        collectedAt: new Date(),
        validationMethod: 'cross_reference'
      };
    });

    // Determine validation status based on overall confidence
    let validationStatus: DataCollectionResult['validationStatus'];
    if (adjustedConfidence >= 0.9) {
      validationStatus = 'verified';
    } else if (adjustedConfidence >= 0.7) {
      validationStatus = 'pending';
    } else if (adjustedConfidence >= 0.3) {
      validationStatus = 'flagged';
    } else {
      validationStatus = 'failed';
    }

    return {
      companyId: `company_${companySymbol.toLowerCase()}`,
      companySymbol,
      companyName: `${companySymbol} Corporation`, // Would be fetched from a company directory
      metrics: processedMetrics,
      overallConfidence: adjustedConfidence,
      validationStatus,
      lastUpdated: new Date(),
      nextUpdateDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };
  }

  async batchCollectData(companySymbols: string[]): Promise<DataCollectionResult[]> {
    console.log(`Starting batch collection for ${companySymbols.length} companies`);
    this.isCollecting = true;

    try {
      // Process in batches to avoid overwhelming sources
      const batchSize = 5;
      const results: DataCollectionResult[] = [];

      for (let i = 0; i < companySymbols.length; i += batchSize) {
        const batch = companySymbols.slice(i, i + batchSize);
        const batchPromises = batch.map(symbol => this.collectCompanyData(symbol));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Brief pause between batches to respect rate limits
        if (i + batchSize < companySymbols.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      console.log(`Batch collection completed. ${results.length} companies processed.`);
      return results;
    } finally {
      this.isCollecting = false;
    }
  }

  getAccuracyMetrics(): AccuracyMetrics {
    const results = Array.from(this.collectionResults.values());
    
    if (results.length === 0) {
      return {
        totalCompanies: 0,
        companiesWithData: 0,
        averageConfidence: 0,
        verifiedDataPoints: 0,
        pendingValidation: 0,
        flaggedDataPoints: 0,
        sourceReliability: {},
        accuracyByMetric: {},
        dataFreshness: { fresh: 0, stale: 0, outdated: 0 },
        validationQueue: { highPriority: 0, mediumPriority: 0, lowPriority: 0 }
      };
    }

    const totalCompanies = results.length;
    const companiesWithData = results.filter(r => Object.keys(r.metrics).length > 0).length;
    const averageConfidence = results.reduce((sum, r) => sum + r.overallConfidence, 0) / totalCompanies;
    
    const verifiedDataPoints = results.filter(r => r.validationStatus === 'verified').length;
    const pendingValidation = results.filter(r => r.validationStatus === 'pending').length;
    const flaggedDataPoints = results.filter(r => r.validationStatus === 'flagged').length;

    // Calculate source reliability
    const sourceReliability: { [sourceId: string]: number } = {};
    this.sources.forEach((source, id) => {
      sourceReliability[id] = source.reliability;
    });

    // Calculate accuracy by metric
    const accuracyByMetric: { [metric: string]: number } = {};
    const metricCounts: { [metric: string]: { total: number; confidence: number } } = {};

    results.forEach(result => {
      Object.entries(result.metrics).forEach(([metric, data]) => {
        if (!metricCounts[metric]) {
          metricCounts[metric] = { total: 0, confidence: 0 };
        }
        metricCounts[metric].total++;
        metricCounts[metric].confidence += data.confidence;
      });
    });

    Object.entries(metricCounts).forEach(([metric, counts]) => {
      accuracyByMetric[metric] = counts.confidence / counts.total;
    });

    // Calculate data freshness
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const ninetyDays = 90 * 24 * 60 * 60 * 1000;

    const dataFreshness = results.reduce(
      (acc, result) => {
        const age = now - result.lastUpdated.getTime();
        if (age < thirtyDays) acc.fresh++;
        else if (age < ninetyDays) acc.stale++;
        else acc.outdated++;
        return acc;
      },
      { fresh: 0, stale: 0, outdated: 0 }
    );

    // Calculate validation queue priorities
    const validationQueue = results.reduce(
      (acc, result) => {
        if (result.validationStatus === 'flagged') {
          if (result.overallConfidence < 0.3) acc.highPriority++;
          else if (result.overallConfidence < 0.6) acc.mediumPriority++;
          else acc.lowPriority++;
        } else if (result.validationStatus === 'pending') {
          acc.mediumPriority++;
        }
        return acc;
      },
      { highPriority: 0, mediumPriority: 0, lowPriority: 0 }
    );

    return {
      totalCompanies,
      companiesWithData,
      averageConfidence,
      verifiedDataPoints,
      pendingValidation,
      flaggedDataPoints,
      sourceReliability,
      accuracyByMetric,
      dataFreshness,
      validationQueue
    };
  }

  getDataSources(): DataSource[] {
    return Array.from(this.sources.values());
  }

  getCollectionResult(companySymbol: string): DataCollectionResult | undefined {
    return this.collectionResults.get(companySymbol);
  }

  getAllResults(): DataCollectionResult[] {
    return Array.from(this.collectionResults.values());
  }

  isCurrentlyCollecting(): boolean {
    return this.isCollecting;
  }

  async validateDataPoint(
    companySymbol: string, 
    metric: string, 
    validatedValue: any,
    validatedBy: string,
    validationMethod: 'human' | 'cross_reference' | 'pattern_match' | 'ai' = 'human'
  ): Promise<boolean> {
    const result = this.collectionResults.get(companySymbol);
    if (!result || !result.metrics[metric]) {
      return false;
    }

    // Update the metric with validation info
    result.metrics[metric].validatedAt = new Date();
    result.metrics[metric].validatedBy = validatedBy;
    result.metrics[metric].validationMethod = validationMethod;
    
    // If the validated value is different, update it and adjust confidence
    if (result.metrics[metric].value !== validatedValue) {
      result.metrics[metric].value = validatedValue;
      result.metrics[metric].confidence = Math.min(result.metrics[metric].confidence * 1.1, 1.0);
    } else {
      // Validation confirmed the value, increase confidence
      result.metrics[metric].confidence = Math.min(result.metrics[metric].confidence * 1.2, 1.0);
    }

    // Recalculate overall confidence
    const metrics = Object.values(result.metrics);
    result.overallConfidence = metrics.reduce((sum, m) => sum + m.confidence, 0) / metrics.length;

    // Update validation status
    if (result.overallConfidence >= 0.9) {
      result.validationStatus = 'verified';
    } else if (result.overallConfidence >= 0.7) {
      result.validationStatus = 'pending';
    }

    return true;
  }

  // Get companies that need validation (prioritized)
  getValidationQueue(): Array<{
    company: DataCollectionResult;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }> {
    const results = Array.from(this.collectionResults.values());
    const queue: Array<{
      company: DataCollectionResult;
      priority: 'high' | 'medium' | 'low';
      reason: string;
    }> = [];

    results.forEach(result => {
      if (result.validationStatus === 'flagged') {
        if (result.overallConfidence < 0.3) {
          queue.push({
            company: result,
            priority: 'high',
            reason: `Very low confidence (${(result.overallConfidence * 100).toFixed(1)}%)`
          });
        } else if (result.overallConfidence < 0.6) {
          queue.push({
            company: result,
            priority: 'medium',
            reason: `Low confidence (${(result.overallConfidence * 100).toFixed(1)}%)`
          });
        } else {
          queue.push({
            company: result,
            priority: 'low',
            reason: `Flagged for review (${(result.overallConfidence * 100).toFixed(1)}%)`
          });
        }
      } else if (result.validationStatus === 'pending') {
        queue.push({
          company: result,
          priority: 'medium',
          reason: 'Pending validation'
        });
      }
    });

    // Sort by priority (high first) and then by confidence (lowest first)
    return queue.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.company.overallConfidence - b.company.overallConfidence;
    });
  }
}

// Export singleton instance
export const dataCollectionService = new DataCollectionService();