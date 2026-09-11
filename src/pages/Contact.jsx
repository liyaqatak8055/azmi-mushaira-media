import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { showPlatformToast } = useApp();

  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    eventType: "All India Mushaira",
    date: "",
    city: "",
    details: ""
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.city) {
      showPlatformToast("Kripya Naam, Phone aur City zaroor bharein!");
      return;
    }

    const bookingMessage = `*Official Event Coverage Booking Request*\n` +
      `*Platform:* AZMI MUSHAIRA MEDIA (@AZMIMUSHAIRAMEDIA)\n\n` +
      `👤 *Organizer:* ${bookingForm.name}\n` +
      `📞 *Contact Number:* ${bookingForm.phone}\n` +
      `🎤 *Event Category:* ${bookingForm.eventType}\n` +
      `📅 *Date:* ${bookingForm.date || 'Decide hona baaki hai'}\n` +
      `📍 *Location / City:* ${bookingForm.city}\n` +
      `📝 *Notes:* ${bookingForm.details || 'N/A'}`;

    const waUrl = `https://wa.me/919451329571?text=${encodeURIComponent(bookingMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showPlatformToast("Shukriya! Aapki booking request WhatsApp par open ho rahi hai...");
    setBookingForm({
      name: "",
      phone: "",
      eventType: "All India Mushaira",
      date: "",
      city: "",
      details: ""
    });
  };

  return (
    <main className="content-section" style={{ minHeight: '80vh', paddingTop: '32px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-eyebrow">CONTACT &amp; COVERAGE BOOKING | رابطہ اور بکنگ</span>
          <h1 className="h2-section-title" style={{ fontSize: '2.2rem' }}>
            Get in Touch with Azmi Mushaira Media
          </h1>
          <p className="urdu-sub-badge" style={{ fontSize: '1.15rem', marginTop: '6px' }}>
            آل انڈیا مشاعرہ، جلسہ، یا خبر کی کوریج کے لیے براہِ راست رابطہ کریں
          </p>
        </div>

        <div className="booking-panel-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Info Side */}
          <div className="booking-info-pane">
            <span className="section-eyebrow" style={{ color: 'var(--color-accent-gold)' }}>DIRECT HELPLINE</span>
            <h2 className="booking-title">24/7 Coverage Desk</h2>
            <p className="booking-desc">
              All India Mushaira, Mazhabi Jalse, Siyasi Conventions aur Public Rallies ki 4K multi-camera professional video recording aur real-time YouTube live streaming ke liye humse rabta karein.
            </p>

            <div className="booking-feature-checklist" style={{ marginTop: '20px' }}>
              <div className="booking-check-item">
                <span className="check-icon">✓</span>
                <span>4K Multi-Camera Setup with High-Gain Audio Switched Recording</span>
              </div>
              <div className="booking-check-item">
                <span className="check-icon">✓</span>
                <span>1.49M Subscribers Wale Channel Par Instant Upload &amp; Live Stream</span>
              </div>
              <div className="booking-check-item">
                <span className="check-icon">✓</span>
                <span>Professional Stage Interviews &amp; Viral Shorts Reels Production</span>
              </div>
            </div>

            <div style={{ marginTop: '28px', padding: '18px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ marginBottom: '14px' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.85rem' }}>📱 WhatsApp / Phone:</strong>
                <a href="https://wa.me/919451329571" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-gold)', fontWeight: 800, fontSize: '1.1rem' }}>
                  +91 9451329571
                </a>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.85rem' }}>✉️ Official Email:</strong>
                <a href="mailto:7860AzmiMushairaMedia@gmail.com" style={{ color: '#fff', fontSize: '0.95rem' }}>
                  7860AzmiMushairaMedia@gmail.com
                </a>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.85rem' }}>📍 Location &amp; Bureau:</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Azamgarh, Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="booking-form-pane">
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group-row">
                <div className="form-field">
                  <label htmlFor="contactName">Aapka Naam (Organizer Name) *</label>
                  <input
                    type="text"
                    id="contactName"
                    className="input-control"
                    placeholder="e.g. Mohd Tariq"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contactPhone">Mobile / WhatsApp No. *</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    className="input-control"
                    placeholder="9451329571"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label htmlFor="contactEventType">Event Category *</label>
                  <select
                    id="contactEventType"
                    className="input-control"
                    value={bookingForm.eventType}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                  >
                    <option value="All India Mushaira">All India Mushaira (کل ہند مشاعرہ)</option>
                    <option value="Deeni Jalsa / Mehfil">Deeni Jalsa / Naat Mehfil (جلسہ)</option>
                    <option value="Political Rally / Press Meet">Political Rally / Press Meet (سیاسی جلسہ)</option>
                    <option value="Exclusive Interview">Exclusive Interview (انٹرویو)</option>
                    <option value="Other Public Event">Other Public Event</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="contactDate">Event Date</label>
                  <input
                    type="date"
                    id="contactDate"
                    className="input-control"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contactCity">City / Location *</label>
                <input
                  type="text"
                  id="contactCity"
                  className="input-control"
                  placeholder="e.g. Azamgarh, Lucknow, Delhi, Jaipur"
                  required
                  value={bookingForm.city}
                  onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contactDetails">Event Details / Shora Names (Optional)</label>
                <textarea
                  id="contactDetails"
                  className="input-control"
                  rows="4"
                  placeholder="Khas shayar, venue aur coverage requirements likhein..."
                  value={bookingForm.details}
                  onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="booking-submit-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.59c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
                </svg>
                <span>WhatsApp Par Booking Request Bhejein</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
