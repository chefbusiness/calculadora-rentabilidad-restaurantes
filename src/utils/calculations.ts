import { RestaurantData, CalculatedMetrics, RestaurantAnalysis, MetricStatus, INDUSTRY_STANDARDS } from '../types/calculator';

/**
 * Calcula todas las métricas financieras del restaurante
 */
export function calculateMetrics(data: RestaurantData): CalculatedMetrics {
  const { monthlyRevenue, costOfGoodsSold, laborCosts, fixedOperatingCosts, variableOperatingCosts } = data;
  
  // Cálculos básicos
  const grossProfit = monthlyRevenue - costOfGoodsSold;
  const totalOperatingCosts = laborCosts + fixedOperatingCosts + variableOperatingCosts;
  const netProfit = grossProfit - totalOperatingCosts;
  const netProfitMargin = monthlyRevenue > 0 ? (netProfit / monthlyRevenue) * 100 : 0;
  
  // Punto de equilibrio: Costos totales
  const totalCosts = costOfGoodsSold + totalOperatingCosts;
  const breakEvenPoint = totalCosts;
  
  // Porcentajes para análisis
  const cmvPercentage = monthlyRevenue > 0 ? (costOfGoodsSold / monthlyRevenue) * 100 : 0;
  const laborCostPercentage = monthlyRevenue > 0 ? (laborCosts / monthlyRevenue) * 100 : 0;
  const totalCostPercentage = monthlyRevenue > 0 ? (totalCosts / monthlyRevenue) * 100 : 0;
  
  return {
    grossProfit,
    netProfit,
    netProfitMargin,
    breakEvenPoint,
    cmvPercentage,
    laborCostPercentage,
    totalCostPercentage,
  };
}

/**
 * Evalúa el estado del CMV (Costo de Mercancía Vendida)
 */
export function evaluateCMVStatus(cmvPercentage: number): MetricStatus {
  if (cmvPercentage <= INDUSTRY_STANDARDS.CMV_IDEAL_MAX) {
    return {
      status: 'good',
      message: `Excelente control de CMV (${cmvPercentage.toFixed(1)}%)`,
      recommendation: 'Mantén este nivel de eficiencia en costos de ingredientes.'
    };
  } else if (cmvPercentage <= INDUSTRY_STANDARDS.CMV_IDEAL_MAX + 5) {
    return {
      status: 'warning',
      message: `CMV ligeramente alto (${cmvPercentage.toFixed(1)}%)`,
      recommendation: 'Considera revisar precios de proveedores y reducir desperdicios.'
    };
  } else {
    return {
      status: 'danger',
      message: `CMV muy alto (${cmvPercentage.toFixed(1)}%)`,
      recommendation: 'Urgente: Realiza un escandallo de tus 5 platos más vendidos y negocia con proveedores.'
    };
  }
}

/**
 * Evalúa el estado de los costos laborales
 */
export function evaluateLaborStatus(laborPercentage: number): MetricStatus {
  if (laborPercentage <= INDUSTRY_STANDARDS.LABOR_COST_MAX) {
    return {
      status: 'good',
      message: `Costos laborales controlados (${laborPercentage.toFixed(1)}%)`,
      recommendation: 'Mantén la eficiencia en la gestión del personal.'
    };
  } else if (laborPercentage <= INDUSTRY_STANDARDS.LABOR_COST_MAX + 5) {
    return {
      status: 'warning',
      message: `Costos laborales elevados (${laborPercentage.toFixed(1)}%)`,
      recommendation: 'Optimiza los horarios del personal según las horas pico.'
    };
  } else {
    return {
      status: 'danger',
      message: `Costos laborales muy altos (${laborPercentage.toFixed(1)}%)`,
      recommendation: 'Urgente: Revisa la estructura de personal y considera automatización de procesos.'
    };
  }
}

/**
 * Evalúa el estado general de rentabilidad
 */
