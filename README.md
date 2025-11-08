# Pick Two 🎯

A clean, interactive web app inspired by the classic "Good / Fast / Cheap — pick any two" principle. Create custom versions with your own labels and colors, then share them via a simple URL.

![Pick Two Demo](https://img.shields.io/badge/vanilla-javascript-yellow) ![CSS3](https://img.shields.io/badge/CSS3-responsive-blue) ![No Dependencies](https://img.shields.io/badge/dependencies-none-green)

## ✨ Features

- **Pick Two Logic**: Toggle between three options, but only two can be active at once
- **Custom Labels**: Create your own versions (e.g., "Happy / Productive / Rested")
- **Custom Colors**: Choose your own color scheme with real-time preview
- **Shareable Links**: Generate URLs that encode your custom configuration
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **GitHub Pages Ready**: Deploy in minutes

## 🚀 Quick Start

### View Live Demo
```
https://bjblayney.github.io/pick-two/
```

### Run Locally
1. Clone the repository:
```bash
git clone https://github.com/bjblayney/pick-two.git
cd pick-two
```

2. Open `index.html` in your browser:
```bash
# Mac
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

That's it! No build process, no npm install, no configuration needed.

## 📁 Project Structure

```
pick-two/
├── index.html      # Main HTML structure
├── style.css       # Styles with CSS variables
├── script.js       # Vanilla JavaScript logic
└── README.md       # This file
```

## 🎨 Customization

### Changing Default Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --color-primary: #0D9488;      /* Primary teal */
    --color-secondary: #D6D3D1;    /* Secondary sand */
    --color-text: #333;            /* Text color */
    --color-text-light: #666;      /* Subtitle color */
    --color-border: #ddd;          /* Border color */
    --color-white: #ffffff;        /* Background */
}
```

### Creating Custom Versions

1. Click the **menu button** (top-right)
2. Edit the three option labels
3. Choose your colors using the color pickers
4. Click **"Copy Shareable Link"**
5. Share the link with others!

## 🔗 URL Parameters

The app uses URL parameters to encode custom configurations:

```
?a=Happy&b=Productive&c=Rested&c1=%23667eea&c2=%23764ba2&state=110
```

| Parameter | Description | Example |
|-----------|-------------|---------|
| `a` | First option label | `Happy` |
| `b` | Second option label | `Productive` |
| `c` | Third option label | `Rested` |
| `c1` | Primary color (hex) | `%23667eea` (= #667eea) |
| `c2` | Secondary color (hex) | `%23764ba2` (= #764ba2) |
| `state` | Active toggles (binary) | `110` (first two on) |

### Example URLs

**Work-Life Balance:**
```
?a=Work&b=Life&c=Sleep&c1=%2300bcd4&c2=%23009688&state=011
```

**Health Triangle:**
```
?a=Exercise&b=Nutrition&c=Sleep&c1=%234caf50&c2=%23388e3c&state=101
```

**Project Management:**
```
?a=Scope&b=Time&c=Budget&c1=%23ff5722&c2=%23e64a19&state=110
```

## 📤 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `pick-two` (or anything you like)
3. Don't initialize with README (we already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Pick Two app"

# Connect to GitHub
git remote add origin https://github.com/YOUR-USERNAME/pick-two.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your app will be live at: `https://YOUR-USERNAME.github.io/pick-two/`

## 🛠️ Technical Details

### Browser Compatibility

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support (iOS 12+)
- **Opera**: ✅ Full support

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (variables), flexbox, gradients
- **JavaScript (ES6+)**: URLSearchParams, async/await, arrow functions
- **APIs**: Clipboard API with fallback

### Key Features

- **CSS Variables**: Easy theming and customization
- **No External Dependencies**: Everything runs in the browser
- **Responsive**: Mobile-first design with breakpoints at 500px and 350px
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Lightweight (~10KB total, no frameworks)

## 🎯 Use Cases

- **Project Management**: Scope / Time / Budget
- **Life Balance**: Work / Social / Sleep
- **Health**: Exercise / Diet / Rest
- **Software Development**: Fast / Good / Cheap
- **Learning**: Theory / Practice / Sleep
- **Creative Work**: Quality / Speed / Cost
- **Team Dynamics**: Available / Skilled / Affordable

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- [ ] Add more color themes/presets
- [ ] Add dark mode toggle
- [ ] Add animation options
- [ ] Add export as image feature
- [ ] Add more toggle styles
- [ ] Add sound effects (optional)
- [ ] Add keyboard shortcuts

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic "Good / Fast / Cheap" triangle
- Built with vanilla JavaScript (no frameworks needed!)
- Designed for simplicity and shareability

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Submit a pull request
- Share your custom versions!

---

**Made with ❤️ using vanilla JavaScript**

*No frameworks. No build tools. No dependencies. Just code.*