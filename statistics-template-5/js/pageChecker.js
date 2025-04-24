// Page checker script
console.log("Page checker initialized...");

// Function to check if charts are loaded
function checkChartsLoaded() {
    console.log("Checking chart elements...");
    
    // Check financial chart
    const financialChart = document.getElementById('financial-chart');
    console.log("Financial chart element:", financialChart ? "Found" : "Missing");
    
    // Check sleep chart
    const sleepChart = document.getElementById('sleep-chart');
    console.log("Sleep chart element:", sleepChart ? "Found" : "Missing");
    
    // Check dietary chart
    const dietaryChart = document.getElementById('dietary-chart');
    console.log("Dietary chart element:", dietaryChart ? "Found" : "Missing");
    
    // Check if statistics are populated
    console.log("Checking stats elements...");
    const statsElements = [
        'financial-mean', 'financial-median', 'financial-std', 'financial-summary',
        'sleep-mean', 'sleep-median', 'sleep-std', 'sleep-summary',
        'dietary-mean', 'dietary-median', 'dietary-std', 'dietary-summary'
    ];
    
    statsElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`${id}: ${element.innerHTML.includes('Error') ? 'Has error' : 'Populated'}`);
        } else {
            console.log(`${id}: Missing element`);
        }
    });
    
    // Check if any error messages in the console
    console.log("Completed chart and statistics check");
}

// Run the check after page load
window.addEventListener('load', function() {
    // Wait a little for charts to render
    setTimeout(checkChartsLoaded, 3000);
}); 