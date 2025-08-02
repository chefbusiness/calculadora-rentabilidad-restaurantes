import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Calculator } from './components/Calculator';
import { SEOHead } from './components/SEOHead';
import { EducationalContent } from './components/EducationalContent';
import { FAQ } from './components/FAQ';
import { ChefHat } from 'lucide-react';
import { TranslationProvider } from './components/TranslationProvider';
import { LanguageSelector } from './components/LanguageSelector';
import { CurrencySelector } from './components/CurrencySelector';
import { useTranslation } from './hooks/useTranslation';
import DonationBanner from './components/DonationBanner';
import WhatsAppButton from './components/WhatsAppButton';

const AppContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SEOHead />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <ChefHat className="w-8 h-8 text-primary-600 mr-3" />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      {t('app.title')}
                    </h1>
                    <p className="text-xs text-gray-500">
                      {t('app.subtitle')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <LanguageSelector />
                <CurrencySelector />
              </div>
              <div className="hidden md:block">
                <a 
                  href="https://chefbusiness.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {t('app.poweredBy')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Calculator />
      </main>

      {/* Educational Content */}
      <EducationalContent />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main CTA Section */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                🚀 {t('footer.consultation.title')}
              </h3>
              <p className="text-blue-100 mb-4">
                {t('footer.consultation.description')}
              </p>
              <a 
                href="https://chefbusiness.co/consultoria-online-para-restaurantes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                📞 {t('footer.consultation.cta')}
              </a>
            </div>
          </div>

          {/* Microbanners Section */}
          <div className="mb-8">
            <h4 className="text-center text-lg font-semibold text-gray-700 mb-4">
              🛠️ Herramientas Profesionales para Restaurantes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* AIChef.pro */}
              <a 
                href="https://aichef.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-sm font-semibold text-purple-700 group-hover:text-purple-800">
                  AIChef.pro
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  {t('footer.services.aichef')}
                </div>
              </a>

              {/* GastroMaps.pro */}
              <a 
                href="https://gastromaps.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">📍</div>
                <div className="text-sm font-semibold text-green-700 group-hover:text-green-800">
                  GastroMaps.pro
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {t('footer.services.gastromaps')}
                </div>
              </a>

              {/* GastroSEO.com */}
              <a 
                href="https://gastroseo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">📈</div>
                <div className="text-sm font-semibold text-orange-700 group-hover:text-orange-800">
                  GastroSEO.com
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  {t('footer.services.gastroseo')}
                </div>
              </a>

              {/* IngredientsIndex.pro */}
              <a 
                href="https://ingredientsindex.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">🥘</div>
                <div className="text-sm font-semibold text-red-700 group-hover:text-red-800">
                  IngredientsIndex.pro
                </div>
                <div className="text-xs text-red-600 mt-1">
                  {t('footer.services.ingredients')}
                </div>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              {t('footer.copyright')}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Buttons */}
      <DonationBanner />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </HelmetProvider>
  );
}

export default App;
