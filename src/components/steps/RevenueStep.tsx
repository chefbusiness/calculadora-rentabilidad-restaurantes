import React from 'react';
import { CurrencyInput } from '../FormInput';
import { useTranslation } from '../../hooks/useTranslation';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface RevenueStepProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export function RevenueStep({ value, onChange }: RevenueStepProps) {
  const { t, formatCurrency } = useTranslation();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('steps.revenue.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('steps.revenue.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-md mx-auto">
        <CurrencyInput
          label={t('steps.revenue.inputLabel')}
          value={value}
          onChange={onChange}
          placeholder={t('steps.revenue.placeholder')}
          helpText={t('steps.revenue.helpText')}
          required
          min={0}
          className="text-center"
        />
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-start">
            <TrendingUp className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {t('steps.revenue.whatToInclude')}
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('steps.revenue.foodSales')}</li>
                <li>• {t('steps.revenue.beverageSales')}</li>
                <li>• {t('steps.revenue.cateringServices')}</li>
                <li>• {t('steps.revenue.delivery')}</li>
                <li>• {t('steps.revenue.privateEvents')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
          <div className="flex items-start">
            <Calendar className="w-6 h-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                {t('steps.revenue.importantTips')}
              </h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• {t('steps.revenue.tip1')}</li>
                <li>• {t('steps.revenue.tip2')}</li>
                <li>• {t('steps.revenue.tip3')}</li>
                <li>• {t('steps.revenue.tip4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      {!value && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 text-center">
            💡 {t('steps.revenue.examples')}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <button
              onClick={() => onChange(15000)}
              className="p-3 bg-white rounded border hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">{t('steps.revenue.smallRestaurant')}</div>
              <div className="text-gray-600">{formatCurrency(15000)}/mes</div>
              <div className="text-xs text-gray-500 mt-1">20-30 {t('steps.revenue.tables')}</div>
            </button>
            
            <button
              onClick={() => onChange(45000)}
              className="p-3 bg-white rounded border hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">{t('steps.revenue.mediumRestaurant')}</div>
              <div className="text-gray-600">{formatCurrency(45000)}/mes</div>
              <div className="text-xs text-gray-500 mt-1">50-80 {t('steps.revenue.tables')}</div>
            </button>
            
            <button
              onClick={() => onChange(100000)}
              className="p-3 bg-white rounded border hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">{t('steps.revenue.largeRestaurant')}</div>
              <div className="text-gray-600">{formatCurrency(100000)}/mes</div>
              <div className="text-xs text-gray-500 mt-1">100+ {t('steps.revenue.tables')}</div>
            </button>
          </div>
        </div>
      )}

      {/* Current Value Display */}
      {value && value > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-success-50 border border-success-200 rounded-lg">
            <span className="text-success-800 font-medium">
              ✅ {t('steps.revenue.monthlyRevenue')}: {formatCurrency(value)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}