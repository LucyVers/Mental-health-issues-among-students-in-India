# Financial Stress and Mental Health Analysis

## Overview
This document analyzes the relationship between financial stress, sleep patterns, dietary habits, and depression among students in India based on the dataset.

## Initial Analysis [April 1-15, 2025]

### 1. Financial Stress and Depression Rates
- **High Financial Stress**: 75.63% depression rate (12,493 students)
- **Moderate Financial Stress**: 58.94% depression rate (5,226 students)
- **Low Financial Stress**: 37.39% depression rate (10,182 students)

This shows a clear positive correlation between financial stress levels and depression rates, with each stress level showing significantly higher depression rates.

### 2. Academic Performance (CGPA)
- **High Financial Stress**: 7.67 average CGPA
- **Moderate Financial Stress**: 7.64 average CGPA
- **Low Financial Stress**: 7.64 average CGPA

Notably, CGPA remains remarkably consistent across all stress levels, suggesting that students maintain their academic performance despite increased financial stress, possibly at the cost of other aspects of their well-being.

### 3. Work/Study Hours
- **High Financial Stress**: 7.41 hours/day
- **Moderate Financial Stress**: 7.24 hours/day
- **Low Financial Stress**: 6.81 hours/day

Students with higher financial stress tend to spend more time working or studying, potentially as a coping mechanism or due to work requirements to support their studies.

### 4. Sleep Patterns
Depression rates by sleep duration and stress level:

#### High Financial Stress
- Less than 5 hours: 81.54% depression (3,782 students)
- 5-6 hours: 73.30% depression (2,697 students)
- 7-8 hours: 75.97% depression (3,371 students)
- More than 8 hours: 69.07% depression (2,638 students)

#### Moderate Financial Stress
- Less than 5 hours: 65.25% depression (1,502 students)
- 5-6 hours: 56.80% depression (1,206 students)
- 7-8 hours: 61.54% depression (1,378 students)
- More than 8 hours: 49.74% depression (1,136 students)

#### Low Financial Stress
- Less than 5 hours: 42.86% depression (3,026 students)
- 5-6 hours: 37.50% depression (2,280 students)
- 7-8 hours: 37.04% depression (2,597 students)
- More than 8 hours: 30.44% depression (2,270 students)

Consistently across all stress levels, students with less sleep show higher depression rates, with those sleeping more than 8 hours showing the lowest depression rates in each category.

### 5. Gender Analysis
#### High Financial Stress
- Males: 76.08% depression (6,924 students)
- Females: 75.08% depression (5,569 students)

#### Moderate Financial Stress
- Males: 58.55% depression (2,934 students)
- Females: 59.42% depression (2,292 students)

#### Low Financial Stress
- Males: 37.42% depression (5,689 students)
- Females: 37.35% depression (4,493 students)

The data shows minimal gender differences in depression rates across all stress levels, suggesting that financial stress affects mental health similarly regardless of gender.

### 6. Dietary Habits
#### High Financial Stress
- Unhealthy diet: 84.08% depression (5,145 students)
- Moderate diet: 74.39% depression (4,225 students)
- Healthy diet: 63.39% depression (3,117 students)

#### Moderate Financial Stress
- Unhealthy diet: 71.56% depression (1,909 students)
- Moderate diet: 55.82% depression (1,883 students)
- Healthy diet: 46.23% depression (1,432 students)

#### Low Financial Stress
- Unhealthy diet: 49.19% depression (3,263 students)
- Moderate diet: 35.77% depression (3,813 students)
- Healthy diet: 26.92% depression (3,102 students)

The data shows a clear correlation between dietary habits and depression rates, with unhealthy diets consistently associated with higher depression rates across all stress levels. The impact of diet appears to be particularly pronounced in high financial stress situations.

### 7. Family History of Mental Illness
#### High Financial Stress
- With family history: 78.09% depression (6,158 students)
- Without family history: 73.24% depression (6,335 students)

#### Moderate Financial Stress
- With family history: 62.34% depression (2,512 students)
- Without family history: 55.78% depression (2,714 students)

#### Low Financial Stress
- With family history: 39.27% depression (4,833 students)
- Without family history: 35.69% depression (5,349 students)

Family history of mental illness appears to increase vulnerability to depression across all stress levels, with an average increase of 4-7 percentage points in depression rates for students with family history.

## Follow-up Analysis [April 21-22, 2025]

### Recent Financial Stress Analysis
- Average stress level: 3.14 out of 5 (moderate to high stress)
- 44.8% of students report high stress levels (level 4-5)
- At stress level 5, the depression rate is 81.3% (5458 out of 6715 students)
- Clear positive correlation between financial stress level and depression rates
- Database query results show a steady increase in depression percentage as stress levels increase

