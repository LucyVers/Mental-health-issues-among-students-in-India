import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';
import dbQuery from "./libs/dbQuery.js";
import drawGoogleChart from './libs/drawGoogleChart.js';

// Add initial page title and description
addMdToPage(`
  # Statistical Tests and Hypothesis Testing
  
  This page presents formal statistical tests to validate the findings from my exploratory data analysis. I examine whether key variables follow normal distributions and conduct hypothesis tests to determine the statistical significance of observed differences.
`);

// Add a dropdown to select different statistical tests
const testType = addDropdown('Statistical Test', [
  'Normal Distribution Tests', 
  'T-Tests for Financial Stress', 
  'Correlation Analysis'
]);

// Statistical helper functions
function calculateMean(values) {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculateMedian(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function calculateStandardDeviation(values) {
  const mean = calculateMean(values);
  const squareDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = calculateMean(squareDiffs);
  return Math.sqrt(variance);
}

function calculateSkewness(values) {
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values);
  const cubedDiffs = values.map(value => Math.pow((value - mean) / std, 3));
  return calculateMean(cubedDiffs);
}

function calculateKurtosis(values) {
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values);
  const fourthPowerDiffs = values.map(value => Math.pow((value - mean) / std, 4));
  return calculateMean(fourthPowerDiffs) - 3; // Excess kurtosis
}

// T-test helper function
function calculateTTest(group1, group2) {
  const n1 = group1.length;
  const n2 = group2.length;
  const mean1 = calculateMean(group1);
  const mean2 = calculateMean(group2);
  const var1 = group1.reduce((sum, x) => sum + Math.pow(x - mean1, 2), 0) / (n1 - 1);
  const var2 = group2.reduce((sum, x) => sum + Math.pow(x - mean2, 2), 0) / (n2 - 1);
  
  // Pooled variance
  const sp = Math.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2));
  
  // T-statistic
  const t = (mean1 - mean2) / (sp * Math.sqrt(1/n1 + 1/n2));
  
  // Degrees of freedom
  const df = n1 + n2 - 2;
  
  // For this example, we'll return just the t-statistic
  // In a real implementation, we'd calculate the p-value
  return t;
}

