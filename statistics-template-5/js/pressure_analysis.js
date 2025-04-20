// Pressure Analysis Visualizations
// Created: April 20, 2025

import addToPage from './libs/addToPage.js';
import dbQuery from './libs/dbQuery.js';
import makeChartFriendly from './libs/makeChartFriendly.js';

// Shared chart styling
const chartColors = {
  primary: '#4285F4',
  secondary: '#DB4437',
  background: '#ffffff',
  gridlines: '#f5f5f5',
  text: '#212529'
};

const baseOptions = {
  width: '100%',
  height: 400,
  backgroundColor: chartColors.background,
  chartArea: {
    width: '80%',
    height: '70%'
  },
  legend: {
    position: 'top',
    alignment: 'center',
    textStyle: {
      color: chartColors.text,
      fontSize: 12
    }
  },
  titleTextStyle: {
    color: chartColors.text,
    fontSize: 16,
    bold: true
  },
  animation: {
    startup: true,
    duration: 1000,
    easing: 'out'
  },
  vAxis: {
    gridlines: {
      color: chartColors.gridlines
    },
    minorGridlines: {
      color: chartColors.gridlines
    },
    textStyle: {
      color: chartColors.text
    }
  },
  hAxis: {
    textStyle: {
      color: chartColors.text
    }
  }
};

async function drawPressureDistributionChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
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
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Pressure Category');
    chartData.addColumn('number', 'Number of Students');
    chartData.addColumn('number', 'Depression Rate (%)');

    data.forEach(row => {
      chartData.addRow([
        row.pressure_category,
        row.student_count,
        row.depression_percentage
      ]);
    });

    const options = {
      ...baseOptions,
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary
        },
        1: { 
          targetAxisIndex: 1,
          type: 'line',
          color: chartColors.secondary,
          lineWidth: 3,
          pointSize: 6
        }
      },
      vAxes: {
        0: { 
          title: 'Number of Students',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        }
      }
    };

    const chart = new google.visualization.ComboChart(
      document.getElementById('pressure_distribution_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing pressure distribution chart:', error);
  }
}

async function drawSleepPressureChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
            sleepDuration,
            ROUND(AVG(pressure), 2) as avg_pressure,
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
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Sleep Duration');
    chartData.addColumn('number', 'Average Pressure');
    chartData.addColumn('number', 'Depression Rate (%)');

    data.forEach(row => {
      chartData.addRow([
        row.sleepDuration.replace(/'/g, ''),
        row.avg_pressure,
        row.depression_percentage
      ]);
    });

    const options = {
      ...baseOptions,
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary
        },
        1: { 
          targetAxisIndex: 1,
          type: 'line',
          color: chartColors.secondary,
          lineWidth: 3,
          pointSize: 6
        }
      },
      vAxes: {
        0: { 
          title: 'Average Pressure',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        }
      }
    };

    const chart = new google.visualization.ComboChart(
      document.getElementById('sleep_pressure_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing sleep pressure chart:', error);
  }
}

async function drawCGPAPressureChart() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
            CASE 
              WHEN cgpa >= 8.0 THEN 'High CGPA (≥8.0)'
              WHEN cgpa >= 6.0 THEN 'Medium CGPA (6.0-7.9)'
              ELSE 'Low CGPA (<6.0)'
            END as cgpa_category,
            ROUND(AVG(pressure), 2) as avg_pressure,
            ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
          FROM studentDepression
          WHERE cgpa > 0
          GROUP BY cgpa_category
          ORDER BY avg_pressure DESC
        `
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    const chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'CGPA Category');
    chartData.addColumn('number', 'Average Pressure');
    chartData.addColumn('number', 'Depression Rate (%)');

    data.forEach(row => {
      chartData.addRow([
        row.cgpa_category,
        row.avg_pressure,
        row.depression_percentage
      ]);
    });

    const options = {
      ...baseOptions,
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary
        },
        1: { 
          targetAxisIndex: 1,
          type: 'line',
          color: chartColors.secondary,
          lineWidth: 3,
          pointSize: 6
        }
      },
      vAxes: {
        0: { 
          title: 'Average Pressure',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text }
        }
      }
    };

    const chart = new google.visualization.ComboChart(
      document.getElementById('cgpa_pressure_chart')
    );
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing CGPA pressure chart:', error);
  }
}

// Draw all charts when the page loads
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(async () => {
  await drawPressureDistributionChart();
  await drawSleepPressureChart();
  await drawCGPAPressureChart();
});

export default async function drawCharts() {
  await drawPressureDistributionChart();
  await drawSleepPressureChart();
  await drawCGPAPressureChart();
} 