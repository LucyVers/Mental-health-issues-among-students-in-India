// Dietary Analysis Visualizations
// Created: April 20, 2025

import addToPage from './libs/addToPage.js';

const chartColors = {
  primary: '#2c3e50',
  secondary: '#e74c3c',
  tertiary: '#27ae60',
  quaternary: '#f39c12',
  background: '#ffffff',
  text: '#2c3e50'
};

const baseOptions = {
  backgroundColor: chartColors.background,
  chartArea: { width: '80%', height: '70%' },
  titleTextStyle: { 
    color: chartColors.text,
    fontSize: 16,
    bold: true
  },
  legend: { 
    textStyle: { color: chartColors.text },
    position: 'bottom'
  },
  hAxis: {
    textStyle: { color: chartColors.text },
    titleTextStyle: { color: chartColors.text }
  },
  animation: {
    startup: true,
    duration: 1000,
    easing: 'out'
  }
};

async function drawDietaryDistributionChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
              dietaryHabits,
              COUNT(*) as student_count,
              ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage,
              ROUND(AVG(pressure), 2) as avg_pressure
          FROM studentDepression
          WHERE dietaryHabits != 'Others'
          GROUP BY dietaryHabits
          ORDER BY student_count DESC
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Dietary Habits');
    chartData.addColumn('number', 'Number of Students');
    chartData.addColumn('number', 'Depression Rate (%)');
    chartData.addColumn('number', 'Average Pressure');

    data.forEach(row => {
      chartData.addRow([
        row.dietaryHabits,
        row.student_count,
        row.depression_percentage,
        row.avg_pressure
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Distribution of Dietary Habits and Mental Health Indicators',
      seriesType: 'bars',
      series: {
        0: { targetAxisIndex: 0, color: chartColors.primary },
        1: { targetAxisIndex: 1, type: 'line', color: chartColors.secondary },
        2: { targetAxisIndex: 1, type: 'line', color: chartColors.tertiary }
      },
      vAxes: {
        0: { 
          title: 'Number of Students',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        },
        1: { 
          title: 'Percentage / Score',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        }
      }
    };

    const chart = new google.visualization.ComboChart(
      document.getElementById('dietary_distribution_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing dietary distribution chart:', error);
  }
}

async function drawDietSleepChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
              dietaryHabits,
              sleepDuration,
              COUNT(*) as student_count,
              ROUND(AVG(pressure), 2) as avg_pressure,
              ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
          FROM studentDepression
          WHERE sleepDuration != 'Others' AND dietaryHabits != 'Others'
          GROUP BY dietaryHabits, sleepDuration
          ORDER BY dietaryHabits, 
              CASE sleepDuration
                  WHEN 'Less than 5 hours' THEN 1
                  WHEN '5-6 hours' THEN 2
                  WHEN '7-8 hours' THEN 3
                  WHEN 'More than 8 hours' THEN 4
                  ELSE 5
              END
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Sleep Duration');
    chartData.addColumn('number', 'Healthy Diet');
    chartData.addColumn('number', 'Moderate Diet');
    chartData.addColumn('number', 'Unhealthy Diet');

    const sleepCategories = ['Less than 5 hours', '5-6 hours', '7-8 hours', 'More than 8 hours'];
    const depressionRates = {};
    
    data.forEach(row => {
      if (!depressionRates[row.sleepDuration]) {
        depressionRates[row.sleepDuration] = {};
      }
      depressionRates[row.sleepDuration][row.dietaryHabits] = row.depression_percentage;
    });

    sleepCategories.forEach(sleep => {
      chartData.addRow([
        sleep,
        depressionRates[sleep]['Healthy'] || 0,
        depressionRates[sleep]['Moderate'] || 0,
        depressionRates[sleep]['Unhealthy'] || 0
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Depression Rates by Sleep Duration and Diet',
      vAxis: { 
        title: 'Depression Rate (%)',
        minValue: 0
      },
      hAxis: { title: 'Sleep Duration' },
      seriesType: 'bars',
      series: {
        0: { color: chartColors.tertiary },
        1: { color: chartColors.quaternary },
        2: { color: chartColors.secondary }
      }
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById('diet_sleep_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing diet-sleep chart:', error);
  }
}

async function drawDietAcademicChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
              dietaryHabits,
              CASE 
                  WHEN cgpa >= 8.0 THEN 'High CGPA (≥8.0)'
                  WHEN cgpa >= 6.0 THEN 'Medium CGPA (6.0-7.9)'
                  ELSE 'Low CGPA (<6.0)'
              END as cgpa_category,
              COUNT(*) as student_count,
              ROUND(AVG(pressure), 2) as avg_pressure,
              ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
          FROM studentDepression
          WHERE cgpa > 0 AND dietaryHabits != 'Others'
          GROUP BY dietaryHabits, cgpa_category
          ORDER BY 
              CASE dietaryHabits
                  WHEN 'Healthy' THEN 1
                  WHEN 'Moderate' THEN 2
                  WHEN 'Unhealthy' THEN 3
              END,
              CASE cgpa_category
                  WHEN 'Low CGPA (<6.0)' THEN 1
                  WHEN 'Medium CGPA (6.0-7.9)' THEN 2
                  WHEN 'High CGPA (≥8.0)' THEN 3
              END
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'CGPA Category');
    chartData.addColumn('number', 'Healthy Diet');
    chartData.addColumn('number', 'Moderate Diet');
    chartData.addColumn('number', 'Unhealthy Diet');

    const cgpaCategories = ['Low CGPA (<6.0)', 'Medium CGPA (6.0-7.9)', 'High CGPA (≥8.0)'];
    const depressionRates = {};
    
    data.forEach(row => {
      if (!depressionRates[row.cgpa_category]) {
        depressionRates[row.cgpa_category] = {};
      }
      depressionRates[row.cgpa_category][row.dietaryHabits] = row.depression_percentage;
    });

    cgpaCategories.forEach(cgpa => {
      chartData.addRow([
        cgpa,
        depressionRates[cgpa]['Healthy'] || 0,
        depressionRates[cgpa]['Moderate'] || 0,
        depressionRates[cgpa]['Unhealthy'] || 0
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Depression Rates by Academic Performance and Diet',
      vAxis: { 
        title: 'Depression Rate (%)',
        minValue: 0
      },
      hAxis: { title: 'Academic Performance (CGPA)' },
      seriesType: 'bars',
      series: {
        0: { color: chartColors.tertiary },
        1: { color: chartColors.quaternary },
        2: { color: chartColors.secondary }
      }
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById('diet_academic_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing diet-academic chart:', error);
  }
}

// Export the drawing functions
export default function initDietaryCharts() {
  // Add chart containers to the page
  addToPage(`
    <div class="analysis-section mb-5">
      <h2>Dietary Habits Analysis</h2>
      <p>This analysis examines how dietary habits affect mental health among Indian university students.</p>
      
      <div class="chart-container mb-5">
        <div id="dietary_distribution_chart" style="width: 100%; height: 500px;"></div>
      </div>
      
      <div class="chart-container mb-5">
        <div id="diet_sleep_chart" style="width: 100%; height: 500px;"></div>
      </div>
      
      <div class="chart-container mb-5">
        <div id="diet_academic_chart" style="width: 100%; height: 500px;"></div>
      </div>
    </div>
  `);

  // Set a small delay to ensure DOM elements are created before drawing charts
  google.charts.setOnLoadCallback(() => {
    setTimeout(() => {
      drawDietaryDistributionChart();
      drawDietSleepChart();
      drawDietAcademicChart();
    }, 100); // Small delay to ensure DOM is updated
  });
} 