// convert an array of objects 
// to an array with column headings
// (like Google Charts like its data)
// - assumes all objects have the same keys

// Utility function to format data for Google Charts
function makeChartFriendly(data, categoryColumn, valueColumn1, valueColumn2) {
  // Create header row
  const result = [[categoryColumn, valueColumn1, valueColumn2]];
  
  // Add data rows
  data.forEach(row => {
    // Clean up the category name (remove quotes if present)
    let category = row[categoryColumn.toLowerCase().replace(/ /g, '_')];
    if (typeof category === 'string') {
      category = category.replace(/['"]/g, '');
    }
    
    // Get the values and ensure they are numbers
    const value1 = Number(row[valueColumn1.toLowerCase().replace(/ /g, '_')]);
    const value2 = Number(row[valueColumn2.toLowerCase().replace(/ /g, '_')]);
    
    result.push([category, value1, value2]);
  });
  
  return result;
}

export default makeChartFriendly;