export function evaluateProfitabilityStatus(netProfitMargin: number): MetricStatus {
  if (netProfitMargin >= INDUSTRY_STANDARDS.NET_MARGIN_MIN) {
    return {
      status: 'good',
      message: `Rentabilidad saludable (${netProfitMargin.toFixed(1)}%)`,
      recommendation: 'Excelente gestión financiera. Considera reinvertir en crecimiento.'
    };
  } else if (netProfitMargin >= INDUSTRY_STANDARDS.NET_MARGIN_WARNING) {
    return {
      status: 'warning',
      message: `Rentabilidad baja (${netProfitMargin.toFixed(1)}%)`,
      recommendation: 'Enfócate en reducir costos y optimizar precios del menú.'
    };
  } else {
    return {
      status: 'danger',
      message: `Rentabilidad crítica (${netProfitMargin.toFixed(1)}%)`,
      recommendation: 'Situación crítica: Revisa inmediatamente todos los costos y considera ajustar precios.'
    };
  }
}

/**
 * Genera recomendaciones personalizadas basadas en el análisis
 */
export function generateRecommendations(metrics: CalculatedMetrics): string[] {
  const recommendations: string[] = [];
  
  // Recomendaciones basadas en CMV
  if (metrics.cmvPercentage > INDUSTRY_STANDARDS.CMV_IDEAL_MAX) {
    if (metrics.cmvPercentage > INDUSTRY_STANDARDS.CMV_IDEAL_MAX + 10) {
      recommendations.push('🔴 Realiza un escandallo detallado de todos tus platos principales y elimina los menos rentables.');
    } else {
      recommendations.push('🟡 Negocia mejores precios con tus proveedores principales y reduce el desperdicio de alimentos.');
    }
  }
  
  // Recomendaciones basadas en costos laborales
  if (metrics.laborCostPercentage > INDUSTRY_STANDARDS.LABOR_COST_MAX) {
    if (metrics.laborCostPercentage > INDUSTRY_STANDARDS.LABOR_COST_MAX + 10) {
      recommendations.push('🔴 Reestructura los horarios del personal y considera tecnología para automatizar procesos.');
    } else {
      recommendations.push('🟡 Optimiza los turnos del personal según los picos de demanda y capacita para mayor eficiencia.');
    }
  }
  
  // Recomendaciones basadas en rentabilidad
  if (metrics.netProfitMargin < INDUSTRY_STANDARDS.NET_MARGIN_MIN) {
    if (metrics.netProfitMargin < INDUSTRY_STANDARDS.NET_MARGIN_WARNING) {
      recommendations.push('🔴 Revisa urgentemente tu carta de precios y considera eliminar platos poco rentables.');
    } else {
      recommendations.push('🟡 Analiza la posibilidad de aumentar precios en platos populares y reduce costos operativos.');
    }
  }
  
  // Si no hay problemas críticos, dar recomendaciones de crecimiento
  if (recommendations.length === 0) {
    recommendations.push('🟢 Tu restaurante tiene una gestión financiera sólida. Considera invertir en marketing para aumentar ventas.');
    recommendations.push('🟢 Explora nuevas fuentes de ingresos como delivery, catering o productos para llevar.');
    recommendations.push('🟢 Mantén el control de costos actual y busca oportunidades de expansión.');
  }
  
  return recommendations.slice(0, 3); // Máximo 3 recomendaciones
}

/**
 * Realiza el análisis completo del restaurante
 */
export function analyzeRestaurant(data: RestaurantData): RestaurantAnalysis {
  const metrics = calculateMetrics(data);
  const cmvStatus = evaluateCMVStatus(metrics.cmvPercentage);
  const laborStatus = evaluateLaborStatus(metrics.laborCostPercentage);
  const profitabilityStatus = evaluateProfitabilityStatus(metrics.netProfitMargin);
  const recommendations = generateRecommendations(metrics);
  
  return {
    metrics,
    cmvStatus,
    laborStatus,
    profitabilityStatus,
    recommendations,
  };
}

/**
 * Formatea números como moneda
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea porcentajes
 */
export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}