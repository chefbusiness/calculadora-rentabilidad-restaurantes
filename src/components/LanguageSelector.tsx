import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation, Language } from '../hooks/useTranslation';

const LANGUAGES = [
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="relative">
      <label className="sr-only">{t('language.label')}</label>
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4 text-gray-500" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent border-none text-sm text-gray-600 focus:outline-none focus:ring-0 cursor-pointer"
          title={t('language.select')}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};