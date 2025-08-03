import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useTranslation } from '../hooks/useTranslation';
import { ProgressStepper } from './ProgressStepper';
import { RevenueStep } from './steps/RevenueStep';
import { CMVStep } from './steps/CMVStep';
import { LaborStep } from './steps/LaborStep';
import { OperatingStep } from './steps/OperatingStep';
import { ResultsStep } from './steps/ResultsStep';
import { FormStep } from '../types/calculator';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export function Calculator() {
  const { t } = useTranslation();
  const {
    currentStep,
    data,
    analysis,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    resetCalculator,
    isStepValid,
    canProceed,
  } = useCalculator();

  // Determinar qué pasos están completados
  const getCompletedSteps = (): FormStep[] => {
    const completed: FormStep[] = [];
    const steps: FormStep[] = ['revenue', 'cmv', 'labor', 'operating'];
    
    for (const step of steps) {
      if (isStepValid(step)) {
        completed.push(step);
      } else {
        break; // Parar en el primer paso incompleto
      }
    }
    
    return completed;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'revenue':
        return (
          <RevenueStep
            value={data.monthlyRevenue}
            onChange={(value) => updateData('monthlyRevenue', value)}
          />
        );
      
      case 'cmv':
        return (
          <CMVStep
            value={data.costOfGoodsSold}
            onChange={(value) => updateData('costOfGoodsSold', value)}
            monthlyRevenue={data.monthlyRevenue || 0}
          />
        );
      
      case 'labor':
        return (
          <LaborStep
            value={data.laborCosts}
            onChange={(value) => updateData('laborCosts', value)}
            monthlyRevenue={data.monthlyRevenue || 0}
          />
        );
      
      case 'operating':
        return (
          <OperatingStep
            fixedCosts={data.fixedOperatingCosts}
            variableCosts={data.variableOperatingCosts}
            onFixedChange={(value) => updateData('fixedOperatingCosts', value)}
            onVariableChange={(value) => updateData('variableOperatingCosts', value)}
            monthlyRevenue={data.monthlyRevenue || 0}
          />
        );
      
      case 'results':
        return (
          <ResultsStep
            analysis={analysis}
            data={data}
            onRecalculate={resetCalculator}
          />
        );
      
      default:
        return null;
    }
  };

  const isFirstStep = currentStep === 'revenue';
  const isLastStep = currentStep === 'results';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🍽️ {t('app.title')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t('app.subtitle')}
              </p>
            </div>
            
            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t('navigation.reset')}</span>
              <span className="sm:hidden">🔄</span>
            </button>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('business.name.label')}
              </label>
              <input
                type="text"
                value={data.businessName || ''}
                onChange={(e) => updateData('businessName', e.target.value)}
                placeholder={t('business.name.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{t('business.name.helpText')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('business.type.label')}
              </label>
              <select
                value={data.businessType || 'restaurant'}
                onChange={(e) => updateData('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="restaurant">{t('business.type.options.restaurant')}</option>
                <option value="bar">{t('business.type.options.bar')}</option>
                <option value="cafe">{t('business.type.options.cafe')}</option>
                <option value="pizzeria">{t('business.type.options.pizzeria')}</option>
                <option value="burger">{t('business.type.options.burger')}</option>
                <option value="catering">{t('business.type.options.catering')}</option>
                <option value="other">{t('business.type.options.other')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white border-b">
        <ProgressStepper
          currentStep={currentStep}
          completedSteps={getCompletedSteps()}
          onStepClick={goToStep}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          {/* Step Content */}
          <div className="p-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          {!isLastStep && (
            <div className="px-4 sm:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-100">
              {/* Desktop layout */}
              <div className="hidden sm:flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={isFirstStep}
                  className={`
                    flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${isFirstStep
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('navigation.previous')}
                </button>

                <div className="text-sm text-gray-500 text-center px-4">
                  {canProceed ? `✅ ${t('navigation.stepCompleted')}` : `⏳ ${t('navigation.completeFields')}`}
                </div>

                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className={`
                    flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${canProceed
                      ? 'bg-primary-900 text-white hover:bg-primary-800 shadow-soft'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {t('navigation.next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Mobile layout */}
              <div className="sm:hidden space-y-3">
                <div className="text-xs text-gray-500 text-center">
                  {canProceed ? `✅ ${t('navigation.stepCompleted')}` : `⏳ ${t('navigation.completeFields')}`}
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={prevStep}
                    disabled={isFirstStep}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1
                      ${isFirstStep
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {t('navigation.previous')}
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={!canProceed}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1
                      ${canProceed
                        ? 'bg-primary-900 text-white hover:bg-primary-800 shadow-soft'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {t('navigation.next')}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              💡 <strong>{t('footer.tip')}:</strong> {t('footer.industryStandards')}
            </p>
            <p className="mt-1">
              📊 {t('footer.idealCogs')} &lt; 30% • 👥 {t('footer.laborCosts')} &lt; 35% • 💰 {t('footer.healthyMargin')} &gt; 10%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}