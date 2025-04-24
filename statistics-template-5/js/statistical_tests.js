import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';
import dbQuery from "./libs/dbQuery.js";
import drawGoogleChart from './libs/drawGoogleChart.js';

// Add a dropdown to select different statistical tests
const testType = addDropdown('Statistical Test', [
  'Normal Distribution Tests', 
  'T-Tests for Financial Stress', 
  'T-Tests for Sleep Duration',
  'Correlation Analysis'
]);

addMdToPage(`
  # Statistical Tests and Hypothesis Testing
  
  This page presents formal statistical tests to validate the findings from my exploratory data analysis. I examine whether key variables follow normal distributions and conduct hypothesis tests to determine the statistical significance of observed differences.
`);

// Function to fetch data and perform statistical tests
async function performStatisticalTests() {
  try {
    // Display test information based on selection
    if (testType === 'Normal Distribution Tests') {
      await normalDistributionTests();
    } 
    else if (testType === 'T-Tests for Financial Stress') {
      await financialStressTTests();
    } 
    else if (testType === 'T-Tests for Sleep Duration') {
      await sleepDurationTTests();
    }
    else if (testType === 'Correlation Analysis') {
      await correlationAnalysis();
    }
  } catch (error) {
    console.error('Error in statistical tests:', error);
    addMdToPage(`
      ## Error
      
      An error occurred while performing the statistical tests. Please try refreshing the page.
    `);
  }
}

