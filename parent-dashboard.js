import studentProgress from './progress.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const authScreen = document.getElementById('auth-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const userDisplay = document.getElementById('user-display');
    const progressChartCanvas = document.getElementById('progress-chart');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple hardcoded authentication
        if (username === 'parent' && password === 'password') {
            authScreen.style.display = 'none';
            dashboardScreen.style.display = 'block';
            userDisplay.textContent = username;
            renderProgressChart(studentProgress.week6);
        } else {
            alert('Invalid credentials');
        }
    });

    function renderProgressChart(week6) {
        const labels = Object.keys(week6);
        const data = labels.map(day => week6[day].completed ? 1 : 0);

        new Chart(progressChartCanvas, {
            type: 'bar',
            data: {
                labels: labels.map(day => `Day ${day.slice(-1)}`),
                datasets: [{
                    label: 'Progress',
                    data: data,
                    backgroundColor: [
                        'rgba(0, 160, 226, 0.2)',
                        'rgba(0, 160, 226, 0.2)',
                        'rgba(0, 160, 226, 0.2)',
                        'rgba(0, 160, 226, 0.2)',
                        'rgba(0, 160, 226, 0.2)',
                    ],
                    borderColor: [
                        'rgba(0, 160, 226, 1)',
                        'rgba(0, 160, 226, 1)',
                        'rgba(0, 160, 226, 1)',
                        'rgba(0, 160, 226, 1)',
                        'rgba(0, 160, 226, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
});