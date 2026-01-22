import scheduleData from './schedule.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- ROUTER & AUTH Logic ---
    const path = window.location.pathname;
    const isDashboard = path.includes('dashboard.html');
    const user = JSON.parse(localStorage.getItem('user'));

    if (isDashboard) {
        if (!user) {
            // Show Auth Screen
            document.getElementById('auth-screen').style.display = 'block';
            document.getElementById('dashboard-screen').style.display = 'none';
            document.getElementById('logout-btn').style.display = 'none';
        } else {
            // Show Dashboard
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('dashboard-screen').style.display = 'block';
            document.getElementById('logout-btn').style.display = 'block';
            initDashboard(user);
        }

        // Login Handler
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const newUser = {
                    name: username,
                    activities: [], // { type, duration, date }
                    totalMinutes: 0
                };
                localStorage.setItem('user', JSON.stringify(newUser));
                window.location.reload();
            });
        }

        // Logout Handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
    }

    // --- DASHBOARD LOGIC ---
    function initDashboard(currentUser) {
        document.getElementById('user-display').textContent = currentUser.name;
        updateStats(currentUser);

        // Render History
        renderHistory(currentUser.activities);

        // Log Activity Handler
        const logForm = document.getElementById('log-activity-form');
        if (logForm) {
            logForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const type = document.getElementById('activity-type').value;
                const duration = parseInt(document.getElementById('activity-duration').value);

                const newActivity = {
                    type,
                    duration,
                    date: new Date().toLocaleDateString()
                };

                // Update Local State
                currentUser.activities.unshift(newActivity); // Add to top
                currentUser.totalMinutes += duration;

                // Save
                localStorage.setItem('user', JSON.stringify(currentUser));

                // Update UI
                updateStats(currentUser);
                renderHistory(currentUser.activities);
                logForm.reset();
            });
        }
    }

    function updateStats(currentUser) {
        const total = currentUser.totalMinutes;
        document.getElementById('total-minutes').innerText = total;

        // Progress Bar (Goal: 150 mins)
        const goal = 150;
        let percentage = (total / goal) * 100;
        if (percentage > 100) percentage = 100;
        document.getElementById('weekly-progress').style.width = percentage + '%';

        // Change color if goal reached
        if (percentage >= 100) {
            document.getElementById('weekly-progress').style.backgroundColor = '#10B981'; // Green
        }
    }

    function renderHistory(activities) {
        const list = document.getElementById('activity-list');
        list.innerHTML = '';

        if (activities.length === 0) {
            list.innerHTML = '<div class="empty-state">No activities logged yet. Get moving!</div>';
            return;
        }

        activities.forEach(act => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div>
                    <div class="activity-name">${act.type}</div>
                    <small style="color:#94a3b8">${act.date}</small>
                </div>
                <div class="activity-meta">
                    <strong>${act.duration}</strong> min
                </div>
            `;
            list.appendChild(item);
        });
    }


    // --- LANDING PAGE LOGIC (Only runs if elements exist) ---
    const scheduleContainer = document.getElementById('schedule-container');
    if (scheduleContainer && scheduleData) {
        // Render Schedule
        scheduleData.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.innerHTML = `
                <div class="date-badge">
                    <span>${item.date}</span>
                    <small>${item.day}</small>
                </div>
                <div class="day-details">
                    <div class="day-meta">${item.time} • ${item.intensity} Intensity</div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            scheduleContainer.appendChild(card);
        });

        // Observer
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.day-card').forEach(card => observer.observe(card));

        // Feature cards animation
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    featureObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            featureObserver.observe(card);
        });
    }

    // Hero Animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 0;
        setTimeout(() => { heroContent.style.opacity = 1; }, 100);
    }
});
