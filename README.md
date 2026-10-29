# SalesAvatar · Cloud CRM Platform

A modern, high-converting enterprise CRM platform website built with React, Vite, and modern CSS aesthetics.

---

## 🎨 Theme & Visual Palette

- **Primary Gradient**: Orange to Amber (`#ff6b2b` → `#f97316` → `#ea580c`)
- **Main Background**: `#f8fafc` (Clean, sleek enterprise light mode)
- **Primary Text**: `#0f172a` (Slate 900)
- **Secondary Text**: `#475569` (Slate 600)
- **Accent Emerald**: `#10b981`

---

## 🚀 Architecture & Stack

- **Frontend**: React 18, Vite, React Router 6, Lucide React icons, Canvas Confetti.
- **Lead Capture & Notifications**: Client-side form-to-email dispatcher delivering incoming leads straight to `sales@salesavatar.com` (supports FormSubmit, Formspree, Web3Forms, and mailto fallback) with zero backend server or database maintenance.

---

## 📁 Repository Structure

```
SalesAvatar/
├── index.html                   # HTML entry with modern typography & meta tags
├── package.json                 # Frontend dependencies (React, Vite, Lucide, Confetti)
├── .env                         # Configured recipient email (sales@salesavatar.com)
├── src/
│   ├── api.js                   # Frontend lead submission bridge
│   ├── App.jsx                  # Main application routing, sticky navbar, modals
│   ├── index.css                # Global tokens and CSS resets
│   ├── App.css                  # Core design system & responsive styling
│   ├── subpages.css             # Page-specific styling for website routes
│   ├── services/
│   │   └── leadService.js       # Structured email lead generator & dispatcher
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky blur-backdrop navigation bar
│   │   ├── Footer.jsx           # Comprehensive company footer
│   │   ├── Modals.jsx           # Trial, Demo, Enterprise & Quick Inquiry Modals
│   │   └── FloatingSalesWidget.jsx # Quick contact & WhatsApp widget
│   └── website-pages/           # Public pages (Home, Tour, Features, Pricing, WhyUs, FAQ, Contact, Legal)
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start Development Server
```powershell
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```powershell
npm run build
```
Creates an optimized static production bundle in `dist/` ready to host on Vercel, Netlify, Cloudflare Pages, AWS S3, or any static hosting provider.
