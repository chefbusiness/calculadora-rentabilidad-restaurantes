import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://api.whatsapp.com/send/?phone=34744717942&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
      </a>
    </div>
  );
};

export default WhatsAppButton;