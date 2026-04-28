import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Edit3, 
  Save, 
  ArrowLeft, 
  ExternalLink,
  Clock,
  User,
  Database,
  Shield,
  Target,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { dataCollectionService, DataCollectionResult } from '../utils/dataCollectionService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DataValidationInterfaceProps {
  companySymbol: string;
  onBack: () => void;
  onValidationComplete?: (companySymbol: string, validated: boolean) => void;
}

interface ValidationEdit {
  metric: string;
  originalValue: any;
  newValue: any;
  confidence: number;
  notes: string;
}

export function DataValidationInterface({ 
  companySymbol, 
  onBack, 
  onValidationComplete 
}: DataValidationInterfaceProps) {
  const [companyData, setCompanyData] = useState<DataCollectionResult | null>(null);
  const [validationEdits, setValidationEdits] = useState<Map<string, ValidationEdit>>(new Map());
  const [validationNotes, setValidationNotes] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [currentUser] = useState('validator_001'); // Would come from auth context

  useEffect(() => {
    const data = dataCollectionService.getCollectionResult(companySymbol);
    setCompanyData(data || null);
  }, [companySymbol]);

  const handleMetricEdit = (metric: string, newValue: any, confidence: number, notes: string = '') => {
    const originalValue = companyData?.metrics[metric]?.value;
    
    setValidationEdits(prev => {
      const newEdits = new Map(prev);
      newEdits.set(metric, {
        metric,
        originalValue,
        newValue,
        confidence,
        notes
      });
      return newEdits;
    });
  };

  const handleValidateMetric = async (metric: string, isValid: boolean) => {
    if (!companyData) return;

    const edit = validationEdits.get(metric);
    const valueToValidate = edit ? edit.newValue : companyData.metrics[metric].value;
    
    try {
      await dataCollectionService.validateDataPoint(
        companySymbol,
        metric,
        valueToValidate,
        currentUser,
        'human'
      );
      
      // Refresh data
      const updatedData = dataCollectionService.getCollectionResult(companySymbol);
      setCompanyData(updatedData || null);
      
      // Remove from validation edits if validated
      if (isValid) {
        setValidationEdits(prev => {
          const newEdits = new Map(prev);
          newEdits.delete(metric);
          return newEdits;
        });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCompleteValidation = async () => {
    if (!companyData) return;
    
    setIsValidating(true);
    
    try {
      // Apply all pending edits
      for (const edit of validationEdits.values()) {
        await dataCollectionService.validateDataPoint(
          companySymbol,
          edit.metric,
          edit.newValue,
          currentUser,
          'human'
        );
      }
      
      // Add overall validation notes if provided
      if (validationNotes.trim()) {
        console.log(`Validation notes for ${companySymbol}:`, validationNotes);
      }
      
      if (onValidationComplete) {
        onValidationComplete(companySymbol, true);
      }
    } catch (error) {
      console.error('Validation completion failed:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-[var(--care-emerald)]';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) return { variant: 'default' as const, label: 'High Confidence' };
    if (confidence >= 0.7) return { variant: 'secondary' as const, label: 'Medium Confidence' };
    return { variant: 'destructive' as const, label: 'Low Confidence' };
  };

  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      if (value % 1 === 0) return value.toString();
      return value.toFixed(2);
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  const getMetricDisplayName = (metric: string): string => {
    return metric
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!companyData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="headline-h3 text-[var(--text-primary)] mb-2">Company Not Found</h2>
          <p className="body-medium text-[var(--text-secondary)] mb-6">
            No data found for company symbol: {companySymbol}
          </p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Queue
          </Button>
        </div>
      </div>
    );
  }

  const metrics = Object.entries(companyData.metrics);
  const pendingEdits = Array.from(validationEdits.values());

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        {/* Header */}
        <div className="bg-[var(--bg-card)] border-b border-[var(--outline-variant)] sticky top-0 z-40">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Queue
                </Button>
                <div>
                  <h1 className="headline-h2 text-[var(--text-primary)] mb-1">
                    Data Validation: {companyData.companyName}
                  </h1>
                  <p className="body-small text-[var(--text-secondary)] flex items-center gap-2">
                    <span>{companyData.companySymbol}</span>
                    <span>•</span>
                    <span>Last updated: {companyData.lastUpdated.toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getConfidenceColor(companyData.overallConfidence)}`} 
                       style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                    {(companyData.overallConfidence * 100).toFixed(1)}%
                  </div>
                  <div className="body-small text-[var(--text-secondary)]">Overall Confidence</div>
                </div>
                <Badge variant={companyData.validationStatus === 'verified' ? 'default' : 
                              companyData.validationStatus === 'pending' ? 'secondary' : 'destructive'}>
                  {companyData.validationStatus.charAt(0).toUpperCase() + companyData.validationStatus.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <main className="container py-6">
          {/* Company Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--care-emerald)]" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="body-medium-medium text-[var(--text-primary)]">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Symbol:</span>
                      <span className="body-small font-mono">{companyData.companySymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Company ID:</span>
                      <span className="body-small font-mono">{companyData.companyId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="body-medium-medium text-[var(--text-primary)]">Data Quality</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Metrics Count:</span>
                      <span className="body-small font-mono">{metrics.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Data Sources:</span>
                      <span className="body-small font-mono">
                        {new Set(metrics.flatMap(([_, data]) => data.sources)).size}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="body-medium-medium text-[var(--text-primary)]">Validation Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Pending Edits:</span>
                      <span className="body-small font-mono">{pendingEdits.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="body-small text-[var(--text-secondary)]">Next Update:</span>
                      <span className="body-small font-mono">{companyData.nextUpdateDue.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Edits Summary */}
          {pendingEdits.length > 0 && (
            <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/5">
              <Edit3 className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Pending Changes:</strong> You have {pendingEdits.length} unsaved edit(s). 
                Remember to complete validation to save your changes.
              </AlertDescription>
            </Alert>
          )}

          {/* Metrics Validation */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[var(--care-emerald)]" />
                Metrics Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metrics.map(([metric, data]) => {
                  const edit = validationEdits.get(metric);
                  const currentValue = edit ? edit.newValue : data.value;
                  const isEdited = edit !== undefined;
                  const confidenceBadge = getConfidenceBadge(data.confidence);

                  return (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border rounded-lg ${
                        isEdited ? 'border-yellow-500 bg-yellow-500/5' : 'border-[var(--outline-variant)]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="body-medium-medium text-[var(--text-primary)]">
                              {getMetricDisplayName(metric)}
                            </h4>
                            <Badge variant={confidenceBadge.variant}>
                              {confidenceBadge.label}
                            </Badge>
                            {isEdited && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-500">
                                Modified
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="body-small text-[var(--text-secondary)]">Current Value:</span>
                              <div className="body-medium font-mono mt-1 p-2 bg-[var(--bg-secondary)] rounded">
                                {formatValue(currentValue)}
                              </div>
                            </div>
                            <div>
                              <span className="body-small text-[var(--text-secondary)]">Confidence:</span>
                              <div className={`body-medium font-mono mt-1 ${getConfidenceColor(data.confidence)}`}>
                                {(data.confidence * 100).toFixed(1)}%
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="body-small text-[var(--text-secondary)]">Data Sources:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {data.sources.map(source => (
                                  <Badge key={source} variant="outline" className="text-xs">
                                    {source.replace(/_/g, ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="body-small text-[var(--text-secondary)]">Collected:</span>
                              <div className="body-small mt-1 flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {data.collectedAt.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {data.validatedAt && (
                            <div className="flex items-center gap-2 text-[var(--care-emerald)] bg-[var(--care-emerald)]/5 p-2 rounded">
                              <CheckCircle className="w-4 h-4" />
                              <span className="body-small">
                                Validated by {data.validatedBy} on {data.validatedAt.toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Edit Interface */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--outline-variant)]">
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">
                            Edit Value:
                          </label>
                          <Input
                            value={edit ? formatValue(edit.newValue) : formatValue(data.value)}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Try to parse as number if it looks like one
                              const parsedValue = !isNaN(Number(value)) && value.trim() !== '' 
                                ? Number(value) 
                                : value;
                              handleMetricEdit(
                                metric, 
                                parsedValue, 
                                data.confidence,
                                edit?.notes || ''
                              );
                            }}
                            className="font-mono"
                          />
                        </div>
                        
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">
                            Validation Notes:
                          </label>
                          <Input
                            value={edit?.notes || ''}
                            onChange={(e) => {
                              handleMetricEdit(
                                metric,
                                edit?.newValue || data.value,
                                data.confidence,
                                e.target.value
                              );
                            }}
                            placeholder="Optional notes..."
                          />
                        </div>

                        <div className="flex items-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleValidateMetric(metric, true)}
                            className="bg-[var(--care-emerald)] hover:bg-[var(--care-vibrant-mint)] text-white flex-1"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Validate
                          </Button>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Open external verification link (would be actual company data source)
                                  window.open(`https://example.com/verify/${companyData.companySymbol}/${metric}`, '_blank');
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verify with external source</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Overall Validation Notes */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--care-emerald)]" />
                Validation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="body-small text-[var(--text-secondary)] mb-2 block">
                    Overall Validation Notes:
                  </label>
                  <Textarea
                    value={validationNotes}
                    onChange={(e) => setValidationNotes(e.target.value)}
                    placeholder="Add any general notes about this company's data quality, sources, or validation process..."
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Queue
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right text-[var(--text-secondary)] body-small">
                {pendingEdits.length > 0 && (
                  <p>{pendingEdits.length} pending change(s)</p>
                )}
                <p>Validating as: {currentUser}</p>
              </div>
              
              <Button
                onClick={handleCompleteValidation}
                disabled={isValidating}
                className="bg-[var(--care-emerald)] hover:bg-[var(--care-vibrant-mint)] text-white px-6"
              >
                {isValidating ? (
                  <>
                    <Target className="w-4 h-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Complete Validation
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}