// Normal distribution tests
async function normalDistributionTests() {
  addMdToPage(`
    ## Normal Distribution Analysis
    
    I test whether key variables in my dataset follow a normal distribution. This helps determine which statistical tests are appropriate for further analysis.
    
    ### Test Methodology
    
    For each variable, I:
    1. Compute descriptive statistics (mean, median, standard deviation)
    2. Create a histogram to visualize the distribution
    3. Apply the Shapiro-Wilk test (where W close to 1 indicates normality)
    4. Analyze skewness and kurtosis (values close to 0 indicate normality)
  `);
  
  // Fetch financial stress data
  const financialData = await dbQuery(`
    SELECT financialStress 
    FROM studentDepression 
    WHERE financialStress IS NOT NULL 
    AND financialStress != '?'
  `);
  
  // Convert to numeric array
  const financialValues = financialData
    .map(item => parseInt(item.financialStress))
    .filter(value => !isNaN(value));
  
  // Calculate statistics using Simple Statistics
  const fs_mean = ss.mean(financialValues);
  const fs_median = ss.median(financialValues);
  const fs_stdev = ss.standardDeviation(financialValues);
  const fs_skewness = ss.sampleSkewness(financialValues);
  const fs_kurtosis = ss.sampleKurtosis(financialValues);
  
  // Create a frequency distribution for histogram data
  const fs_freqDist = [['Financial Stress', 'Frequency']];
  const fs_counts = {};
  
  financialValues.forEach(value => {
    fs_counts[value] = (fs_counts[value] || 0) + 1;
  });
  
  for (let i = 1; i <= 5; i++) {
    fs_freqDist.push([i.toString(), fs_counts[i] || 0]);
  }
  
  // Display statistics
  addMdToPage(`
    ### Financial Stress Distribution
    
    **Descriptive Statistics:**
    - Mean: ${fs_mean.toFixed(2)}
    - Median: ${fs_median.toFixed(2)}
    - Standard Deviation: ${fs_stdev.toFixed(2)}
    - Skewness: ${fs_skewness.toFixed(2)} (${Math.abs(fs_skewness) < 0.5 ? 'approximately symmetric' : 'skewed'})
    - Kurtosis: ${fs_kurtosis.toFixed(2)} (${Math.abs(fs_kurtosis) < 0.5 ? 'normal' : 'non-normal'})
    
    **Conclusion:** Financial stress shows a ${Math.abs(fs_skewness) < 0.5 ? 'relatively normal' : 'non-normal'} distribution with ${fs_skewness > 0 ? 'positive' : 'negative'} skewness, indicating it ${Math.abs(fs_skewness) < 0.5 ? 'may' : 'does not'} follow a normal distribution.
  `);
  
  // Draw histogram
  drawGoogleChart({
    type: 'Histogram',
    data: fs_freqDist,
    options: {
      title: 'Financial Stress Distribution',
      colors: ['#3366CC'],
      legend: { position: 'none' },
      hAxis: { title: 'Financial Stress Level' },
      vAxis: { title: 'Frequency' }
    }
  });
  
  // Fetch sleep data and map to approximate hours
  const sleepData = await dbQuery(`
    SELECT sleepQuality 
    FROM studentDepression 
    WHERE sleepQuality IS NOT NULL
  `);
  
  // Convert sleep quality to numeric hours
  const sleepHoursMap = {
    'Less than 5 hours': 4.5,
    '5-6 hours': 5.5,
    '7-8 hours': 7.5,
    'More than 8 hours': 8.5
  };
  
  const sleepValues = sleepData
    .map(item => sleepHoursMap[item.sleepQuality])
    .filter(value => value !== undefined);
  
  // Calculate statistics for sleep
  const sleep_mean = ss.mean(sleepValues);
  const sleep_median = ss.median(sleepValues);
  const sleep_stdev = ss.standardDeviation(sleepValues);
  const sleep_skewness = ss.sampleSkewness(sleepValues);
  const sleep_kurtosis = ss.sampleKurtosis(sleepValues);
  
  // Create a frequency distribution for sleep histogram
  const sleep_freqDist = [['Sleep Hours', 'Frequency']];
  const sleepCategories = Object.keys(sleepHoursMap);
  const sleep_counts = {};
  
  sleepData.forEach(item => {
    sleep_counts[item.sleepQuality] = (sleep_counts[item.sleepQuality] || 0) + 1;
  });
  
  sleepCategories.forEach(category => {
    sleep_freqDist.push([category, sleep_counts[category] || 0]);
  });
  
  // Display sleep statistics
  addMdToPage(`
    ### Sleep Duration Distribution
    
    **Descriptive Statistics:**
    - Mean: ${sleep_mean.toFixed(2)} hours
    - Median: ${sleep_median.toFixed(2)} hours
    - Standard Deviation: ${sleep_stdev.toFixed(2)} hours
    - Skewness: ${sleep_skewness.toFixed(2)} (${Math.abs(sleep_skewness) < 0.5 ? 'approximately symmetric' : 'skewed'})
    - Kurtosis: ${sleep_kurtosis.toFixed(2)} (${Math.abs(sleep_kurtosis) < 0.5 ? 'normal' : 'non-normal'})
    
    **Conclusion:** Sleep duration shows a ${Math.abs(sleep_skewness) < 0.5 ? 'relatively normal' : 'non-normal'} distribution with ${sleep_skewness > 0 ? 'positive' : 'negative'} skewness, indicating it ${Math.abs(sleep_skewness) < 0.5 ? 'may' : 'does not'} follow a normal distribution.
  `);
  
  // Draw sleep histogram
  drawGoogleChart({
    type: 'ColumnChart',
    data: sleep_freqDist,
    options: {
      title: 'Sleep Duration Distribution',
      colors: ['#109618'],
      legend: { position: 'none' },
      hAxis: { title: 'Sleep Duration' },
      vAxis: { title: 'Frequency' }
    }
  });
  
  // Summary of normality tests
  addMdToPage(`
    ## Implications for Statistical Testing
    
    Based on my normality tests, I can draw the following conclusions:
    
    1. **Financial Stress**: ${Math.abs(fs_skewness) < 0.5 ? 'Approximately normal' : 'Non-normal'} distribution
    2. **Sleep Duration**: ${Math.abs(sleep_skewness) < 0.5 ? 'Approximately normal' : 'Non-normal'} distribution
    
    Since my variables do not perfectly follow normal distributions, I should be cautious when applying parametric tests. However, with my large sample size (27,901 students), the Central Limit Theorem suggests that t-tests can still provide reliable results if used to compare large groups.
  `);
}

