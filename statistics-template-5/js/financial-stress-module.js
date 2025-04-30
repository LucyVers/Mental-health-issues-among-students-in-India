// Financial Stress Analysis Module
console.log('Loading Financial Stress Analysis module...');

// Helper function to fetch data from the database
async function fetchData(query) {
    try {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Calculate financial stress statistics
async function calculateFinancialStats() {
    try {
        console.log("Calculating financial stats...");
        const query = `
            SELECT financialStress, depression, COUNT(*) as count
            FROM studentDepression
            WHERE financialStress IS NOT NULL AND financialStress != '?' 
            GROUP BY financialStress, depression
            ORDER BY financialStress, depression
        `;
        const data = await fetchData(query);
        console.log("Financial data received:", data);
        
        // Calculate total students and weighted values
        let totalStudents = 0;
        let weightedSum = 0;
        let highStressCount = 0;

        data.forEach(row => {
            const stress = parseInt(row.financialStress);
            const count = parseInt(row.count);
            totalStudents += count;
            weightedSum += stress * count;
            if (stress >= 4) {
                highStressCount += count;
            }
        });

        // Calculate statistics
        const mean = weightedSum / totalStudents;
        const highStressPercentage = (highStressCount / totalStudents * 100).toFixed(1);
        
        return {
            data,
            mean,
            highStressPercentage,
            highStressCount,
            totalStudents
        };
    } catch (error) {
        console.error('Error calculating financial stats:', error);
        throw error;
    }
}

// Helper function to interpret stress levels
function interpretStressLevel(mean) {
    if (mean >= 4) return "Critical stress levels requiring immediate attention";
    if (mean >= 3) return "Moderate to high stress levels";
    return "Manageable stress levels";
}

// Export the functions needed by DEL 2
export { calculateFinancialStats, interpretStressLevel }; 