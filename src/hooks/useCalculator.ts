import { useState, useCallback } from 'react';
import { RestaurantData, FormStep, RestaurantAnalysis } from '../types/calculator';
import { analyzeRestaurant } from '../utils/calculations';

interface UseCalculatorReturn {
  // Estado del formulario
  currentStep: FormStep;
  data: Partial<RestaurantData>;
  analysis: RestaurantAnalysis | null;
  
  // Acciones
  updateData: (field: keyof RestaurantData, value: number | string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;
  calculateResults: () => void;
  resetCalculator: () => void;
  
  // Validaciones
  isStepValid: (step: FormStep) => boolean;
  canProceed: boolean;
}

const STEP_ORDER: FormStep[] = ['revenue', 'cmv', 'labor', 'operating', 'results'];

const initialData: Partial<RestaurantData> = {
  businessName: '',
  businessType: 'restaurant',
  monthlyRevenue: undefined,
  costOfGoodsSold: undefined,
  laborCosts: undefined,
  fixedOperatingCosts: undefined,
  variableOperatingCosts: undefined,
};

export function useCalculator(): UseCalculatorReturn {
  const [currentStep, setCurrentStep] = useState<FormStep>('revenue');
  const [data, setData] = useState<Partial<RestaurantData>>(initialData);
  const [analysis, setAnalysis] = useState<RestaurantAnalysis | null>(null);

  // Actualizar datos del formulario
  const updateData = useCallback((field: keyof RestaurantData, value: number | string) => {
    setData(prev => ({
      ...prev,
      [field]: typeof value === 'number' ? (value >= 0 ? value : 0) : value, // Asegurar que los números no sean negativos
    }));
  }, []);

  // Validar si un paso está completo
  const isStepValid = useCallback((step: FormStep): boolean => {
    switch (step) {
      case 'revenue':
        return typeof data.monthlyRevenue === 'number' && data.monthlyRevenue > 0;
      
      case 'cmv':
        return typeof data.costOfGoodsSold === 'number' && data.costOfGoodsSold >= 0;
      
      case 'labor':
        return typeof data.laborCosts === 'number' && data.laborCosts >= 0;
      
      case 'operating':
        return (
          typeof data.fixedOperatingCosts === 'number' && 
          data.fixedOperatingCosts >= 0 &&
          typeof data.variableOperatingCosts === 'number' && 
          data.variableOperatingCosts >= 0
        );
      
      case 'results':
        return isStepValid('revenue') && isStepValid('cmv') && isStepValid('labor') && isStepValid('operating');
      
      default:
        return false;
    }
  }, [data]);

  // Verificar si se puede proceder al siguiente paso
  const canProceed = isStepValid(currentStep);

  // Calcular resultados
  const calculateResults = useCallback(() => {
    if (isStepValid('results') && data.monthlyRevenue !== undefined) {
      const completeData: RestaurantData = {
        monthlyRevenue: data.monthlyRevenue,
        costOfGoodsSold: data.costOfGoodsSold || 0,
        laborCosts: data.laborCosts || 0,
        fixedOperatingCosts: data.fixedOperatingCosts || 0,
        variableOperatingCosts: data.variableOperatingCosts || 0,
      };
      
      const result = analyzeRestaurant(completeData);
      setAnalysis(result);
    }
  }, [data, isStepValid]);

  // Navegar al siguiente paso
  const nextStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1 && canProceed) {
      const nextStepName = STEP_ORDER[currentIndex + 1];
      setCurrentStep(nextStepName);
      
      // Scroll automático hacia arriba
      window.scrollTo(0, 0);
      
      // Si llegamos a resultados, calcular automáticamente
      if (nextStepName === 'results') {
        calculateResults();
      }
    }
  }, [currentStep, canProceed, calculateResults]);

  // Navegar al paso anterior
  const prevStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
      
      // Scroll automático hacia arriba
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Ir a un paso específico
  const goToStep = useCallback((step: FormStep) => {
    // Solo permitir ir a pasos anteriores o al actual
    const targetIndex = STEP_ORDER.indexOf(step);
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    
    if (targetIndex <= currentIndex) {
      setCurrentStep(step);
      
      // Scroll automático hacia arriba
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Reiniciar calculadora
  const resetCalculator = useCallback(() => {
    setCurrentStep('revenue');
    setData(initialData);
    setAnalysis(null);
  }, []);

  return {
    currentStep,
    data,
    analysis,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    calculateResults,
    resetCalculator,
    isStepValid,
    canProceed,
  };
}