# Personal Essays Website

This is a personal website inspired by [gwern.net](https://gwern.net) for publishing essays with mathematics and interactive visualizations.

## Features

- Clean, minimalist design optimized for reading
- Dark mode support with persistent theme preference
- Mathematical typesetting with MathJax
- Interactive visualizations with Plotly.js
- Markdown support for easy content creation
- Mobile-friendly responsive design

## Writing New Essays

Essays are written in Markdown format with YAML front matter, stored in the `markdown-essays` directory.

### Essay Structure

Each essay should be a Markdown file with the following structure:

```markdown
---
title: Your Essay Title
date: YYYY-MM-DD
tags: [Tag1, Tag2, Tag3]
---

## Abstract

A brief summary of your essay.

## Introduction

Your introduction here.

## Section Title

Your content with $E = mc^2$ inline math and:

$$\int_{a}^{b} f(x) \, dx = F(b) - F(a)$$

And so on...

## References

1. Author, A. (Year). Title of the work. Publisher.
```

### Adding a New Essay

1. Create a new Markdown file in the `markdown-essays` directory
2. Add the front matter with title, date, and tags
3. Write your essay content using Markdown
4. Add a link to your essay in `essays.html`

### Using the Essay Generator

You can create new essays in two ways:

#### Method 1: Using the Terminal Script

Run the `create-essay.js` script to generate a new essay:

```bash
# With all arguments provided:
./create-essay.js filename "Essay Title" "Tag1,Tag2,Tag3"

# Or interactively:
./create-essay.js
```

The script will:
1. Create a new Markdown file with the proper template
2. Provide HTML code to add to essays.html

#### Method 2: Using the Browser Console

For convenience, you can also use the essay template generator from your browser's console:

1. Open your website in a browser
2. Open the developer tools (F12 or Ctrl+Shift+I)
3. In the console tab, run:

```javascript
generateNewEssayTemplate('file-name', 'Essay Title', ['Tag1', 'Tag2'])
```

4. Copy the generated Markdown template and save it as `markdown-essays/file-name.md`
5. Copy the HTML snippet and add it to the appropriate section in `essays.html`

## Mathematics Support

You can use LaTeX syntax for mathematical formulas:

- Inline math: `$E = mc^2$`
- Display math: `$$\int_{0}^{1} x^2 dx = \frac{1}{3}$$`

## Interactive Visualizations

To add a Plotly visualization:

1. Create a container div with an ID:

```html
<div id="myPlot" style="width:100%; height:400px;"></div>
```

2. Add JavaScript code to initialize the plot:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Plot data and configuration
    const data = [
        {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter'
        }
    ];
    
    const layout = {
        title: 'My Plot'
    };
    
    Plotly.newPlot('myPlot', data, layout);
});
```

## Deployment

This site is designed to be hosted on GitHub Pages. Just push your changes to the GitHub repository and they will be automatically deployed.

## Customization

To personalize the site:

1. Update your name and information in the HTML files
2. Customize the CSS in `css/style.css`
3. Add your own logo or profile picture if desired

## Dark Mode

The site includes a dark mode toggle that:

1. Respects the user's system preference by default
2. Allows manual toggling between light and dark themes
3. Remembers the user's preference in local storage
4. Adjusts MathJax rendering for dark mode

The toggle appears in the top-right corner of every page. 