<div style="padding:1.5rem;font-family:var(--font-mono);font-size:13px;line-height:1.6;background:var(--surface-1);border-radius:12px;border:0.5px solid var(--border)">
<p style="margin:0 0 1rem;font-family:var(--font-sans);font-size:15px;font-weight:500;color:var(--text-primary)">script.js</p>
<button onclick="
const c=`/**
 * ALEXANDER DEMCHENKO — DIGITAL CONTACT CARD
 * script.js
 *
 * 1. vCard generation and download
 * 2. Crypto panel toggle
 * 3. Clipboard copy
 * 4. Toast notification
 * 5. Init
 */

/* ================================================
   1. VCARD — VCard 3.0, iPhone-compatible
   Fields: name, mobile phone, social URLs only.
   No email, no address, no country.
   TEL;TYPE=CELL,VOICE triggers iMessage + FaceTime on iOS.
================================================ */

function buildVCard() {
  const CRLF = '\\r\\n';
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
   Works on modern Clipboard API + legacy iOS Safari fallback.
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
   4. TOAST NOTIFICATION
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
`;
const b=new Blob([c],{type:'text/javascript'});
const u=URL.createObjectURL(b);
const a=document.createElement('a');
a.href=u;a.download='script.js';
document.body.appendChild(a);a.click();
document.body.removeChild(a);
setTimeout(()=>URL.revokeObjectURL(u),1000);
" style="padding:10px 20px;font-size:14px;font-weight:500;cursor:pointer;border-radius:8px;border:0.5px solid var(--border-strong);background:var(--surface-2);color:var(--text-primary)">⬇ Скачать script.js</button>
</div>
