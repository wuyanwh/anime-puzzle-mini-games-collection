export function bindPointerDrag(element, handlers) {
  let activePointerId = null;

  function onPointerMove(event) {
    if (activePointerId !== event.pointerId) return;
    handlers.move?.(event);
  }

  function onPointerUp(event) {
    if (activePointerId !== event.pointerId) return;
    activePointerId = null;
    element.releasePointerCapture?.(event.pointerId);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    handlers.end?.(event);
  }

  function onPointerDown(event) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    activePointerId = event.pointerId;
    element.setPointerCapture?.(event.pointerId);
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    handlers.start?.(event);
  }

  element.addEventListener("pointerdown", onPointerDown);

  return () => {
    element.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
  };
}
