class ActivityGraph {
    constructor() {
        this.graphData = [];
        this.containerId = 'activityGraph';
    }

    async init() {
        await this.generateGraphData();
        this.renderGraph();
    }

    async generateGraphData() {
        // Generate 365 days of activity data
        const today = new Date();
        const data = [];
        
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            // Simulate activity based on posts
            const postsOnDate = this.getPostsForDate(date);
            const activityLevel = this.calculateActivityLevel(postsOnDate);
            
            data.push({
                date: date.toISOString().split('T')[0],
                count: postsOnDate.length,
                level: activityLevel,
                posts: postsOnDate
            });
        }
        
        this.graphData = data;
    }

    getPostsForDate(date) {
        const dateStr = date.toISOString().split('T')[0];
        return window.journal?.posts.filter(post => post.date === dateStr) || [];
    }

    calculateActivityLevel(posts) {
        if (posts.length === 0) return 0;
        if (posts.length === 1) return 1;
        if (posts.length <= 3) return 2;
        if (posts.length <= 5) return 3;
        return 4;
    }

    renderGraph() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const graphHTML = `
            <div class="activity-graph">
                <div class="graph-header">
                    <h4>📈 Activity Graph</h4>
                    <div class="graph-legend">
                        <span class="legend-item"><span class="legend-color level-0"></span>Less</span>
                        <span class="legend-item"><span class="legend-color level-4"></span>More</span>
                    </div>
                </div>
                <div class="graph-container">
                    <div class="graph-months">
                        ${this.getMonthLabels().map(month => `<span>${month}</span>`).join('')}
                    </div>
                    <div class="graph-grid">
                        ${this.graphData.map(day => `
                            <div class="graph-day level-${day.level}" 
                                 title="${day.date}: ${day.count} posts"
                                 onclick="activityGraph.showDayDetails('${day.date}')">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="graph-stats">
                    <div class="stat">
                        <span class="stat-number">${this.getTotalPosts()}</span>
                        <span class="stat-label">Total Posts</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${this.getActiveDays()}</span>
                        <span class="stat-label">Active Days</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${this.getCurrentStreak()}</span>
                        <span class="stat-label">Day Streak</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = graphHTML;
    }

    getMonthLabels() {
        const months = [];
        const today = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(date.toLocaleString('en', { month: 'short' }));
        }
        
        return months;
    }

    getTotalPosts() {
        return window.journal?.posts.length || 0;
    }

    getActiveDays() {
        const uniqueDates = new Set(this.graphData.filter(day => day.count > 0).map(day => day.date));
        return uniqueDates.size;
    }

    getCurrentStreak() {
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        
        // Check backwards from today
        for (let i = 0; i < this.graphData.length; i++) {
            const day = this.graphData[this.graphData.length - 1 - i];
            if (day.count > 0) {
                streak++;
            } else if (day.date !== today) {
                break;
            }
        }
        
        return streak;
    }

    showDayDetails(date) {
        const dayData = this.graphData.find(d => d.date === date);
        if (!dayData || dayData.count === 0) return;

        const modalHTML = `
            <div class="modal-overlay" id="dayDetailsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>📅 Activity on ${date}</h3>
                        <button class="modal-close" onclick="journal.closeModal()">✕</button>
                    </div>
                    <div class="day-posts">
                        ${dayData.posts.map(post => `
                            <div class="day-post">
                                <span class="post-flair">${post.flair}</span>
                                <span class="post-title">${post.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('dayDetailsModal').addEventListener('click', (e) => {
            if (e.target.id === 'dayDetailsModal') {
                journal.closeModal();
            }
        });
    }
}

window.activityGraph = new ActivityGraph();