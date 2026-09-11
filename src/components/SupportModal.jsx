import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORT_CONTENT } from '../data/platformData';

export default function SupportModal() {
  const { supportModal, closeSupportModal } = useApp();

  if (!supportModal.isOpen) return null;

  const content = SUPPORT_CONTENT[supportModal.type] || SUPPORT_CONTENT.faqs;

  return (
    <div
      className="support-info-modal active"
      id="supportInfoModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSupportModal();
      }}
    >
      <div className="support-modal-dialog">
        <div className="support-modal-header">
          <h3 className="support-modal-title" id="supportModalTitle">
            {content.title}
          </h3>
          <button className="support-modal-close" onClick={closeSupportModal} aria-label="Close dialog">
            ✕
          </button>
        </div>
        <div className="support-modal-body" id="supportModalBody">
          {content.items && (
            <div>
              {content.items.map((item, idx) => (
                <div className="faq-item" key={idx}>
                  <div className="faq-question">
                    <span>🎙️</span> <strong>{item.q}</strong>
                  </div>
                  <div className="faq-answer">{item.a}</div>
                </div>
              ))}
            </div>
          )}

          {content.sections && (
            <div>
              {content.sections.map((sec, idx) => (
                <div className="legal-section-block" key={idx}>
                  <h4>{sec.heading}</h4>
                  <p>{sec.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
