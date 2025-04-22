# Visualization Challenges and Solutions

## Problem: Displaying Small Values in Bar Charts

### Challenge
When visualizing data with large value differences (e.g., 12 vs 10,000 students), small values become virtually invisible in the bar charts. In our case:
- Dietary Habits: "Others" category had only 12 students (compared to 10,317 for "Unhealthy")
- Sleep Patterns: "Others" category had only 18 students (compared to 8,310 for "Less than 5 hours")

### Solution
1. **Minimum Bar Height**
```javascript
const minBarHeight = 100;
const displayCount = count < minBarHeight ? minBarHeight : count;
```
This ensures that even small values have a visible representation while maintaining data accuracy through annotations.

2. **Enhanced Annotations**
```javascript
annotations: {
    textStyle: {
        fontSize: 12,
        color: '#333',
        bold: true
    },
    alwaysOutside: true,
    stem: {
        color: '#4285F4',
        length: 12
    }
}
```
Added clear annotations with connecting lines to show exact values for small categories.

### Benefits
- Small values are now visible in the visualization
- Actual values are clearly displayed through annotations
- Data integrity is maintained while improving visual representation

## Best Practices for Mixed-Scale Data Visualization

1. **Always Show the Real Value**
   - Use annotations to display the actual number
   - Make annotations bold and clearly visible

2. **Visual Clarity**
   - Use minimum bar heights for small values
   - Add connecting lines (stems) to link annotations to bars
   - Maintain consistent color scheme across visualizations

3. **Data Integrity**
   - Document any visual adjustments made
   - Ensure legends and axes clearly indicate any scale adjustments
   - Keep original data values accessible in tooltips or annotations

## Implementation Notes

```javascript
// Example of how to handle small values while maintaining data integrity
data.forEach(row => {
    const count = row.count;
    const displayCount = count < minBarHeight ? minBarHeight : count;
    const annotation = count < 100 ? count.toString() : null;
    chartData.addRow([row.category, displayCount, rate, annotation]);
});
```

This documentation will help future developers understand:
- Why certain visualization choices were made
- How to handle similar scenarios
- Best practices for maintaining data integrity while improving visualization 