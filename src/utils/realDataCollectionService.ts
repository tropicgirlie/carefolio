import { secEdgarConnector } from './secEdgarConnector';
import { glassdoorConnector } from './glassdoorConnector';

interface RealDataCollectionResult {
  companySymbol: string;
  companyName: string;
  collectionStartTime: number;
  collectionEndTime: number;
  processingTimeMs: number;
  sourcesAttempted: number;
  sourcesSuccessful: number;
  metrics: {
    [key: string]: {
      value: any;
      confidence: number;
      sources: string[];
      collectedAt: Date;
      processingTimeMs: number;
    };
  };
  overallConfidence: number;
  errors: string[];
}

class RealDataCollectionService {
  async collectRealCompanyData(companySymbol: string): Promise<RealDataCollectionResult> {
    const startTime = Date.now();
    console.log(`🚀 Starting REAL data collection for ${companySymbol}`);
    
    const result: RealDataCollectionResult = {
      companySymbol,
      companyName: '',
      collectionStartTime: startTime,
      collectionEndTime: 0,
      processingTimeMs: 0,
      sourcesAttempted: 0,
      sourcesSuccessful: 0,
      metrics: {},
      overallConfidence: 0,
      errors: []
    };

    // 1. SEC EDGAR Data Collection
    try {
      result.sourcesAttempted++;
      console.log(`📊 Fetching SEC data for ${companySymbol}...`);
      
      const secStart = Date.now();
      
      // First get company CIK from ticker
      const tickers = await secEdgarConnector.getCompanyTickers();
      const companyInfo = Object.values(tickers).find((company: any) => 
        company.ticker === companySymbol
      ) as any;

      if (companyInfo) {
        result.companyName = companyInfo.title;
        const secData = await secEdgarConnector.searchCompanyByCIK(companyInfo.cik_str);
        
        if (secData) {
          const careMetrics = await secEdgarConnector.extractCareMetrics(secData);
          
          Object.entries(careMetrics).forEach(([key, value]) => {
            if (value !== undefined) {
              result.metrics[`sec_${key}`] = {
                value,
                confidence: 0.95, // SEC data is highly reliable
                sources: ['sec_edgar'],
                collectedAt: new Date(),
                processingTimeMs: Date.now() - secStart
              };
            }
          });
          
          result.sourcesSuccessful++;
          console.log(`✅ SEC data collected in ${Date.now() - secStart}ms`);
        }
      }
    } catch (error) {
      result.errors.push(`SEC EDGAR: ${error}`);
      console.error(`❌ SEC data collection failed:`, error);
    }

    // 2. Glassdoor Data Collection
    try {
      result.sourcesAttempted++;
      console.log(`👥 Fetching Glassdoor data for ${companySymbol}...`);
      
      const glassdoorStart = Date.now();
      const glassdoorData = await glassdoorConnector.getCompanyData(result.companyName || companySymbol);
      
      if (glassdoorData) {
        Object.entries(glassdoorData).forEach(([key, value]) => {
          if (value !== undefined) {
            result.metrics[`glassdoor_${key}`] = {
              value,
              confidence: 0.75, // Employee reviews are subjective
              sources: ['glassdoor'],
              collectedAt: new Date(),
              processingTimeMs: Date.now() - glassdoorStart
            };
          }
        });
        
        result.sourcesSuccessful++;
        console.log(`✅ Glassdoor data collected in ${Date.now() - glassdoorStart}ms`);
      }
    } catch (error) {
      result.errors.push(`Glassdoor: ${error}`);
      console.error(`❌ Glassdoor data collection failed:`, error);
    }

    // 3. Calculate Overall Results
    const endTime = Date.now();
    result.collectionEndTime = endTime;
    result.processingTimeMs = endTime - startTime;
    
    const metricValues = Object.values(result.metrics);
    result.overallConfidence = metricValues.length > 0 
      ? metricValues.reduce((sum, m) => sum + m.confidence, 0) / metricValues.length
      : 0;

    // 4. Log Performance Metrics
    console.log(`🎯 Collection completed for ${companySymbol}:`);
    console.log(`   📊 Processing Time: ${result.processingTimeMs}ms`);
    console.log(`   📈 Sources: ${result.sourcesSuccessful}/${result.sourcesAttempted} successful`);
    console.log(`   🎯 Confidence: ${(result.overallConfidence * 100).toFixed(1)}%`);
    console.log(`   📋 Metrics: ${Object.keys(result.metrics).length} collected`);
    
    if (result.errors.length > 0) {
      console.log(`   ⚠️ Errors: ${result.errors.length}`);
    }

    return result;
  }

  async batchCollectRealData(companySymbols: string[]): Promise<{
    results: RealDataCollectionResult[];
    totalProcessingTime: number;
    averageProcessingTime: number;
    successRate: number;
  }> {
    const batchStart = Date.now();
    console.log(`🚀 Starting batch collection for ${companySymbols.length} companies`);
    
    const results: RealDataCollectionResult[] = [];
    
    // Process with rate limiting (SEC allows 10 req/sec)
    for (let i = 0; i < companySymbols.length; i++) {
      const symbol = companySymbols[i];
      
      try {
        const result = await this.collectRealCompanyData(symbol);
        results.push(result);
        
        // Rate limiting: 100ms between requests
        if (i < companySymbols.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Progress logging
        if ((i + 1) % 10 === 0) {
          console.log(`📊 Progress: ${i + 1}/${companySymbols.length} companies processed`);
        }
        
      } catch (error) {
        console.error(`Failed to collect data for ${symbol}:`, error);
      }
    }
    
    const totalProcessingTime = Date.now() - batchStart;
    const averageProcessingTime = totalProcessingTime / results.length;
    const successfulResults = results.filter(r => r.sourcesSuccessful > 0);
    const successRate = successfulResults.length / results.length;
    
    console.log(`\n🎯 BATCH COLLECTION COMPLETE:`);
    console.log(`   📊 Total Time: ${totalProcessingTime}ms (${(totalProcessingTime/1000).toFixed(1)}s)`);
    console.log(`   ⚡ Avg Per Company: ${averageProcessingTime.toFixed(0)}ms`);
    console.log(`   📈 Success Rate: ${(successRate * 100).toFixed(1)}%`);
    console.log(`   ✅ Successful: ${successfulResults.length}/${results.length}`);
    
    return {
      results,
      totalProcessingTime,
      averageProcessingTime,
      successRate
    };
  }
}

export const realDataCollectionService = new RealDataCollectionService();