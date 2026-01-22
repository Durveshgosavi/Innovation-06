// Demo mode: No login required, chart renders automatically
document.addEventListener('DOMContentLoaded', () => {
    const progressChartCanvas = document.getElementById('progress-chart');

    // Demo data for the chart
    const demoProgress = {
        day1: { completed: true },
        day2: { completed: true },
        day3: { completed: true },
        day4: { completed: true },
        day5: { completed: true }
    };

    // Render chart immediately for demo
    renderProgressChart(demoProgress);

    function renderProgressChart(weekData) {
        const labels = Object.keys(weekData);
        const data = labels.map(day => weekData[day].completed ? 1 : 0);

        new Chart(progressChartCanvas, {
            type: 'bar',
            data: {
                labels: labels.map(day => `Day ${day.slice(-1)}`),
                datasets: [{
                    label: 'Completed',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 103, 0, 0.7)',
                        'rgba(255, 103, 0, 0.7)',
                        'rgba(255, 103, 0, 0.7)',
                        'rgba(255, 103, 0, 0.7)',
                        'rgba(255, 103, 0, 0.7)',
                    ],
                    borderColor: [
                        'rgba(255, 103, 0, 1)',
                        'rgba(255, 103, 0, 1)',
                        'rgba(255, 103, 0, 1)',
                        'rgba(255, 103, 0, 1)',
                        'rgba(255, 103, 0, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            stepSize: 1,
                            callback: value => value === 1 ? '✓' : ''
                        }
                    }
                }
            }
        });
    }
});