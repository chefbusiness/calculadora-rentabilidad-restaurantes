import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { TrendingUp, DollarSign, Users, Settings, BarChart3, Calculator } from 'lucide-react';

export const EducationalContent: React.FC = () => {
  const { t } = useTranslation();

  const concepts = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: t('education.revenue.title'),
      description: t('education.revenue.description'),
      color: 'from-green-50 to-green-100 border-green-200'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: t('education.cmv.title'),
      description: t('education.cmv.description'),
      color: 'from-blue-50 to-blue-100 border-blue-200'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: t('education.labor.title'),
      description: t('education.labor.description'),
      color: 'from-purple-50 to-purple-100 border-purple-200'
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: t('education.operating.title'),
      description: t('education.operating.description'),
      color: 'from-orange-50 to-orange-100 border-orange-200'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-red-600" />,
      title: t('education.profitability.title'),
      description: t('education.profitability.description'),
      color: 'from-red-50 to-red-100 border-red-200'
    },
    {
      icon: <Calculator className="w-8 h-8 text-indigo-600" />,
      title: t('education.analysis.title'),
      description: t('education.analysis.description'),
      color: 'from-indigo-50 to-indigo-100 border-indigo-200'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('education.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('education.subtitle')}
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${concept.color} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center mb-4">
                {concept.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {concept.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('education.importance.title')}
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('education.importance.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};