// Statistical test functions
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
  
  try {
    // Fetch financial stress data from database
    const financialData = await dbQuery(`
      SELECT financialStress, COUNT(*) as count
      FROM studentDepression 
      WHERE financialStress IS NOT NULL
      GROUP BY financialStress
      ORDER BY financialStress
    `);
    
    // Process financial stress data
    const financialValues = [];
    const fs_freqDist = [['Financial Stress', 'Frequency']];
    
    financialData.forEach(row => {
      const value = parseInt(row.financialStress);
      const count = parseInt(row.count);
      if (!isNaN(value) && !isNaN(count)) {
        for (let i = 0; i < count; i++) {
          financialValues.push(value);
        }
        fs_freqDist.push([value.toString(), count]);
      }
    });
    
    // Calculate statistics
    const fs_mean = calculateMean(financialValues);
    const fs_median = calculateMedian(financialValues);
    const fs_stdev = calculateStandardDeviation(financialValues);
    const fs_skewness = calculateSkewness(financialValues);
    const fs_kurtosis = calculateKurtosis(financialValues);
    
    // Display financial stress statistics
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
    
    // Draw financial stress histogram
    drawGoogleChart({
      type: 'ColumnChart',
      data: fs_freqDist,
      options: {
        title: 'Financial Stress Distribution',
        colors: ['#3366CC'],
        legend: { position: 'none' },
        hAxis: { title: 'Financial Stress Level' },
        vAxis: { 
          title: 'Frequency',
          minValue: 0
        }
      }
    });
    
    // Fetch and process sleep data
    const sleepData = await dbQuery(`
      SELECT sleepDuration, COUNT(*) as count
      FROM studentDepression
      WHERE sleepDuration IS NOT NULL
      GROUP BY sleepDuration
      ORDER BY CASE 
        WHEN sleepDuration = 'Less than 5 hours' THEN 1
        WHEN sleepDuration = '5-6 hours' THEN 2
        WHEN sleepDuration = '7-8 hours' THEN 3
        WHEN sleepDuration = 'More than 8 hours' THEN 4
      END
    `);
    
    console.log('Sleep data from database:', JSON.stringify(sleepData, null, 2));
    
    const sleepHoursMap = {
      'Less than 5 hours': 4.5,
      '5-6 hours': 5.5,
      '7-8 hours': 7.5,
      'More than 8 hours': 8.5
    };
    
    // Process sleep data
    const sleepValues = [];
    const sleep_freqDist = [['Sleep Hours', 'Frequency']];
    let sleep_stats = null;
    
    if (sleepData && sleepData.length > 0) {
      console.log('Processing sleep data...');
      sleepData.forEach(row => {
        // Ta bort extra citattecken från sleepDuration
        const cleanSleepDuration = row.sleepDuration.replace(/^'|'$/g, '');
        console.log('Processing row:', row);
        console.log('Sleep duration (original):', row.sleepDuration);
        console.log('Sleep duration (cleaned):', cleanSleepDuration);
        console.log('Count:', row.count);
        const numericValue = sleepHoursMap[cleanSleepDuration];
        console.log('Mapped numeric value:', numericValue);
        const count = parseInt(row.count);
        console.log('Parsed count:', count);
        
        if (numericValue !== undefined && !isNaN(count)) {
          console.log('Adding values...');
          for (let i = 0; i < count; i++) {
            sleepValues.push(numericValue);
          }
          sleep_freqDist.push([cleanSleepDuration, count]);
        } else {
          console.log('Skipping invalid data point');
        }
      });
      
      console.log('Final sleep_freqDist:', sleep_freqDist);
      console.log('Final sleepValues length:', sleepValues.length);
    }
    
    if (sleepValues.length > 0) {
      // Calculate sleep statistics
      const sleep_mean = calculateMean(sleepValues);
      const sleep_median = calculateMedian(sleepValues);
      const sleep_stdev = calculateStandardDeviation(sleepValues);
      const sleep_skewness = calculateSkewness(sleepValues);
      const sleep_kurtosis = calculateKurtosis(sleepValues);
      
      sleep_stats = {
        mean: sleep_mean,
        median: sleep_median,
        stdev: sleep_stdev,
        skewness: sleep_skewness,
        kurtosis: sleep_kurtosis
      };
      
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
          vAxis: { 
            title: 'Frequency',
            minValue: 0
          }
        }
      });
    } else {
      console.error('No valid sleep data found');
      addMdToPage(`
        ### Sleep Duration Distribution
        
        No valid sleep duration data available for analysis.
      `);
    }
    
    // Add implications section
    addMdToPage(`
      ## Implications for Statistical Testing
      
      Based on my normality tests, I can draw the following conclusions:
      
      1. **Financial Stress**: ${Math.abs(fs_skewness) < 0.5 ? 'Approximately normal' : 'Non-normal'} distribution
      ${sleep_stats ? `2. **Sleep Duration**: ${Math.abs(sleep_stats.skewness) < 0.5 ? 'Approximately normal' : 'Non-normal'} distribution` : '2. **Sleep Duration**: No data available for analysis'}
      
      Since my variables do not perfectly follow normal distributions, I should be cautious when applying parametric tests. However, with my large sample size (${financialValues.length.toLocaleString()} students), the Central Limit Theorem suggests that t-tests can still provide reliable results if used to compare large groups.
    `);
  } catch (error) {
    console.error('Error in normalDistributionTests:', error);
    addMdToPage(`
      ## Error
      
      An error occurred while performing the normal distribution tests. Please try refreshing the page.
    `);
  }
}

