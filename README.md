# Turdıbek Writes

A minimalist, typography-focused personal blog built with Jekyll. Features clean design, smooth animations, and support for Karakalpak/Latin extended characters.

## Features

- **Elegant Landing Page** - Clean hero section with personal introduction
- **Minimalist Design** - Focus on content with clean typography
- **PT Serif Font** - Beautiful serif typography with Latin Extended character support
- **Smooth Animations** - Subtle fade-in effects and transitions
- **Responsive Layout** - Works beautifully on all devices
- **Code Syntax Highlighting** - VS Code-style dark theme for code blocks
- **Tag Organization** - Filter posts by tags
- **Section Separators** - Elegant three-dot (•••) separators in posts
- **Media Embeds** - YouTube and Twitch support with responsive containers
- **Download Attachments** - Attach downloadable files to posts

## Pages

- **Home** (`/`) - Landing page with hero section and "About Me" link
- **Blog** (`/blog/`) - All posts listed by date
- **Tags** (`/tags/`) - Browse and filter posts by tag
- **About** (`/about/`) - Personal information

## Getting Started

### Prerequisites

- Ruby (>= 2.7)
- Bundler (`gem install bundler`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erinshek/turdibekme.git
   cd turdibekme
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open http://localhost:4000 in your browser

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your site will be available at `https://username.github.io/repository-name/`

Alternatively, GitHub Actions can be configured for automatic deployment.

## Writing Posts

Create new posts in the `_posts` directory with the naming format:
```
YYYY-MM-DD-title-of-post.md
```

Example frontmatter:
```yaml
---
layout: post
title: "Your Post Title"
date: 2026-01-13
tags: [tag1, tag2]
---

Your content here...

---

Use three dashes for section separators (renders as •••)

---

More content...
```

### Adding Downloads to Posts

```yaml
---
layout: post
title: "Post with Downloads"
date: 2026-01-13
tags: [tutorial]
downloads:
  - title: "Sample File"
    file: "sample.pdf"
    description: "Optional description"
---
```

Place download files in `assets/downloads/`.

### Embedding Media

**YouTube:**
```liquid
{% include youtube.html id="VIDEO_ID" title="Video Title" %}
```

**Images:**
```liquid
{% include image.html src="/assets/images/photo.jpg" alt="Description" caption="Optional caption" %}
```

## Directory Structure

```
├── _includes/          # Reusable components (header, footer, etc.)
├── _layouts/           # Page templates (default, post, page)
├── _posts/             # Blog posts (markdown files)
├── about/              # About page
├── assets/
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript
│   ├── downloads/      # Downloadable files
│   └── images/         # Image assets
├── blog/               # Blog listing page
├── tags/               # Tags page
├── _config.yml         # Site configuration
├── Gemfile             # Ruby dependencies
└── index.html          # Home page
```

## Configuration

Edit `_config.yml` to customize:

```yaml
# Site info
title: "Your Name"
description: "Your site description"
author: "Your Name"

# Social links
social:
  github: username
  linkedin: username
  telegram: username
```

Edit `index.html` to customize the hero section (name, role, quote).

## License

This project is open source and available under the MIT License.
