import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RestaurantAnalysis, RestaurantData } from '../types/calculator';
import { formatPercentage } from './calculations';

// Función para descargar datos en formato CSV/Excel
export const downloadCSV = (
  analysis: RestaurantAnalysis,
  data: Partial<RestaurantData>,
  formatCurrency: (value: number) => string,
  businessName?: string,
  businessType?: string
) => {
  const { metrics } = analysis;
  
  // Crear datos para el CSV
  const csvData = [
    ['Información del Negocio', ''],
    ['Nombre del Negocio', businessName || 'Sin especificar'],
    ['Tipo de Establecimiento', businessType || 'restaurant'],
    ['Fecha del Análisis', new Date().toLocaleDateString()],
    ['', ''],
    ['Datos de Entrada', ''],
    ['Ingresos Mensuales', formatCurrency(data.monthlyRevenue || 0)],
    ['Costo de Mercancía Vendida (CMV)', formatCurrency(data.costOfGoodsSold || 0)],
    ['Costos de Personal', formatCurrency(data.laborCosts || 0)],
    ['Costos Operativos Fijos', formatCurrency(data.fixedOperatingCosts || 0)],
    ['Costos Operativos Variables', formatCurrency(data.variableOperatingCosts || 0)],
    ['', ''],
    ['Métricas Calculadas', ''],
    ['Beneficio Bruto', formatCurrency(metrics.grossProfit)],
    ['Beneficio Neto', formatCurrency(metrics.netProfit)],
    ['Margen de Beneficio Neto (%)', formatPercentage(metrics.netProfitMargin)],
    ['Punto de Equilibrio', formatCurrency(metrics.breakEvenPoint)],
    ['', ''],
    ['Análisis de Porcentajes', ''],
    ['CMV como % de Ingresos', formatPercentage(metrics.cmvPercentage)],
    ['Costos de Personal como % de Ingresos', formatPercentage(metrics.laborCostPercentage)],
    ['Costos Totales como % de Ingresos', formatPercentage(metrics.totalCostPercentage)],
    ['', ''],
    ['', ''],
    ['Desarrollado por:', ''],
    ['Chefbusiness Consultoría Gastronómica', 'Chefbusiness.co'],
    ['Especialistas en rentabilidad gastronómica', 'www.chefbusiness.co'],
  ];

  // Crear workbook y worksheet
  const ws = XLSX.utils.aoa_to_sheet(csvData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Análisis de Rentabilidad');

  // Descargar archivo
  const fileName = `analisis_rentabilidad_${businessName?.replace(/\s+/g, '_') || 'negocio'}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

// Función para crear y descargar PDF limpio
export const downloadCleanPDF = async (
  analysis: RestaurantAnalysis,
  data: Partial<RestaurantData>,
  formatCurrency: (value: number) => string,
  businessName?: string,
  businessType?: string
) => {
  const { metrics, cmvStatus, laborStatus, profitabilityStatus, recommendations } = analysis;
  
  // Crear elemento temporal para el contenido del PDF
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.padding = '40px';
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  tempDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
      <h1 style="color: #1f2937; margin: 0; font-size: 28px;">📊 Análisis de Rentabilidad</h1>
      <h2 style="color: #6b7280; margin: 10px 0 0 0; font-size: 18px; font-weight: normal;">${businessName || 'Negocio'}</h2>
      <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">${businessType || 'Restaurante'} • ${currentDate}</p>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">💰 Datos de Entrada</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
        <div><strong>Ingresos Mensuales:</strong> ${formatCurrency(data.monthlyRevenue || 0)}</div>
        <div><strong>CMV:</strong> ${formatCurrency(data.costOfGoodsSold || 0)}</div>
        <div><strong>Costos de Personal:</strong> ${formatCurrency(data.laborCosts || 0)}</div>
        <div><strong>Costos Operativos:</strong> ${formatCurrency((data.fixedOperatingCosts || 0) + (data.variableOperatingCosts || 0))}</div>
      </div>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">📈 Métricas Principales</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
        <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981;">
          <div style="font-weight: bold; color: #1f2937;">Beneficio Bruto</div>
          <div style="font-size: 18px; color: #10b981; font-weight: bold;">${formatCurrency(metrics.grossProfit)}</div>
        </div>
        <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid ${metrics.netProfit > 0 ? '#10b981' : '#ef4444'};">
          <div style="font-weight: bold; color: #1f2937;">Beneficio Neto</div>
          <div style="font-size: 18px; color: ${metrics.netProfit > 0 ? '#10b981' : '#ef4444'}; font-weight: bold;">${formatCurrency(metrics.netProfit)}</div>
          <div style="font-size: 12px; color: #6b7280;">${formatPercentage(metrics.netProfitMargin)} margen</div>
        </div>
        <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <div style="font-weight: bold; color: #1f2937;">Punto de Equilibrio</div>
          <div style="font-size: 18px; color: #3b82f6; font-weight: bold;">${formatCurrency(metrics.breakEvenPoint)}</div>
        </div>
        <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <div style="font-weight: bold; color: #1f2937;">CMV</div>
          <div style="font-size: 18px; color: #f59e0b; font-weight: bold;">${formatPercentage(metrics.cmvPercentage)}</div>
          <div style="font-size: 12px; color: #6b7280;">de los ingresos</div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">🔍 Análisis Detallado</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; font-size: 13px;">
        <div style="padding: 15px; background-color: ${cmvStatus.status === 'good' ? '#ecfdf5' : cmvStatus.status === 'warning' ? '#fffbeb' : '#fef2f2'}; border-radius: 8px; border: 1px solid ${cmvStatus.status === 'good' ? '#d1fae5' : cmvStatus.status === 'warning' ? '#fed7aa' : '#fecaca'};">
          <div style="font-weight: bold; color: #1f2937; margin-bottom: 8px;">📦 Análisis CMV</div>
          <div style="font-size: 16px; font-weight: bold; color: ${cmvStatus.status === 'good' ? '#10b981' : cmvStatus.status === 'warning' ? '#f59e0b' : '#ef4444'}; margin-bottom: 5px;">${formatPercentage(metrics.cmvPercentage)}</div>
          <div style="color: #4b5563;">${cmvStatus.message}</div>
        </div>
        <div style="padding: 15px; background-color: ${laborStatus.status === 'good' ? '#ecfdf5' : laborStatus.status === 'warning' ? '#fffbeb' : '#fef2f2'}; border-radius: 8px; border: 1px solid ${laborStatus.status === 'good' ? '#d1fae5' : laborStatus.status === 'warning' ? '#fed7aa' : '#fecaca'};">
          <div style="font-weight: bold; color: #1f2937; margin-bottom: 8px;">👥 Análisis Personal</div>
          <div style="font-size: 16px; font-weight: bold; color: ${laborStatus.status === 'good' ? '#10b981' : laborStatus.status === 'warning' ? '#f59e0b' : '#ef4444'}; margin-bottom: 5px;">${formatPercentage(metrics.laborCostPercentage)}</div>
          <div style="color: #4b5563;">${laborStatus.message}</div>
        </div>
        <div style="padding: 15px; background-color: ${profitabilityStatus.status === 'good' ? '#ecfdf5' : profitabilityStatus.status === 'warning' ? '#fffbeb' : '#fef2f2'}; border-radius: 8px; border: 1px solid ${profitabilityStatus.status === 'good' ? '#d1fae5' : profitabilityStatus.status === 'warning' ? '#fed7aa' : '#fecaca'};">
          <div style="font-weight: bold; color: #1f2937; margin-bottom: 8px;">💹 Rentabilidad</div>
          <div style="font-size: 16px; font-weight: bold; color: ${profitabilityStatus.status === 'good' ? '#10b981' : profitabilityStatus.status === 'warning' ? '#f59e0b' : '#ef4444'}; margin-bottom: 5px;">${formatPercentage(metrics.netProfitMargin)}</div>
          <div style="color: #4b5563;">${profitabilityStatus.message}</div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">💡 Recomendaciones</h3>
      <div style="font-size: 13px; line-height: 1.6;">
        ${recommendations.map((rec, index) => `
          <div style="margin-bottom: 10px; padding: 10px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid ${rec.startsWith('🔴') ? '#ef4444' : rec.startsWith('🟡') ? '#f59e0b' : '#10b981'};">
            ${rec.replace(/^[🔴🟡🟢]\s*/u, '')}
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      <p>📊 Reporte generado por CalculadoraGastro • ${currentDate}</p>
      <p>💡 Este análisis es una herramienta de referencia. Consulta con un profesional para decisiones importantes.</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="font-weight: bold; color: #1f2937; margin: 0 0 5px 0;">🍽️ Chefbusiness Consultoría Gastronómica</p>
        <p style="color: #6b7280; margin: 0;">Especialistas en rentabilidad gastronómica • www.chefbusiness.co</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(tempDiv);
  
  try {
    // Generar canvas del contenido
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Descargar PDF
    const fileName = `analisis_rentabilidad_${businessName?.replace(/\s+/g, '_') || 'negocio'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el PDF. Por favor, intenta nuevamente.');
  } finally {
    // Limpiar elemento temporal
    document.body.removeChild(tempDiv);
  }
};