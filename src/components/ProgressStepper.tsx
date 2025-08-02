import React from 'react';
import { FormStep } from '../types/calculator';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircle, DollarSign, ShoppingCart, Users, Settings } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
  onStepClick: (step: FormStep) => void;
}



export function ProgressStepper({ currentStep, completedSteps, onStepClick }: ProgressStepperProps) {
  const { t } = useTranslation();
  
  const STEPS = [
    {
      key: 'revenue' as FormStep,
      title: t('steps.revenue.title'),
      description: t('steps.revenue.description'),
      icon: DollarSign,
    },
    {
      key: 'cmv' as FormStep,
      title: t('steps.cmv.title'),
      description: t('steps.cmv.description'),
      icon: ShoppingCart,
    },
    {
      key: 'labor' as FormStep,
      title: t('steps.labor.title'),
      description: t('steps.labor.description'),
      icon: Users,
    },
    {
      key: 'operating' as FormStep,
      title: t('steps.operating.title'),
      description: t('steps.operating.description'),
      icon: Settings,
    },
  ];
  const getCurrentStepIndex = () => {
    return STEPS.findIndex(step => step.key === currentStep);
  };

  const isStepCompleted = (stepKey: FormStep) => {
    return completedSteps.includes(stepKey);
  };

  const isStepCurrent = (stepKey: FormStep) => {
    return currentStep === stepKey;
  };

  const canClickStep = (stepKey: FormStep) => {
    const stepIndex = STEPS.findIndex(step => step.key === stepKey);
    const currentIndex = getCurrentStepIndex();
    return stepIndex <= currentIndex;
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = isStepCompleted(step.key);
          const isCurrent = isStepCurrent(step.key);
          const canClick = canClickStep(step.key);
          
          return (
            <React.Fragment key={step.key}>
              {/* Step */}
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => canClick && onStepClick(step.key)}
                  disabled={!canClick}
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200
                    ${isCurrent 
                      ? 'border-primary-600 bg-primary-600 text-white shadow-lg' 
                      : isCompleted 
                        ? 'border-success-500 bg-success-500 text-white' 
                        : 'border-gray-300 bg-white text-gray-400'
                    }
                    ${canClick && !isCurrent ? 'hover:border-primary-400 hover:bg-primary-50 cursor-pointer' : ''}
                    ${!canClick ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </button>
                
                {/* Step Info */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium ${
                    isCurrent ? 'text-primary-600' : 
                    isCompleted ? 'text-success-600' : 
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-4 hidden sm:block">
                  <div className={`h-0.5 transition-colors duration-200 ${
                    isCompleted ? 'bg-success-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Mobile Progress Bar */}
      <div className="mt-6 sm:hidden">
        <div className="bg-gray-200 rounded-full h-2 mx-4">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((getCurrentStepIndex() + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {t('navigation.step')} {getCurrentStepIndex() + 1} {t('navigation.of')} {STEPS.length}
        </div>
      </div>
    </div>
  );
}