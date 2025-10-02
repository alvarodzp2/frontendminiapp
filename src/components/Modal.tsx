import React, { useEffect, useRef } from "react";
import "../styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      if (!isOpen) return;

      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus-trap básico
      if (e.key === "Tab" && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        const focusArray = Array.from(focusableEls).filter(el => !el.hasAttribute("disabled"));
        if (focusArray.length === 0) {
          //  evitar tab fuera del modal
          e.preventDefault();
          return;
        }
        const first = focusArray[0];
        const last = focusArray[focusArray.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // delay corto para garantizar que el elemento esté en DOM
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  // Devolver foco al elemento que lo tenía antes
  useEffect(() => {
    if (!isOpen && lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      className="modal-backdrop"
      onClick={onClose} 
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        { /* Botón de cerrar en esquina superior derecha */ }
        <button
          ref={closeButtonRef}
          className="modal-close-x"
          onClick={onClose}
          aria-label="Cerrar modal"
          type="button"
        >
          X
        </button>

        <h2 id="modal-title">{title}</h2>
        {children}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button
            onClick={onClose}
            className="modal-close-btn"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
