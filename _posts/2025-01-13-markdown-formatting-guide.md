---
layout: post
title: "Complete Markdown Formatting Guide"
description: "A comprehensive reference for all Markdown formatting options supported in this blog, from basic text to advanced features."
date: 2025-01-13
tags: [markdown, formatting, guide, reference]
---

This post serves as a complete reference for all the Markdown formatting you can use when writing blog posts. Bookmark this for quick reference!

## Text Formatting

### Basic Emphasis

You can make text **bold** using double asterisks or __double underscores__.

For *italic* text, use single asterisks or _single underscores_.

Combine them for ***bold and italic*** text.

Use ~~strikethrough~~ with double tildes.

### Links

Here's a [basic link](https://example.com) to a website.

You can also use [reference-style links][ref-link] for cleaner Markdown.

[ref-link]: https://example.com "Optional title"

For automatic links, just use angle brackets: <https://example.com>

## Headings

Markdown supports six levels of headings (this post demonstrates h2-h6 as h1 is reserved for the title):

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Deep nesting works too
- Third item

You can also use asterisks or plus signs:

* Item with asterisk
+ Item with plus sign

### Ordered Lists

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

Numbers don't have to be sequential in Markdown:

1. This is item one
1. This is item two
1. This is item three

### Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Uncompleted task
- [ ] Another todo item

## Blockquotes

> This is a blockquote. Use it for highlighting quotes, important notes, or excerpts from other sources.

Multi-paragraph quotes:

> First paragraph of the quote.
>
> Second paragraph continues the thought.
>
> <cite>— Attribution goes here</cite>

Nested blockquotes:

> Level one quote
>
> > Nested quote for emphasis
>
> Back to level one

## Tables

| Feature | Supported | Notes |
|---------|:---------:|-------|
| Headers | Yes | Required |
| Alignment | Yes | Left, center, right |
| Bold text | Yes | In cells |
| Links | Yes | Clickable |

### Table with Alignment

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Content | Content | Content |
| More | More | More |

## Horizontal Rules

Use three or more hyphens, asterisks, or underscores:

---

The horizontal rule above separates content sections.

## Code

### Inline Code

Use backticks for `inline code` within sentences. For example, the `console.log()` function prints to the console.

You can also use inline code for `file paths`, `variable_names`, or `command flags`.

### Code Blocks

Use triple backticks with an optional language identifier:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

Or indent with four spaces for simple code blocks:

    This is indented code
    No syntax highlighting
    Just preformatted text

## Footnotes

Here's a sentence with a footnote[^1].

You can also use named footnotes for clarity[^note].

[^1]: This is the footnote content. It appears at the bottom of the post.

[^note]: Named footnotes work the same way but can be easier to manage in longer documents.

## Definition Lists

While not standard Markdown, many processors support definition lists:

Term 1
: Definition of term 1

Term 2
: Definition of term 2
: Can have multiple definitions

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

## Special Characters

Markdown will automatically escape special characters in most cases:

- Ampersand: &
- Less than: <
- Greater than: >
- Quotes: " and '

For characters that have Markdown meaning, use backslash escapes:

- \*Not italic\*
- \[Not a link\]
- \# Not a heading

## HTML in Markdown

When Markdown isn't enough, you can use raw HTML:

<details>
<summary>Click to expand</summary>

This content is hidden by default and revealed when the user clicks the summary.

- You can include
- Markdown inside
- HTML elements

</details>

<mark>Highlighted text</mark> using the mark element.

<kbd>Ctrl</kbd> + <kbd>C</kbd> for keyboard shortcuts.

## Mathematics (if supported)

Some Jekyll setups support LaTeX math:

Inline math: $E = mc^2$

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

Note: Math support requires additional configuration with MathJax or KaTeX.

## Summary

This guide covers most Markdown features you'll need for blogging:

| Category | Features |
|----------|----------|
| Text | Bold, italic, strikethrough, links |
| Structure | Headings, lists, tables |
| Code | Inline, blocks with syntax highlighting |
| Media | Images, videos (via includes) |
| Advanced | Footnotes, HTML, abbreviations |

---

Keep this reference handy when writing your posts. Good formatting makes your content more readable and professional!
