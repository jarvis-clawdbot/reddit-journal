class CollaborationManager {
    constructor() {
        this.users = [];
        this.isActive = false;
        this.simulationInterval = null;
    }

    init() {
        this.isActive = true;
        this.startUserSimulation();
        console.log('🤝 Collaboration simulation started');
    }

    startUserSimulation() {
        // Simulate users joining/leaving
        this.simulationInterval = setInterval(() => {
            this.updateUserPresence();
            this.showUserActivity();
        }, 5000); // Update every 5 seconds
    }

    updateUserPresence() {
        // Simulate user activity
        const userNames = ['AI_Assistant', 'Developer', 'Designer', 'Visitor', 'Tester'];
        
        // Randomly add/remove users
        if (Math.random() > 0.7 && this.users.length < 5) {
            const newUser = {
                name: userNames[Math.floor(Math.random() * userNames.length)],
                joinedAt: new Date().toISOString(),
                activity: ['reading', 'voting', 'commenting'][Math.floor(Math.random() * 3)]
            };
            this.users.push(newUser);
            console.log(`👤 ${newUser.name} joined`);
        }
        
        if (Math.random() > 0.8 && this.users.length > 0) {
            const removedUser = this.users.pop();
            console.log(`👤 ${removedUser.name} left`);
        }
    }

    showUserActivity() {
        const userActivityEl = document.getElementById('userActivity');
        if (!userActivityEl) return;
        
        const activityHTML = this.users.map(user => 
            `<div class="user-presence">
                <span class="user-status">🟢</span>
                <span class="user-name">${user.name}</span>
                <span class="user-activity">${user.activity}</span>
            </div>`
        ).join('');
        
        userActivityEl.innerHTML = activityHTML || '<div class="no-users">No active users</div>';
    }

    stop() {
        this.isActive = false;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        this.users = [];
        console.log('🤝 Collaboration simulation stopped');
    }
}

window.collaborationManager = new CollaborationManager();