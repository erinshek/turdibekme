/**
 * Karakalpak Latin ↔ Cyrillic Script Converter
 * Site-wide text conversion between Latin and Cyrillic alphabets
 */

(function() {
  'use strict';

  // Storage key for user preference
  const STORAGE_KEY = 'script-preference';

  // Current script state: 'latin' or 'cyrillic'
  let currentScript = 'latin';

  // Store original content for accurate conversion
  const originalContentMap = new Map();

  // Cyrillic to Latin mappings
  const cyrillicToLatinUpper = {
    'А': 'A', 'Ә': 'Á', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Ғ': 'Ǵ',
    'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'J', 'З': 'Z', 'И': 'I',
    'Й': 'Y', 'К': 'K', 'Қ': 'Q', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'Ң': 'Ń', 'О': 'O', 'Ө': 'Ó', 'П': 'P', 'Р': 'R', 'С': 'S',
    'Т': 'T', 'У': 'U', 'Ү': 'Ú', 'Ў': 'W', 'Ф': 'F', 'Х': 'X',
    'Ҳ': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '',
    'Ы': 'Í', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };

  const cyrillicToLatinLower = {
    'а': 'a', 'ә': 'á', 'б': 'b', 'в': 'v', 'г': 'g', 'ғ': 'ǵ',
    'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'j', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'қ': 'q', 'л': 'l', 'м': 'm', 'н': 'n',
    'ң': 'ń', 'о': 'o', 'ө': 'ó', 'п': 'p', 'р': 'r', 'с': 's',
    'т': 't', 'у': 'u', 'ү': 'ú', 'ў': 'w', 'ф': 'f', 'х': 'x',
    'ҳ': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '',
    'ы': 'ı', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  // Latin to Cyrillic mappings (multi-char patterns first)
  const latinToCyrillicMulti = {
    'Sh': 'Ш', 'SH': 'Ш', 'sh': 'ш',
    'Ch': 'Ч', 'CH': 'Ч', 'ch': 'ч',
    'Ya': 'Я', 'YA': 'Я', 'ya': 'я',
    'Yu': 'Ю', 'YU': 'Ю', 'yu': 'ю'
  };

  const latinToCyrillicUpper = {
    'A': 'А', 'Á': 'Ә', 'B': 'Б', 'D': 'Д', 'E': 'Е', 'F': 'Ф',
    'G': 'Г', 'Ǵ': 'Ғ', 'H': 'Ҳ', 'X': 'Х', 'Í': 'Ы', 'I': 'И',
    'J': 'Ж', 'K': 'К', 'Q': 'Қ', 'L': 'Л', 'M': 'М', 'N': 'Н',
    'Ń': 'Ң', 'O': 'О', 'Ó': 'Ө', 'P': 'П', 'R': 'Р', 'S': 'С',
    'T': 'Т', 'U': 'У', 'Ú': 'Ү', 'V': 'В', 'W': 'Ў', 'Y': 'Й',
    'Z': 'З', 'C': 'Ц'
  };

  const latinToCyrillicLower = {
    'a': 'а', 'á': 'ә', 'b': 'б', 'd': 'д', 'e': 'е', 'f': 'ф',
    'g': 'г', 'ǵ': 'ғ', 'h': 'ҳ', 'x': 'х', 'ı': 'ы', 'i': 'и',
    'j': 'ж', 'k': 'к', 'q': 'қ', 'l': 'л', 'm': 'м', 'n': 'н',
    'ń': 'ң', 'o': 'о', 'ó': 'ө', 'p': 'п', 'r': 'р', 's': 'с',
    't': 'т', 'u': 'у', 'ú': 'ү', 'v': 'б', 'w': 'ў', 'y': 'й',
    'z': 'з', 'c': 'ц'
  };

  // Combined mappings
  const cyrillicToLatin = { ...cyrillicToLatinUpper, ...cyrillicToLatinLower };
  const latinToCyrillic = { ...latinToCyrillicMulti, ...latinToCyrillicUpper, ...latinToCyrillicLower };

  // Special Cyrillic rules
  const specialCyrillicRules = {
    'ьи': 'yi',
    'ьо': 'yo',
    'ъе': 'ye'
  };

  /**
   * Handle special Cyrillic rules before conversion
   */
  function handleSpecialCyrillicRules(text) {
    let result = text;
    for (const [cyr, lat] of Object.entries(specialCyrillicRules)) {
      const regex = new RegExp('(?!^)' + cyr, 'g');
      result = result.replace(regex, lat);
    }
    return result;
  }

  /**
   * Convert Latin text to Cyrillic
   */
  function latin2cyrillic(text) {
    const result = [];
    let i = 0;

    while (i < text.length) {
      // Try 2-character match first (for Sh, Ch, Ya, Yu)
      if (i < text.length - 1) {
        const twoChar = text.substring(i, i + 2);
        if (latinToCyrillicMulti[twoChar]) {
          result.push(latinToCyrillicMulti[twoChar]);
          i += 2;
          continue;
        }
      }

      // Single character match
      const char = text[i];
      result.push(latinToCyrillic[char] || char);
      i++;
    }

    return result.join('');
  }

  /**
   * Convert Cyrillic text to Latin
   */
  function cyrillic2latin(text) {
    text = handleSpecialCyrillicRules(text);
    const result = [];
    for (const char of text) {
      result.push(cyrillicToLatin[char] || char);
    }
    return result.join('');
  }

  /**
   * Convert text based on target script
   */
  function convertText(text, toScript) {
    if (toScript === 'cyrillic') {
      return latin2cyrillic(text);
    } else {
      return cyrillic2latin(text);
    }
  }

  /**
   * Elements/tags to skip during conversion
   */
  const SKIP_TAGS = ['CODE', 'PRE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SVG'];

  /**
   * Check if element or its parents should be skipped
   */
  function shouldSkipElement(element, rootElement) {
    let current = element;
    while (current && current !== rootElement) {
      if (SKIP_TAGS.includes(current.tagName)) return true;
      if (current.hasAttribute && current.hasAttribute('data-no-convert')) return true;
      current = current.parentElement;
    }
    return false;
  }

  /**
   * Walk through DOM and convert text nodes
   */
  function walkAndConvert(element, toScript) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (shouldSkipElement(node.parentElement, element)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }

    textNodes.forEach(textNode => {
      textNode.textContent = convertText(textNode.textContent, toScript);
    });
  }

  /**
   * Get all convertible elements on the page
   */
  function getConvertibleElements() {
    const selectors = [
      '.main-content',           // Main content area
      '.nav-links a',            // Navigation links
      '.hero-content',           // Hero section
      '.page-title',             // Page titles
      '.post-title',             // Post titles
      '.post-item-title',        // Post list titles
      '.tags-cloud .tag-button', // Tag buttons
      '.page-content'            // Page content
    ];

    const elements = [];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.hasAttribute('data-no-convert')) {
          elements.push(el);
        }
      });
    });

    return elements;
  }

  /**
   * Store original content for all convertible elements
   */
  function storeOriginalContent() {
    if (originalContentMap.size > 0) return; // Already stored

    getConvertibleElements().forEach((el, index) => {
      originalContentMap.set(el, el.innerHTML);
    });
  }

  /**
   * Restore original content
   */
  function restoreOriginalContent() {
    originalContentMap.forEach((html, el) => {
      if (document.contains(el)) {
        el.innerHTML = html;
      }
    });
  }

  /**
   * Convert all page content to target script
   */
  function convertPageContent(toScript) {
    getConvertibleElements().forEach(el => {
      walkAndConvert(el, toScript);
    });
  }

  /**
   * Update toggle button text
   */
  function updateButtonText() {
    const toggleBtn = document.querySelector('.script-toggle-btn');
    if (toggleBtn) {
      toggleBtn.textContent = currentScript === 'latin' ? 'Кириллше' : 'Latınsha';
      toggleBtn.setAttribute('aria-label',
        currentScript === 'latin'
          ? 'Convert to Cyrillic script'
          : 'Convert to Latin script'
      );
    }
  }

  /**
   * Toggle between scripts
   */
  function toggleScript() {
    // Store original content on first toggle
    storeOriginalContent();

    // Determine target script
    const targetScript = currentScript === 'latin' ? 'cyrillic' : 'latin';

    // Restore original content before converting
    restoreOriginalContent();

    // Convert to target script if not latin
    if (targetScript === 'cyrillic') {
      convertPageContent('cyrillic');
    }

    // Update state
    currentScript = targetScript;

    // Update button
    updateButtonText();

    // Save preference
    try {
      localStorage.setItem(STORAGE_KEY, currentScript);
    } catch (e) {
      // localStorage not available
    }
  }

  /**
   * Apply saved preference
   */
  function applySavedPreference() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'cyrillic') {
        currentScript = 'latin'; // Set to latin so toggle switches to cyrillic
        toggleScript();
      }
    } catch (e) {
      // localStorage not available
    }
  }

  /**
   * Initialize the toggle functionality
   */
  function init() {
    // Update button text based on current state
    updateButtonText();

    // Add click listener to toggle button
    const toggleBtn = document.querySelector('.script-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleScript);
    }

    // Apply saved preference after a short delay to ensure DOM is ready
    setTimeout(applySavedPreference, 50);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
