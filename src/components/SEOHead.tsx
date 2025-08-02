import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';

export const SEOHead: React.FC = () => {
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('seo.title'),
    "description": t('seo.description'),
    "url": "https://calculadoragastro.chefbusiness.co",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "ChefBusiness.co",
      "url": "https://chefbusiness.co"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Restaurant owners, chefs, food service managers"
    },
    "keywords": t('seo.keywords')
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="keywords" content={t('seo.keywords')} />
      <meta name="author" content="ChefBusiness.co" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://calculadoragastro.chefbusiness.co" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      <meta property="og:url" content="https://calculadoragastro.chefbusiness.co" />
      <meta property="og:site_name" content="Calculadora Gastronómica" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:image" content="https://calculadoragastro.chefbusiness.co/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t('seo.title')} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('seo.title')} />
      <meta name="twitter:description" content={t('seo.description')} />
      <meta name="twitter:image" content="https://calculadoragastro.chefbusiness.co/og-image.jpg" />
      <meta name="twitter:site" content="@chefbusiness" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content="Calculadora Gastronómica" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};