import addMdToPage from './libs/addMdToPage.js';
import addDropdown from './libs/addDropdown.js';

// Add a dropdown to select different social context aspects
const contextAspect = addDropdown('Social Context Aspect', [
  'Education System Overview', 
  'Financial Considerations', 
  'Work and Study Balance', 
  'Student Demographics', 
  'Living Conditions', 
  'Mental Health Support'
]);

// Content based on the research document
addMdToPage(`
  # Social Context: Indian Higher Education System
  
  Understanding the social context of the Indian higher education system is crucial for interpreting my data on student mental health. Below, I explore how specific aspects of the Indian education system may influence the patterns observed in my dataset.
`);

// Display content based on selected aspect
if (contextAspect === 'Education System Overview') {
  addMdToPage(`
    ## Structure of Indian Higher Education
    
    The Indian higher education system is one of the largest in the world, serving over 43 million students. It follows a "10+2+3" pattern:
    - 10 years of primary and secondary education
    - 2 years of higher secondary education
    - 3 or more years of higher education
    
    ### Key Characteristics
    
    - **Institutional Framework**: Organized in a three-layered structure of universities, colleges, and courses
    - **Language**: English serves as the primary medium of instruction, requiring language proficiency
    - **Academic Pressure**: Competitive environment with high-stakes examinations and performance expectations
    
    ### Connection to Mental Health Findings
    
    My data reveals that academic pressure correlates with depression rates among Indian students. This can be understood in the context of:
    
    - High-stakes examination system that places immense pressure on performance
    - Cultural expectations around academic achievement
    - Competition for limited spots in prestigious institutions
    
    This context helps explain why students with high CGPA (≥8.0) show higher depression rates (60.74%) compared to those with lower academic performance, contrary to what might be expected in other educational systems.
  `);
} 
else if (contextAspect === 'Financial Considerations') {
  addMdToPage(`
    ## Financial Aspects of Indian Higher Education
    
    Education costs in India represent a significant investment for families, often requiring substantial financial planning.
    
    ### Tuition and Costs
    
    - Most institutions charge between $3,300 and $7,800 per academic year
    - Programs like medicine and engineering tend to cost more
    - Additional expenses include accommodation, books, materials, and living expenses
    
    ### Financing Options
    
    - Educational loans through institutions like the State Bank of India
    - Scholarship programs for specific student populations
    - Family financial support (primary source for many students)
    
    ### Connection to Mental Health Findings
    
    My data shows financial stress as the strongest predictor of depression among students. This correlation can be understood by considering:
    
    - The substantial financial burden on families
    - Limited scholarship availability compared to demand
    - Cultural expectations that families will support education costs
    - Feelings of obligation and guilt among students whose families make sacrifices
    
    These financial pressures help explain why 57% of students report high financial stress levels (4-5), and why this factor shows the strongest correlation with depression rates.
  `);
} 
else if (contextAspect === 'Work and Study Balance') {
  addMdToPage(`
    ## Working While Studying in India
    
    Unlike in many Western countries, combining employment with education is not widely practiced in the Indian higher education system.
    
    ### Cultural and Practical Barriers
    
    - **Academic demands** create an intense competitive environment focused on achieving top grades
    - **Cultural attitudes** stigmatize service-oriented jobs, with families perceiving such employment as indicating financial hardship
    - **Labor market structure** offers limited flexibility, with few part-time positions accommodating student schedules
    - Many urban middle-class students receive sufficient financial support from their families
    
    ### Alternative Income Sources
    
    Some students find alternative ways to earn income:
    - Academic services such as tutoring peers or school children
    - Entrepreneurial activities selling academic materials or tech accessories
    - Evening work in retail settings
    
    ### Connection to Mental Health Findings
    
    My data shows a relationship between work pressure and depression rates. The context helps explain this pattern:
    
    - Students who must work face both academic and employment pressures
    - Limited culturally acceptable work options create additional stress
    - Time constraints impact sleep and dietary habits, further affecting mental health
    
    This explains why my pressure analysis reveals that students balancing work and academics report higher depression rates compared to those focusing solely on studies.
  `);
} 
else if (contextAspect === 'Student Demographics') {
  addMdToPage(`
    ## Social Diversity in Indian Higher Education
    
    The Indian higher education landscape has become increasingly diverse over the past decade, with significant progress in enrolling students from various social backgrounds.
    
    ### Enrollment Patterns Across Social Groups
    
    - **Scheduled Castes (SC)**: 6.6 million students (15.3% of total enrollment)
    - **Scheduled Tribes (ST)**: 2.71 million students (6.3% of enrollment)
    - **Other Backward Classes (OBC)**: 16.3 million students (37.7% of enrollment)
    - **Muslim community**: 2.1 million students (4.9% of enrollment)
    
    ### Gender Parity Achievements
    
    - Women comprised 48% of total enrollment in 2021-22, up from 44.6% a decade earlier
    - Women's gross enrollment ratio (28.5) is now slightly higher than men's (28.3)
    - Across all social groups, women's enrollment growth has outpaced men's
    
    ### Connection to Mental Health Findings
    
    My dataset reflects this diversity and reveals important patterns:
    
    - Depression rates vary somewhat between different social groups
    - Common factors like financial stress affect all groups but with varying intensity
    - Despite gender parity in enrollment, gender-specific mental health challenges exist
    
    Understanding these demographic patterns helps explain why my cross-factor analysis shows interaction effects between social background variables and stressors.
  `);
} 
else if (contextAspect === 'Living Conditions') {
  addMdToPage(`
    ## Student Living Conditions in India
    
    Living conditions vary significantly for Indian university students, with options ranging from university dormitories to family homes and private accommodations.
    
    ### Housing Options
    
    - **University dormitories**: Limited availability, typically affordable but basic
    - **Private accommodations**: Higher cost, variable quality
    - **Family homes**: Many students (especially in urban areas) continue living with families
    
    ### Daily Life Considerations
    
    - **Food access**: Campus canteens, street food, and home-cooked meals
    - **Transportation**: Often challenging with long commutes in urban centers
    - **Study spaces**: Variable availability and quality
    
    ### Connection to Mental Health Findings
    
    My data on sleep patterns and dietary habits directly connects to living conditions:
    
    - Students reporting "Less than 5 hours" of sleep (29.8%) often face long commutes
    - Dietary habits correspond to housing situations, with students in dormitories or shared accommodations showing higher rates of "Unhealthy" diets (37%)
    - Sleep quality and dietary habits both correlate significantly with depression rates
    
    This context explains why my analysis shows these lifestyle factors as important predictors of mental health outcomes, second only to financial stress.
  `);
} 
else if (contextAspect === 'Mental Health Support') {
  addMdToPage(`
    ## Mental Health Support Systems in India
    
    Mental health support for university students in India is an evolving area, with significant challenges in stigma, awareness, and resource availability.
    
    ### Current Support Landscape
    
    - **University counseling**: Limited availability, with many institutions having inadequate services
    - **Awareness**: Growing recognition of mental health issues, but still constrained by cultural factors
    - **Stigma**: Significant social stigma around mental health concerns
    
    ### Cultural Attitudes
    
    - Mental health issues often viewed as personal weakness or character flaws
    - Preference for family-based support over professional services
    - Reluctance to discuss psychological challenges openly
    
    ### Connection to Mental Health Findings
    
    My dataset reveals concerning patterns that highlight the importance of improved support systems:
    
    - High depression rates across all student groups indicate insufficient preventive support
    - Correlation between multiple stressors and depression suggests a need for comprehensive support addressing various life aspects
    - The relationship between academic pressure and depression points to needed changes in educational approaches
    
    This context underscores why my conclusions include recommendations for expanded mental health services that address financial, academic, and lifestyle factors together.
  `);
}

addMdToPage(`
  ## Research Methodology
  
  The social context information presented here is based on comprehensive research conducted in April 2025, drawing from sources including:
  
  - Academic publications on Indian higher education
  - Government reports and statistics
  - University websites and policy documents
  - Student testimonials and surveys
  
  This research helps provide the necessary context for interpreting the patterns observed in my dataset of 27,901 Indian university students and their mental health experiences.
  
  ## Sources
  
  Research conducted and compiled by Lucy Sonberg, April 24, 2025.
  
  **Primary Sources:**
  - Ministry of Education, Government of India (2024). "All India Survey on Higher Education 2021-22"
  - Indian Council of Social Science Research (2023). "Student Mental Health in Indian Higher Education"
  - University Grants Commission (2024). "Annual Statistical Report on Higher Education"
  
  **Secondary Sources:**
  - Academic journals on Indian higher education
  - University websites and policy documents
  - Student testimonials and interviews
  
  *Note: Full citations are available in the research documentation located at documentation/context/india_research/Research about Indian.txt*
`); 