import React from 'react';
import { CurrencyInput } from '../FormInput';
import { Settings, Home, Zap, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface OperatingStepProps {
  fixedCosts: number | undefined;
  variableCosts: number | undefined;
  onFixedChange: (value: number) => void;
  onVariableChange: (value: number) => void;
  monthlyRevenue: number;
}

export function OperatingStep({ 
  fixedCosts, 
  variableCosts, 
  onFixedChange, 
  onVariableChange, 
  monthlyRevenue 
}: OperatingStepProps) {
  const { t, formatCurrency } = useTranslation();
  const totalOperatingCosts = (fixedCosts || 0) + (variableCosts || 0);
  const operatingPercentage = monthlyRevenue > 0 ? (totalOperatingCosts / monthlyRevenue) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Settings className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('steps.operating.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('steps.operating.description')}
        </p>
      </div>

      {/* Revenue Context */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-sm text-blue-700 mb-1">{t('steps.revenue.label')}</div>
          <div className="text-lg font-semibold text-blue-900">
            {formatCurrency(monthlyRevenue)}
          </div>
        </div>
      </div>

      {/* Input Sections */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Fixed Costs */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <Home className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Costos Fijos
            </h3>
            <p className="text-sm text-gray-600">
              Gastos que no varían con el nivel de ventas
            </p>
          </div>

          <CurrencyInput
            label={t('steps.operating.fixedCosts.label')}
            value={fixedCosts}
            onChange={onFixedChange}
            placeholder={t('steps.operating.fixedCosts.placeholder')}
            helpText={t('steps.operating.fixedCosts.helpText')}
            required
            min={0}
            max={monthlyRevenue * 0.4}
          />

          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h4 className="font-medium text-red-900 mb-2">{t('steps.operating.whatToInclude')}</h4>
            <ul className="text-sm text-red-800 space-y-1">
              {[
                'Alquiler del local',
                'Servicios públicos básicos',
                'Seguros',
                'Licencias y permisos',
                'Software y tecnología'
              ].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Variable Costs */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Costos Variables
            </h3>
            <p className="text-sm text-gray-600">
              Gastos que varían según el nivel de ventas
            </p>
          </div>

          <CurrencyInput
            label={t('steps.operating.variableCosts.label')}
            value={variableCosts}
            onChange={onVariableChange}
            placeholder={t('steps.operating.variableCosts.placeholder')}
            helpText={t('steps.operating.variableCosts.helpText')}
            required
            min={0}
            max={monthlyRevenue * 0.3}
          />

          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h4 className="font-medium text-green-900 mb-2">{t('steps.operating.whatToInclude')}</h4>
            <ul className="text-sm text-green-800 space-y-1">
              {[
                'Servicios públicos variables',
                'Mantenimiento y reparaciones',
                'Marketing y publicidad',
                'Suministros de oficina',
                'Gastos de entrega'
              ].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Total Operating Costs Summary */}
      {(fixedCosts || variableCosts) && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            📊 Resumen de Costos Operativos
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-sm text-gray-600 mb-1">{t('steps.operating.summary.fixedCosts')}</div>
              <div className="text-lg font-semibold text-red-600">
                {formatCurrency(fixedCosts || 0)}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-sm text-gray-600 mb-1">{t('steps.operating.summary.variableCosts')}</div>
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(variableCosts || 0)}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="text-sm text-gray-600 mb-1">{t('steps.operating.summary.totalOperating')}</div>
              <div className="text-lg font-semibold text-indigo-600">
                {formatCurrency(totalOperatingCosts)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {operatingPercentage.toFixed(1)}% de ingresos
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Breakdown Helper */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-start">
            <Zap className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                💡 Servicios Públicos
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Fijos:</strong> Conexión básica, tarifas mínimas</p>
                <p><strong>Variables:</strong> Consumo según uso (luz, agua, gas)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
          <h3 className="font-semibold text-purple-900 mb-2">
            💡 Consejos de Optimización
          </h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Negocia contratos de servicios públicos</li>
            <li>• Implementa tecnología para reducir costos</li>
            <li>• Revisa gastos recurrentes mensualmente</li>
            <li>• Considera alternativas más económicas</li>
          </ul>
        </div>
      </div>

      {/* Industry Benchmark */}
      <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-3 text-center">
          📈 Benchmark de la Industria
        </h3>
        <div className="text-sm text-yellow-800 text-center space-y-2">
          <p><strong>Típico:</strong> 15-25% de ingresos totales</p>
          <p><strong>Recomendado:</strong></p>
          <div className="flex justify-center space-x-8 mt-2">
            <div>Costos Fijos: 10-15%</div>
            <div>Costos Variables: 5-10%</div>
          </div>
        </div>
      </div>

      {/* Warning for high costs */}
      {operatingPercentage > 25 && totalOperatingCosts > 0 && (
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-center mb-3">
            <span className="text-2xl mr-2">⚠️</span>
            <h3 className="font-semibold text-red-900">
              Costos Operativos Elevados ({operatingPercentage.toFixed(1)}%)
            </h3>
          </div>
          <p className="text-sm text-red-800 text-center">
            Tus costos operativos están por encima del rango recomendado. Considera revisar y optimizar estos gastos.
          </p>
        </div>
      )}
    </div>
  );
}