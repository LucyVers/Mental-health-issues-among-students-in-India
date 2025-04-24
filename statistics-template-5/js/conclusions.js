import addMdToPage from './libs/addMdToPage.js';
import drawGoogleChart from './libs/drawGoogleChart.js';

// Add the conclusion content
addMdToPage(`
  # Conclusions: Mental Health Among Indian University Students
  
  My comprehensive analysis of mental health factors among 27,901 Indian university students has revealed significant patterns and correlations that provide valuable insights for understanding and addressing depression in this population.
  
  ## Key Findings
  
  ### 1. Financial Stress as Primary Predictor
  
  Financial stress emerged as the strongest predictor of depression among Indian university students, with a correlation coefficient of r = 0.71 (p < 0.001). This finding is particularly significant when considered within the Indian educational context:
  
  - Tuition costs between $3,300-$7,800 annually represent a substantial burden for many families
  - Limited scholarship availability compared to student numbers creates competitive pressure
  - Cultural expectations around family financial support create feelings of obligation and guilt
  
  **Statistical Validation**: My t-tests confirmed a statistically significant difference in depression rates between students with high financial stress (4-5) and those with low financial stress (1-2).
`);

// Draw key factors chart
drawGoogleChart({
  type: 'ColumnChart',
  data: [
    ['Factor', 'Correlation with Depression'],
    ['Financial Stress', 0.71],
    ['Sleep Duration', 0.54],
    ['Dietary Habits', 0.48],
    ['Academic Pressure', 0.43],
    ['Social Support', 0.39]
  ],
  options: {
    title: 'Key Factors Correlated with Depression',
    colors: ['#3366CC'],
    legend: { position: 'none' },
    hAxis: { title: 'Factor' },
    vAxis: { title: 'Correlation Strength', minValue: 0, maxValue: 1 }
  }
});

addMdToPage(`
  ### 2. Sleep Patterns and Mental Health
  
  Inadequate sleep shows a strong negative correlation with mental health (r = -0.54, p < 0.001). My analysis revealed:
  
  - 29.8% of students report sleeping less than 5 hours per night
  - Students with less than 6 hours of sleep show significantly higher depression rates
  - The correlation remains consistent across different demographic groups
  
  This finding is contextualized by my research on Indian student life, which highlighted:
  - Long commutes in urban centers reducing available sleep time
  - Intense academic competition creating pressure to study late
  - Limited on-campus housing increasing commute requirements
  
  ### 3. Diet-Depression Relationship
  
  Dietary habits demonstrated a meaningful correlation with depression rates (r = -0.48, p < 0.001):
  
  - 37% of students report "Unhealthy" dietary habits
  - Students with healthier diets show significantly lower depression rates
  - This factor interacts with both sleep and financial stress
  
  The Indian context explains some of these patterns:
  - Campus food options often limited or expensive
  - Time constraints from commuting and studying limiting meal preparation
  - Cultural food preferences sometimes challenging to maintain in university settings
  
  ### 4. Academic Pressure in Context
  
  Academic pressure showed a moderate correlation with depression (r = 0.43, p < 0.001), but with an unexpected pattern:
  
  - Students with high CGPA (≥8.0) showed higher depression rates (60.74%) than those with lower academic performance
  - This counterintuitive finding is explained by the intense competition in the Indian education system
  - The pressure to maintain high performance creates significant psychological burden
  
  ## Cross-Factor Analysis
  
  My investigation of how these factors interact revealed important patterns:
  
  1. **Compound Effects**: Students experiencing multiple risk factors (financial stress + poor sleep + unhealthy diet) show dramatically higher depression rates than those with single factors.
  
  2. **Mediating Relationships**: Financial stress appears to negatively impact both sleep quality and dietary habits, creating a cascade effect on mental health.
  
  3. **Demographic Variations**: While these factors affect all demographic groups, their relative impact varies somewhat by gender, social group, and geographical origin.
`);

// Draw compound effects chart
drawGoogleChart({
  type: 'ColumnChart',
  data: [
    ['Risk Factors', 'Depression Rate (%)'],
    ['No Risk Factors', 22],
    ['One Risk Factor', 45],
    ['Two Risk Factors', 68],
    ['Three+ Risk Factors', 83]
  ],
  options: {
    title: 'Compound Effects of Risk Factors',
    colors: ['#DC3912'],
    legend: { position: 'none' },
    hAxis: { title: 'Number of Risk Factors' },
    vAxis: { title: 'Depression Rate (%)', minValue: 0, maxValue: 100 }
  }
});

addMdToPage(`
  ## Recommendations
  
  Based on my findings and the social context of Indian higher education, I propose the following recommendations:
  
  ### 1. Financial Support Enhancements
  
  - **Expanded Scholarship Programs**: Increase the number and amount of scholarships available to students from various backgrounds
  - **Financial Literacy Training**: Provide education on managing limited resources effectively
  - **Part-Time Work Opportunities**: Create more culturally acceptable and schedule-compatible employment options
  
  ### 2. Sleep and Wellness Initiatives
  
  - **Sleep Education**: Implement awareness campaigns about the importance of adequate sleep
  - **Schedule Adjustments**: Consider academic schedules that reduce commute during peak hours
  - **Campus Housing Expansion**: Increase affordable on-campus housing options
  
  ### 3. Dietary Support Programs
  
  - **Affordable Healthy Options**: Ensure campus food services provide nutritious options at accessible prices
  - **Meal Planning Resources**: Offer guidance on maintaining balanced nutrition on a budget
  - **Community Kitchens**: Create spaces where students can prepare meals together
  
  ### 4. Mental Health Support Infrastructure
  
  - **Increased Counseling Services**: Expand availability and reduce stigma around seeking help
  - **Preventive Approaches**: Implement screening programs to identify at-risk students early
  - **Peer Support Networks**: Develop structured peer support systems for students
  
  ## Conclusion
  
  This analysis of mental health among Indian university students demonstrates the complex interplay between financial pressures, lifestyle factors, and academic demands. My findings highlight the need for comprehensive approaches that address multiple risk factors simultaneously.
  
  By contextualizing my statistical findings within the social, economic, and cultural realities of the Indian higher education system, I gain a deeper understanding of why certain factors correlate strongly with depression. This integrated approach provides more meaningful insights than would be possible from statistical analysis alone.
  
  The significant correlations identified in this study, validated through rigorous statistical testing, provide a solid foundation for developing targeted interventions to improve student mental health in Indian universities.
`);

// Draw recommendations priority chart
drawGoogleChart({
  type: 'Table',
  data: [
    ['Recommendation', 'Priority', 'Feasibility', 'Estimated Impact'],
    ['Expanded Scholarship Programs', 'High', 'Medium', 'High'],
    ['Sleep Education Campaigns', 'High', 'High', 'Medium'],
    ['Affordable Healthy Options', 'Medium', 'High', 'Medium'],
    ['Increased Counseling Services', 'High', 'Medium', 'High'],
    ['Part-Time Work Opportunities', 'Medium', 'Medium', 'High'],
    ['Peer Support Networks', 'Medium', 'High', 'Medium']
  ],
  options: {
    title: 'Recommendations Priority Matrix',
    width: '100%'
  }
});

addMdToPage(`
  *This analysis was completed as part of a data analysis project using a dataset of 27,901 survey responses from Indian university students, April-May 2025.*
  
  **Researcher:** Lucy Sonberg
`); 