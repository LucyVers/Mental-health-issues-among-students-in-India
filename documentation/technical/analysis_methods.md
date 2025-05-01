# Analysis Methods

© 2025 Lucy Sonberg. All rights reserved.
This documentation and all associated content are protected by copyright law. Any use, reproduction, or distribution requires explicit permission from the copyright holder.

## Statistical Analysis Implementation

### 1. Descriptive Statistics
Implementation of:
- Frequency distributions
- Central tendency measures
- Dispersion measures
- Visual representations (histograms, box plots)

### 2. Correlation Analysis
Results from correlation analysis:
- Pearson correlation coefficient (r) between:
  - Financial Stress and Depression (r = 0.71, p < 0.001)
  - Sleep Duration and Depression (r = -0.54, p < 0.001)
  - Dietary Habits and Depression (r = -0.48, p < 0.001)
  - Academic Pressure and Depression (r = 0.43, p < 0.001)
- Correlation matrices
- Bar chart visualization of correlations

### 3. Normality Tests
Analysis results:
- Distribution analysis of:
  - Financial Stress Distribution (approximately normal, skewness = -0.13)
  - Sleep Duration Distribution (approximately normal, skewness = 0.08)
- Histogram analysis
- Skewness and kurtosis calculations

### 4. Hypothesis Testing
T-tests for Financial Stress:
- Null Hypothesis: No difference in depression rates between high and low financial stress groups
- Alternative Hypothesis: Higher depression rates in high financial stress group
- Results: 
  - t = 63.0270 (p < 0.001)
  - Low Stress (1-2): 37.39% depression rate
  - High Stress (4-5): 75.64% depression rate
  - Statistically significant difference
  - 102.31% increase in depression risk

### 5. Data Visualization
Implementation using Google Charts:
- Distribution histograms
- Depression rate comparisons
- Correlation bar charts
Features include:
- Interactive elements
- Filtering capabilities
- Dynamic updates

## Research Questions Addressed
1. Relationship between financial stress and depression
2. Correlation between sleep patterns and depression
3. Impact of dietary habits on mental health
4. Relationship between academic pressure and depression

## Technical Implementation
- Database: SQLite for data storage and queries
- Statistics: JavaScript with Simple Statistics library
- Visualization: Google Charts API
- Interface: Custom web implementation

## Documentation Approach
Each analysis includes:
- Purpose and methodology
- Implementation details
- Results and interpretation
- Visual representations
- Relevant code examples

## Quality Assurance
- Data validation procedures
- Result verification methods
- Documentation review process
- Implementation testing

## Copyright Notice
This technical documentation, including all analysis methods, implementations, and results, is my individual work. All rights are reserved. 
The content is protected under copyright law and may not be used, reproduced, or distributed without my explicit permission.

For permissions or inquiries, please contact:
Lucy Sonberg
lucyxrdeveloper@gmail.com 