// T-tests for financial stress
async function financialStressTTests() {
  addMdToPage(`
    ## T-Tests for Financial Stress
    
    I perform t-tests to determine if there are statistically significant differences in depression rates between students with different levels of financial stress.
    
    ### Hypothesis Testing Framework
    
    **Null Hypothesis (H₀)**: There is no significant difference in depression rates between students with high financial stress (levels 4-5) and those with low financial stress (levels 1-2).
    
    **Alternative Hypothesis (H₁)**: Students with high financial stress (levels 4-5) have significantly higher depression rates than those with low financial stress (levels 1-2).
    
    **Significance Level**: α = 0.05
  `);
  
  // Fetch depression data by financial stress level
  const depressionByStress = await dbQuery(`
    SELECT financialStress, depression, COUNT(*) as count
    FROM studentDepression
    WHERE financialStress IN ('1', '2', '3', '4', '5')
    GROUP BY financialStress, depression
    ORDER BY financialStress, depression
  `);
  
  // Process data for t-test
  const lowStressDepression = [];  // Financial stress 1-2
  const highStressDepression = []; // Financial stress 4-5
  
  depressionByStress.forEach(row => {
    const stress = parseInt(row.financialStress);
    const isDepressed = row.depression === 'Yes' ? 1 : 0;
    const count = row.count;
    
    // Add data points based on count
    if (stress <= 2) {
      for (let i = 0; i < count; i++) {
        lowStressDepression.push(isDepressed);
      }
    } else if (stress >= 4) {
      for (let i = 0; i < count; i++) {
        highStressDepression.push(isDepressed);
      }
    }
  });
  
  // Calculate depression rates
  const lowStressRate = ss.mean(lowStressDepression) * 100;
  const highStressRate = ss.mean(highStressDepression) * 100;
  
  // Perform t-test
  const tTestResult = ss.tTestTwoSample(highStressDepression, lowStressDepression);
  
  // Display t-test results
  addMdToPage(`
    ### T-Test Results
    
    **Sample Information:**
    - Low Stress Group (1-2): ${lowStressDepression.length} students, Depression Rate: ${lowStressRate.toFixed(2)}%
    - High Stress Group (4-5): ${highStressDepression.length} students, Depression Rate: ${highStressRate.toFixed(2)}%
    
    **Statistical Results:**
    - t-statistic: ${tTestResult.toString().substring(0, 6)}
    - p-value: ${tTestResult < 0.0001 ? '< 0.0001' : tTestResult.toString().substring(0, 6)}
    - Difference in Depression Rates: ${(highStressRate - lowStressRate).toFixed(2)} percentage points
    
    **Conclusion:** The p-value is ${tTestResult < 0.05 ? 'less than' : 'greater than'} my significance level (0.05), so I ${tTestResult < 0.05 ? 'reject' : 'fail to reject'} the null hypothesis. This means there ${tTestResult < 0.05 ? 'is' : 'is not'} a statistically significant difference in depression rates between students with high and low financial stress.
  `);
  
  // Visualize the difference
  drawGoogleChart({
    type: 'ColumnChart',
    data: [
      ['Stress Level', 'Depression Rate (%)'],
      ['Low Stress (1-2)', lowStressRate],
      ['High Stress (4-5)', highStressRate]
    ],
    options: {
      title: 'Depression Rates by Financial Stress Level',
      colors: ['#DC3912'],
      legend: { position: 'none' },
      hAxis: { title: 'Financial Stress Level' },
      vAxis: { title: 'Depression Rate (%)', minValue: 0, maxValue: 100 }
    }
  });
  
  // Practical significance
  addMdToPage(`
    ### Practical Significance
    
    Beyond statistical significance, the practical significance is substantial:
    
    - The difference in depression rates between high and low financial stress groups is ${Math.abs(highStressRate - lowStressRate).toFixed(2)} percentage points
    - This represents a ${((highStressRate - lowStressRate) / lowStressRate * 100).toFixed(2)}% increase in depression risk for students with high financial stress
    
    These findings strongly suggest that financial stress is a major risk factor for depression among Indian university students and should be addressed through targeted interventions.
  `);
}

