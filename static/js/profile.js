// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const saveModal = document.getElementById('save-modal');
    
    const setGoalsBtn = document.getElementById('set-goals-btn');
    const goalsModal = document.getElementById('goals-modal');
    const closeGoalsModal = document.getElementById('close-goals-modal');
    const cancelGoalsModal = document.getElementById('cancel-goals-modal');
    const saveGoalsModal = document.getElementById('save-goals-modal');
    
    const personalInfoForm = document.getElementById('personal-info-form');
    const avatarCircle = document.getElementById('avatar-circle');
    const profileName = document.getElementById('profile-name');
    const avatarInitials = document.getElementById('avatar-initials');
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    let selectedColor = '#3498db';
    
    // Load saved profile data from localStorage
    loadProfileData();
    
    // Edit Profile Modal
    editProfileBtn.addEventListener('click', () => {
        editModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });
    
    cancelModal.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.dataset.color;
        });
    });
    
    // Save profile changes
    saveModal.addEventListener('click', () => {
        const titleSelect = document.getElementById('profile-title-select');
        const newTitle = titleSelect.value;
        
        // Update avatar color
        avatarCircle.style.background = selectedColor;
        
        // Update title
        document.querySelector('.profile-title').textContent = newTitle;
        
        // Save to localStorage
        const profileData = loadProfileDataFromStorage();
        profileData.avatarColor = selectedColor;
        profileData.title = newTitle;
        saveProfileData(profileData);
        
        editModal.classList.add('hidden');
        showNotification('Profile updated successfully!');
    });
    
    // Goals Modal
    setGoalsBtn.addEventListener('click', () => {
        goalsModal.classList.remove('hidden');
    });
    
    closeGoalsModal.addEventListener('click', () => {
        goalsModal.classList.add('hidden');
    });
    
    cancelGoalsModal.addEventListener('click', () => {
        goalsModal.classList.add('hidden');
    });
    
    saveGoalsModal.addEventListener('click', () => {
        const weeklyGoal = document.getElementById('goal-weekly').value;
        const repsGoal = document.getElementById('goal-reps').value;
        const formGoal = document.getElementById('goal-form').value;
        
        // Save goals
        const profileData = loadProfileDataFromStorage();
        profileData.goals = {
            weekly: parseInt(weeklyGoal),
            reps: parseInt(repsGoal),
            form: parseInt(formGoal)
        };
        saveProfileData(profileData);
        
        // Update UI
        updateGoalsUI(profileData.goals);
        
        goalsModal.classList.add('hidden');
        showNotification('Goals updated successfully!');
    });
    
    // Personal Info Form
    personalInfoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('user-name').value,
            age: document.getElementById('user-age').value,
            gender: document.getElementById('user-gender').value,
            height: document.getElementById('user-height').value,
            weight: document.getElementById('user-weight').value
        };
        
        // Update profile name display
        if (formData.name) {
            profileName.textContent = formData.name;
            avatarInitials.textContent = getInitials(formData.name);
        }
        
        // Save to localStorage
        const profileData = loadProfileDataFromStorage();
        profileData.user = formData;
        saveProfileData(profileData);
        
        // Also try to save to backend
        try {
            const response = await fetch('/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showNotification('Profile saved successfully!');
            } else {
                showNotification('Saved locally. Server sync pending.', 'warning');
            }
        } catch (error) {
            showNotification('Saved locally. Server sync pending.', 'warning');
        }
    });
    
    // Settings toggles
    const notificationsToggle = document.getElementById('notifications-toggle');
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    const soundToggle = document.getElementById('sound-toggle');
    const unitsSelect = document.getElementById('units-select');
    
    notificationsToggle?.addEventListener('change', () => {
        saveSettings({ notifications: notificationsToggle.checked });
    });
    
    darkmodeToggle?.addEventListener('change', () => {
        saveSettings({ darkMode: darkmodeToggle.checked });
        // Apply dark mode (simplified version)
        document.body.classList.toggle('dark-mode', darkmodeToggle.checked);
    });
    
    soundToggle?.addEventListener('change', () => {
        saveSettings({ sounds: soundToggle.checked });
    });
    
    unitsSelect?.addEventListener('change', () => {
        saveSettings({ units: unitsSelect.value });
    });
    
    // Initialize Activity Chart
    initActivityChart();
    
    // Click outside modal to close
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.add('hidden');
        }
    });
    
    goalsModal.addEventListener('click', (e) => {
        if (e.target === goalsModal) {
            goalsModal.classList.add('hidden');
        }
    });
});

// Helper Functions

function getInitials(name) {
    if (!name) return 'FT';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}

function loadProfileDataFromStorage() {
    const data = localStorage.getItem('fitnessProfile');
    return data ? JSON.parse(data) : {
        user: {},
        settings: {},
        goals: { weekly: 5, reps: 50, form: 85 }
    };
}

function saveProfileData(data) {
    localStorage.setItem('fitnessProfile', JSON.stringify(data));
}

