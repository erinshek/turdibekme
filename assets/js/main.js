/**
 * Main JavaScript for the Jekyll blog
 * Handles mobile navigation and other interactive features
 */

(function() {
  'use strict';

  // Mobile Navigation Toggle
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Add copy buttons to code blocks
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.highlight pre');

    codeBlocks.forEach(function(block) {
      // Create wrapper if not already wrapped
      const wrapper = block.closest('.highlight');
      if (!wrapper) return;

      wrapper.style.position = 'relative';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

      copyBtn.addEventListener('click', async function() {
        const code = block.querySelector('code');
        const text = code ? code.textContent : block.textContent;

        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied!';
          setTimeout(function() {
            copyBtn.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          copyBtn.textContent = 'Failed';
          setTimeout(function() {
            copyBtn.textContent = 'Copy';
          }, 2000);
        }
      });

      wrapper.appendChild(copyBtn);
    });
  }

  // Add external link icons and open in new tab
  function initExternalLinks() {
    const contentLinks = document.querySelectorAll('.post-content a, .page-content a');

    contentLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // Calculate and display reading progress
  function initReadingProgress() {
    const post = document.querySelector('.post-content');
    if (!post) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--color-accent, #2563eb);
      z-index: 1000;
      transition: width 100ms ease-out;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
      const postRect = post.getBoundingClientRect();
      const postTop = postRect.top + window.scrollY;
      const postHeight = post.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const start = postTop - windowHeight;
      const end = postTop + postHeight;
      const current = scrollTop - start;
      const total = end - start;

      const progress = Math.max(0, Math.min(100, (current / total) * 100));
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // Initialize all features
  function init() {
    initMobileNav();
    initSmoothScroll();
    initCodeCopy();
    initExternalLinks();
    initReadingProgress();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
