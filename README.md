# 🔗 LinkNest — A Linktree Clone

**LinkNest** is a modern and responsive clone of [Linktree](https://linktr.ee/) that lets users create a custom shareable profile page with their favorite links, bio, and profile image — all hosted and deployed with ease.

🚀 **Live Demo**: [https://linknest-puce.vercel.app/](https://linknest-puce.vercel.app/)

🧠 **Inspired by a tutorial from [CodeWithHarry](https://youtu.be/izwkombjECA?si=DD7yyYwOt5ZTjiF_)**

---

## ✨ Features

- 🔖 Custom Handle Support (via URL query or form)
- 🧍 Profile Picture & Bio
- 🔗 Unlimited Custom Links
- 🪄 Real-Time Preview with Floating Cards
- 🛎️ Success/Error Toast Notifications
- 🎨 Tailwind CSS Styling
- 🌍 Fully Responsive UI
- 🧠 MongoDB Atlas Backend
- 🧩 Built With:
  - Next.js 15
  - MongoDB Atlas
  - Tailwind CSS
  - React Toastify
  - Headless UI

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/akm2006/linktree-clone.git
cd linktree-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=mongodb+srv://yourUser:yourPassword@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_HOST=http://localhost:3000
```

> Replace with your actual MongoDB Atlas URI and your development host or deployed domain.

### 4. Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment (Vercel Recommended)

1. Push your project to GitHub
2. Import your GitHub repo into [Vercel](https://vercel.com/)
3. Add these environment variables in your Vercel dashboard:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_HOST` (e.g., https://linknest-puce.vercel.app)
4. Click **Deploy**

---

## 📁 Project Structure

```
linktree-clone/
├── app/
│   ├── [handle]/page.js         # Dynamic profile page
│   └── generate/
│       ├── page.js
│       ├── Generate.js
│       └── GenerateClient.js
├── components/
│   └── FloatingCard.js          # 3D tilt effect card
├── lib/
│   └── mongodb.js               # DB connection logic
├── public/
│   └── card/                    # Background assets
├── .env.local                   # Env variables
└── README.md
```

---

## 🔌 API Endpoint

### `POST /api/add`

Creates a new Linknest profile.

#### Request Body:

```json
{
  "handle": "yourhandle",
  "pic": "https://example.com/yourpic.jpg",
  "links": [
    { "linktext": "Instagram", "link": "https://instagram.com/..." },
    { "linktext": "GitHub", "link": "https://github.com/..." }
  ],
  "desc": "Optional short bio"
}
```

#### Response Example:

```json
{
  "success": true,
  "error": false,
  "message": "Your Linknest has been created!",
  "result": {
    "_id": "...",
    "handle": "yourhandle",
    ...
  }
}
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with 💜 by [@akm2006](https://github.com/akm2006)
