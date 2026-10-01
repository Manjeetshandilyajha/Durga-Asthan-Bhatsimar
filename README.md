# 🚩 दुर्गा स्थान, भटसिमर (Durga Sthan, Bhatsimar)

A complete, production-ready, authentic Maithili-language website for **Durga Sthan, Bhatsimar** built strictly using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite, JavaScript), Tailwind CSS, Framer Motion, Lucide React, Axios, React Router DOM
- **Backend**: Node.js, Express.js (REST API, JavaScript)
- **Database**: MongoDB, Mongoose Schemas
- **Authentication**: JWT, bcryptjs
- **Image Storage**: Cloudinary (Multer upload handling)

---

## 📁 Project Structure

```
durga-sthan-bhatsimar/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── assets/images/       # Real temple photos (temple_facade.jpg, mata_rani.jpg)
│   │   ├── components/          # Navbar, Footer, LightboxModal, EventCard, TimelineItem, etc.
│   │   ├── pages/               # Home, History, MataRani, Gallery, Events, ShareHistory, Contact, Admin
│   │   ├── services/            # Axios API config
│   │   ├── utils/               # Constants & site data
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                      # Express Backend REST API
│   ├── config/                  # DB & Cloudinary configs
│   ├── controllers/             # Auth, History, Gallery, Events, Submissions, Contact, Settings
│   ├── middleware/              # JWT auth, Multer upload, Error handler
│   ├── models/                  # Mongoose Schemas (8 models)
│   ├── routes/                  # Express REST API routes
│   ├── seed/                    # Database seeding script
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Quick Start & Running Commands

### 1. Backend Server Setup

```bash
cd server
npm install
npm run seed     # (Optional) Seed initial Maithili data & admin account
npm run dev      # Runs Express server on http://localhost:5000
```

### 2. Frontend Client Setup

```bash
cd client
npm install
npm run dev      # Runs Vite React app on http://localhost:3000
```

---

## 🔐 Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`
- **Login Route**: `/admin/login`

---

## 📞 Primary Contact Information

- **Contact Person**: मंजीत कुमार झा
- **Mobile**: 9905697921
- **Location**: दुर्गा स्थान, ग्राम - भटसिमर, जिला - मधुबनी, बिहार

---

*जय माता दी! 🙏🚩*
