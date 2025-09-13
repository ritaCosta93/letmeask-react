# React Q\&A Live Rooms

This project is a **React.js application** for creating and joining live Q\&A rooms. It demonstrates **React hooks**, **Zustand state management**, **Firebase authentication**, and **React Router navigation**, with a focus on real-time user interaction and room management.

---

![React Q\&A Live Rooms](./public/screenshot.png)

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/ritaCosta93/letmeask-react.git
cd letmeask-react
npm install
```

Start the development server:

```bash
npm start
```

---

## 🚀 Components

* **Header**: Displays the app’s header on top of the page.
* **Button**: Reusable button component used across forms and actions.
* **Home**: Landing page that allows users to sign in with Google and create or join rooms.
* **Room**: Displays a live Q\&A room with questions, allowing users to ask and interact in real-time.
* **useAuthStore**: Zustand store managing authentication state with Firebase Google login.
* **useRoomStore**: Zustand store managing rooms, questions, and navigation.
* **Form Inputs**: Controlled input fields for room codes and new room creation.

---

## 🛠️ Tech Stack

* **React** – Functional components and hooks.
* **TypeScript** – Type-safe props, state, and Firebase data.
* **Sass/SCSS** – Styling for components and layouts.
* **Firebase** – Authentication and real-time database.
* **React Router** – Navigation and route handling.
* **Zustand** – Lightweight global state management.

---

## ✅ Features

* **Google authentication** using Firebase and Google sign-in popup.
* **Global state management** with **Zustand** for user and room states.
* **Real-time Q\&A rooms**: users can create, join, and interact in rooms.
* Controlled **forms** for entering room codes and creating new rooms.
* **Navigation** handled via React Router’s `useNavigate`.
* **Error handling** for authentication failures or invalid room codes.
* **Responsive UI** with SCSS styling.
* Clean separation of **components, hooks, and services**.

---

## 📂 Folder Structure

```markdown
src/
├─ assets/
│  ├─ images/
├─ components/
│  ├─ Button.tsx
│  ├─ Header.tsx
├─ hooks/
│  ├─ useAuth.ts
│  ├─ useRoom.ts
├─ services/
│  └─ firebase.ts
├─ styles/
│  └─ auth.scss
├─ types/
│  ├─ Room.ts
│  └─ User.ts
├─ pages/
│  └─ Home.tsx
├─ App.tsx
└─ index.tsx
```