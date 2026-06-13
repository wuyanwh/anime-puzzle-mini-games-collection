export function createElement(tag, className, attributes = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "text") {
      element.textContent = value;
      return;
    }
    if (key === "html") {
      element.innerHTML = value;
      return;
    }
    element.setAttribute(key, value);
  });

  return element;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
