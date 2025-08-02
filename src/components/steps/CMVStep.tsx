import React from 'react';
import { CurrencyInput } from '../FormInput';
import { useTranslation } from '../../hooks/useTranslation';
import { ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatPercentage } from '../../utils/calculations';
import { INDUSTRY_STANDARDS } from '../../types/calculator';

interface CMVStepProps {
  value: number | undefined;
  onChange: (value: number) => void;
  monthlyRevenue: number;
}

export function CMVStep({ value, onChange, monthlyRevenue }: CMVStepProps) {
  const { t, formatCurrency } = useTranslation();
  const cmvPercentage = monthlyRevenue > 0 && value ? (value / monthlyRevenue) * 100 : 0;
  
  const getCMVStatus = () => {
    if (cmvPercentage <= INDUSTRY_STANDARDS.CMV_IDEAL_MAX) {
      return { status: 'good', color: 'success', icon: CheckCircle };
    } else if (cmvPercentage <= INDUSTRY_STANDARDS.CMV_IDEAL_MAX + 5) {
      return { status: 'warning', color: 'warning', icon: AlertTriangle };
    } else {
      return { status: 'danger', color: 'danger', icon: AlertTriangle };
    }
  };

  const status = getCMVStatus();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <ShoppingCart className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('steps.cmv.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('steps.cmv.description')}
        </p>
      </div>

      {/* Revenue Context */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-sm text-blue-700 mb-1">{t('steps.cmv.monthlyRevenue')}</div>
          <div className="text-lg font-semibold text-blue-900">
            {formatCurrency(monthlyRevenue)}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="max-w-md mx-auto">
        <CurrencyInput
          label={t('steps.cmv.inputLabel')}
          value={value}
          onChange={onChange}
          placeholder={t('steps.cmv.placeholder')}
          helpText={t('steps.cmv.helpText')}
          required
          min={0}
          max={monthlyRevenue * 0.8} // Máximo 80% de ingresos
          className="text-center"
        />
      </div>

      {/* CMV Analysis */}
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
                  {formatPercentage(cmvPercentage)}
                </div>
                <div className="text-sm text-gray-600">{t('steps.cmv.ofYourRevenue')}</div>
              </div>
            </div>
            
            <div className={`text-center text-sm ${
              status.status === 'good' ? 'text-success-800' :
              status.status === 'warning' ? 'text-warning-800' :
              'text-danger-800'
            }`}>
              {status.status === 'good' && (
                <p>✅ <strong>{t('steps.cmv.excellentControl')}</strong> {t('steps.cmv.idealRange')}</p>
              )}
              {status.status === 'warning' && (
                <p>⚠️ <strong>{t('steps.cmv.slightlyHigh')}</strong> {t('steps.cmv.considerOptimizing')}</p>
              )}
              {status.status === 'danger' && (
                <p>🚨 <strong>{t('steps.cmv.veryHigh')}</strong> {t('steps.cmv.urgentReview')}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <h3 className="font-semibold text-green-900 mb-3">
            ✅ {t('steps.cmv.whatToInclude')}
          </h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• {t('steps.cmv.meats')}</li>
            <li>• {t('steps.cmv.vegetables')}</li>
            <li>• {t('steps.cmv.dairy')}</li>
            <li>• {t('steps.cmv.spices')}</li>
            <li>• {t('steps.cmv.beverages')}</li>
            <li>• {t('steps.cmv.oils')}</li>
            <li>• {t('steps.cmv.bakery')}</li>
          </ul>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
          <h3 className="font-semibold text-red-900 mb-3">
            ❌ {t('steps.cmv.whatNotToInclude')}
          </h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• {t('steps.cmv.salaries')}</li>
            <li>• {t('steps.cmv.rent')}</li>
            <li>• {t('steps.cmv.utilities')}</li>
            <li>• {t('steps.cmv.cleaning')}</li>
            <li>• {t('steps.cmv.utensils')}</li>
            <li>• {t('steps.cmv.marketing')}</li>
            <li>• {t('steps.cmv.insurance')}</li>
          </ul>
        </div>
      </div>

      {/* Industry Benchmark */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">
          📊 {t('steps.cmv.industryBenchmark')}
        </h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">≤ 30%</div>
            <div className="text-sm text-gray-600">{t('steps.cmv.ideal')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">30-35%</div>
            <div className="text-sm text-gray-600">{t('steps.cmv.acceptable')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger-600">&gt; 35%</div>
            <div className="text-sm text-gray-600">{t('steps.cmv.needsAttention')}</div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      {cmvPercentage > INDUSTRY_STANDARDS.CMV_IDEAL_MAX && (
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-3">
            💡 {t('steps.cmv.tipsToReduce')}
          </h3>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>• <strong>{t('steps.cmv.negotiateSuppliers')}:</strong> {t('steps.cmv.betterPrices')}</li>
            <li>• <strong>{t('steps.cmv.reduceWaste')}:</strong> {t('steps.cmv.controlPortions')}</li>
            <li>• <strong>{t('steps.cmv.optimizeMenu')}:</strong> {t('steps.cmv.focusProfitable')}</li>
            <li>• <strong>{t('steps.cmv.controlInventory')}:</strong> {t('steps.cmv.avoidExcess')}</li>
          </ul>
        </div>
      )}
    </div>
  );
}