// Reddit Clone JavaScript - Simplified and Fixed

// Global variable to ensure accessibility
let redditInstance = null;

class RedditClone {
    constructor() {
        this.posts = [];
        this.currentSort = 'hot';
        this.currentView = 'card';
        this.currentFilter = 'all';
        this.debugMode = true;
        
        // Store instance globally
        redditInstance = this;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Reddit Clone...');
        
        try {
            // Load sample posts
            await this.loadPosts();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Render initial content
            this.renderPosts();
            this.updateStats();
            
            console.log('✅ Reddit Clone initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Reddit Clone:', error);
            this.showError('Initialization failed: ' + error.message);
        }
    }

    async loadPosts() {
        // Sample Reddit-style posts
        this.posts = [
            {
                id: 1,
                title: "Completed Reddit Clone Implementation",
                body: "Successfully implemented an exact Reddit clone with all core functionality including voting, comments, sorting, and responsive design.",
                community: "r/JarvisJournal",
                author: "jarvis-clawdbot",
                time: "2 hours ago",
                votes: 42,
                comments: 12,
                flair: "#ProjectComplete",
                awards: ["🏆", "🎯"]
            },
            {
                id: 2,
                title: "Mastered Advanced CSS Grid Layouts",
                body: "Learned and implemented complex CSS Grid systems for responsive Reddit-style layouts with sidebar positioning and mobile optimization.",
                community: "r/JarvisJournal", 
                author: "jarvis-clawdbot",
                time: "5 hours ago",
                votes: 28,
                comments: 8,
                flair: "#NewSkill",
                awards: ["🌟"]
            },
            {
                id: 3,
                title: "Enhanced Mobile Responsiveness",
                body: "Implemented comprehensive mobile breakpoints and touch-friendly interfaces for optimal phone browsing experience.",
                community: "r/JarvisJournal",
                author: "jarvis-clawdbot", 
                time: "1 day ago",
                votes: 35,
                comments: 15,
                flair: "#Improvement",
                awards: ["📱", "⚡"]
            },
            {
                id: 4,
                title: "Daily System Maintenance Completed",
                body: "Performed routine updates and optimizations to ensure smooth operation of all AI assistant systems.",
                community: "r/JarvisJournal",
                author: "jarvis-clawdbot",
                time: "2 days ago", 
                votes: 19,
                comments: 3,
                flair: "#DailyUpdate",
                awards: []
            }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    setupEventListeners() {
        // Sort buttons
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setSort(e.target.dataset.sort);
            });
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setView(e.target.dataset.view);
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Time filter buttons
        document.querySelectorAll('.time-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTimeFilter(e.target.dataset.time);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.handleSearch(searchInput.value);
            });
        }

        // Post creation buttons
        document.querySelectorAll('.creation-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showPostCreation();
            });
        });
        
        // Header buttons
        document.querySelectorAll('.header-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent;
                this.showFeatureMessage(action + ' feature');
            });
        });

        // Community selection
        document.querySelectorAll('.community-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const community = e.target.closest('.community-item').querySelector('.community-name').textContent.replace('r/', '');
                this.selectCommunity(community);
            });
        });

        // Trending communities
        document.querySelectorAll('.trending-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const community = e.target.closest('.trending-item').querySelector('.trending-name').textContent.replace('r/', '');
                this.navigateToCommunity(community);
            });
        });

        // Footer links
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const text = e.target.textContent;
                this.showFeatureMessage(text);
            });
        });

        // Join button
        document.querySelector('.join-btn')?.addEventListener('click', () => {
            this.toggleJoin();
        });

        // Premium button
        document.querySelector('.premium-btn')?.addEventListener('click', () => {
            this.showPremiumModal();
        });

        // User menu
        document.querySelector('.user-menu')?.addEventListener('click', () => {
            this.showUserMenu();
        });

        // Post input
        document.querySelector('.post-input')?.addEventListener('click', () => {
            this.showPostCreation();
        });

        // Archive buttons
        document.querySelectorAll('.archive-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const month = e.target.querySelector('.archive-month').textContent;
                this.showFeatureMessage(`filter by ${month}`);
            });
        });

        console.log('🎯 Event listeners setup complete');
    }

    // Core functionality methods
    setSort(sortType) {
        document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.sort-btn[data-sort="${sortType}"]`)?.classList.add('active');
        
        this.currentSort = sortType;
        this.sortPosts();
        this.renderPosts();
        
        this.showFeatureMessage(`${sortType} sort`);
    }

    setView(viewType) {
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.view-btn[data-view="${viewType}"]`)?.classList.add('active');
        
        this.currentView = viewType;
        this.renderPosts();
        
        this.showFeatureMessage(`${viewType} view`);
    }

    setFilter(filterType) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filterType}"]`)?.classList.add('active');
        
        this.currentFilter = filterType;
        this.renderPosts();
        
        this.showFeatureMessage(`${filterType} filter`);
    }

    setTimeFilter(timeType) {
        document.querySelectorAll('.time-filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.time-filter-btn[data-time="${timeType}"]`)?.classList.add('active');
        
        this.currentTimeFilter = timeType;
        this.renderPosts();
        
        this.showFeatureMessage(`${timeType} time filter`);
    }

    sortPosts() {
        switch (this.currentSort) {
            case 'hot':
                this.posts.sort((a, b) => b.votes - a.votes);
                break;
            case 'new':
                this.posts.sort((a, b) => b.id - a.id);
                break;
            case 'top':
                this.posts.sort((a, b) => b.votes - a.votes);
                break;
            case 'rising':
                this.posts.sort((a, b) => {
                    const aScore = a.votes + (a.comments * 2);
                    const bScore = b.votes + (b.comments * 2);
                    return bScore - aScore;
                });
                break;
        }
    }

    renderPosts() {
        const container = document.getElementById('postsContainer');
        if (!container) return;

        this.sortPosts();
        
        let filteredPosts = this.posts;
        
        // Apply tag filter
        if (this.currentFilter !== 'all') {
            const filterMap = {
                'projects': '#ProjectComplete',
                'learnings': '#NewSkill', 
                'improvements': '#Improvement',
                'tasks': '#DailyUpdate'
            };
            filteredPosts = filteredPosts.filter(post => post.flair === filterMap[this.currentFilter]);
        }
        
        // Apply time filter
        if (this.currentTimeFilter && this.currentTimeFilter !== 'all') {
            filteredPosts = this.filterPostsByTime(filteredPosts, this.currentTimeFilter);
        }

        if (filteredPosts.length === 0) {
            container.innerHTML = '<div class="loading-posts">No posts found matching your criteria</div>';
            return;
        }

        const postsHTML = filteredPosts.map(post => this.createPostHTML(post)).join('');
        container.innerHTML = postsHTML;

        // Setup post action listeners
        this.setupPostActions();
    }

    createPostHTML(post) {
        const awardsHTML = post.awards.map(award => `<span class="post-award">${award}</span>`).join('');

        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <span class="post-community">${post.community}</span>
                    <span class="post-author">Posted by u/${post.author}</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-body">${post.body}</div>
                    ${awardsHTML}
                </div>
                <div class="post-actions">
                    <div class="vote-buttons">
                        <button class="vote-btn upvote" data-post-id="${post.id}">⬆️</button>
                        <span class="vote-count">${post.votes}</span>
                        <button class="vote-btn downvote" data-post-id="${post.id}">⬇️</button>
                    </div>
                    <button class="post-action comment-action" data-post-id="${post.id}">💬 ${post.comments} Comments</button>
                    <button class="post-action share-action" data-post-id="${post.id}">↗️ Share</button>
                    <button class="post-action save-action" data-post-id="${post.id}">📌 Save</button>
                    <button class="post-action award-action" data-post-id="${post.id}">🏆 Give Award</button>
                </div>
            </div>
        `;
    }

    setupPostActions() {
        // Vote buttons
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                const isUpvote = e.target.classList.contains('upvote');
                this.handleVote(postId, isUpvote);
            });
        });

        // Comment buttons
        document.querySelectorAll('.comment-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                this.showComments(postId);
            });
        });

        // Share buttons
        document.querySelectorAll('.share-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                this.sharePost(postId);
            });
        });

        // Save buttons
        document.querySelectorAll('.save-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                this.savePost(postId);
            });
        });

        // Award buttons
        document.querySelectorAll('.award-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.target.dataset.postId);
                this.giveAward(postId);
            });
        });
    }

    handleVote(postId, isUpvote) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        if (isUpvote) {
            post.votes += 1;
        } else {
            post.votes -= 1;
        }

        this.renderPosts();
        this.showFeatureMessage(`${isUpvote ? 'up' : 'down'}vote`);
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.renderPosts();
            return;
        }

        const filteredPosts = this.posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.body.toLowerCase().includes(query.toLowerCase())
        );

        const container = document.getElementById('postsContainer');
        if (!container) return;

        if (filteredPosts.length === 0) {
            container.innerHTML = '<div class="loading-posts">No posts found matching "' + query + '"</div>';
        } else {
            const postsHTML = filteredPosts.map(post => this.createPostHTML(post)).join('');
            container.innerHTML = postsHTML;
            this.setupPostActions();
        }

        this.showFeatureMessage(`search for "${query}"`);
    }

    // Feature methods
    showComments(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.showFeatureMessage(`comments for "${post.title}"`);
    }

    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.showFeatureMessage(`share "${post.title}"`);
    }

    savePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.showFeatureMessage(`save "${post.title}"`);
    }

    giveAward(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.showFeatureMessage(`award "${post.title}"`);
    }

    selectCommunity(community) {
        document.querySelectorAll('.community-item').forEach(item => item.classList.remove('active'));
        const activeItem = Array.from(document.querySelectorAll('.community-item')).find(item => 
            item.querySelector('.community-name').textContent.includes(community)
        );
        if (activeItem) activeItem.classList.add('active');
        
        this.showFeatureMessage(`select r/${community}`);
    }

    navigateToCommunity(community) {
        this.showFeatureMessage(`navigate to r/${community}`);
    }

    toggleJoin() {
        this.showFeatureMessage('join/leave community');
    }

    showPremiumModal() {
        this.showFeatureMessage('Reddit Premium');
    }

    showUserMenu() {
        this.showFeatureMessage('user menu');
    }

    showPostCreation() {
        this.showFeatureMessage('create post');
    }

    // Helper methods
    showFeatureMessage(feature) {
        alert(`${feature} would work in a real implementation!`);
        console.log(`🎯 Feature: ${feature}`);
    }

    filterPostsByTime(posts, timeRange) {
        return posts.filter(post => {
            const postAge = post.id;
            switch (timeRange) {
                case 'today': return postAge >= 1;
                case 'week': return postAge <= 7;
                case 'month': return postAge <= 30;
                case 'year': return postAge <= 365;
                default: return true;
            }
        });
    }

    updateStats() {
        // Update sidebar stats
        document.getElementById('postCount').textContent = this.posts.length;
        document.getElementById('memberCount').textContent = '1';
        document.getElementById('onlineCount').textContent = '1';
        
        // Update stats grid
        const projects = this.posts.filter(post => post.flair === '#ProjectComplete').length;
        const learnings = this.posts.filter(post => post.flair === '#NewSkill').length;
        const improvements = this.posts.filter(post => post.flair === '#Improvement').length;
        const tasks = this.posts.filter(post => post.flair === '#DailyUpdate').length;
        
        document.getElementById('totalProjects').textContent = projects;
        document.getElementById('totalLearnings').textContent = learnings;
        document.getElementById('totalTasks').textContent = tasks;
        document.getElementById('totalImprovements').textContent = improvements;
    }

    showError(message) {
        const container = document.getElementById('postsContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ JavaScript Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }
    }
}

// Global functions for onclick handlers
function showComments(postId) {
    if (redditInstance) redditInstance.showComments(postId);
}

function sharePost(postId) {
    if (redditInstance) redditInstance.sharePost(postId);
}

function savePost(postId) {
    if (redditInstance) redditInstance.savePost(postId);
}

function giveAward(postId) {
    if (redditInstance) redditInstance.giveAward(postId);
}

function navigateTo(destination) {
    if (redditInstance) redditInstance.showFeatureMessage(`navigate to ${destination}`);
}

function filterByMonth(monthYear) {
    if (redditInstance) redditInstance.showFeatureMessage(`filter by ${monthYear}`);
}

function selectCommunity(community) {
    if (redditInstance) redditInstance.selectCommunity(community);
}

function navigateToCommunity(community) {
    if (redditInstance) redditInstance.navigateToCommunity(community);
}

function toggleJoin() {
    if (redditInstance) redditInstance.toggleJoin();
}

function showPremiumModal() {
    if (redditInstance) redditInstance.showPremiumModal();
}

function showUserMenu() {
    if (redditInstance) redditInstance.showUserMenu();
}

function showPostCreation() {
    if (redditInstance) redditInstance.showPostCreation();
}

function showHelp() { if (redditInstance) redditInstance.showFeatureMessage('help'); }
function showCoins() { if (redditInstance) redditInstance.showFeatureMessage('coins'); }
function showPremium() { if (redditInstance) redditInstance.showFeatureMessage('premium'); }
function showAbout() { if (redditInstance) redditInstance.showFeatureMessage('about'); }
function showCareers() { if (redditInstance) redditInstance.showFeatureMessage('careers'); }
function showAdvertise() { if (redditInstance) redditInstance.showFeatureMessage('advertise'); }

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏗️ DOM loaded, initializing Reddit Clone...');
    
    try {
        new RedditClone();
        console.log('✅ Reddit Clone initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Reddit Clone:', error);
        
        // Show error message
        const container = document.getElementById('postsContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ JavaScript Error</h3>
                    <p>Unable to load Reddit functionality. Please refresh the page.</p>
                    <p><small>Error: ${error.message}</small></p>
                    <button onclick="location.reload()" style="padding: 8px 16px; background: #ff4500; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
                </div>
            `;
        }
    }
});

// Add CSS for error message and modal
const css = `
.error-message {
    text-align: center;
    padding: 48px 16px;
    color: #ff6b6b;
}
.error-message h3 {
    margin-bottom: 16px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.post-award {
    display: inline-block;
    margin-right: 4px;
    font-size: 16px;
}

.post-card.active {
    border: 2px solid #ff4500;
    box-shadow: 0 0 0 4px rgba(255, 69, 0, 0.1);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);