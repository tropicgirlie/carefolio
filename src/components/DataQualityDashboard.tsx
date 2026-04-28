import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Eye, 
  Filter, 
  Loader2, 
  RefreshCw, 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  Search,
  Download,
  Upload,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { dataCollectionService, AccuracyMetrics, DataCollectionResult, DataSource } from '../utils/dataCollectionService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DataQualityDashboardProps {
  onClose: () => void;
  onNavigateToValidation?: (companySymbol: string) => void;
}

export function DataQualityDashboard({ onClose, onNavigateToValidation }: DataQualityDashboardProps) {
  const [accuracyMetrics, setAccuracyMetrics] = useState<AccuracyMetrics | null>(null);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [validationQueue, setValidationQueue] = useState<Array<{
    company: DataCollectionResult;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }>>([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial data
  useEffect(() => {
    loadDashboardData();
    
    // Set up periodic refresh
    refreshIntervalRef.current = setInterval(loadDashboardData, 30000); // 30 seconds
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const loadDashboardData = () => {
    const metrics = dataCollectionService.getAccuracyMetrics();
    const sources = dataCollectionService.getDataSources();
    const queue = dataCollectionService.getValidationQueue();
    
    setAccuracyMetrics(metrics);
    setDataSources(sources);
    setValidationQueue(queue);
    setIsCollecting(dataCollectionService.isCurrentlyCollecting());
  };

  const handleBatchCollection = async () => {
    if (isCollecting) return;
    
    // Mock company symbols for demo
    const mockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'CRM', 'ADBE'];
    
    setIsCollecting(true);
    try {
      await dataCollectionService.batchCollectData(mockSymbols);
      loadDashboardData();
    } catch (error) {
      console.error('Batch collection failed:', error);
    } finally {
      setIsCollecting(false);
    }
  };

  const handleValidateCompany = async (companySymbol: string) => {
    if (onNavigateToValidation) {
      onNavigateToValidation(companySymbol);
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <Eye className="w-4 h-4" />;
    }
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatNumber = (value: number) => value.toLocaleString();

  const filteredQueue = validationQueue.filter(item => {
    const matchesSearch = item.company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.company.companySymbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  if (!accuracyMetrics) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--care-emerald)] mx-auto mb-4" />
          <p className="body-medium text-[var(--text-secondary)]">Loading data quality metrics...</p>
        </div>
      </div>
    );
  }

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
                  onClick={onClose}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  ← Back to Dashboard
                </Button>
                <div>
                  <h1 className="headline-h2 text-[var(--text-primary)] mb-1">Data Quality Dashboard</h1>
                  <p className="body-small text-[var(--text-secondary)]">
                    Monitor collection accuracy and manage validation workflows
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Live Monitoring
                </Badge>
                <Button
                  onClick={handleBatchCollection}
                  disabled={isCollecting}
                  className="bg-[var(--care-emerald)] hover:bg-[var(--care-vibrant-mint)] text-white"
                >
                  {isCollecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Collecting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Run Collection
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="container py-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="body-small text-[var(--text-secondary)] uppercase tracking-wide">
                  Overall Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-[var(--care-emerald)]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                    {formatPercentage(accuracyMetrics.averageConfidence)}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    accuracyMetrics.averageConfidence >= 0.8 
                      ? 'bg-[var(--care-emerald)]/10 text-[var(--care-emerald)]'
                      : accuracyMetrics.averageConfidence >= 0.6
                      ? 'bg-yellow-500/10 text-yellow-600'
                      : 'bg-red-500/10 text-red-600'
                  }`}>
                    <Target className="w-3 h-3" />
                    {accuracyMetrics.averageConfidence >= 0.8 ? 'Target Met' : 'Below Target'}
                  </div>
                </div>
                <Progress 
                  value={accuracyMetrics.averageConfidence * 100} 
                  className="mt-3"
                />
                <p className="body-small text-[var(--text-secondary)] mt-2">
                  Target: 80%+ accuracy rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="body-small text-[var(--text-secondary)] uppercase tracking-wide">
                  Data Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  {formatNumber(accuracyMetrics.companiesWithData)}
                </div>
                <p className="body-small text-[var(--text-secondary)] mt-1">
                  of {formatNumber(accuracyMetrics.totalCompanies)} companies
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Database className="w-4 h-4 text-[var(--care-emerald)]" />
                  <span className="body-small">
                    {formatPercentage(accuracyMetrics.companiesWithData / accuracyMetrics.totalCompanies)} coverage
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="body-small text-[var(--text-secondary)] uppercase tracking-wide">
                  Validation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--care-emerald)]" />
                      <span className="body-small">Verified</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.verifiedDataPoints)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="body-small">Pending</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.pendingValidation)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="body-small">Flagged</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.flaggedDataPoints)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="body-small text-[var(--text-secondary)] uppercase tracking-wide">
                  Data Freshness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--care-emerald)]"></div>
                      <span className="body-small">Fresh (&lt;30d)</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.dataFreshness.fresh)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="body-small">Stale (30-90d)</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.dataFreshness.stale)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="body-small">Outdated (&gt;90d)</span>
                    </div>
                    <span className="body-small font-mono">{formatNumber(accuracyMetrics.dataFreshness.outdated)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert for Low Accuracy */}
          {accuracyMetrics.averageConfidence < 0.8 && (
            <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/5">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Accuracy Below Target:</strong> Current accuracy is {formatPercentage(accuracyMetrics.averageConfidence)}, 
                below the 80% target. Consider increasing validation efforts or improving data sources.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sources">Data Sources</TabsTrigger>
              <TabsTrigger value="validation">Validation Queue</TabsTrigger>
              <TabsTrigger value="metrics">Metric Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Accuracy Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[var(--care-emerald)]" />
                    Accuracy Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-[var(--text-secondary)]">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Accuracy trend visualization would appear here</p>
                      <p className="text-sm mt-2">Historical data collection needed for trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Collection Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[var(--care-emerald)]" />
                      Collection Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <span className="body-small">Average Response Time</span>
                        <span className="body-small font-mono">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <span className="body-small">Success Rate</span>
                        <span className="body-small font-mono">87.3%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <span className="body-small">Last Collection</span>
                        <span className="body-small font-mono">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[var(--care-emerald)]" />
                      Data Quality Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-[var(--care-emerald)] mb-2" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                        {Math.round(accuracyMetrics.averageConfidence * 100)}
                      </div>
                      <p className="body-small text-[var(--text-secondary)] mb-4">
                        Overall Quality Score
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        {accuracyMetrics.averageConfidence >= 0.9 ? (
                          <Badge className="bg-[var(--care-emerald)] text-white">Excellent</Badge>
                        ) : accuracyMetrics.averageConfidence >= 0.8 ? (
                          <Badge className="bg-[var(--care-teal)] text-white">Good</Badge>
                        ) : accuracyMetrics.averageConfidence >= 0.7 ? (
                          <Badge variant="secondary">Fair</Badge>
                        ) : (
                          <Badge variant="destructive">Needs Improvement</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-[var(--care-emerald)]" />
                    Data Sources Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataSources.map(source => (
                      <div key={source.id} className="flex items-center justify-between p-4 border border-[var(--outline-variant)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            source.reliability >= 0.9 ? 'bg-[var(--care-emerald)]' :
                            source.reliability >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <h4 className="body-medium-medium">{source.name}</h4>
                            <p className="body-small text-[var(--text-secondary)] capitalize">{source.type}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="body-small font-mono">
                            {formatPercentage(source.reliability)} reliable
                          </div>
                          <div className="body-small text-[var(--text-secondary)]">
                            {formatPercentage(source.successRate)} success
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="body-small font-mono">{source.avgResponseTime}ms</div>
                          <div className="body-small text-[var(--text-secondary)]">avg response</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="validation" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[var(--care-emerald)]" />
                      Validation Queue
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-[var(--text-secondary)]" />
                        <Input
                          placeholder="Search companies..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-48"
                        />
                      </div>
                      <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredQueue.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-[var(--care-emerald)] mx-auto mb-4 opacity-50" />
                      <h3 className="headline-h3 text-[var(--text-primary)] mb-2">All Clear!</h3>
                      <p className="body-medium text-[var(--text-secondary)]">
                        No companies currently need validation.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredQueue.map(item => (
                        <div 
                          key={item.company.companySymbol}
                          className="flex items-center justify-between p-4 border border-[var(--outline-variant)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Badge variant={getPriorityColor(item.priority)} className="flex items-center gap-1">
                              {getPriorityIcon(item.priority)}
                              {item.priority.toUpperCase()}
                            </Badge>
                            <div>
                              <h4 className="body-medium-medium">{item.company.companyName}</h4>
                              <p className="body-small text-[var(--text-secondary)]">
                                {item.company.companySymbol} • {item.reason}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="body-small font-mono">
                                {formatPercentage(item.company.overallConfidence)}
                              </div>
                              <div className="body-small text-[var(--text-secondary)]">confidence</div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleValidateCompany(item.company.companySymbol)}
                              className="bg-[var(--care-emerald)] hover:bg-[var(--care-vibrant-mint)] text-white"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Validate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[var(--care-emerald)]" />
                    Accuracy by Metric
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(accuracyMetrics.accuracyByMetric).map(([metric, accuracy]) => (
                      <div key={metric} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="body-small capitalize">{metric.replace(/_/g, ' ')}</span>
                          <span className="body-small font-mono">{formatPercentage(accuracy)}</span>
                        </div>
                        <Progress value={accuracy * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </TooltipProvider>
  );
}