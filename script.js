/**
 * ALEXANDER DEMCHENKO — DIGITAL CONTACT CARD
 * script.js
 *
 * Sections:
 *  1. Configuration — update your details here
 *  2. vCard generation & download
 *  3. Crypto panel toggle
 *  4. Clipboard copy
 *  5. Toast notification
 *  6. Current year in footer
 *  7. Init
 */

/* ================================================
   1. CONFIGURATION
   ↓ Update these values with your real details
================================================ */
const CONFIG = {
  // — Personal details —
  firstName:    'Alexander',
  lastName:     'Demchenko',
  fullName:     'Alexander Demchenko',

  // ↓ REPLACE: your phone number in international format (no spaces, dashes)
  //   Example: '+79678689529'
  phone:        '+79678689529',          // ← REPLACE WITH YOUR NUMBER

  // ↓ REPLACE: your email address
  email:        'your@email.com',        // ← REPLACE WITH YOUR EMAIL

  // ↓ REPLACE (optional): your city / country
  city:         '',
  country:      'Russia',

  // — Social links (already correct from brief) —
  telegram:     'https://t.me/demchenko00',
  whatsapp:     'https://wa.me/79678689529',
  linkedin:     'https://www.linkedin.com/in/александр-демченко-292b65329',

  // — Crypto —
  bybitUID:     '100711102',
};


/* ================================================
   2. VCARD GENERATION & DOWNLOAD
   Generates a .vcf file and triggers download.
   VCard 3.0 — best compatibility with iOS and Android.
================================================ */

/**
 * Build a VCard 3.0 string from CONFIG.
 * @returns {string}
 */
function buildVCard() {
  // ISO timestamp for REV field
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${CONFIG.fullName}`,
    `N:${CONFIG.lastName};${CONFIG.firstName};;;`,
    // ↓ Phone — TEL type will show as "mobile" in contacts
    `TEL;TYPE=CELL:${CONFIG.phone}`,
    // ↓ Email
    `EMAIL;TYPE=INTERNET:${CONFIG.email}`,
    // ↓ Social URLs (shown as websites in contacts)
    `URL;TYPE=Telegram:${CONFIG.telegram}`,
    `URL;TYPE=WhatsApp:${CONFIG.whatsapp}`,
    `URL;TYPE=LinkedIn:${CONFIG.linkedin}`,
    // ↓ Optional address
    CONFIG.country ? `ADR;TYPE=HOME:;;${CONFIG.city ? CONFIG.city + ',' : ''}${CONFIG.country};;;;` : '',
    // ↓ Note shown in contacts app
    `NOTE:Met while traveling. Telegram: @demchenko00`,
    `REV:${now}`,
    'END:VCARD',
  ].filter(Boolean); // remove empty lines

  return lines.join('\r\n');
}

/**
 * Trigger a .vcf file download on the user's device.
 * On iOS Safari, this prompts "Open in Contacts".
 */
function downloadVCard() {
  const vcf = buildVCard();
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${CONFIG.firstName}_${CONFIG.lastName}.vcf`;

  // Append briefly to trigger iOS Safari compatibility
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke object URL after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  showToast('Contact saved!');
}


/* ================================================
   3. CRYPTO PANEL TOGGLE
================================================ */

function initCryptoToggle() {
  const toggle = document.getElementById('cryptoToggle');
  const panel  = document.getElementById('cryptoPanel');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    // Toggle state
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    panel.classList.toggle('is-open', !isExpanded);
  });
}


/* ================================================
   4. CLIPBOARD COPY
   Handles any button with [data-copy] attribute.
   Shows success animation on the button.
================================================ */

/**
 * Copy text to clipboard with fallback for older browsers / iOS.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  // Modern API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy method
    }
  }

  // Legacy fallback — works on older iOS Safari
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    document.body.removeChild(textarea);
    return false;
  }
}

/**
 * Animate copy button to "success" state, then restore.
 * @param {HTMLElement} btn
 */
function animateCopySuccess(btn) {
  btn.classList.add('copied');
  btn.setAttribute('aria-label', 'Copied!');

  setTimeout(() => {
    btn.classList.remove('copied');
    btn.setAttribute('aria-label', 'Copy Bybit UID to clipboard');
  }, 2000);
}

function initCopyButtons() {
  // Find all buttons with [data-copy] attribute
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      const success = await copyToClipboard(text);

      if (success) {
        animateCopySuccess(btn);
        showToast('Copied to clipboard');
      }
    });
  });
}


/* ================================================
   5. TOAST NOTIFICATION
   Brief pill notification at the bottom of screen.
================================================ */

let toastTimeout = null;

/**
 * Show a toast message that auto-dismisses.
 * @param {string} message
 * @param {number} [duration=2400] — ms
 */
function showToast(message = 'Done', duration = 2400) {
  const toast     = document.getElementById('toast');
  const toastText = toast?.querySelector('.toast-text');

  if (!toast || !toastText) return;

  // Update text
  toastText.textContent = message;

  // Clear existing timeout if toast is already showing
  if (toastTimeout) clearTimeout(toastTimeout);

  // Show
  toast.classList.add('is-visible');

  // Auto-hide
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
    toastTimeout = null;
  }, duration);
}


/* ================================================
   6. FOOTER YEAR
================================================ */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}


/* ================================================
   7. INIT — wire everything up on DOM ready
================================================ */
function init() {
  // Footer year
  setCurrentYear();

  // Add Contact button → download vCard
  const addContactBtn = document.getElementById('addContactBtn');
  if (addContactBtn) {
    addContactBtn.addEventListener('click', downloadVCard);
  }

  // Crypto expand/collapse
  initCryptoToggle();

  // Copy buttons
  initCopyButtons();
}

// Run after DOM is parsed (script is deferred by placement at end of <body>)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