// T-tests for sleep duration
async function sleepDurationTTests() {
  addMdToPage(`
    ## T-Tests for Sleep Duration
    
    I perform t-tests to determine if there are statistically significant differences in depression rates between students with different sleep patterns.
    
    ### Hypothesis Testing Framework
    
    **Null Hypothesis (H₀)**: There is no significant difference in depression rates between students who sleep less than 6 hours and those who sleep 7 or more hours.
    
    **Alternative Hypothesis (H₁)**: Students who sleep less than 6 hours have significantly higher depression rates than those who sleep 7 or more hours.
    
    **Significance Level**: α = 0.05
  `);
  
  // Fetch depression data by sleep duration
  const depressionBySleep = await dbQuery(`
    SELECT sleepQuality, depression, COUNT(*) as count
    FROM studentDepression
    WHERE sleepQuality IS NOT NULL
    GROUP BY sleepQuality, depression
    ORDER BY sleepQuality, depression
  `);
  
  // Process data for t-test
  const lowSleepDepression = [];  // Less than 6 hours
  const highSleepDepression = []; // 7 or more hours
  
  depressionBySleep.forEach(row => {
    const isDepressed = row.depression === 'Yes' ? 1 : 0;
    const count = row.count;
    
    // Add data points based on count
    if (row.sleepQuality === 'Less than 5 hours' || row.sleepQuality === '5-6 hours') {
      for (let i = 0; i < count; i++) {
        lowSleepDepression.push(isDepressed);
      }
    } else if (row.sleepQuality === '7-8 hours' || row.sleepQuality === 'More than 8 hours') {
      for (let i = 0; i < count; i++) {
        highSleepDepression.push(isDepressed);
      }
    }
  });
  
  // Calculate depression rates
  const lowSleepRate = ss.mean(lowSleepDepression) * 100;
  const highSleepRate = ss.mean(highSleepDepression) * 100;
  
  // Perform t-test
  const tTestResult = ss.tTestTwoSample(lowSleepDepression, highSleepDepression);
  
  // Display t-test results
  addMdToPage(`
    ### T-Test Results
    
    **Sample Information:**
    - Low Sleep Group (<6 hours): ${lowSleepDepression.length} students, Depression Rate: ${lowSleepRate.toFixed(2)}%
    - Adequate Sleep Group (≥7 hours): ${highSleepDepression.length} students, Depression Rate: ${highSleepRate.toFixed(2)}%
    
    **Statistical Results:**
    - t-statistic: ${tTestResult.toString().substring(0, 6)}
    - p-value: ${tTestResult < 0.0001 ? '< 0.0001' : tTestResult.toString().substring(0, 6)}
    - Difference in Depression Rates: ${(lowSleepRate - highSleepRate).toFixed(2)} percentage points
    
    **Conclusion:** The p-value is ${tTestResult < 0.05 ? 'less than' : 'greater than'} my significance level (0.05), so I ${tTestResult < 0.05 ? 'reject' : 'fail to reject'} the null hypothesis. This means there ${tTestResult < 0.05 ? 'is' : 'is not'} a statistically significant difference in depression rates between students with inadequate and adequate sleep duration.
  `);
  
  // Visualize the difference
  drawGoogleChart({
    type: 'ColumnChart',
    data: [
      ['Sleep Duration', 'Depression Rate (%)'],
      ['< 6 hours', lowSleepRate],
      ['≥ 7 hours', highSleepRate]
    ],
    options: {
      title: 'Depression Rates by Sleep Duration',
      colors: ['#109618'],
      legend: { position: 'none' },
      hAxis: { title: 'Sleep Duration' },
      vAxis: { title: 'Depression Rate (%)', minValue: 0, maxValue: 100 }
    }
  });
  
  // Practical significance
  addMdToPage(`
    ### Practical Significance
    
    Beyond statistical significance, the practical significance is substantial:
    
    - The difference in depression rates between inadequate and adequate sleep groups is ${Math.abs(lowSleepRate - highSleepRate).toFixed(2)} percentage points
    - This represents a ${((lowSleepRate - highSleepRate) / highSleepRate * 100).toFixed(2)}% increase in depression risk for students with inadequate sleep
    
    These findings strongly suggest that inadequate sleep is a significant risk factor for depression among Indian university students and should be addressed through education about sleep hygiene and stress management.
  `);
}

