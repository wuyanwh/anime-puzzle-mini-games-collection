(function initSmartSidebar() {
  const sidebar = document.querySelector("#sidebar");
  const expandedClass = "sidebar-expanded";

  if (!sidebar) return;

  sidebar.addEventListener("pointerenter", () => document.body.classList.add(expandedClass));
  sidebar.addEventListener("pointerleave", () => document.body.classList.remove(expandedClass));
  sidebar.addEventListener("focusin", () => document.body.classList.add(expandedClass));
  sidebar.addEventListener("focusout", (event) => {
    if (!sidebar.contains(event.relatedTarget)) {
      document.body.classList.remove(expandedClass);
    }
  });
})();
