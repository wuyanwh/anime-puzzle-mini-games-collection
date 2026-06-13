(function initModalModule() {
  const modalLayer = document.querySelector("#modalLayer");
  let activeModal = null;
  let lastFocusedElement = null;
  let closeTimer = null;

  function openModal(modal) {
    if (!modalLayer || !modal) return;

    window.clearTimeout(closeTimer);
    if (activeModal && activeModal !== modal) {
      activeModal.classList.remove("is-visible");
      activeModal.hidden = true;
    }

    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modalLayer.classList.add("is-open");
    modalLayer.setAttribute("aria-hidden", "false");
    modal.hidden = false;
    document.body.classList.add("modal-open");

    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
      const focusTarget = modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (focusTarget) focusTarget.focus();
    });
  }

  function closeModal() {
    if (!modalLayer || !activeModal) return;

    activeModal.classList.remove("is-visible");
    modalLayer.classList.remove("is-open");
    modalLayer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    const closingModal = activeModal;
    activeModal = null;

    closeTimer = window.setTimeout(() => {
      closingModal.hidden = true;
      activeModal = null;
      if (lastFocusedElement) lastFocusedElement.focus();
    }, 180);
  }

  window.MiniGamesModal = { openModal, closeModal };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-target]");
    const close = event.target.closest("[data-modal-close]");

    if (trigger) {
      event.preventDefault();
      openModal(document.querySelector(trigger.dataset.modalTarget));
    }

    if (close) {
      event.preventDefault();
      closeModal();
    }
  });

  if (modalLayer) {
    modalLayer.addEventListener("click", (event) => {
      if (event.target === modalLayer) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
