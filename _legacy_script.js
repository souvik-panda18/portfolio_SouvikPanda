// ==========================================================================
// FRAMER BENTO SCRIPT - SOUVIK PANDA
// Interactive modal, email clipboard copy & micro-interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initEmailCopy();
  initContactModal();
});

// 1. Email Copy to Clipboard with Toast
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-bento');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'souvikpanda.work@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied souvikpanda.work@gmail.com');
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
      }, 2000);
    }).catch(() => {
      showToast('Could not copy automatically');
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;

  if (toastMsg) toastMsg.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// 2. Contact Modal Handling
function initContactModal() {
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const modal = document.getElementById('contact-modal');
  const form = document.getElementById('modal-form');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        submitBtn.style.background = '#10b981';
        submitBtn.style.color = '#fff';
        showToast('Message sent successfully!');

        setTimeout(() => {
          modal.classList.remove('active');
          form.reset();
          submitBtn.innerHTML = origText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 1200);
      }, 800);
    });
  }
}
