import createMenu from './libs/createMenu.js';

createMenu('Mental Health Analysis - Indian Students', [
  { name: 'Home', script: 'home.js' },
  { name: 'Financial Stress Analysis', script: 'financial_analysis.js' },
  { name: 'Sleep Patterns Analysis', script: 'sleep_analysis.js' },
  { name: 'Dietary Habits Analysis', script: 'dietary_analysis.js' },
  { name: 'Academic Pressure Analysis', script: 'pressure_analysis.js' },
  { name: 'Cross Factor Analysis', script: 'cross_factor_analysis.js' },
  { name: 'Social Context', script: 'social_context.js' },
  { name: 'Statistical Tests', script: 'statistical_tests.js' },
  { name: 'Conclusions', script: 'conclusions.js' }
]);