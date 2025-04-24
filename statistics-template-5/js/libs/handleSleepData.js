/**
 * Helper functions for handling sleep data consistently across the application
 */

/**
 * Removes single quotes from sleep duration values for display
 * @param {string} sleepDuration - Raw sleep duration value from the database with quotes
 * @returns {string} Clean sleep duration value without quotes
 */
export function cleanSleepDuration(sleepDuration) {
  return sleepDuration.replace(/^'|'$/g, '');
}

/**
 * Converts sleep duration string to approximate hours
 * @param {string} sleepDuration - Raw or cleaned sleep duration value
 * @returns {number} Approximate hours of sleep
 */
export function convertSleepToHours(sleepDuration) {
  // Clean the value first to ensure consistent processing
  const cleanDuration = cleanSleepDuration(sleepDuration);
  
  switch (cleanDuration) {
    case 'Less than 5 hours':
      return 4.5;
    case '5-6 hours':
      return 5.5;
    case '7-8 hours':
      return 7.5;
    case 'More than 8 hours':
      return 8.5;
    default:
      return null;
  }
}

/**
 * Returns the correct sleep duration string for SQL queries with single quotes
 * @param {string} duration - Clean sleep duration without quotes
 * @returns {string} Properly formatted sleep duration for SQL queries
 */
export function getSQLSleepDuration(duration) {
  return `'${duration}'`;
}

/**
 * Returns a properly formatted CASE statement for SQL queries ordering by sleep duration
 * @returns {string} SQL CASE statement for sleep duration ordering
 */
export function getSleepDurationCaseStatement() {
  return `
    CASE sleepDuration
      WHEN "'Less than 5 hours'" THEN 1
      WHEN "'5-6 hours'" THEN 2
      WHEN "'7-8 hours'" THEN 3
      WHEN "'More than 8 hours'" THEN 4
      ELSE 5
    END
  `;
}

/**
 * Returns the valid sleep duration values in the database with proper formatting
 * @param {boolean} withQuotes - Whether to include single quotes for SQL queries
 * @returns {string[]} Array of valid sleep duration values
 */
export function getValidSleepDurations(withQuotes = false) {
  const durations = [
    'Less than 5 hours',
    '5-6 hours',
    '7-8 hours',
    'More than 8 hours'
  ];
  
  if (withQuotes) {
    return durations.map(d => `'${d}'`);
  }
  
  return durations;
}

/**
 * Interpret the sleep duration in relation to recommended sleep for students
 * @param {string|number} duration - Sleep duration string or approximate hours
 * @returns {string} Interpretation of sleep adequacy
 */
export function interpretSleepDuration(duration) {
  let hours;
  
  if (typeof duration === 'string') {
    hours = convertSleepToHours(duration);
  } else {
    hours = duration;
  }
  
  if (hours < 5) {
    return 'Severely inadequate sleep duration';
  } else if (hours < 7) {
    return 'Inadequate sleep duration';
  } else if (hours < 9) {
    return 'Optimal sleep duration';
  } else {
    return 'Extended sleep duration';
  }
} 