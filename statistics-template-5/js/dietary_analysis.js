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
    
    // Prepare data for grouped bar chart
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Dietary Habits');
    chartData.addColumn('number', 'Number of Students (÷100)');
    chartData.addColumn('number', 'Depression Rate (%)');
    chartData.addColumn('number', 'Average Pressure Score');

    data.forEach(row => {
      chartData.addRow([
        row.dietaryHabits,
        row.student_count / 100, // Skala ner för att matcha andra värden
        row.depression_percentage,
        row.avg_pressure * 20 // Skala upp för bättre visualisering
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Overview of Mental Health Indicators by Dietary Habits',
      seriesType: 'bars',
      series: {
        0: { 
          color: chartColors.primary,
          targetAxisIndex: 0,
          label: 'Number of Students (÷100)'
        },
        1: {
          color: chartColors.secondary,
          targetAxisIndex: 0,
          label: 'Depression Rate (%)'
        },
        2: {
          color: chartColors.tertiary,
          targetAxisIndex: 0,
          label: 'Pressure Score (×20)'
        }
      },
      vAxis: {
        title: 'Value',
        textStyle: { color: chartColors.text },
        titleTextStyle: { color: chartColors.text },
        viewWindow: {
          min: 0,
          max: 100
        }
      },
      hAxis: {
        title: 'Dietary Habits',
        textStyle: { color: chartColors.text },
        titleTextStyle: { color: chartColors.text }
      },
      annotations: {
        textStyle: {
          fontSize: 12,
          color: chartColors.text
        }
      },
      legend: {
        position: 'top',
        alignment: 'center'
      },
      bar: { groupWidth: '80%' }
    };

    const chart = new google.visualization.ColumnChart(
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
      const cleanSleepDuration = row.sleepDuration.replace(/['"]/g, '');
      if (!depressionRates[cleanSleepDuration]) {
        depressionRates[cleanSleepDuration] = {};
      }
      depressionRates[cleanSleepDuration][row.dietaryHabits] = row.depression_percentage;
    });

    sleepCategories.forEach(sleep => {
      chartData.addRow([
        sleep,
        depressionRates[sleep]?.['Healthy'] || 0,
        depressionRates[sleep]?.['Moderate'] || 0,
        depressionRates[sleep]?.['Unhealthy'] || 0
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
  // Add chart containers to the page with explanatory text
  addToPage(`
    <div class="analysis-section mb-5">
      <h2>Dietary Habits Analysis</h2>
      <p>This analysis examines how dietary habits affect mental health among Indian university students.</p>
      
      <div class="chart-container mb-5">
        <div id="dietary_distribution_chart" style="width: 100%; height: 500px;"></div>
        <p class="text-muted mt-2">
          Note: For better comparison, the number of students is divided by 100 and the pressure score is multiplied by 20.
          All values are shown on the same scale (0-100).
        </p>
      </div>
      
      <div class="chart-container mb-5">
        <div id="diet_sleep_chart" style="width: 100%; height: 500px;"></div>
      </div>
      
      <div class="chart-container mb-5">
        <div id="diet_academic_chart" style="width: 100%; height: 500px;"></div>
      </div>
    </div>
  `);

  // Draw all charts
  google.charts.setOnLoadCallback(() => {
    drawDietaryDistributionChart();
    drawDietSleepChart();
    drawDietAcademicChart();
  });
}

// Ensure initialization happens after DOM is ready
function initializePage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      google.charts.load('current', {
        'packages': ['corechart'],
        'language': 'sv'
      });
      google.charts.setOnLoadCallback(initDietaryCharts);
    });
  } else {
    google.charts.load('current', {
      'packages': ['corechart'],
      'language': 'sv'
    });
    google.charts.setOnLoadCallback(initDietaryCharts);
  }
}

initializePage(); 