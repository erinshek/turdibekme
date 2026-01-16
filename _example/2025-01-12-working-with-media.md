---
layout: post
title: "Working with Images and Embedded Media"
description: "Learn how to include images, GIFs, YouTube videos, and other embedded content in your blog posts."
date: 2025-01-12
tags: [images, video, youtube, media, tutorial]
---

A good blog post often needs more than just text. Let me show you how to work with different types of media content in this Jekyll blog.

## Images

### Basic Image

You can include images using standard Markdown syntax:

![Placeholder image](https://via.placeholder.com/800x400/2563eb/ffffff?text=Sample+Image)

The image above is a simple placeholder demonstrating basic image embedding.

### Image with Caption

For images that need captions, use the custom include:

{% include image.html
   src="https://via.placeholder.com/800x450/1e1e1e/d4d4d4?text=Code+Editor+Screenshot"
   alt="Screenshot of a code editor"
   caption="A typical code editor workspace with syntax highlighting"
%}

### Wide Images

For images that should break out of the content column:

{% include image.html
   src="https://via.placeholder.com/1200x400/2563eb/ffffff?text=Wide+Panoramic+Image"
   alt="A panoramic landscape"
   caption="Wide images can extend beyond the normal content width for more impact"
   wide=true
%}

## GIF Animations

GIFs work just like regular images:

![Loading animation](https://via.placeholder.com/400x300/4ec9b0/1e1e1e?text=Animated+GIF+Placeholder)

For actual animated GIFs, just use the same syntax with a `.gif` file.

## YouTube Videos

Embedding YouTube videos is easy with the custom include. Just provide the video ID (the part after `v=` in the URL):

{% include youtube.html
   id="dQw4w9WgXcQ"
   title="Example YouTube Video"
   caption="YouTube videos are embedded responsively and load lazily for better performance"
%}

The video embed:
- Uses privacy-enhanced mode (youtube-nocookie.com)
- Maintains 16:9 aspect ratio on all screen sizes
- Loads lazily to improve page load times

## Twitch Embeds

For Twitch content, you can embed either a channel or a specific video:

```liquid
{% raw %}{% include twitch.html channel="channelname" %}{% endraw %}
```

or for a specific video:

```liquid
{% raw %}{% include twitch.html video="1234567890" %}{% endraw %}
```

## Social Media Embeds

### Twitter/X

For Twitter embeds, you can use their embed code directly in your Markdown:

```html
<blockquote class="twitter-tweet">
  <p>Your tweet content here</p>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js"></script>
```

### Generic Embeds

For other platforms (Instagram, TikTok, etc.), you can usually copy their embed code directly into your post. Just make sure to wrap them appropriately:

```html
<div class="video-container">
  <!-- Paste embed code here -->
</div>
```

## Image Best Practices

Here are some tips for working with images in your posts:

1. **Optimize your images** - Use tools like ImageOptim or Squoosh to reduce file sizes
2. **Use descriptive alt text** - Helps with accessibility and SEO
3. **Choose appropriate dimensions** - The content column is ~680px wide
4. **Consider lazy loading** - Our image include adds `loading="lazy"` automatically
5. **Use WebP format** - When possible, for better compression

## Responsive Media

All media embeds in this theme are fully responsive:

| Device | Behavior |
|--------|----------|
| Desktop | Full width within content area |
| Tablet | Scales proportionally |
| Mobile | Fills available width |

The CSS handles aspect ratio preservation automatically, so videos won't appear stretched or squished on any device.

---

With these tools, you can create rich, engaging content that combines text with visual media effectively.
