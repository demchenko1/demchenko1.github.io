/**
 * ALEXANDER DEMCHENKO — DIGITAL CONTACT CARD
 * script.js
 */

/* ================================================
   1. VCARD
   VCard 3.0, совместим с iPhone.
   TEL;TYPE=CELL,VOICE — iOS видит как мобильный,
   предлагает iMessage и FaceTime автоматически.
================================================ */
function buildVCard() {
  const CRLF = '\r\n';
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Demchenko;Alexander;;;',
    'FN:Alexander Demchenko',
    'TEL;TYPE=CELL,VOICE:+79678689529',
    'URL;TYPE=Telegram:https://t.me/demchenko00',
    'URL;TYPE=WhatsApp:https://wa.me/79678689529',
    'URL;TYPE=Instagram:https://www.instagram.com/demchenko_574',
    'URL;TYPE=LinkedIn:https://www.linkedin.com/in/alexander-demchenko-292b65329',
    'END:VCARD',
  ];
  return lines.join(CRLF) + CRLF;
}

function downloadVCard() {
  const vcf  = buildVCard();
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = 'Alexander-Demchenko.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('Contact saved!');
}

/* ================================================
   2. CRYPTO PANEL TOGGLE
================================================ */
function initCryptoToggle() {
  const toggle = document.getElementById('cryptoToggle');
  const panel  = document.getElementById('cryptoPanel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    panel.classList.toggle('is-open', !isExpanded);
  });
}

/* ================================================
   3. CLIPBOARD COPY
   Современный API + fallback для старого iOS Safari.
================================================ */
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true; } catch {}
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;top:0;left:0;';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    document.body.removeChild(textarea);
    return false;
  }
}

function animateCopySuccess(btn) {
  btn.classList.add('copied');
  btn.setAttribute('aria-label', 'Copied!');
  setTimeout(() => {
    btn.classList.remove('copied');
    btn.setAttribute('aria-label', 'Copy Bybit UID to clipboard');
  }, 2000);
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      const ok = await copyToClipboard(text);
      if (ok) { animateCopySuccess(btn); showToast('Copied to clipboard'); }
    });
  });
}

/* ================================================
   4. TOAST
================================================ */
let toastTimeout = null;

function showToast(message = 'Done', duration = 2400) {
  const toast     = document.getElementById('toast');
  const toastText = toast?.querySelector('.toast-text');
  if (!toast || !toastText) return;
  toastText.textContent = message;
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.classList.add('is-visible');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
    toastTimeout = null;
  }, duration);
}

/* ================================================
   5. INIT
================================================ */
function init() {
  const addContactBtn = document.getElementById('addContactBtn');
  if (addContactBtn) addContactBtn.addEventListener('click', downloadVCard);
  initCryptoToggle();
  initCopyButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
