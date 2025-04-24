// Financial Stress Analysis Visualizations
// Created: April 22, 2025

import addToPage from './libs/addToPage.js';
import dbQuery from './libs/dbQuery.js';
import makeChartFriendly from './libs/makeChartFriendly.js';
import { calculateFinancialStats, calculateSleepStats, calculateDietaryStats } from './simpleStatistics.js';

// Shared chart styling
const chartColors = {
    primary: '#4285F4',
    secondary: '#DB4437',
    tertiary: '#F4B400',
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

async function drawFinancialStressDistribution() {
    try {
        console.log('Drawing financial stress distribution chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                COUNT(*) as student_count,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
            FROM studentDepression
            GROUP BY stress_category
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Stress Level');
        chartData.addColumn('number', 'Number of Students');
        chartData.addColumn('number', 'Depression (%)');

        data.forEach(row => {
            chartData.addRow([
                row.stress_category,
                row.student_count,
                row.depression_percentage
            ]);
        });

        const options = {
            ...baseOptions,
            title: 'Financial Stress Distribution and Depression',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Number of Students' },
                1: { title: 'Depression (%)' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('financial-chart')
        );
        chart.draw(chartData, options);
        console.log('Financial stress distribution chart drawn successfully');
    } catch (error) {
        console.error('Error drawing financial stress distribution:', error);
    }
}

async function drawAcademicPerformance() {
    try {
        console.log('Drawing academic performance chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                ROUND(AVG(cgpa), 2) as avg_cgpa,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage,
                COUNT(*) as student_count
            FROM studentDepression
            GROUP BY stress_category
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Stress Level');
        chartData.addColumn('number', 'Average CGPA');
        chartData.addColumn('number', 'Depression (%)');

        data.forEach(row => {
            chartData.addRow([
                row.stress_category,
                row.avg_cgpa,
                row.depression_percentage
            ]);
        });

        const options = {
            ...baseOptions,
            title: 'Financial Stress and Academic Performance',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Average CGPA' },
                1: { title: 'Depression (%)' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('financial-chart')
        );
        chart.draw(chartData, options);
        console.log('Academic performance chart drawn successfully');
    } catch (error) {
        console.error('Error drawing academic performance chart:', error);
    }
}

async function drawStudyHoursChart() {
    try {
        console.log('Drawing work/study hours chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                ROUND(AVG(workStudyHours), 2) as avg_study_hours,
                COUNT(*) as student_count
            FROM studentDepression
            GROUP BY stress_category
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Stress Level');
        chartData.addColumn('number', 'Average Work/Study Hours');
        chartData.addColumn('number', 'Number of Students');

        data.forEach(row => {
            chartData.addRow([
                row.stress_category,
                row.avg_study_hours,
                row.student_count
            ]);
        });

        const options = {
            ...baseOptions,
            title: 'Work/Study Hours by Financial Stress Level',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Average Work/Study Hours' },
                1: { title: 'Number of Students' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('financial-chart')
        );
        chart.draw(chartData, options);
        console.log('Work/study hours chart drawn successfully');
    } catch (error) {
        console.error('Error drawing work/study hours chart:', error);
    }
}

async function drawSleepPatternChart() {
    try {
        console.log('Drawing sleep pattern chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                sleepDuration,
                COUNT(*) as student_count,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
            FROM studentDepression
            GROUP BY stress_category, sleepDuration
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END,
                CASE sleepDuration
                    WHEN "'Less than 5 hours'" THEN 1
                    WHEN "'5-6 hours'" THEN 2
                    WHEN "'7-8 hours'" THEN 3
                    WHEN "'More than 8 hours'" THEN 4
                    ELSE 5
                END
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Sleep Duration');
        chartData.addColumn('number', 'Number of Students');
        chartData.addColumn('number', 'Depression (%)');

        // Process data to group by sleep duration
        const processedData = {};
        data.forEach(row => {
            if (!processedData[row.sleepDuration]) {
                processedData[row.sleepDuration] = {
                    student_count: 0,
                    depression_total: 0,
                    count: 0
                };
            }
            processedData[row.sleepDuration].student_count += row.student_count;
            processedData[row.sleepDuration].depression_total += (row.depression_percentage * row.student_count);
            processedData[row.sleepDuration].count += row.student_count;
        });

        // Calculate averages and add to chart
        Object.entries(processedData).forEach(([duration, values]) => {
            const avgDepression = values.depression_total / values.count;
            chartData.addRow([duration, values.student_count, avgDepression]);
        });

        const options = {
            ...baseOptions,
            title: 'Sleep Patterns and Depression',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Number of Students' },
                1: { title: 'Depression (%)' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('sleep-chart')
        );
        chart.draw(chartData, options);
        console.log('Sleep pattern chart drawn successfully');
    } catch (error) {
        console.error('Error drawing sleep pattern chart:', error);
    }
}

async function drawGenderAnalysisChart() {
    try {
        console.log('Drawing gender analysis chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                gender,
                COUNT(*) as student_count,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
            FROM studentDepression
            GROUP BY stress_category, gender
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END,
                gender
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Stress Level');
        chartData.addColumn('number', 'Male Depression (%)');
        chartData.addColumn('number', 'Female Depression (%)');

        const processedData = {};
        data.forEach(row => {
            if (!processedData[row.stress_category]) {
                processedData[row.stress_category] = { male: 0, female: 0 };
            }
            if (row.gender === 'Male') {
                processedData[row.stress_category].male = row.depression_percentage;
            } else {
                processedData[row.stress_category].female = row.depression_percentage;
            }
        });

        Object.entries(processedData).forEach(([category, values]) => {
            chartData.addRow([category, values.male, values.female]);
        });

        const options = {
            ...baseOptions,
            title: 'Depression Rates by Gender and Financial Stress',
            seriesType: 'bars',
            series: {
                0: { color: chartColors.primary },
                1: { color: chartColors.tertiary }
            },
            vAxis: {
                title: 'Depression Rate (%)'
            }
        };

        const chart = new google.visualization.ColumnChart(
            document.getElementById('financial-chart')
        );
        chart.draw(chartData, options);
        console.log('Gender analysis chart drawn successfully');
    } catch (error) {
        console.error('Error drawing gender analysis chart:', error);
    }
}

async function drawDietaryHabitsChart() {
    try {
        console.log('Drawing dietary habits chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                dietaryHabits,
                COUNT(*) as student_count,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
            FROM studentDepression
            GROUP BY stress_category, dietaryHabits
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END,
                dietaryHabits
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Dietary Habits');
        chartData.addColumn('number', 'Number of Students');
        chartData.addColumn('number', 'Depression (%)');

        // Process data to group by dietary habits
        const processedData = {};
        data.forEach(row => {
            if (!processedData[row.dietaryHabits]) {
                processedData[row.dietaryHabits] = {
                    student_count: 0,
                    depression_total: 0,
                    count: 0
                };
            }
            processedData[row.dietaryHabits].student_count += row.student_count;
            processedData[row.dietaryHabits].depression_total += (row.depression_percentage * row.student_count);
            processedData[row.dietaryHabits].count += row.student_count;
        });

        // Calculate averages and add to chart
        Object.entries(processedData).forEach(([habits, values]) => {
            const avgDepression = values.depression_total / values.count;
            chartData.addRow([habits, values.student_count, avgDepression]);
        });

        const options = {
            ...baseOptions,
            title: 'Dietary Habits and Depression',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Number of Students' },
                1: { title: 'Depression (%)' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('dietary-chart')
        );
        chart.draw(chartData, options);
        console.log('Dietary habits chart drawn successfully');
    } catch (error) {
        console.error('Error drawing dietary habits chart:', error);
    }
}

async function drawFamilyHistoryChart() {
    try {
        console.log('Drawing family history chart...');
        const data = await dbQuery(`
            SELECT 
                CASE 
                    WHEN financialStress = 0 THEN 'No Financial Stress'
                    WHEN financialStress <= 2 THEN 'Low Financial Stress'
                    WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
                    ELSE 'High Financial Stress'
                END as stress_category,
                familyHistoryMentalIllness,
                COUNT(*) as student_count,
                ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
            FROM studentDepression
            GROUP BY stress_category, familyHistoryMentalIllness
            ORDER BY 
                CASE stress_category
                    WHEN 'No Financial Stress' THEN 1
                    WHEN 'Low Financial Stress' THEN 2
                    WHEN 'Moderate Financial Stress' THEN 3
                    WHEN 'High Financial Stress' THEN 4
                END,
                familyHistoryMentalIllness
        `);

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Family History');
        chartData.addColumn('number', 'Number of Students');
        chartData.addColumn('number', 'Depression (%)');

        // Process data to group by family history
        const processedData = {};
        data.forEach(row => {
            if (!processedData[row.familyHistoryMentalIllness]) {
                processedData[row.familyHistoryMentalIllness] = {
                    student_count: 0,
                    depression_total: 0,
                    count: 0
                };
            }
            processedData[row.familyHistoryMentalIllness].student_count += row.student_count;
            processedData[row.familyHistoryMentalIllness].depression_total += (row.depression_percentage * row.student_count);
            processedData[row.familyHistoryMentalIllness].count += row.student_count;
        });

        // Calculate averages and add to chart
        Object.entries(processedData).forEach(([history, values]) => {
            const avgDepression = values.depression_total / values.count;
            chartData.addRow([history, values.student_count, avgDepression]);
        });

        const options = {
            ...baseOptions,
            title: 'Family History of Mental Illness and Depression',
            seriesType: 'bars',
            series: {
                0: { targetAxisIndex: 0, color: chartColors.primary },
                1: { 
                    type: 'line',
                    targetAxisIndex: 1,
                    color: chartColors.secondary,
                    lineWidth: 3,
                    pointSize: 6
                }
            },
            vAxes: {
                0: { title: 'Number of Students' },
                1: { title: 'Depression (%)' }
            }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById('dietary-chart')
        );
        chart.draw(chartData, options);
        console.log('Family history chart drawn successfully');
    } catch (error) {
        console.error('Error drawing family history chart:', error);
    }
}

// Initialize all charts when Google Charts is loaded
google.charts.load('current', {
    packages: ['corechart'],
    language: 'en'
});

google.charts.setOnLoadCallback(() => {
    console.log('Google Charts loaded, initializing...');
    Promise.all([
        drawFinancialStressDistribution(),
        drawAcademicPerformance(),
        drawStudyHoursChart(),
        drawSleepPatternChart(),
        drawGenderAnalysisChart(),
        drawDietaryHabitsChart(),
        drawFamilyHistoryChart()
    ]).catch(error => {
        console.error('Error initializing charts:', error);
    });
});

async function initializeCharts() {
    try {
        // Load all statistics
        const [financialStats, sleepStats, dietaryStats] = await Promise.all([
            calculateFinancialStats(),
            calculateSleepStats(),
            calculateDietaryStats()
        ]);

        // Update statistics displays
        updateFinancialStats(financialStats);
        updateSleepStats(sleepStats);
        updateDietaryStats(dietaryStats);

        // Draw charts
        drawFinancialStressDistribution();
        drawAcademicPerformance();
        drawWorkHoursAnalysis();
    } catch (error) {
        console.error('Error initializing charts:', error);
        handleError(error);
    }
}

function updateFinancialStats(stats) {
    const container = document.getElementById('financialStressStats');
    container.innerHTML = `
        <h3>Financial Stress</h3>
        <div class="stat-item">Mean: <span class="stat-value">${stats.mean.toFixed(2)}</span></div>
        <div class="stat-item">Median: <span class="stat-value">${stats.median.toFixed(2)}</span></div>
        <div class="stat-item">Standard Deviation: <span class="stat-value">${stats.standardDeviation.toFixed(2)}</span></div>
        <div class="stat-item">Depression Correlation: <span class="stat-value">${stats.correlation.toFixed(3)}</span></div>
    `;
}

function updateSleepStats(stats) {
    const container = document.getElementById('sleepStats');
    container.innerHTML = `
        <h3>Sleep Quality</h3>
        <div class="stat-item">Mean Hours: <span class="stat-value">${stats.mean.toFixed(2)}</span></div>
        <div class="stat-item">Median Hours: <span class="stat-value">${stats.median.toFixed(2)}</span></div>
        <div class="stat-item">Standard Deviation: <span class="stat-value">${stats.standardDeviation.toFixed(2)}</span></div>
        <div class="stat-item">Depression Correlation: <span class="stat-value">${stats.correlation.toFixed(3)}</span></div>
    `;
}

function updateDietaryStats(stats) {
    const container = document.getElementById('dietaryStats');
    container.innerHTML = `
        <h3>Dietary Habits</h3>
        <div class="stat-item">Mean Quality: <span class="stat-value">${stats.mean.toFixed(2)}</span></div>
        <div class="stat-item">Median Quality: <span class="stat-value">${stats.median.toFixed(2)}</span></div>
        <div class="stat-item">Standard Deviation: <span class="stat-value">${stats.standardDeviation.toFixed(2)}</span></div>
        <div class="stat-item">Depression Correlation: <span class="stat-value">${stats.correlation.toFixed(3)}</span></div>
    `;
}

function handleError(error) {
    const containers = [
        'financialStressStats',
        'sleepStats',
        'dietaryStats'
    ];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Error Loading Statistics</h4>
                    <p>${error.message || 'Failed to load statistical data.'}</p>
                    <hr>
                    <p class="mb-0">Please try refreshing the page.</p>
                </div>
            `;
        }
    });
} 