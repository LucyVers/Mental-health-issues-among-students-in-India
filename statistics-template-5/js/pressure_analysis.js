// Pressure Analysis Visualizations
// Created: April 20, 2025

import addToPage from './libs/addToPage.js';
import dbQuery from './libs/dbQuery.js';
import makeChartFriendly from './libs/makeChartFriendly.js';

async function drawPressureDistributionChart() {
  // Get pressure distribution data
  let data = await dbQuery(`
    SELECT 
      CASE 
        WHEN pressure = 0 THEN 'No Pressure'
        WHEN pressure <= 2 THEN 'Low Pressure'
        WHEN pressure <= 3.5 THEN 'Moderate Pressure'
        ELSE 'High Pressure'
      END as pressure_category,
      COUNT(*) as student_count,
      ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
    FROM studentDepression
    GROUP BY pressure_category
    ORDER BY 
      CASE pressure_category
        WHEN 'No Pressure' THEN 1
        WHEN 'Low Pressure' THEN 2
        WHEN 'Moderate Pressure' THEN 3
        WHEN 'High Pressure' THEN 4
      END
  `);

  // Convert data for Google Charts
  let chartData = makeChartFriendly(
    data,
    'Pressure Category',
    'Number of Students',
    'Depression Rate (%)'
  );

  // Create and draw the chart
  let chart = new google.visualization.ColumnChart(
    document.getElementById('pressure_distribution_chart')
  );

  let options = {
    title: 'Pressure Distribution and Depression Rates',
    width: 800,
    height: 400,
    seriesType: 'bars',
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1, type: 'line' }
    },
    vAxes: {
      0: { title: 'Number of Students' },
      1: { title: 'Depression Rate (%)' }
    },
    colors: ['#4285F4', '#DB4437']
  };

  // Add chart container to page
  addToPage('<div id="pressure_distribution_chart"></div>');
  chart.draw(google.visualization.arrayToDataTable(chartData), options);
}

async function drawSleepPressureChart() {
  // Get sleep duration and pressure data
  let data = await dbQuery(`
    SELECT 
      sleepDuration,
      ROUND(AVG(pressure), 2) as avg_pressure,
      COUNT(*) as student_count,
      ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
    FROM studentDepression
    WHERE sleepDuration != 'Others'
    GROUP BY sleepDuration
    ORDER BY 
      CASE sleepDuration
        WHEN 'Less than 5 hours' THEN 1
        WHEN '5-6 hours' THEN 2
        WHEN '7-8 hours' THEN 3
        WHEN 'More than 8 hours' THEN 4
      END
  `);

  // Convert data for Google Charts
  let chartData = makeChartFriendly(
    data,
    'Sleep Duration',
    'Average Pressure',
    'Depression Rate (%)'
  );

  // Create and draw the chart
  let chart = new google.visualization.ComboChart(
    document.getElementById('sleep_pressure_chart')
  );

  let options = {
    title: 'Sleep Duration vs Pressure and Depression',
    width: 800,
    height: 400,
    seriesType: 'bars',
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1, type: 'line' }
    },
    vAxes: {
      0: { title: 'Average Pressure' },
      1: { title: 'Depression Rate (%)' }
    },
    colors: ['#4285F4', '#DB4437']
  };

  // Add chart container to page
  addToPage('<div id="sleep_pressure_chart"></div>');
  chart.draw(google.visualization.arrayToDataTable(chartData), options);
}

async function drawCGPAPressureChart() {
  // Get CGPA and pressure data
  let data = await dbQuery(`
    SELECT 
      CASE 
        WHEN cgpa >= 8.0 THEN 'High CGPA (≥8.0)'
        WHEN cgpa >= 6.0 THEN 'Medium CGPA (6.0-7.9)'
        ELSE 'Low CGPA (<6.0)'
      END as cgpa_category,
      COUNT(*) as student_count,
      ROUND(AVG(pressure), 2) as avg_pressure,
      ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
    FROM studentDepression
    WHERE cgpa > 0
    GROUP BY cgpa_category
    ORDER BY avg_pressure DESC
  `);

  // Convert data for Google Charts
  let chartData = makeChartFriendly(
    data,
    'CGPA Category',
    'Average Pressure',
    'Depression Rate (%)'
  );

  // Create and draw the chart
  let chart = new google.visualization.ComboChart(
    document.getElementById('cgpa_pressure_chart')
  );

  let options = {
    title: 'Academic Performance vs Pressure and Depression',
    width: 800,
    height: 400,
    seriesType: 'bars',
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1, type: 'line' }
    },
    vAxes: {
      0: { title: 'Average Pressure' },
      1: { title: 'Depression Rate (%)' }
    },
    colors: ['#4285F4', '#DB4437']
  };

  // Add chart container to page
  addToPage('<div id="cgpa_pressure_chart"></div>');
  chart.draw(google.visualization.arrayToDataTable(chartData), options);
}

// Main function to draw all charts
async function drawCharts() {
  addToPage('<h2>Pressure Analysis Visualizations</h2>');
  await drawPressureDistributionChart();
  addToPage('<hr>');
  await drawSleepPressureChart();
  addToPage('<hr>');
  await drawCGPAPressureChart();
}

// Export the main function
export default drawCharts; 