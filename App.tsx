
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import PopularTools from './components/PopularTools';
import Features from './components/Features';
import Footer from './components/Footer';

// Footer Pages
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CareersPage from './components/CareersPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import CookiePolicyPage from './components/CookiePolicyPage';
import SitemapPage from './components/SitemapPage';

// Percentage
import PercentageIncreasePage from './components/PercentageIncreasePage';
import PercentageDecreasePage from './components/PercentageDecreasePage';
import ReversePercentagePage from './components/ReversePercentagePage';
import WhatPercentPage from './components/WhatPercentPage';

// Time
import AgeInDaysPage from './components/AgeInDaysPage';
import AgeInWeeksPage from './components/AgeInWeeksPage';
import AgeInMonthsPage from './components/AgeInMonthsPage';
import DateDifferencePage from './components/DateDifferencePage';
import DateTimeCalculatorPage from './components/DateTimeCalculatorPage';
import TimeDurationPage from './components/TimeDurationPage';
import WorkingDaysPage from './components/WorkingDaysPage';

// Health
import BMICalculatorPage from './components/BMICalculatorPage';
import BMRCalculatorPage from './components/BMRCalculatorPage';
import WaterIntakeCalculatorPage from './components/WaterIntakeCalculatorPage';
import IdealWeightCalculatorPage from './components/IdealWeightCalculatorPage';
import SleepCalculatorPage from './components/SleepCalculatorPage';

// Finance
import LoanCalculatorPage from './components/LoanCalculatorPage';
import SimpleInterestPage from './components/SimpleInterestPage';
import CompoundInterestPage from './components/CompoundInterestPage';
import InvestmentGrowthPage from './components/InvestmentGrowthPage';
import QuickTipPage from './components/QuickTipPage';

// Math
import AverageCalculatorPage from './components/AverageCalculatorPage';
import RatioCalculatorPage from './components/RatioCalculatorPage';
import FractionCalculatorPage from './components/FractionCalculatorPage';

// Converters
import UnitConverterPage from './components/UnitConverterPage';

type ViewState = 
  | 'home' 
  | 'all-tools'
  // Footer Pages
  | 'about'
  | 'contact'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'sitemap'
  // Percentage
  | 'calculator-percentage-increase' 
  | 'calculator-percentage-decrease' 
  | 'calculator-reverse-percentage'
  | 'calculator-what-percent'
  // Time
  | 'calculator-age-days'
  | 'calculator-age-weeks'
  | 'calculator-age-months'
  | 'calculator-date-difference'
  | 'calculator-date-time'
  | 'calculator-time-duration'
  | 'calculator-working-days'
  // Health
  | 'calculator-bmi'
  | 'calculator-bmr'
  | 'calculator-water-intake'
  | 'calculator-ideal-weight'
  | 'calculator-sleep'
  // Finance
  | 'calculator-loan-emi'
  | 'calculator-simple-interest'
  | 'calculator-compound-interest'
  | 'calculator-investment-growth'
  | 'calculator-quick-tip'
  // Math
  | 'calculator-average'
  | 'calculator-ratio'
  | 'calculator-fraction'
  // Converter
  | 'calculator-unit-converter';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewState);
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (category: string) => {
    // When a category is clicked, go to the All Tools view and filter
    setSelectedCategory(category);
    setCurrentView('all-tools');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      // Footer Pages
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'careers': return <CareersPage />;
      case 'privacy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsPage />;
      case 'cookies': return <CookiePolicyPage />;
      case 'sitemap': return <SitemapPage onNavigate={handleNavigate} />;

      // Percentage
      case 'calculator-percentage-increase':
        return <PercentageIncreasePage onNavigate={handleNavigate} />;
      case 'calculator-percentage-decrease':
        return <PercentageDecreasePage onNavigate={handleNavigate} />;
      case 'calculator-reverse-percentage':
        return <ReversePercentagePage onNavigate={handleNavigate} />;
      case 'calculator-what-percent':
        return <WhatPercentPage onNavigate={handleNavigate} />;
      
      // Time
      case 'calculator-age-days':
        return <AgeInDaysPage onNavigate={handleNavigate} />;
      case 'calculator-age-weeks':
        return <AgeInWeeksPage onNavigate={handleNavigate} />;
      case 'calculator-age-months':
        return <AgeInMonthsPage onNavigate={handleNavigate} />;
      case 'calculator-date-difference':
        return <DateDifferencePage onNavigate={handleNavigate} />;
      case 'calculator-date-time':
        return <DateTimeCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-time-duration':
        return <TimeDurationPage onNavigate={handleNavigate} />;
      case 'calculator-working-days':
        return <WorkingDaysPage onNavigate={handleNavigate} />;

      // Health
      case 'calculator-bmi':
        return <BMICalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-bmr':
        return <BMRCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-water-intake':
        return <WaterIntakeCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-ideal-weight':
        return <IdealWeightCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-sleep':
        return <SleepCalculatorPage onNavigate={handleNavigate} />;

      // Finance
      case 'calculator-loan-emi':
        return <LoanCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-simple-interest':
        return <SimpleInterestPage onNavigate={handleNavigate} />;
      case 'calculator-compound-interest':
        return <CompoundInterestPage onNavigate={handleNavigate} />;
      case 'calculator-investment-growth':
        return <InvestmentGrowthPage onNavigate={handleNavigate} />;
      case 'calculator-quick-tip':
        return <QuickTipPage onNavigate={handleNavigate} />;

      // Math
      case 'calculator-average':
        return <AverageCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-ratio':
        return <RatioCalculatorPage onNavigate={handleNavigate} />;
      case 'calculator-fraction':
        return <FractionCalculatorPage onNavigate={handleNavigate} />;

      // Converter
      case 'calculator-unit-converter':
        return <UnitConverterPage onNavigate={handleNavigate} />;

      case 'all-tools':
        return (
          <>
            <Categories onCategorySelect={handleCategorySelect} />
            {/* Full mode: No preview prop */}
            <PopularTools 
              onNavigate={handleNavigate} 
              activeCategoryProp={selectedCategory} 
              preview={false}
            />
          </>
        );

      case 'home':
      default:
        return (
          <>
            <Hero />
            <Categories onCategorySelect={handleCategorySelect} />
            {/* Preview mode enabled: shows limited cards and "View All" button */}
            <PopularTools 
              onNavigate={handleNavigate} 
              activeCategoryProp={selectedCategory} 
              preview={true}
            />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
