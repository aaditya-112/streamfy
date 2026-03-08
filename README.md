# Streamfy

**Streamfy** is a modern **real-time communication platform** built with the **MERN stack** that enables users to chat, react to messages, and start video calls in real time.
The application integrates the **Stream API** to provide scalable messaging and video functionality with a clean and customizable user interface.

---

# 🚀 Live Demo

Frontend: https://streamify-jwia.onrender.com
Repository: https://github.com/aaditya-112/streamfy

---

# 📌 Features

## 🔐 Authentication

* Secure **user signup and login**
* **JWT-based authentication**
* Protected routes for authenticated users

## 💬 Real-Time Messaging

* Instant messaging using Stream Chat
* Chat channels
* Message history and threads
* Real-time message updates

## 🎥 Video Calling

* Start **real-time video calls** with other users
* Integrated video calling using Stream's real-time communication infrastructure
* Smooth and responsive call interface

## 👍 Message Reactions

* React to messages using emojis
* Real-time reaction updates
* Improves interactivity in conversations

## 🎨 Theme Customization

* Multiple **UI themes**
* Users can switch themes dynamically
* Personalized user experience

## ⚡ Modern UI/UX

* Responsive design
* Toast notifications for feedback
* Loading skeletons
* Clean component-based architecture

---

# 🛠️ Tech Stack

## Frontend

* React
* React Router
* Tailwind CSS
* Axios
* TanStack React Query
* Stream Chat React
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* JSON Web Tokens (JWT)
* Stream Chat API

## Deployment

* Backend hosted on Render
* Frontend deployed on Vercel

---

# 📂 Project Structure

```
streamfy
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── services
│   └── main.jsx
│
├── package.json
└── .gitignore
```

---

# ⚙️ Installation

## Clone the repository

```
git clone https://github.com/aaditya-112/streamfy.git
cd streamfy
```

## Install dependencies

Backend:

```
cd backend
npm install
```

Frontend:

```
cd ../frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

---

# ▶️ Running the Application

Start backend server:

```
npm run dev
```

Start frontend:

```
npm run dev
```

---

# 🧠 Application Flow

1. Users create an account or log in.
2. Backend generates a **JWT token** for authentication.
3. Frontend stores the token and uses it for secure API requests.
4. Users connect to **Stream Chat** for messaging.
5. Real-time messaging, reactions, and video calls are handled through Stream services.

---

# 📈 Future Improvements

* Group video calls
* File and media sharing
* User online/offline status
* Push notifications
* Mobile responsive optimization
* User profile customization

---

# 👨‍💻 Author

**Aaditya Koundal**

GitHub: https://github.com/aaditya-112

---

# ⭐ Support

If you found this project useful, please give it a **star on GitHub**.
