# Project Structure Documentation

© 2025 Lucy Sonberg. All rights reserved.
This documentation and all associated content are protected by copyright law. Any use, reproduction, or distribution requires explicit permission from the copyright holder.

## Project Overview
This project consists of two separate applications analyzing mental health among Indian students:

### Part 1 (Standalone Analysis)
**Main File:**
- `statistics-template-5/financial-analysis.html`
  - Self-contained file with embedded JavaScript
  - Last updated: April 26, 2025
  - URL: http://localhost:3005/financial-analysis.html
  - Status: ✅ COMPLETED AND WORKING

### Part 2 (Single Page Application)
**Core Files:**
- `statistics-template-5/index.html` (Main SPA container)
- `statistics-template-5/js/_menu.js` (Navigation system)

**Analysis Modules:** (All created/updated April 24-25, 2025)
- `statistics-template-5/js/financial_analysis.js` (Financial stress analysis)
- `statistics-template-5/js/sleep_analysis.js` (Sleep patterns)
- `statistics-template-5/js/dietary_analysis.js` (Dietary habits)
- `statistics-template-5/js/pressure_analysis.js` (Academic pressure)
- `statistics-template-5/js/cross_factor_analysis.js` (Cross-factor analysis)
- `statistics-template-5/js/statistical_tests.js` (Statistical testing)
- `statistics-template-5/js/social_context.js` (Social context)
- `statistics-template-5/js/conclusions.js` (Conclusions)
- `statistics-template-5/js/home.js` (Homepage)

**Support Modules:**
- `statistics-template-5/js/simpleStatistics.js` (Statistical calculations)
- `statistics-template-5/js/libs/` (Utility functions)
  - addToPage.js
  - dbQuery.js
  - makeChartFriendly.js
  - jerzy-loader.js

**Application URL Structure:**
- Base: http://localhost:3005/
- Financial Analysis: http://localhost:3005/#financial-stress-analysis
- Sleep Analysis: http://localhost:3005/#sleep-patterns-analysis
- Dietary Analysis: http://localhost:3005/#dietary-habits-analysis
- etc.

## Implementation Notes
1. The similar names between Part 1's `financial-analysis.html` and Part 2's `financial_analysis.js` are coincidental
2. Part 1 and Part 2 are separate applications with different architectures:
   - Part 1: Single HTML file with embedded JavaScript
   - Part 2: Modern SPA with modular JavaScript files
3. Files should not be mixed between the two parts as they use different approaches

## Development Status
- Part 1: Completed and functioning correctly
- Part 2: Main functionality completed with some optimizations pending

## Copyright Notice
This project structure documentation, including all architectural decisions and implementations, is my individual work. All rights are reserved. 
The content is protected under copyright law and may not be used, reproduced, or distributed without my explicit permission.

For permissions or inquiries, please contact:
Lucy Sonberg
lucyxrdeveloper@gmail.com 