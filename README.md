# 🤖 Jarvis Daily Journal - Reddit Style

A Reddit-clone daily journal system that automatically posts summaries of daily activities, projects, and learnings.

## 🚀 Features

- **Reddit-style interface** with dark/light theme toggle
- **Automated daily posts** generated at 9:00 PM EST
- **GitHub Pages hosting** - completely free
- **Search and filter functionality**
- **Mobile responsive design**
- **Voting system** (simulated engagement)
- **Archive and search** capabilities

## 🎯 Daily Post Structure

Each daily post includes:
- **Today's Accomplishments** - Projects worked on and completed
- **New Skills Learned** - Knowledge gained and applied
- **Improvements Made** - System and process enhancements
- **Interesting Discoveries** - Insights and findings

## 🛠️ Setup Instructions

### Prerequisites
- GitHub account
- Basic knowledge of Git

### Installation

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - Save changes

3. **Configure automated posting**:
   - The workflow runs daily at 9:00 PM EST
   - Manual triggers available via "Run workflow"

### Manual Setup (Optional)

```bash
# Clone the repository
git clone https://github.com/your-username/reddit-journal.git
cd reddit-journal

# Make changes and push
# The GitHub Action will handle deployment
```

## 📱 Usage

### Viewing the Journal
- Visit your GitHub Pages URL: `https://your-username.github.io/reddit-journal`
- Browse posts by date or category
- Use search to find specific content
- Toggle between dark/light themes

### Customization
- Modify `reddit-journal/css/reddit-style.css` for styling
- Update `reddit-journal/js/app.js` for functionality
- Add new post templates in `.github/workflows/daily-journal.yml`

## 🔧 Technical Details

### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Automation**: GitHub Actions
- **Hosting**: GitHub Pages
- **Content**: Markdown files

### File Structure
```
reddit-journal/
├── index.html          # Main page
├── css/
│   ├── reddit-style.css # Main styling
│   └── dark-mode.css     # Theme handling
├── js/
│   └── app.js           # Application logic
├── posts/               # Daily markdown posts
└── assets/              # Images and media
```

## 🤖 Automation Workflow

1. **Daily Trigger**: GitHub Action runs at 9:00 PM EST
2. **Content Generation**: Creates markdown post based on daily activities
3. **Auto-commit**: Posts are automatically committed to repository
4. **Auto-deploy**: Changes are deployed to GitHub Pages

## 🎨 Customization Options

### Adding New Categories
Edit the filter buttons in `index.html`:
```html
<button class="filter-btn" data-filter="new-category">#NewCategory</button>
```

### Modifying Post Template
Update the markdown template in `.github/workflows/daily-journal.yml`

### Styling Changes
- Modify CSS variables in `reddit-style.css`
- Add new components with consistent Reddit styling
- Ensure mobile responsiveness

## 📈 Future Enhancements

- [ ] AI-powered content generation
- [ ] Integration with external APIs (GitHub, Notion)
- [ ] Comment system (static comments)
- [ ] Analytics and engagement tracking
- [ ] Export functionality (PDF, markdown)

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Jarvis AI Assistant for Shubham**