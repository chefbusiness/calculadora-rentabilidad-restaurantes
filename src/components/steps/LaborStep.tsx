import React from 'react';
import { CurrencyInput } from '../FormInput';
import { useTranslation } from '../../hooks/useTranslation';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { formatPercentage } from '../../utils/calculations';
import { INDUSTRY_STANDARDS } from '../../types/calculator';

interface LaborStepProps {
  value: number | undefined;
  onChange: (value: number) => void;
  monthlyRevenue: number;
}

export function LaborStep({ value, onChange, monthlyRevenue }: LaborStepProps) {
  const { t, formatCurrency } = useTranslation();
  const laborPercentage = monthlyRevenue > 0 && value ? (value / monthlyRevenue) * 100 : 0;
  
  const getLaborStatus = () => {
    if (laborPercentage <= INDUSTRY_STANDARDS.LABOR_COST_MAX) {
      return { status: 'good', color: 'success', icon: CheckCircle };
    } else if (laborPercentage <= INDUSTRY_STANDARDS.LABOR_COST_MAX + 5) {
      return { status: 'warning', color: 'warning', icon: AlertTriangle };
    } else {
      return { status: 'danger', color: 'danger', icon: AlertTriangle };
    }
  };

  const status = getLaborStatus();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('steps.labor.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('steps.labor.description')}
        </p>
      </div>

      {/* Revenue Context */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-sm text-blue-700 mb-1">{t('steps.labor.monthlyRevenue')}</div>
          <div className="text-lg font-semibold text-blue-900">
            {formatCurrency(monthlyRevenue)}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="max-w-md mx-auto">
        <CurrencyInput
          label={t('steps.labor.inputLabel')}
          value={value}
          onChange={onChange}
          placeholder={t('steps.labor.placeholder')}
          helpText={t('steps.labor.helpText')}
          required
          min={0}
          max={monthlyRevenue * 0.6} // Máximo 60% de ingresos
          className="text-center"
        />
      </div>

      {/* Labor Analysis */}
      {value && value > 0 && monthlyRevenue > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-lg p-6 border-2 ${
            status.status === 'good' ? 'bg-success-50 border-success-200' :
            status.status === 'warning' ? 'bg-warning-50 border-warning-200' :
            'bg-danger-50 border-danger-200'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <StatusIcon className={`w-8 h-8 mr-3 ${
                status.status === 'good' ? 'text-success-600' :
                status.status === 'warning' ? 'text-warning-600' :
                'text-danger-600'
              }`} />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPercentage(laborPercentage)}
                </div>
                <div className="text-sm text-gray-600">{t('steps.labor.ofYourRevenue')}</div>
              </div>
            </div>
            
            <div className={`text-center text-sm ${
              status.status === 'good' ? 'text-success-800' :
              status.status === 'warning' ? 'text-warning-800' :
              'text-danger-800'
            }`}>
              {status.status === 'good' && (
                <p>✅ <strong>{t('steps.labor.controlledCosts')}</strong> {t('steps.labor.idealRange')}</p>
              )}
              {status.status === 'warning' && (
                <p>⚠️ <strong>{t('steps.labor.elevatedCosts')}</strong> {t('steps.labor.considerOptimizing')}</p>
              )}
              {status.status === 'danger' && (
                <p>🚨 <strong>{t('steps.labor.veryHighCosts')}</strong> {t('steps.labor.urgentReview')}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <h3 className="font-semibold text-green-900 mb-3">
            ✅ {t('steps.labor.whatToInclude')}
          </h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• {t('steps.labor.baseSalaries')}</li>
            <li>• {t('steps.labor.socialBenefits')}</li>
            <li>• {t('steps.labor.socialSecurity')}</li>
            <li>• {t('steps.labor.vacations')}</li>
            <li>• {t('steps.labor.bonuses')}</li>
            <li>• {t('steps.labor.uniforms')}</li>
            <li>• {t('steps.labor.training')}</li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-start">
            <Clock className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {t('steps.labor.staffTypes')}
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('steps.labor.chefs')}</li>
                <li>• {t('steps.labor.cooks')}</li>
                <li>• {t('steps.labor.waiters')}</li>
                <li>• {t('steps.labor.bartenders')}</li>
                <li>• {t('steps.labor.cleaning')}</li>
                <li>• {t('steps.labor.cashiers')}</li>
                <li>• {t('steps.labor.management')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Benchmark */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">
          📊 {t('steps.labor.industryBenchmark')}
        </h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">≤ 35%</div>
            <div className="text-sm text-gray-600">{t('steps.labor.idealCosts')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">35-40%</div>
            <div className="text-sm text-gray-600">{t('steps.labor.acceptable')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger-600">&gt; 40%</div>
            <div className="text-sm text-gray-600">{t('steps.labor.needsAttention')}</div>
          </div>
        </div>
      </div>

      {/* Quick Calculator Helper */}
      <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
        <h3 className="font-semibold text-indigo-900 mb-3 text-center">
          🧮 {t('steps.labor.quickCalculator')}
        </h3>
        <div className="text-sm text-indigo-800 space-y-2">
          <p><strong>{t('steps.labor.approximateFormula')}:</strong></p>
          <p>{t('steps.labor.formulaText')}</p>
          <p className="text-xs text-indigo-600">
            ({t('steps.labor.factorExplanation')})
          </p>
        </div>
      </div>

      {/* Optimization Tips */}
      {laborPercentage > INDUSTRY_STANDARDS.LABOR_COST_MAX && (
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-3">
            💡 {t('steps.labor.optimizationTips')}
          </h3>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>• <strong>{t('steps.labor.optimizeSchedules')}:</strong> {t('steps.labor.adjustShifts')}</li>
            <li>• <strong>{t('steps.labor.trainStaff')}:</strong> {t('steps.labor.efficientEmployees')}</li>
            <li>• <strong>{t('steps.labor.evaluateStructure')}:</strong> {t('steps.labor.needAllPositions')}</li>
            <li>• <strong>{t('steps.labor.considerTechnology')}:</strong> {t('steps.labor.automateProcesses')}</li>
            <li>• <strong>{t('steps.labor.measureProductivity')}:</strong> {t('steps.labor.salesPerEmployee')}</li>
          </ul>
        </div>
      )}

      {/* Current Value Display */}
      {value && value > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-purple-50 border border-purple-200 rounded-lg">
            <span className="text-purple-800 font-medium">
              👥 {t('steps.labor.laborCosts')}: {formatCurrency(value)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}