import React from 'react';
import { RestaurantAnalysis, RestaurantData } from '../../types/calculator';
import { useTranslation } from '../../hooks/useTranslation';
import { formatPercentage } from '../../utils/calculations';
import { downloadCSV, downloadCleanPDF } from '../../utils/downloadUtils';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Download,
  RefreshCw,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

interface ResultsStepProps {
  analysis: RestaurantAnalysis | null;
  data: Partial<RestaurantData>;
  onRecalculate: () => void;
}

export function ResultsStep({ analysis, data, onRecalculate }: ResultsStepProps) {
  const { t, formatCurrency } = useTranslation();
  
  const handleDownloadCSV = () => {
    if (analysis) {
      downloadCSV(analysis, data, formatCurrency, data.businessName, data.businessType);
    }
  };
  
  const handleDownloadPDF = async () => {
    if (analysis) {
      await downloadCleanPDF(analysis, data, formatCurrency, data.businessName, data.businessType);
    }
  };
  
  if (!analysis) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Calculando análisis...</p>
      </div>
    );
  }

  const { metrics, cmvStatus, laborStatus, profitabilityStatus, recommendations } = analysis;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const MetricCard = ({ 
    title, 
    value, 
    subtitle, 
    status, 
    icon: Icon, 
    trend 
  }: {
    title: string;
    value: string;
    subtitle?: string;
    status: 'good' | 'warning' | 'danger';
    icon: React.ElementType;
    trend?: 'up' | 'down';
  }) => {
    const statusColor = getStatusColor(status);
    
    return (
      <div className={`metric-card metric-${status} relative overflow-hidden`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Icon className={`w-5 h-5 mr-2 text-${statusColor}-600`} />
              <h3 className="text-sm font-medium text-gray-700">{title}</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            {subtitle && (
              <div className="text-sm text-gray-600">{subtitle}</div>
            )}
          </div>
          {trend && (
            <div className={`text-${trend === 'up' ? 'success' : 'danger'}-500`}>
              {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <BarChart3 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('steps.results.title')}
        </h2>
        {data.businessName && (
          <h3 className="text-xl text-gray-700 mb-2">
            {data.businessName}
          </h3>
        )}
        {data.businessType && (
          <p className="text-sm text-gray-500 mb-4">
            {t(`business.type.options.${data.businessType}`)}
          </p>
        )}
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('steps.results.subheading')}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={t('steps.results.grossProfit')}
          value={formatCurrency(metrics.grossProfit)}
          subtitle="Ingresos - Costo de Mercancía"
          status={metrics.grossProfit > 0 ? 'good' : 'danger'}
          icon={DollarSign}
          trend={metrics.grossProfit > 0 ? 'up' : 'down'}
        />
        
        <MetricCard
          title={t('steps.results.netProfit')}
          value={formatCurrency(metrics.netProfit)}
          subtitle={`${formatPercentage(metrics.netProfitMargin)} ${t('steps.results.netMargin')}`}
          status={profitabilityStatus.status as 'good' | 'warning' | 'danger'}
          icon={TrendingUp}
          trend={metrics.netProfit > 0 ? 'up' : 'down'}
        />
        
        <MetricCard
          title={t('steps.results.breakeven')}
          value={formatCurrency(metrics.breakEvenPoint)}
          subtitle="Punto de equilibrio mensual"
          status={metrics.breakEvenPoint < metrics.grossProfit + metrics.netProfit ? 'good' : 'warning'}
          icon={Target}
        />
        
        <MetricCard
          title={t('steps.results.cmvCosts')}
          value={formatPercentage(metrics.cmvPercentage)}
          subtitle="Porcentaje de ingresos"
          status={cmvStatus.status as 'good' | 'warning' | 'danger'}
          icon={AlertTriangle}
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CMV Analysis */}
        <div className={`rounded-lg p-6 border-2 ${
          cmvStatus.status === 'good' ? 'bg-success-50 border-success-200' :
          cmvStatus.status === 'warning' ? 'bg-warning-50 border-warning-200' :
          'bg-danger-50 border-danger-200'
        }`}>
          <div className="flex items-center mb-3">
            {React.createElement(getStatusIcon(cmvStatus.status), {
              className: `w-6 h-6 mr-2 text-${getStatusColor(cmvStatus.status)}-600`
            })}
            <h3 className="font-semibold text-gray-900">Análisis CMV</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatPercentage(metrics.cmvPercentage)}
          </div>
          <p className={`text-sm text-${getStatusColor(cmvStatus.status)}-800`}>
            {cmvStatus.message}
          </p>
        </div>

        {/* Labor Analysis */}
        <div className={`rounded-lg p-6 border-2 ${
          laborStatus.status === 'good' ? 'bg-success-50 border-success-200' :
          laborStatus.status === 'warning' ? 'bg-warning-50 border-warning-200' :
          'bg-danger-50 border-danger-200'
        }`}>
          <div className="flex items-center mb-3">
            {React.createElement(getStatusIcon(laborStatus.status), {
              className: `w-6 h-6 mr-2 text-${getStatusColor(laborStatus.status)}-600`
            })}
            <h3 className="font-semibold text-gray-900">Análisis Personal</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatPercentage(metrics.laborCostPercentage)}
          </div>
          <p className={`text-sm text-${getStatusColor(laborStatus.status)}-800`}>
            {laborStatus.message}
          </p>
        </div>

        {/* Profitability Analysis */}
        <div className={`rounded-lg p-6 border-2 ${
          profitabilityStatus.status === 'good' ? 'bg-success-50 border-success-200' :
          profitabilityStatus.status === 'warning' ? 'bg-warning-50 border-warning-200' :
          'bg-danger-50 border-danger-200'
        }`}>
          <div className="flex items-center mb-3">
            {React.createElement(getStatusIcon(profitabilityStatus.status), {
              className: `w-6 h-6 mr-2 text-${getStatusColor(profitabilityStatus.status)}-600`
            })}
            <h3 className="font-semibold text-gray-900">Rentabilidad</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatPercentage(metrics.netProfitMargin)}
          </div>
          <p className={`text-sm text-${getStatusColor(profitabilityStatus.status)}-800`}>
            {profitabilityStatus.message}
          </p>
        </div>
      </div>

      {/* Cost Breakdown Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">
          📊 {t('steps.results.costBreakdown')}
        </h3>
        <div className="space-y-4">
          {/* CMV Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">{t('steps.results.cmvCosts')}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 mx-4 relative overflow-hidden">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(metrics.cmvPercentage, 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {formatPercentage(metrics.cmvPercentage)}
              </div>
            </div>
            <div className="w-20 text-sm text-gray-600 text-right">
              {formatCurrency(metrics.grossProfit < 0 ? 0 : (metrics.cmvPercentage / 100) * (metrics.grossProfit + (metrics.cmvPercentage / 100) * (metrics.grossProfit + metrics.netProfit)))}
            </div>
          </div>

          {/* Labor Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">{t('steps.results.laborCosts')}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 mx-4 relative overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(metrics.laborCostPercentage, 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {formatPercentage(metrics.laborCostPercentage)}
              </div>
            </div>
            <div className="w-20 text-sm text-gray-600 text-right">
              {formatCurrency((metrics.laborCostPercentage / 100) * (metrics.grossProfit + metrics.netProfit))}
            </div>
          </div>

          {/* Operating Costs Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">{t('steps.results.operatingCosts')}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 mx-4 relative overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100 - metrics.cmvPercentage - metrics.laborCostPercentage - metrics.netProfitMargin, 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {formatPercentage(100 - metrics.cmvPercentage - metrics.laborCostPercentage - metrics.netProfitMargin)}
              </div>
            </div>
            <div className="w-20 text-sm text-gray-600 text-right">
              {formatCurrency(metrics.breakEvenPoint - (metrics.cmvPercentage / 100) * (metrics.grossProfit + metrics.netProfit) - (metrics.laborCostPercentage / 100) * (metrics.grossProfit + metrics.netProfit))}
            </div>
          </div>

          {/* Profit Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">Ganancia</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 mx-4 relative overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  metrics.netProfitMargin > 0 ? 'bg-success-500' : 'bg-danger-500'
                }`}
                style={{ width: `${Math.max(Math.min(metrics.netProfitMargin, 100), 0)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {formatPercentage(metrics.netProfitMargin)}
              </div>
            </div>
            <div className="w-20 text-sm text-gray-600 text-right">
              {formatCurrency(metrics.netProfit)}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">
          💡 {t('steps.results.recommendations')}
        </h3>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-lg mr-3 mt-0.5">
                {recommendation.startsWith('🔴') ? '🔴' : 
                 recommendation.startsWith('🟡') ? '🟡' : '🟢'}
              </div>
              <p className="text-sm text-gray-800 flex-1">
                {recommendation.replace(/^[🔴🟡🟢]\s*/u, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRecalculate}
          className="flex items-center justify-center px-6 py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors shadow-soft"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {t('steps.results.newCalculation')}
        </button>
        
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-soft"
        >
          <FileText className="w-5 h-5 mr-2" />
          Descargar PDF
        </button>
        
        <button
          onClick={handleDownloadCSV}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-soft"
        >
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Descargar Excel
        </button>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
        <p>
          📈 <strong>{t('steps.results.footerNote')}:</strong> {t('steps.results.footerDisclaimer')}
        </p>
      </div>
    </div>
  );
}