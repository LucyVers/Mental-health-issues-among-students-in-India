import addMdToPage from './libs/addMdToPage.js';

addMdToPage(`
  # Mental Health Among University Students in India
  
  ## Project Overview
  
  This multi-page website presents a comprehensive analysis of mental health issues among university students in India, based on a dataset of 27,901 survey responses. My analysis examines how various factors correlate with depression rates among students, with special attention to:
  
  - **Financial stress** and its impact on mental health
  - **Sleep patterns** and their relationship to depression
  - **Dietary habits** and their influence on psychological wellbeing
  - **Academic pressure** and its effects on student mental health
  
  ## Key Findings
  
  My analysis reveals several significant correlations:
  
  1. **Financial stress** shows the strongest correlation with depression rates
  2. **Poor sleep patterns** (less than 6 hours) significantly increase depression risk
  3. **Unhealthy dietary habits** are associated with higher depression rates
  4. **Academic pressure** impacts students differently based on performance level
  
  ## Social Context
  
  This analysis incorporates research on the Indian higher education system to provide context for my findings. I explore how cultural, economic, and social factors unique to India may influence the observed patterns.
  
  ## Navigation Guide
  
  - Use the menu above to navigate between different analysis sections
  - Each page contains interactive visualizations with dropdowns for filtering data
  - Statistical tests are provided to validate correlations
  - The Conclusions section offers recommendations based on our findings
  
  ## Technical Information
  
  This analysis was conducted using:
  - SQLite database for data storage and querying
  - Simple Statistics library for statistical calculations
  - Google Charts for data visualization
  - Interactive elements for user-driven data exploration
  
  *This project was completed as part of a data analysis coursework, April-May 2025.*
`); 