### Sleep Patterns Analysis
- Average sleep duration: 6.3 hours (below recommended 7-9 hours)
- 52% of students get less than 6 hours of sleep per night
- Highest depression rate among "Less than 5 hours" group (64.5% - 5361 out of 8310 students)
- Even students with longer sleep durations show significant depression rates

### Dietary Habits Analysis
- Only 27.4% of students maintain healthy dietary habits
- Strong correlation between dietary habits and depression
- Depression rates by diet type:
  - Unhealthy: 70.7% (7297 out of 10317 students)
  - Moderate: 56.0% (5558 out of 9921 students)
  - Healthy: 45.4% (3473 out of 7651 students)

## Technical Implementation
The implementation includes:
- Interactive visualizations for all three factors
- Statistical calculations using the Simple Statistics library
- Data cleaning to handle issues like quotation marks in sleep duration data
- Correlation calculations to quantify relationships between factors and depression

## Technical Challenges Addressed
1. SQL Query Issues:
   - Corrected column reference from "financial_stress" to "financialStress"
   - Excluded null values and placeholder values ('?') from analysis

2. Data Formatting:
   - Cleaned sleep duration values by removing extra quotation marks
   - Implemented proper handling of categorical data for statistical analysis

3. Statistical Analysis:
   - Added fallback calculations for correlation when direct calculation fails
   - Implemented weighted averages to account for different group sizes

## Raw Data References
From the database queries, the following key metrics were obtained:

### Financial Stress and Depression
```
{ financialStress: 1, depression: 0, count: 3489 }
{ financialStress: 1, depression: 1, count: 1632 }
{ financialStress: 2, depression: 0, count: 2886 }
{ financialStress: 2, depression: 1, count: 2175 }
{ financialStress: 3, depression: 0, count: 2146 }
{ financialStress: 3, depression: 1, count: 3080 }
{ financialStress: 4, depression: 0, count: 1785 }
{ financialStress: 4, depression: 1, count: 3990 }
{ financialStress: 5, depression: 0, count: 1257 }
{ financialStress: 5, depression: 1, count: 5458 }
```

### Sleep Duration and Depression
```
{ sleepDuration: "'5-6 hours'", depression: 0, count: 2666 }
{ sleepDuration: "'7-8 hours'", depression: 0, count: 2975 }
{ sleepDuration: "'Less than 5 hours'", depression: 0, count: 2949 }
{ sleepDuration: "'More than 8 hours'", depression: 0, count: 2966 }
{ sleepDuration: "'5-6 hours'", depression: 1, count: 3517 }
{ sleepDuration: "'7-8 hours'", depression: 1, count: 4371 }
{ sleepDuration: "'Less than 5 hours'", depression: 1, count: 5361 }
{ sleepDuration: "'More than 8 hours'", depression: 1, count: 3078 }
```

### Dietary Habits and Depression
```
{ dietaryHabits: 'Unhealthy', depression: 0, count: 3020 }
{ dietaryHabits: 'Unhealthy', depression: 1, count: 7297 }
{ dietaryHabits: 'Moderate', depression: 0, count: 4363 }
{ dietaryHabits: 'Moderate', depression: 1, count: 5558 }
{ dietaryHabits: 'Healthy', depression:, count: 4178 }
{ dietaryHabits: 'Healthy', depression: 1, count: 3473 }
```

## Data Insights
The analysis reveals that:
1. Financial stress has a strong association with depression, with the highest stress level showing an 81.3% depression rate
2. Sleep deprivation is prevalent among students and strongly associated with depression
3. Dietary habits show a clear gradient, with healthier diets associated with lower depression rates
4. The combination of these factors suggests multiple potential intervention points for mental health support

## Conclusions
1. Financial stress has a strong positive correlation with depression rates
2. Academic performance remains stable despite stress levels
3. Higher financial stress correlates with increased work/study hours
4. Adequate sleep appears to be a protective factor against depression
5. Gender does not significantly influence the relationship between financial stress and depression
6. Dietary habits have a substantial impact on depression rates, with healthy diets showing protective effects
7. Family history of mental illness increases vulnerability to depression, particularly under financial stress

## Recommendations
1. Implement financial support programs for students showing high stress levels
2. Promote healthy sleep habits, aiming for more than 8 hours when possible
3. Monitor students with high work/study hours for potential mental health support needs
4. Ensure equal access to support services regardless of gender
5. Develop nutrition education programs and ensure access to healthy food options
6. Provide additional mental health screening and support for students with family history of mental illness
7. Consider implementing a holistic student wellness program that addresses financial stress, diet, sleep, and mental health support 