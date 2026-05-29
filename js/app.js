/* ============================================================
login.js — Interacciones del login · Maestro Sastrería
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Toggle mostrar/ocultar contraseña --- */
  const toggleBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';

      toggleBtn.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');

      toggleBtn.innerHTML = isHidden
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  }

  /* --- Validación visual básica del formulario --- */
  const form = document.querySelector('.login-form');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      [usernameInput, emailInput, passwordInput].forEach(input => {
        if (!input || !input.value.trim()) {
          input.style.borderColor = '#c0392b';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (valid) {
        // Aquí irá la lógica de autenticación cuando se integre el backend
        console.log('Formulario listo para enviar.');
      }
    });

    /* Limpiar error al escribir */
    [usernameInput, emailInput, passwordInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        });
      }
    });
  }

});
