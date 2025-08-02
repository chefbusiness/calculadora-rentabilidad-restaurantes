// Tipos para la calculadora de rentabilidad

export interface RestaurantData {
  // Información del negocio
  businessName?: string; // Nombre del negocio
  businessType?: string; // Tipo de establecimiento
  
  // Ingresos
  monthlyRevenue: number;
  
  // Costos
  costOfGoodsSold: number; // CMV - Costo de Mercancía Vendida
  laborCosts: number; // Costos de personal
  fixedOperatingCosts: number; // Costos operativos fijos
  variableOperatingCosts: number; // Costos operativos variables
}

export interface CalculatedMetrics {
  // Beneficios
  grossProfit: number; // Beneficio Bruto
  netProfit: number; // Beneficio Neto
  netProfitMargin: number; // Margen de Beneficio Neto (%)
  breakEvenPoint: number; // Punto de Equilibrio
  
  // Porcentajes para análisis
  cmvPercentage: number; // CMV como % de ingresos
  laborCostPercentage: number; // Costos de personal como % de ingresos
  totalCostPercentage: number; // Costos totales como % de ingresos
}

export interface MetricStatus {
  status: 'good' | 'warning' | 'danger';
  message: string;
  recommendation?: string;
}

export interface RestaurantAnalysis {
  metrics: CalculatedMetrics;
  cmvStatus: MetricStatus;
  laborStatus: MetricStatus;
  profitabilityStatus: MetricStatus;
  recommendations: string[];
}

// Estándares del sector gastronómico
export const INDUSTRY_STANDARDS = {
  CMV_IDEAL_MAX: 30, // CMV ideal < 30%
  LABOR_COST_MAX: 35, // Costos de personal < 35%
  NET_MARGIN_MIN: 10, // Margen neto saludable > 10%
  NET_MARGIN_WARNING: 5, // Margen neto en alerta < 5%
} as const;

// Pasos del formulario
export type FormStep = 'revenue' | 'cmv' | 'labor' | 'operating' | 'results';

export interface FormState {
  currentStep: FormStep;
  data: Partial<RestaurantData>;
  isValid: boolean;
}