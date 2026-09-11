import React from 'react';

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/919451329571?text=Salam%20Azmi%20Media%20Desk%2C%20mujhe%20All%20India%20Mushaira%20%2F%20Event%20Video%20Coverage%20ke%20bare%20me%20jaankari%20chahiye.";

  return (
    <aside aria-label="WhatsApp Coverage Helpline">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        id="whatsappFloatBtn"
        aria-label="Chat with Azmi Media on WhatsApp"
        title="24/7 Coverage Helpline (WhatsApp)"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.055-.938-.029-.29-.081-.663-.207-1.14-.413-2.034-.881-3.354-2.946-3.456-3.082-.102-.136-.826-1.099-.826-2.096 0-.997.523-1.488.708-1.693.186-.205.407-.256.543-.256.136 0 .271.002.39.008.125.006.292-.047.456.347.169.407.576 1.405.627 1.507.051.102.085.221.017.357-.068.136-.102.221-.203.34-.102.119-.214.265-.306.356-.102.102-.209.213-.09.417.119.204.529.873 1.136 1.413.781.696 1.439.912 1.643 1.014.204.102.323.085.442-.051.119-.136.509-.593.645-.797.136-.204.271-.17.458-.102.186.068 1.187.56 1.391.662.204.102.339.153.39.238.051.085.051.492-.093.897zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.309A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
        <span className="whatsapp-float-label">Book Event Coverage</span>
      </a>
    </aside>
  );
}
