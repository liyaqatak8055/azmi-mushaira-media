# Azmi Mushaira Media (Web Platform)

Official web portal for **AZMI MUSHAIRA MEDIA** ([@AZMIMUSHAIRAMEDIA](https://youtube.com/@AZMIMUSHAIRAMEDIA)) — covering All India Mushaira, ground-level political reporting, and Urdu literature with 1.49M+ subscribers and 6,800+ videos.

This project was rebuilt from vanilla HTML/CSS into a **React + Vite** single-page application (SPA) with **React Router**, maintaining custom OTT/streaming UI styling without heavy CSS frameworks.

---

## Tech Stack

- **Framework**: React 18
- **Bundler / Dev Server**: Vite 6
- **Routing**: React Router DOM (v6)
- **Styling**: Custom CSS (variables, flexbox/grid, keyframe transitions)
- **Deployment Targets**: Vercel, Netlify, Cloudflare Pages

---

## Key Features & Architecture

- **OTT Carousel**: Hero slider with autoplay, slide indicators, and manual navigation.
- **Dynamic Category Rail**: Scrollable channel rail mapping to route filters and video categories.
- **In-Page Video Theater**: Lightbox/modal player embedding YouTube videos with responsive aspect ratio, copy link functionality, and WhatsApp deep-links.
- **Event Coverage Booking**: Direct form with validation that formats input into a structured WhatsApp message sent to the official coverage desk.
- **Catalog Filtering & Search**: Client-side filtering across categories (Politics, Mushaira, Interviews, Ground Zero), search by keyword (Roman Urdu, Hindi, Urdu script), and load-more pagination.
- **YouTube API Auto-Sync**: Optional integration with YouTube Data API v3 to poll channel uploads and detect live streams (stores key in `localStorage`, zero server dependencies).
- **Security**: Reverse tabnabbing protection (`rel="noopener noreferrer"`) on all outbound links, plus basic headers configured for Vercel/Netlify (`X-Frame-Options`, `X-Content-Type-Options`).

---

## Project Structure

```
Azmi/
├── public/
│   ├── assets/images/avatar.jpg   # Brand logo and fallback images
│   └── _headers                   # Netlify / Cloudflare security headers
├── src/
│   ├── assets/                    # Bundled static assets
│   ├── components/
│   │   ├── Navbar.jsx             # Top bar, navigation, mobile drawer
│   │   ├── Footer.jsx             # Multi-column footer & modal triggers
│   │   ├── VideoCard.jsx          # Card supporting editorial, popular, mushaira, shorts
│   │   ├── VideoModal.jsx         # YouTube theater player
│   │   ├── SyncModal.jsx          # YouTube Data API config & live test
│   │   ├── SupportModal.jsx       # FAQs, Terms, and Privacy modals
│   │   ├── Toast.jsx              # Feedback toast notifications
│   │   └── BackToTop.jsx          # Scroll-to-top trigger
│   ├── context/
│   │   └── AppContext.jsx         # Global state (modals, active player, live status)
│   ├── data/
│   │   └── platformData.js        # Catalog store, carousel items, category list
│   ├── pages/
│   │   ├── Home.jsx               # Main landing page with all streaming sections
│   │   ├── About.jsx              # Platform background, stats, and editorial mission
│   │   ├── Videos.jsx             # Full searchable video archive
│   │   └── Contact.jsx            # Event coverage booking & desk details
│   ├── App.jsx                    # Routing setup & scroll restoration
│   ├── main.jsx                   # React root mount
│   └── style.css                  # Core design system tokens and component styles
├── index.html                     # HTML shell, OpenGraph, Twitter cards, JSON-LD
├── package.json
├── vercel.json                    # SPA rewrites & security headers
└── vite.config.js
```

---

## Local Development

### 1. Clone & Install

```bash
git clone https://github.com/liyaqatak0786/Demo.git
cd Demo
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

The app will run locally at `http://localhost:3000/`.

### 3. Production Build

```bash
npm run build
```

Build output is written to `dist/`.

### 4. Preview Build Locally

```bash
npm run preview
```

---

## Configuration & Notes

### YouTube Auto-Sync (Optional)
By default, the platform runs offline using the static dataset in `src/data/platformData.js`. 

To enable real-time YouTube sync:
1. Click **Auto-Sync** in the navbar.
2. Enter a Google Cloud YouTube Data API v3 key.
3. The key is saved locally in `localStorage` under `AZMI_YT_API_KEY` and periodically checks the uploads playlist and live broadcast status.

### SPA Deployment
- **Vercel**: Handled via `vercel.json` rewrite (`/(.*) -> /index.html`).
- **Netlify**: Use `public/_redirects` with `/* /index.html 200` if needed, or host static output directly.

---

## Contact & Links

- **YouTube**: [@AZMIMUSHAIRAMEDIA](https://youtube.com/@AZMIMUSHAIRAMEDIA)
- **Coverage Helpline**: +91 9451329571 (WhatsApp)
- **Email**: 7860AzmiMushairaMedia@gmail.com
- **Bureau**: Azamgarh, Uttar Pradesh, India
