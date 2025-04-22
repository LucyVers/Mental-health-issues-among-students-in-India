# Visualizations of Student Mental Health Analysis

## Overview
This document presents the key visualizations from our analysis of mental health issues among students in India, focusing on the relationships between financial stress, depression, and various lifestyle factors.

## Interactive Visualizations
All visualizations are available as interactive charts at: `http://localhost:3005/financial-analysis.html`

### 1. Financial Stress Distribution
![Financial Stress Distribution](../images/financial_stress_distribution.png)
- Shows the distribution of students across different financial stress levels
- Includes depression rates for each stress category
- Key finding: Higher financial stress strongly correlates with increased depression rates

### 2. Academic Performance Analysis
![Academic Performance](../images/academic_performance.png)
- Visualizes the relationship between financial stress and academic performance (CGPA)
- Includes depression rates overlay
- Key finding: CGPA remains surprisingly stable across stress levels

### 3. Work/Study Hours Analysis
![Work/Study Hours](../images/work_study_hours.png)
- Shows average work/study hours across financial stress levels
- Includes student count distribution
- Key finding: Students with higher financial stress tend to work/study longer hours

### 4. Sleep Pattern Analysis
![Sleep Patterns](../images/sleep_patterns.png)
- Visualizes sleep duration patterns across stress levels
- Includes depression rate correlation
- Key finding: Less sleep correlates with higher depression rates, especially under financial stress

### 5. Gender Analysis
![Gender Analysis](../images/gender_analysis.png)
- Compares depression rates between genders across stress levels
- Key finding: Minimal gender differences in depression rates

### 6. Dietary Habits Analysis
![Dietary Habits](../images/dietary_habits.png)
- Shows the relationship between diet quality and depression rates
- Segments by financial stress levels
- Key finding: Healthy diet appears to be protective against depression

### 7. Family History Analysis
![Family History](../images/family_history.png)
- Compares depression rates between students with and without family history of mental illness
- Segments by financial stress levels
- Key finding: Family history increases vulnerability to depression under financial stress

## Technical Implementation
- Visualizations created using Google Charts library
- Interactive features include:
  - Hover tooltips with detailed data
  - Click-to-highlight functionality
  - Responsive design for different screen sizes
- Data sourced directly from SQLite database
- Real-time data updates when database changes

## Access and Usage
1. Start the local server:
   ```bash
   cd statistics-template-5
   npm start
   ```
2. Open `http://localhost:3005/financial-analysis.html` in a web browser
3. All charts will load automatically and are interactive

## Future Improvements
1. Add export functionality for charts
2. Implement more filtering options
3. Add trend analysis over time
4. Include comparative analysis with other universities 