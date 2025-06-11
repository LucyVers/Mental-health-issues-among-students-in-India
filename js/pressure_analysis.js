// Pressure Analysis Visualizations
// Created: April 20, 2023

import dbQuery from './libs/dbQuery.js';
import addToPage from './libs/addToPage.js';
import { addMdToPage } from './libs/markdown.js';

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
    const container = document.getElementById('pressure_distribution_chart');
    if (!container) {
      console.warn("Container 'pressure_distribution_chart' not found");
      return;
    }
    
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          SELECT 
            CASE 
              WHEN pressure IS NULL OR pressure = 0 OR pressure < 0.1 THEN 'No Pressure'
              WHEN pressure <= 2 THEN 'Low Pressure'
              WHEN pressure <= 3.5 THEN 'Moderate Pressure'
              ELSE 'High Pressure'
            END as pressure_category,
            COUNT(*) as student_count,
            ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
          FROM studentDepression
          GROUP BY 
            CASE 
              WHEN pressure IS NULL OR pressure = 0 OR pressure < 0.1 THEN 'No Pressure'
              WHEN pressure <= 2 THEN 'Low Pressure'
              WHEN pressure <= 3.5 THEN 'Moderate Pressure'
              ELSE 'High Pressure'
            END
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
    chartData.addColumn({type: 'string', role: 'annotation'});
    chartData.addColumn('number', 'Depression Rate (%)');
    chartData.addColumn({type: 'string', role: 'annotation'});

    data.forEach(row => {
      const studentCount = parseInt(row.student_count) || 0;
      const depressionRate = parseFloat(row.depression_percentage) || 0;
      
      // Add annotations for both metrics in No Pressure category
      const studentAnnotation = row.pressure_category === 'No Pressure' ? studentCount.toString() + ' students' : null;
      const depressionAnnotation = row.pressure_category === 'No Pressure' ? depressionRate.toFixed(1) + '%' : null;
      
      chartData.addRow([
        row.pressure_category,
        studentCount,
        studentAnnotation,
        depressionRate,
        depressionAnnotation
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Distribution of Pressure Levels and Depression Rates',
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary,
          minValue: 0,
          annotations: {
            textStyle: {
              fontSize: 12,
              color: chartColors.text,
              bold: true,
              auraColor: 'white'
            },
            stem: {
              color: chartColors.text,
              length: 10
            }
          }
        },
        1: { 
          targetAxisIndex: 1,
          color: '#FF6B6B',
          annotations: {
            textStyle: {
              fontSize: 12,
              color: chartColors.text,
              bold: true,
              auraColor: 'white'
            },
            stem: {
              color: chartColors.text,
              length: 10
            }
          }
        }
      },
      vAxes: {
        0: { 
          title: 'Number of Students',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0
          },
          format: '#,###'
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0,
            max: 100
          }
        }
      },
      bar: { 
        groupWidth: '80%'
      },
      annotations: {
        alwaysOutside: true,
        stem: {
          color: chartColors.text
        }
      },
      tooltip: {
        trigger: 'both',
        showColorCode: true
      }
    };

    const chart = new google.visualization.ComboChart(container);
    chart.draw(chartData, options);

    // Add explanatory text below the chart
    const explanation = document.createElement('p');
    explanation.style.fontSize = '14px';
    explanation.style.color = chartColors.text;
    explanation.style.marginTop = '10px';
    explanation.style.textAlign = 'center';
    explanation.style.fontStyle = 'italic';
    explanation.textContent = 'Note: The "No Pressure" category contains only 6 students, significantly fewer than other categories.';
    container.parentNode.insertBefore(explanation, container.nextSibling);

  } catch (error) {
    console.error('Error drawing pressure distribution chart:', error);
  }
}

async function drawSleepPressureChart() {
  try {
    // Check if the container exists before proceeding
    const container = document.getElementById('sleep_pressure_chart');
    if (!container) {
      console.warn("Container 'sleep_pressure_chart' not found");
      return;
    }
    
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
    chartData.addColumn('number', 'Average Pressure');
    chartData.addColumn('number', 'Depression Rate (%)');

    data.forEach(row => {
      // Remove the single quotes from sleepDuration values for display
      chartData.addRow([
        row.sleepDuration.replace(/^'|'$/g, ''),
        row.avg_pressure,
        row.depression_percentage
      ]);
    });

    const options = {
      ...baseOptions,
      title: 'Sleep Duration vs Pressure and Depression Rates',
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary
        },
        1: { 
          targetAxisIndex: 1,
          color: '#FF6B6B',
          type: 'bars'
        }
      },
      vAxes: {
        0: { 
          title: 'Average Pressure',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0,
            max: 5
          }
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0,
            max: 100
          }
        }
      },
      bar: { groupWidth: '80%' }
    };

    const chart = new google.visualization.ComboChart(container);
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing sleep pressure chart:', error);
  }
}

async function drawCGPAPressureChart() {
  try {
    // Check if the container exists before proceeding
    const container = document.getElementById('cgpa_pressure_chart');
    if (!container) {
      console.warn("Container 'cgpa_pressure_chart' not found");
      return;
    }
    
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
      title: 'CGPA vs Pressure and Depression Rates',
      seriesType: 'bars',
      series: {
        0: { 
          targetAxisIndex: 0,
          color: chartColors.primary
        },
        1: { 
          targetAxisIndex: 1,
          color: '#FF6B6B',
          type: 'bars'
        }
      },
      vAxes: {
        0: { 
          title: 'Average Pressure',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0,
            max: 5
          }
        },
        1: { 
          title: 'Depression Rate (%)',
          textStyle: { color: chartColors.text },
          titleTextStyle: { color: chartColors.text },
          viewWindow: {
            min: 0,
            max: 100
          }
        }
      },
      bar: { groupWidth: '80%' }
    };

    const chart = new google.visualization.ComboChart(container);
    chart.draw(chartData, options);
  } catch (error) {
    console.error('Error drawing CGPA pressure chart:', error);
  }
}

// Initialize Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initAcademicPressureAnalysis);

// Main initialization function
async function initAcademicPressureAnalysis() {
    // Add descriptive content
    const content = `
# Academic Pressure Analysis

This section analyzes the relationship between academic pressure and mental health among Indian students.

## Pressure Distribution
The chart below shows the distribution of pressure levels among students and their correlation with depression rates.

<div id="pressure_distribution_chart" style="width: 100%; height: 400px;"></div>

## Sleep and Pressure Relationship
This visualization explores how sleep patterns relate to academic pressure levels.

<div id="sleep_pressure_chart" style="width: 100%; height: 400px;"></div>

## Academic Performance and Pressure
The following chart illustrates the relationship between CGPA and pressure levels.

<div id="cgpa_pressure_chart" style="width: 100%; height: 400px;"></div>
`;

    // Add content to page
    addMdToPage(content);

    // Draw charts in sequence
    setTimeout(() => {
        drawPressureDistributionChart();
        console.log('Drew pressure distribution chart');
        
        setTimeout(() => {
            drawSleepPressureChart();
            console.log('Drew sleep-pressure chart');
            
            setTimeout(() => {
                drawCGPAPressureChart();
                console.log('Drew CGPA-pressure chart');
            }, 200);
        }, 200);
    }, 200);
} 