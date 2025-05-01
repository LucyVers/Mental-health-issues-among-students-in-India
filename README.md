# Student Mental Health Analysis Project

## Overview
This project analyzes mental health issues among university students in India, focusing on the relationships between financial stress, depression, and various lifestyle factors.

## Copyright Notice
© 2025 Lucy S. All rights reserved.
This project and all its contents are protected by copyright law. Any use, reproduction, or distribution of the materials contained in this project requires explicit permission from the copyright holder (Lucy Sonberg).

## Project Structure
```
├── documentation/                          # Project documentation
├── statistics-template-5/                  # Main project directory
│   ├── js/                                # JavaScript files
│   │   ├── libs/                          # Utility libraries
│   │   │   ├── addToPage.js              # UI utility functions
│   │   │   ├── dbQuery.js                # Database query handler
│   │   │   └── makeChartFriendly.js      # Chart data processor
│   │   ├── financial_analysis.js          # Financial analysis charts
│   │   ├── pressure_analysis.js           # Pressure analysis charts
│   │   ├── sleep_analysis.js             # Sleep patterns analysis
│   │   ├── social_context.js             # Social context analysis
│   │   └── dietary_analysis.js            # Dietary analysis charts
│   ├── backend/                           # Backend related files
│   ├── data/                             
│   │   └── student_depression_dataset.csv  # Main dataset
│   ├── sqlite-databases/                   # Database directory
│   │   └── student_depression.db          # SQLite database
│   ├── HTML Files:
│   │   ├── index.html                     # Main entry point
│   │   ├── financial-analysis.html        # Financial analysis page
│   │   ├── pressure-analysis.html         # Pressure analysis page
│   │   ├── dietary-analysis.html          # Dietary analysis page
│   │   ├── statistics.html               # Statistics overview
│   │   ├── statistics-analysis.html      # Detailed statistics
│   │   └── test.html                     # Testing page
│   ├── style.css                          # Custom styling
│   ├── package.json                       # Project dependencies
│   ├── package-lock.json                  # Dependency lock file
│   └── chartSettings.json                 # Chart configuration
├── DEL1_Psykisk ohälsa bland studerande - analys av en enkätundersökning.txt
├── DEL2_Psykisk ohälsa bland studerande i Indien.txt
├── .gitignore                             # Git ignore rules
└── README.md                              # Project documentation
```

## Key Features
- Interactive data visualizations using Google Charts
- Comprehensive analysis of:
  - Financial stress distribution
  - Academic performance correlation
  - Work/study hours impact
  - Sleep patterns
  - Gender differences
  - Dietary habits
  - Family history influence

## Getting Started
1. Install dependencies:
   ```bash
   cd statistics-template-5
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. View the visualizations:
   - Open `http://localhost:3005/financial-analysis.html` in your web browser
   - All charts are interactive with hover tooltips and click-to-highlight functionality

## Documentation
- Detailed analysis available in `documentation/analysis/financial_stress_analysis.md`
- Visualization guide in `documentation/analysis/visualizations.md`
- SQL queries in `documentation/analysis/queries/`

## Key Findings
1. Strong correlation between financial stress and depression rates
2. Stable academic performance across stress levels
3. Increased work/study hours with higher financial stress
4. Significant impact of sleep patterns on mental health
5. Minimal gender differences in depression rates
6. Protective effect of healthy dietary habits
7. Increased vulnerability with family history of mental illness

## Technologies Used
- Node.js
- SQLite
- Google Charts
- Bootstrap 5

## Future Improvements
- Add export functionality for charts
- Implement additional filtering options
- Include trend analysis over time
- Add comparative analysis with other universities

## License
All rights reserved. Unauthorized use, reproduction, or distribution of this project's contents is strictly prohibited.

## Project Timeline
- Project Start: March 31, 2025
- Part 1 Deadline: April 30, 2025
- Final Project Deadline: May 4, 2025