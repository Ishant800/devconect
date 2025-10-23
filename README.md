# 🚀 DEVMET — A Developer Networking Platform

![Java](https://img.shields.io/badge/Java-SpringBoot-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> _Connect • Collaborate • Showcase Your Skills_  
SkillSphere is a developer-focused social platform designed to help programmers share code, collaborate, and build their professional presence. It merges social networking with a personal portfolio system.

---

## 🧠 Overview

Unlike traditional social media, **SkillSphere** focuses on connecting developers through meaningful projects and collaboration.  

**Users can:**
- 🧑‍💻 Share code snippets, projects, and ideas  
- 💬 Comment and discuss with others  
- 👥 Follow other developers  
- 🧠 Showcase their skills and portfolios  
- 🔍 Discover new devs by skills or tags  
- ⚡ (Optional) Get live notifications via WebSockets  

---

## 🧩 Tech Stack

### 🎯 **Frontend**
- React.js  
- Redux Toolkit  
- Axios  
- React Router  
- Tailwind CSS  
- React Hot Toast (Custom alerts)

### ⚙️ **Backend**
- Spring Boot  
- Spring Security + JWT Authentication  
- JPA + Hibernate  
- MySQL Database  
- Lombok  
- (Optional) WebSocket for real-time notifications

---

## 🔑 Core Features

### 👤 **User Module**
- Register & Login with JWT  
- Profile management (bio, photo, skills)  
- Follow / Unfollow users  
- Followers and Following list  

### 📝 **Post Module**
- CRUD operations for posts  
- Upload images or code snippets  
- Like / Unlike posts  
- Comment system  
- Personalized feed (followed users)

### 💼 **Project/Portfolio Module**
- Add projects with title, description, tech stack, and links  
- Showcase them in profile  
- Edit/Delete projects anytime  

### 🔔 **Notification Module** *(optional)*
- When someone likes, comments, or follows  
- Stored in DB  
- Real-time push via WebSocket  

### 🔍 **Search Module**
- Search by username, skill, or tags  

---

## 🧩 Database Relationships

| Entity | Relationship |
|--------|---------------|
| User ↔ Post | One-to-Many |
| User ↔ Comment | One-to-Many |
| User ↔ User | Many-to-Many (Followers) |
| Post ↔ Comment | One-to-Many |
| User ↔ Project | One-to-Many |
| User ↔ Skill | Many-to-Many |

---

## ⚙️ Setup & Installation

### 🖥️ Backend Setup
```bash
# Clone the repository
git clone https://github.com/<your-username>/SkillSphere.git
cd SkillSphere/backend
