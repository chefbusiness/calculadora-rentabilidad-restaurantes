import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const DonationBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href="https://www.paypal.com/donate/?hosted_button_id=EMRHGW5FVTTBW"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out font-medium text-sm"
      >
        <span className="text-lg group-hover:animate-bounce">☕</span>
        <span className="whitespace-nowrap">
          {t('donation.text')}
        </span>
      </a>
    </div>
  );
};

export default DonationBanner;