# 📌 Full Stack Task Manager (Monorepo)

A full stack **Task Management Application** built using **React (Vite)** for frontend and **Node.js (Express)** for backend.  
This project is structured as a **single repository** containing both frontend and backend.

---

## 🚀 Features

- View all tasks  
- Add new tasks  
- Mark tasks as completed/incomplete  
- Delete tasks  

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), CSS3  
**Backend:** Node.js, Express.js  
**Storage:** In-memory array  

---
### 1. Start Backend
```bash
cd backend
npm install
node server.js

### start frontend
```bash
cd frontend
npm install
npm run dev

-------
## 🔗 API Endpoints

| Method | Endpoint        | Description        |
|--------|---------------|--------------------|
| GET    | /tasks        | Get all tasks      |
| POST   | /tasks        | Add new task       |
| PATCH  | /tasks/:id    | Update task status |
| DELETE | /tasks/:id    | Delete task        |
