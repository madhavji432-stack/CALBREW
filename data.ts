
import { Calculator, Heart, DollarSign, Calendar, RefreshCcw, Percent, Divide, Activity, Clock, Scale, Moon, Briefcase, TrendingUp } from 'lucide-react';
import { Category, Calculator as CalculatorType } from './types';

export const CATEGORIES: Category[] = [
  { id: 'math', name: 'Math', icon: Calculator, count: 0 },
  { id: 'health', name: 'Health', icon: Heart, count: 0 },
  { id: 'finance', name: 'Finance', icon: DollarSign, count: 0 },
  { id: 'time', name: 'Time & Date', icon: Calendar, count: 0 },
  { id: 'converters', name: 'Converters', icon: RefreshCcw, count: 0 },
];

export const TOOLS: CalculatorType[] = [
  // --- TIME TOOLS ---
  { 
    id: 'date-time-calc', 
    name: 'Date & Time Calculator', 
    description: 'Calculate exact duration between two dates/times with Years, Months, Days, and Seconds.',
    category: 'time',
    popular: true
  },
  { 
    id: 'age-days', 
    name: 'Age in Days', 
    description: 'Find out exactly how many days you have been alive.',
    category: 'time',
    popular: true
  },
  { 
    id: 'age-weeks', 
    name: 'Age in Weeks', 
    description: 'Track pregnancy weeks or calculate baby age in weeks.',
    category: 'time' 
  },
  { 
    id: 'age-months', 
    name: 'Age in Months', 
    description: 'Calculate precise age in months for infants or projects.',
    category: 'time' 
  },
  { 
    id: 'date-diff', 
    name: 'Date Difference', 
    description: 'Calculate the duration between two specific dates.',
    category: 'time' 
  },
  {
    id: 'time-duration',
    name: 'Time Duration Calculator',
    description: 'Calculate hours and minutes between two times.',
    category: 'time'
  },
  {
    id: 'working-days',
    name: 'Working Days Calculator',
    description: 'Calculate business days between dates excluding weekends.',
    category: 'time',
    popular: true
  },

  // --- MATH TOOLS ---
  { 
    id: 'percent', 
    name: 'Percentage Increase', 
    description: 'Find the growth rate between two values with detailed steps.',
    category: 'math',
    popular: true 
  },
  { 
    id: 'percent-decrease', 
    name: 'Percentage Decrease', 
    description: 'Calculate the percentage drop or discount between two numbers.',
    category: 'math' 
  },
  { 
    id: 'reverse-percent', 
    name: 'Reverse Percentage', 
    description: 'Find the original value before a percentage increase or decrease.',
    category: 'math' 
  },
  {
    id: 'what-percent',
    name: 'What Percent of X is Y',
    description: 'Determine what percentage one number is of another.',
    category: 'math'
  },
  {
    id: 'average',
    name: 'Average Calculator',
    description: 'Calculate Mean, Median, and Mode from a list of numbers.',
    category: 'math'
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    description: 'Solve ratio problems and find missing values in proportions.',
    category: 'math'
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions easily.',
    category: 'math'
  },

  // --- HEALTH TOOLS ---
  { 
    id: 'bmi', 
    name: 'BMI Calculator', 
    description: 'Calculate Body Mass Index to understand weight categories.',
    category: 'health',
    popular: true
  },
  { 
    id: 'bmr', 
    name: 'BMR Calculator', 
    description: 'Calculate Basal Metabolic Rate and daily calorie needs.',
    category: 'health' 
  },
  { 
    id: 'water-intake', 
    name: 'Daily Water Intake', 
    description: 'Estimate how much water you should drink daily.',
    category: 'health' 
  },
  { 
    id: 'ideal-weight', 
    name: 'Ideal Weight', 
    description: 'Find your healthy weight range based on height and gender.',
    category: 'health' 
  },
  {
    id: 'sleep',
    name: 'Sleep Calculator',
    description: 'Calculate optimal bedtimes and wake-up times for restful sleep.',
    category: 'health'
  },

  // --- FINANCE TOOLS ---
  { 
    id: 'loan', 
    name: 'Loan Calculator', 
    description: 'Estimate your monthly loan payments and total interest.',
    category: 'finance',
    popular: true
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate interest earned on principal without compounding.',
    category: 'finance'
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate how your savings grow with compound interest.',
    category: 'finance'
  },
  {
    id: 'investment-growth',
    name: 'Investment Growth',
    description: 'Project the future value of your investments over time.',
    category: 'finance'
  },
  {
    id: 'quick-tip',
    name: 'Tip Calculator',
    description: 'Instantly calculate gratuity and split bills among friends.',
    category: 'finance'
  },

  // --- CONVERTERS ---
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between Length, Weight, and Temperature units.',
    category: 'converters'
  }
];