function loadProfileData() {
    const profileData = loadProfileDataFromStorage();
    
    // Apply avatar color
    if (profileData.avatarColor) {
        document.getElementById('avatar-circle').style.background = profileData.avatarColor;
    }
    
    // Apply user data
    if (profileData.user) {
        if (profileData.user.name) {
            document.getElementById('profile-name').textContent = profileData.user.name;
            document.getElementById('avatar-initials').textContent = getInitials(profileData.user.name);
            document.getElementById('user-name').value = profileData.user.name;
        }
        if (profileData.user.age) document.getElementById('user-age').value = profileData.user.age;
        if (profileData.user.gender) document.getElementById('user-gender').value = profileData.user.gender;
        if (profileData.user.height) document.getElementById('user-height').value = profileData.user.height;
        if (profileData.user.weight) document.getElementById('user-weight').value = profileData.user.weight;
    }
    
    // Apply title
    if (profileData.title) {
        document.querySelector('.profile-title').textContent = profileData.title;
    }
    
    // Apply settings
    if (profileData.settings) {
        if (profileData.settings.notifications !== undefined) {
            document.getElementById('notifications-toggle').checked = profileData.settings.notifications;
        }
        if (profileData.settings.darkMode !== undefined) {
            document.getElementById('darkmode-toggle').checked = profileData.settings.darkMode;
            document.body.classList.toggle('dark-mode', profileData.settings.darkMode);
        }
        if (profileData.settings.sounds !== undefined) {
            document.getElementById('sound-toggle').checked = profileData.settings.sounds;
        }
        if (profileData.settings.units) {
            document.getElementById('units-select').value = profileData.settings.units;
        }
    }
    
    // Apply goals
    if (profileData.goals) {
        document.getElementById('goal-weekly').value = profileData.goals.weekly || 5;
        document.getElementById('goal-reps').value = profileData.goals.reps || 50;
        document.getElementById('goal-form').value = profileData.goals.form || 85;
    }
}

function saveSettings(settings) {
    const profileData = loadProfileDataFromStorage();
    profileData.settings = { ...profileData.settings, ...settings };
    saveProfileData(profileData);
}

function updateGoalsUI(goals) {
    // Update goal displays based on new targets
    const weeklyGoalText = document.getElementById('weekly-goal-text');
    const repsGoalText = document.getElementById('reps-goal-text');
    const formGoalText = document.getElementById('form-goal-text');
    
    if (weeklyGoalText && goals.weekly) {
        const current = parseInt(weeklyGoalText.textContent.split('/')[0]) || 0;
        weeklyGoalText.textContent = `${current}/${goals.weekly}`;
        document.getElementById('weekly-goal-fill').style.width = `${Math.min(100, (current / goals.weekly) * 100)}%`;
    }
    
    if (repsGoalText && goals.reps) {
        const current = parseInt(repsGoalText.textContent.split('/')[0]) || 0;
        repsGoalText.textContent = `${current}/${goals.reps}`;
        document.getElementById('reps-goal-fill').style.width = `${Math.min(100, (current / goals.reps) * 100)}%`;
    }
    
    if (formGoalText && goals.form) {
        const current = parseInt(formGoalText.textContent.split('/')[0]) || 0;
        formGoalText.textContent = `${current}/${goals.form}`;
    }
}

function showNotification(message, type = 'success') {
    // Remove any existing toasts
    document.querySelectorAll('.fitai-toast').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'fitai-toast';
    const icon = type === 'success' ? '✓' : '⚠';

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: type === 'success'
            ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
            : 'linear-gradient(135deg, #f59e0b, #d97706)',
        color: 'white',
        padding: '14px 22px',
        borderRadius: '12px',
        boxShadow: type === 'success'
            ? '0 8px 32px rgba(99,102,241,0.4)'
            : '0 8px 32px rgba(245,158,11,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        fontSize: '0.875rem',
        fontWeight: '600',
        fontFamily: "'Inter', sans-serif",
        animation: 'slideIn 0.3s cubic-bezier(0.4,0,0.2,1)',
        maxWidth: '320px'
    });

    notification.innerHTML = `<span style="font-size:1rem">${icon}</span><span>${message}</span>`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    // Get last 7 days
    const labels = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    
    // Sample data - would come from backend in real implementation
    const data = [2, 0, 3, 1, 4, 0, 2]; // Workouts per day
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Workouts',
                data: data,
                borderColor: 'rgba(99,102,241,1)',
                backgroundColor: 'rgba(99,102,241,0.12)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(99,102,241,1)',
                pointBorderColor: 'rgba(99,102,241,0.4)',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1c1c28',
                    borderColor: 'rgba(99,102,241,0.3)',
                    borderWidth: 1,
                    padding: 10,
                    titleColor: '#f1f5f9',
                    bodyColor: '#94a3b8'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#475569', font: { size: 10 } },
                    grid: { color: 'rgba(255,255,255,0.04)' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#475569', font: { size: 10 } }
                }
            }
        }
    });
}

// Add CSS animation for toast notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(110%); opacity: 0; }
        to   { transform: translateX(0);   opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0);   opacity: 1; }
        to   { transform: translateX(110%); opacity: 0; }
    }
`;
document.head.appendChild(style);
