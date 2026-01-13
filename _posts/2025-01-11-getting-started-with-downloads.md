---
layout: post
title: "Getting Started with File Downloads"
description: "Learn how to attach downloadable files to your blog posts and provide resources for your readers."
date: 2025-01-11
tags: [downloads, tutorial, jekyll, features]
downloads:
  - file: sample-guide.txt
    title: "Jekyll Blog Starter Guide"
    description: "A text guide covering the basics of this blog"
---

One of the useful features of this blog is the ability to attach downloadable files to your posts. This allows you to share resources, code samples, PDFs, or any other files with your readers.

## How Downloads Work

There are two ways to include downloads in your posts:

### 1. Frontmatter Downloads Section

Add a `downloads` array to your post's frontmatter:

```yaml
---
layout: post
title: "Your Post Title"
downloads:
  - file: document.pdf
    title: "Documentation PDF"
    description: "Complete documentation for the project"
  - file: source-code.zip
    title: "Source Code"
    description: "Full source code archive"
---
```

This will automatically create a downloads section at the bottom of your post, before the tags.

### 2. Inline Download Links

You can also add download links anywhere in your content using the include:

```liquid
{% raw %}{% include download.html file="sample-guide.txt" title="Download the Guide" %}{% endraw %}
```

Here's an example inline download: {% include download.html file="sample-guide.txt" title="Download the Guide" %}

### 3. Direct Markdown Links

Or simply use a standard markdown link:

```markdown
[Download the sample file](/assets/downloads/sample-guide.txt)
```

[Download the sample file](/assets/downloads/sample-guide.txt)

## Organizing Your Downloads

All downloadable files should be placed in the `/assets/downloads/` directory. You can organize them into subdirectories if needed:

```
assets/
└── downloads/
    ├── guides/
    │   └── getting-started.pdf
    ├── code/
    │   └── example-project.zip
    └── sample-guide.txt
```

## Supported File Types

You can share any type of file:

| Type | Common Uses |
|------|-------------|
| PDF | Documentation, guides, reports |
| ZIP | Code archives, multiple files |
| TXT | Plain text documentation |
| MD | Markdown files |
| JSON | Configuration files, data |
| Images | High-resolution versions |

## Best Practices

1. **Use descriptive filenames** - Make it clear what the file contains
2. **Add descriptions** - Help users understand what they're downloading
3. **Keep files updated** - Remove outdated downloads
4. **Consider file sizes** - Large files should be hosted elsewhere
5. **Test your downloads** - Ensure all links work before publishing

## Example Use Cases

- **Tutorials**: Provide starter code or project templates
- **Documentation**: Share detailed guides or references
- **Resources**: Offer cheat sheets, templates, or tools
- **Supplements**: Include additional materials that complement your post

---

Check the bottom of this post to see the automatic downloads section in action!
