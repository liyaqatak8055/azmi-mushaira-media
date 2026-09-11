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

              <button type="submit" className="btn-action-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
                <span>📲 Send Booking Request to WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
