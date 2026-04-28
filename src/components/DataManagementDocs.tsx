// Data Management Documentation - Comprehensive API Integration System
// Password protected documentation for Carefolio's data architecture

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X,
  Database,
  Link,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Code,
  FileText,
  BarChart3,
  Building2,
  Lock,
  Unlock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DataManagementDocsProps {
  onClose: () => void;
}

export function DataManagementDocs({ onClose }: DataManagementDocsProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (password === 'datamanager2024') {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password. Contact system administrator for access.');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border border-gray-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--care-emerald)] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Management Documentation</h2>
            <p className="text-gray-600">This documentation contains sensitive API integration details and system architecture information.</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Access Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter documentation password"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[var(--care-emerald)] hover:bg-[var(--care-emerald)]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 mr-2" />
                    Access Documentation
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This system contains proprietary information about Carefolio's data architecture, API integrations, and company data management processes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Main Documentation Content
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[var(--care-emerald)] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Carefolio Data Management System</h1>
              <p className="text-white/90">Comprehensive API Integration & Company Data Architecture</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="api-config">API Config</TabsTrigger>
              <TabsTrigger value="data-quality">Data Quality</TabsTrigger>
              <TabsTrigger value="eurofins">Eurofins</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[var(--care-emerald)]" />
                    System Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    The Carefolio Data Management System is a comprehensive solution for integrating external APIs, 
                    validating company data, and maintaining data quality across the Care Index Global 100 dataset. 
                    The system supports real-time data fetching, automated Care Index calculations, and scalable 
                    company data management.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Data Sources</span>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Financial APIs (Alpha Vantage, Yahoo Finance)</li>
                        <li>• ESG Data (MSCI, Sustainalytics)</li>
                        <li>• HR Data (Glassdoor, LinkedIn)</li>
                        <li>• Company Reports & Filings</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Processing</span>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Automated Care Index calculation</li>
                        <li>• Data quality scoring</li>
                        <li>• Template-based generation</li>
                        <li>• Real-time validation</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Output</span>
                      </div>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Complete Company objects</li>
                        <li>• Data source tracking</li>
                        <li>• Update recommendations</li>
                        <li>• Quality metrics</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span className="font-medium text-amber-900">Key Benefits</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-700">
                      <div>✅ Scalable to hundreds of companies</div>
                      <div>✅ Real-time data freshness tracking</div>
                      <div>✅ Automated quality scoring</div>
                      <div>✅ Template-based company creation</div>
                      <div>✅ Multi-source data integration</div>
                      <div>✅ Production-ready architecture</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Architecture Tab */}
            <TabsContent value="architecture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[var(--care-emerald)]" />
                    System Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Core Components</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-[var(--care-emerald)] pl-4">
                        <h4 className="font-medium text-gray-900">Data Types & Interfaces</h4>
                        <p className="text-sm text-gray-600 mt-1">Enhanced Company interface with data source tracking, financial API data structures, ESG data interfaces, and care metrics definitions.</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary">Company</Badge>
                          <Badge variant="secondary">FinancialApiData</Badge>
                          <Badge variant="secondary">ESGApiData</Badge>
                          <Badge variant="secondary">CareMetricsApiData</Badge>
                        </div>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900">API Integration Layer</h4>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive API configuration with endpoints for financial data, ESG ratings, and company information from multiple providers.</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Alpha Vantage</Badge>
                          <Badge variant="outline">Yahoo Finance</Badge>
                          <Badge variant="outline">MSCI ESG</Badge>
                          <Badge variant="outline">Glassdoor</Badge>
                        </div>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium text-gray-900">Data Quality Engine</h4>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive validation system with completeness scoring, freshness validation, and update priority ranking.</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Validation</Badge>
                          <Badge variant="outline">Completeness</Badge>
                          <Badge variant="outline">Freshness</Badge>
                          <Badge variant="outline">Priority</Badge>
                        </div>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-medium text-gray-900">Care Index Calculator</h4>
                        <p className="text-sm text-gray-600 mt-1">Weighted scoring system for calculating Care Index scores from multiple metrics including parental leave, women leadership, and ESG alignment.</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Weighted Calculation</Badge>
                          <Badge variant="outline">Band Assignment</Badge>
                          <Badge variant="outline">Trend Analysis</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Data Flow Architecture</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                        <span><strong>Template Creation:</strong> Define company basic info, API mappings, and manual overrides</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                        <span><strong>API Data Fetching:</strong> Parallel requests to financial, ESG, and care metrics APIs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                        <span><strong>Data Processing:</strong> Merge API responses with manual overrides and calculate metrics</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">4</div>
                        <span><strong>Care Index Calculation:</strong> Apply weighted formula to generate care score and band</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">5</div>
                        <span><strong>Quality Assessment:</strong> Validate completeness, freshness, and assign update priority</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[var(--care-emerald)] rounded-full flex items-center justify-center text-white font-bold text-xs">6</div>
                        <span><strong>Company Generation:</strong> Create complete Company object with all tracking metadata</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Configuration Tab */}
            <TabsContent value="api-config" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="w-5 h-5 text-[var(--care-emerald)]" />
                    API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Financial APIs */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-green-700">Financial Data APIs</h3>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Alpha Vantage</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> alphavantage.co/query</div>
                          <div><strong>Functions:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• OVERVIEW - Company overview</li>
                            <li>• INCOME_STATEMENT - Financials</li>
                            <li>• BALANCE_SHEET - Balance data</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Yahoo Finance</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> query1.finance.yahoo.com</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /quote - Real-time quotes</li>
                            <li>• /financials - Financial data</li>
                            <li>• /statistics - Key statistics</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Polygon.io</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.polygon.io</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /v3/reference/tickers - Ticker details</li>
                            <li>• /vX/reference/financials - Financial data</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ESG APIs */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-blue-700">ESG Data APIs</h3>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">MSCI ESG</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.msci.com/esg</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /ratings - ESG ratings</li>
                            <li>• /scores - Detailed scores</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Sustainalytics</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.sustainalytics.com</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /esg-scores - ESG scoring</li>
                            <li>• /company - Company data</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Refinitiv</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.refinitiv.com</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /v1/views/scores-full - Full ESG scores</li>
                            <li>• /v1/views/basic-company-data - Company basics</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Company Data APIs */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-purple-700">Company Data APIs</h3>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Clearbit</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> company.clearbit.com</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /v1/domains/find - Company lookup</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Glassdoor</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.glassdoor.com</div>
                          <div><strong>Version:</strong> 1.1</div>
                          <div><strong>Data:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• Employee benefits</li>
                            <li>• Company reviews</li>
                            <li>• Diversity metrics</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">LinkedIn</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <div><code>BASE_URL:</code> api.linkedin.com/v2</div>
                          <div><strong>Endpoints:</strong></div>
                          <ul className="ml-4 space-y-1">
                            <li>• /organizations - Company profiles</li>
                            <li>• /people - Leadership data</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-medium text-amber-900 mb-2">Symbol Mapping Example</h3>
                    <div className="bg-white rounded border p-3 font-mono text-sm">
                      <div className="text-gray-600">// Eurofins Scientific symbol mappings</div>
                      <div>"ERF.PA": {`{`}</div>
                      <div className="ml-4">name: "Eurofins Scientific",</div>
                      <div className="ml-4">yahoo_symbol: "ERF.PA",</div>
                      <div className="ml-4">alpha_vantage_symbol: "ERF",</div>
                      <div className="ml-4">bloomberg_symbol: "ERF:FP",</div>
                      <div className="ml-4">exchange: "Euronext Paris",</div>
                      <div className="ml-4">currency: "EUR"</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Quality Tab */}
            <TabsContent value="data-quality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--care-emerald)]" />
                    Data Quality Framework
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Completeness Scoring</h3>
                      <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">Excellent (95%+)</span>
                          </div>
                          <p className="text-sm text-gray-600">All required and most optional fields complete</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">Good (85-94%)</span>
                          </div>
                          <p className="text-sm text-gray-600">Required fields complete, some optional missing</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-medium">Fair (70-84%)</span>
                          </div>
                          <p className="text-sm text-gray-600">Most required fields complete</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-medium">Poor (&lt;70%)</span>
                          </div>
                          <p className="text-sm text-gray-600">Missing critical required fields</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Data Freshness Thresholds</h3>
                      <div className="space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Financial Data</span>
                          </div>
                          <p className="text-sm text-gray-600">Must be updated within <strong>90 days</strong></p>
                          <div className="text-xs text-gray-500 mt-1">Market cap, revenue, financial ratios</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-green-600" />
                            <span className="font-medium">ESG Data</span>
                          </div>
                          <p className="text-sm text-gray-600">Must be updated within <strong>180 days</strong></p>
                          <div className="text-xs text-gray-500 mt-1">ESG ratings, sustainability metrics</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">Care Metrics</span>
                          </div>
                          <p className="text-sm text-gray-600">Must be updated within <strong>365 days</strong></p>
                          <div className="text-xs text-gray-500 mt-1">Parental leave, women leadership, benefits</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Required vs Optional Fields</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-red-700 mb-3">Required Fields (Must Have)</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>name</code> - Company name
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>symbol</code> - Trading symbol
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>sector</code> - Business sector
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>market_cap</code> - Market capitalization
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>care_index.score</code> - Care Index score
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>care_metrics.parental_leave.weeks</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-red-500" />
                            <code>care_metrics.women_leadership.percentage</code>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-700 mb-3">Optional Fields (Nice to Have)</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            <code>enhanced_financial.pe_ratio</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            <code>enhanced_financial.dividend_yield</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            <code>care_metrics.pay_equity.certification</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            <code>story.maternal_voice</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-medium text-amber-900 mb-2">Update Priority Logic</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong className="text-red-600">High Priority:</strong> Missing required fields OR data quality score &lt; 70%</div>
                      <div><strong className="text-yellow-600">Medium Priority:</strong> Data quality score &lt; 85% OR financial data not fresh</div>
                      <div><strong className="text-green-600">Low Priority:</strong> All requirements met, good data quality</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Eurofins Tab */}
            <TabsContent value="eurofins" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[var(--care-emerald)]" />
                    Eurofins Scientific Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-green-900 mb-4">Complete Integration Status</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Company Data</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Symbol:</span>
                            <code className="bg-white px-2 py-1 rounded">ERF.PA</code>
                          </div>
                          <div className="flex justify-between">
                            <span>Exchange:</span>
                            <span>Euronext Paris</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sector:</span>
                            <span>Healthcare</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Care Index:</span>
                            <Badge>72 (Band B)</Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Market Cap:</span>
                            <span>€9.8B</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Employees:</span>
                            <span>61,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Parental Leave:</span>
                            <span>16 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Women Leadership:</span>
                            <span>38%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Template Configuration</h3>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <div className="text-gray-600">// Eurofins Scientific Template</div>
                      <div>const EUROFINS_TEMPLATE = {`{`}</div>
                      <div className="ml-4">basic_info: {`{`}</div>
                      <div className="ml-8">name: "Eurofins Scientific",</div>
                      <div className="ml-8">symbol: "ERF.PA",</div>
                      <div className="ml-8">sector: "Healthcare",</div>
                      <div className="ml-8">region: "Europe",</div>
                      <div className="ml-8">country: "France"</div>
                      <div className="ml-4">{`},`}</div>
                      <div className="ml-4">api_mappings: {`{`}</div>
                      <div className="ml-8">financial_api_symbol: "ERF.PA",</div>
                      <div className="ml-8">esg_api_symbol: "ERF",</div>
                      <div className="ml-8">alternative_symbols: ["ERFSF", "ERF:FP"]</div>
                      <div className="ml-4">{`},`}</div>
                      <div className="ml-4">manual_overrides: {`{`}</div>
                      <div className="ml-8 text-gray-600">// Care metrics, story, harm factors</div>
                      <div className="ml-4">{`}`}</div>
                      <div>{`};`}</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-blue-900 mb-4">Maternal Voice & Investment Thesis</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Maternal Voice</h4>
                        <p className="text-blue-700 italic leading-relaxed">
                          "Eurofins protects families through rigorous testing that ensures food safety, water quality, 
                          and pharmaceutical integrity - the invisible guardians that keep our children safe every day."
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Investment Thesis</h4>
                        <p className="text-blue-700">
                          Global laboratory testing leader with essential safety mission and growing demand for quality assurance
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Care Innovations</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Food safety testing</Badge>
                          <Badge variant="outline">Environmental monitoring</Badge>
                          <Badge variant="outline">Pharmaceutical quality</Badge>
                          <Badge variant="outline">Consumer protection</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-purple-900 mb-4">Data Sources & Tracking</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">API Sources</h4>
                        <div className="space-y-1 text-sm">
                          <div>Financial: Euronext/Yahoo Finance</div>
                          <div>ESG: MSCI ESG Ratings</div>
                          <div>Care Metrics: Glassdoor + Company Reports</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Data Quality</h4>
                        <div className="space-y-1 text-sm">
                          <div>Completeness: 94%</div>
                          <div>Last Updated: 2024-12-19</div>
                          <div>Update Priority: Low</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Implementation Tab */}
            <TabsContent value="implementation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-[var(--care-emerald)]" />
                    Implementation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Core Functions</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-green-700 mb-2">Data Calculation</h4>
                          <div className="text-sm space-y-1">
                            <div><code>calculateCareIndexScore()</code></div>
                            <div><code>determineCareBand()</code></div>
                            <div><code>calculateDataCompleteness()</code></div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-700 mb-2">Data Validation</h4>
                          <div className="text-sm space-y-1">
                            <div><code>validateCompanyData()</code></div>
                            <div><code>isDataFresh()</code></div>
                            <div><code>generateUpdateStatus()</code></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-purple-700 mb-2">API Integration</h4>
                          <div className="text-sm space-y-1">
                            <div><code>fetchFinancialData()</code></div>
                            <div><code>fetchESGData()</code></div>
                            <div><code>fetchCareMetrics()</code></div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-orange-700 mb-2">Company Management</h4>
                          <div className="text-sm space-y-1">
                            <div><code>createCompanyFromTemplate()</code></div>
                            <div><code>updateCompanyData()</code></div>
                            <div><code>batchUpdateCompanies()</code></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-blue-900 mb-4">Usage Examples</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">1. Create New Company</h4>
                        <div className="bg-white border rounded p-3 font-mono text-sm overflow-x-auto">
                          <div className="text-gray-600">// Create company from template</div>
                          <div>const newCompany = await createCompanyFromTemplate(EUROFINS_TEMPLATE);</div>
                          <div>console.log(`Created: $&#123;newCompany.name&#125; with Care Index $&#123;newCompany.care_index.score&#125;`);</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">2. Update Existing Company</h4>
                        <div className="bg-white border rounded p-3 font-mono text-sm overflow-x-auto">
                          <div className="text-gray-600">// Update company with fresh data</div>
                          <div>const updatedCompany = await updateCompanyData(existingCompany);</div>
                          <div>const status = generateUpdateStatus(updatedCompany);</div>
                          <div>console.log(`Data quality: $&#123;status.data_quality_score&#125;%`);</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">3. Batch Processing</h4>
                        <div className="bg-white border rounded p-3 font-mono text-sm overflow-x-auto">
                          <div className="text-gray-600">// Update multiple companies</div>
                          <div>const &#123; updated, errors &#125; = await batchUpdateCompanies(companies);</div>
                          <div>console.log(`Updated $&#123;updated.length&#125; companies, $&#123;errors.length&#125; errors`);</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-amber-900 mb-4">Production Deployment</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">1. API Key Configuration</h4>
                        <div className="bg-white border rounded p-3 font-mono text-sm">
                          <div className="text-gray-600">// Environment variables</div>
                          <div>ALPHA_VANTAGE_API_KEY=your_key_here</div>
                          <div>MSCI_ESG_API_KEY=your_key_here</div>
                          <div>GLASSDOOR_API_KEY=your_key_here</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">2. Rate Limiting & Caching</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Implement API rate limiting (5 requests per batch)</li>
                          <li>• Add response caching for frequently accessed data</li>
                          <li>• Set up retry logic with exponential backoff</li>
                          <li>• Monitor API usage and costs</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">3. Error Handling</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Graceful fallback to cached/mock data</li>
                          <li>• Comprehensive error logging</li>
                          <li>• Data quality alerts for critical failures</li>
                          <li>• Automated recovery procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-green-900 mb-4">Scaling Considerations</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Performance</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Parallel API requests for faster processing</li>
                          <li>• Database indexing on frequently queried fields</li>
                          <li>• Background processing for large batch updates</li>
                          <li>• CDN caching for static company data</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Reliability</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Multiple API provider fallbacks</li>
                          <li>• Data validation at every step</li>
                          <li>• Automated data quality monitoring</li>
                          <li>• Regular backup and recovery testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}