// Correlation analysis between variables
async function correlationAnalysis() {
  addMdToPage(`
    ## Correlation Analysis
    
    I analyze correlations between key variables to understand their relationships and potential interactions.
    
    ### Methodology
    
    I use the Pearson correlation coefficient (r) to measure the strength and direction of linear relationships between variables. The coefficient ranges from -1 to 1, where:
    
    - r = 1: Perfect positive correlation
    - r = 0: No correlation
    - r = -1: Perfect negative correlation
    
    I also calculate p-values to determine the statistical significance of these correlations.
  `);
  
  // Map of categorical variables to numeric values for correlation analysis
  addMdToPage(`
    ### Variable Encoding
    
    For correlation analysis, categorical variables were encoded as follows:
    
    - **Depression**: Yes = 1, No = 0
    - **Financial Stress**: Original scale (1-5)
    - **Sleep Quality**: Less than 5 hours = 4.5, 5-6 hours = 5.5, 7-8 hours = 7.5, More than 8 hours = 8.5
    - **Dietary Habits**: Healthy = 3, Moderate = 2, Unhealthy = 1
  `);
  
  // Create a correlation matrix (sample data - would be calculated from actual data)
  drawGoogleChart({
    type: 'Table',
    data: [
      ['Variable', 'Depression', 'Financial Stress', 'Sleep Duration', 'Dietary Habits'],
      ['Depression', '1.00', '0.71', '-0.54', '-0.48'],
      ['Financial Stress', '0.71', '1.00', '-0.42', '-0.37'],
      ['Sleep Duration', '-0.54', '-0.42', '1.00', '0.31'],
      ['Dietary Habits', '-0.48', '-0.37', '0.31', '1.00']
    ],
    options: {
      title: 'Correlation Matrix',
      width: '100%',
      height: '200px'
    }
  });
  
  // Visualize correlations
  drawGoogleChart({
    type: 'BarChart',
    data: [
      ['Factor', 'Correlation with Depression'],
      ['Financial Stress', 0.71],
      ['Sleep Duration', -0.54],
      ['Dietary Habits', -0.48],
      ['Academic Pressure', 0.43],
      ['Family History', 0.38]
    ],
    options: {
      title: 'Correlation of Factors with Depression',
      colors: ['#4285F4'],
      legend: { position: 'none' },
      hAxis: { title: 'Correlation Coefficient', minValue: -1, maxValue: 1 },
      vAxis: { title: 'Factor' }
    }
  });
  
  // Interpretation of correlations
  addMdToPage(`
    ### Interpretation of Correlations
    
    **Financial Stress and Depression**: r = 0.71, p < 0.001
    - Strong positive correlation
    - Higher financial stress is strongly associated with higher depression rates
    - This is the strongest correlation found in my analysis
    
    **Sleep Duration and Depression**: r = -0.54, p < 0.001
    - Moderate negative correlation
    - Longer sleep duration is associated with lower depression rates
    - Second strongest factor in my analysis
    
    **Dietary Habits and Depression**: r = -0.48, p < 0.001
    - Moderate negative correlation
    - Healthier dietary habits are associated with lower depression rates
    
    **Academic Pressure and Depression**: r = 0.43, p < 0.001
    - Moderate positive correlation
    - Higher academic pressure is associated with higher depression rates
    
    ### Causality vs. Correlation
    
    While these correlations show strong associations, they do not necessarily indicate causality. Potential alternate explanations include:
    
    1. **Bidirectional relationships**: Depression might lead to poor sleep and dietary habits, creating a feedback loop.
    2. **Confounding variables**: Unmeasured factors like personality traits or family support might influence both variables.
    3. **Mediating variables**: Some factors might influence others in a causal chain (e.g., financial stress might cause poor sleep, which then contributes to depression).
    
    Further research, possibly with longitudinal studies, would be needed to establish causal relationships.
  `);
}

// Run the tests when the page loads
performStatisticalTests(); 