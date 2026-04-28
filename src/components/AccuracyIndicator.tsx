import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { dataCollectionService } from '../utils/dataCollectionService';

interface AccuracyIndicatorProps {
  companySymbol: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AccuracyIndicator({ 
  companySymbol, 
  showDetails = false, 
  size = 'md' 
}: AccuracyIndicatorProps) {
  const [collectionResult, setCollectionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to get existing data first
      const existing = dataCollectionService.getCollectionResult(companySymbol);
      
      if (existing) {
        setCollectionResult(existing);
        setIsLoading(false);
      } else {
        // If no data exists, trigger collection
        try {
          const result = await dataCollectionService.collectCompanyData(companySymbol);
          setCollectionResult(result);
        } catch (error) {
          console.error('Failed to collect data for', companySymbol, error);
          setCollectionResult(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
  }, [companySymbol]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
        {showDetails && <span className="body-small text-[var(--text-secondary)]">Loading...</span>}
      </div>
    );
  }

  if (!collectionResult) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              {showDetails && (
                <Badge variant="destructive" className="text-xs">
                  No Data
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>No data available for {companySymbol}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const confidence = collectionResult.overallConfidence;
  const status = collectionResult.validationStatus;
  const lastUpdated = new Date(collectionResult.lastUpdated);
  const daysSinceUpdate = Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

  const getStatusIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle className={`text-[var(--care-emerald)] ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />;
      case 'pending':
        return <Clock className={`text-yellow-600 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />;
      case 'flagged':
        return <AlertTriangle className={`text-orange-600 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />;
      case 'failed':
        return <AlertTriangle className={`text-red-600 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />;
      default:
        return <Shield className={`text-gray-500 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />;
    }
  };

  const getConfidenceColor = () => {
    if (confidence >= 0.9) return 'text-[var(--care-emerald)]';
    if (confidence >= 0.8) return 'text-[var(--care-teal)]';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-[var(--care-emerald)] text-white text-xs">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="text-xs">Pending</Badge>;
      case 'flagged':
        return <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">Flagged</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="text-xs">Failed</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const getFreshnessWarning = () => {
    if (daysSinceUpdate > 90) return 'Outdated data (>90 days)';
    if (daysSinceUpdate > 30) return 'Stale data (>30 days)';
    return null;
  };

  const freshnessWarning = getFreshnessWarning();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            {showDetails && (
              <div className="flex items-center gap-2">
                <span className={`${size === 'sm' ? 'text-xs' : 'body-small'} font-mono ${getConfidenceColor()}`}>
                  {(confidence * 100).toFixed(0)}%
                </span>
                {size !== 'sm' && getStatusBadge()}
                {freshnessWarning && (
                  <AlertTriangle className="w-3 h-3 text-yellow-600" />
                )}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Data Quality:</span>
              <span className={`font-mono ${getConfidenceColor()}`}>
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <span className="capitalize">{status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Metrics:</span>
              <span>{Object.keys(collectionResult.metrics || {}).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Updated:</span>
              <span>{daysSinceUpdate === 0 ? 'Today' : `${daysSinceUpdate}d ago`}</span>
            </div>
            {freshnessWarning && (
              <div className="text-yellow-600 text-xs mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {freshnessWarning}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}