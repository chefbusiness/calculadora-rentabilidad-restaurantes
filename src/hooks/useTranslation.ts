import { useState, createContext, useContext } from 'react';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

export type Language = 'es' | 'en';
export type Currency = 'EUR' | 'USD' | 'MXN' | 'COP' | 'ARS' | 'CLP' | 'PEN' | 'BRL' | 'CAD' | 'GBP';

interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  nameEs: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', nameEs: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar', nameEs: 'Dólar Americano' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', nameEs: 'Peso Mexicano' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', nameEs: 'Peso Colombiano' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', nameEs: 'Peso Argentino' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', nameEs: 'Peso Chileno' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', nameEs: 'Sol Peruano' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', nameEs: 'Real Brasileño' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', nameEs: 'Dólar Canadiense' },
  { code: 'GBP', symbol: '£', name: 'British Pound', nameEs: 'Libra Esterlina' }
];

const translations = {
  es: esTranslations,
  en: enTranslations
};

interface TranslationContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  getCurrencySymbol: () => string;
  getCurrencyInfo: () => CurrencyInfo;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const useTranslationState = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('calculadora-language');
    return (saved as Language) || 'es';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('calculadora-currency');
    return (saved as Currency) || 'EUR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('calculadora-language', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('calculadora-currency', curr);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const getCurrencyInfo = (): CurrencyInfo => {
    return CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  };

  const getCurrencySymbol = (): string => {
    return getCurrencyInfo().symbol;
  };

  const formatCurrency = (amount: number): string => {
    const currencyInfo = getCurrencyInfo();
    
    // Format based on currency
    const formatter = new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: currencyInfo.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return formatter.format(amount);
  };

  return {
    language,
    currency,
    setLanguage,
    setCurrency,
    t,
    formatCurrency,
    getCurrencySymbol,
    getCurrencyInfo
  };
};

export { TranslationContext };
export type { TranslationContextType };