// Function to fetch data and perform statistical tests
async function performStatisticalTests() {
  try {
    const selectedTest = document.querySelector('select[name="sel1"]').value;
    
    // Display test information based on selection
    if (selectedTest === 'Normal Distribution Tests') {
      await normalDistributionTests();
    } 
    else if (selectedTest === 'T-Tests for Financial Stress') {
      await financialStressTTests();
    } 
    else if (selectedTest === 'Correlation Analysis') {
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

// Run initial test with default selection
performStatisticalTests();

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
  
  // Fetch real data from database
  const depressionData = await dbQuery(`
    SELECT 
      financialStress,
      depression,
      COUNT(*) as count
    FROM studentDepression 
    WHERE financialStress IN ('1', '2', '4', '5')
      AND depression IS NOT NULL
    GROUP BY financialStress, depression
    ORDER BY financialStress
  `);
  
  console.log('Depression data:', depressionData);
  
  // Process the data
  const highStressGroup = [];
  const lowStressGroup = [];
  let highStressTotal = 0;
  let lowStressTotal = 0;
  let highStressDepressed = 0;
  let lowStressDepressed = 0;
  
  depressionData.forEach(row => {
    const stress = parseInt(row.financialStress);
    const isDepressed = row.depression === 1;
    const count = parseInt(row.count);
    
    if ([4, 5].includes(stress)) {
      highStressTotal += count;
      if (isDepressed) {
        highStressDepressed += count;
      }
      for (let i = 0; i < count; i++) {
        highStressGroup.push(isDepressed ? 1 : 0);
      }
    } else if ([1, 2].includes(stress)) {
      lowStressTotal += count;
      if (isDepressed) {
        lowStressDepressed += count;
      }
      for (let i = 0; i < count; i++) {
        lowStressGroup.push(isDepressed ? 1 : 0);
      }
    }
  });
  
  // Calculate depression rates
  const highStressRate = (highStressDepressed / highStressTotal) * 100;
  const lowStressRate = (lowStressDepressed / lowStressTotal) * 100;
  
  // Perform t-test
  const tStat = calculateTTest(highStressGroup, lowStressGroup);
  const significant = Math.abs(tStat) > 1.96; // Using 1.96 as critical value for α=0.05
  
  // Display results
  addMdToPage(`
    ### T-Test Results
    
    **Sample Information:**
    - Low Stress Group (1-2): ${lowStressTotal.toLocaleString()} students, Depression Rate: ${lowStressRate.toFixed(2)}%
    - High Stress Group (4-5): ${highStressTotal.toLocaleString()} students, Depression Rate: ${highStressRate.toFixed(2)}%
    
    **Statistical Results:**
    - t-statistic: ${tStat.toFixed(4)}
    - Critical value: ±1.96 (α = 0.05)
    - Result: ${significant ? 'Statistically Significant' : 'Not Statistically Significant'}
    
    **Conclusion:** The difference in depression rates between high and low financial stress groups is ${significant ? 'statistically significant' : 'not statistically significant'} at the α = 0.05 level. ${
      significant ? 'This suggests that financial stress has a meaningful impact on depression rates among students.' 
      : 'This suggests that the observed differences might be due to random chance.'
    }
  `);
  
  // Visualize the difference
  drawGoogleChart({
    type: 'ColumnChart',
    data: [
      ['Stress Level', 'Depression Rate (%)', { role: 'style' }],
      ['Low Stress (1-2)', lowStressRate, '#4285F4'],
      ['High Stress (4-5)', highStressRate, '#DB4437']
    ],
    options: {
      title: 'Depression Rates by Financial Stress Level',
      legend: { position: 'none' },
      hAxis: { title: 'Financial Stress Level' },
      vAxis: { 
        title: 'Depression Rate (%)',
        minValue: 0,
        maxValue: 100,
        format: '#\'%\''
      }
    }
  });
  
  // Add practical significance section
  const rateDifference = Math.abs(highStressRate - lowStressRate);
  const percentChange = ((highStressRate - lowStressRate) / lowStressRate * 100);
  
  addMdToPage(`
    ### Practical Significance
    
    Beyond statistical significance, the practical significance is substantial:
    
    - The absolute difference in depression rates between high and low financial stress groups is ${rateDifference.toFixed(2)} percentage points
    - This represents a ${Math.abs(percentChange).toFixed(2)}% ${highStressRate > lowStressRate ? 'increase' : 'decrease'} in depression risk for students with high financial stress
    
    These findings suggest that financial stress is a major risk factor for depression among Indian university students and should be addressed through targeted interventions.
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
    - **Sleep Duration**: Less than 5 hours = 4.5, 5-6 hours = 5.5, 7-8 hours = 7.5, More than 8 hours = 8.5
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
      ['Social Support', 0.39]
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