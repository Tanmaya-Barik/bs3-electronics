# 🛒 BS3 Electronics — India's Premier Online Electronics Store with KathaaAI

**College Final Year Project Submission | Full Stack MERN + Google Gemini AI Integration**

---

## 🌟 Project Overview

**BS3 Electronics** is a full-featured, production-quality online electronics store built on the **MERN Stack** (MongoDB, Express.js, React, Node.js). 

A core feature of this platform is **KathaaAI**, an intelligent AI Shopping Assistant powered by the **Google Gemini API**. Unlike traditional e-commerce platforms that rely on third-party SaaS chatbots (such as VartaAI or Intercom), **KathaaAI is natively integrated** into the BS3 Electronics application codebase.

### 💡 Why Custom MERN Chatbot (KathaaAI) > 3rd Party Widgets?
1. **Full Database Awareness:** KathaaAI directly queries the live MongoDB database to fetch real-time prices, stock levels, specs, and warranty terms.
2. **Interactive UI Component Embedding:** When KathaaAI recommends an electronics item, it renders **interactive Product Cards** inside the chat bubble with an instant **"Add to Cart"** button.
3. **Zero Security & API Key Exposure:** The Google Gemini API Key is stored securely on the Node.js/Express backend server (`/api/chat`). No keys are exposed in the client-side JavaScript bundle.
4. **Built-in Resilient Fallback Engine:** If offline or if an API limit is reached, KathaaAI automatically switches to its on-premise local intelligence engine, ensuring a **100% reliable demonstration** during college evaluation.

---

## 🏗️ Technical Architecture & Tech Stack

```
                +---------------------------------------+
                |        REACT FRONTEND (Vite)          |
                |  - Flipkart Inspired UI Theme         |
                |  - AuthContext & CartContext          |
                |  - Floating KathaaAI Chat Widget      |
                +-------------------+-------------------+
                                    |
                                    | REST API (Axios / Bearer JWT)
                                    v
+-----------------------------------+-----------------------------------+
|                   NODE.JS / EXPRESS.JS BACKEND SERVER                 |
|                                                                       |
|  +--------------------+   +-------------------+   +----------------+  |
|  |  Auth Controller   |   | Product Controller|   | Chat Controller|  |
|  +---------+----------+   +---------+---------+   +-------+--------+  |
+------------|------------------------|---------------------|-----------+
             |                        |                     |
             v                        v                     v
   +--------------------+   +-------------------+   +----------------+
   |   MongoDB Atlas    |   |  data/products    |   | Google Gemini  |
   | (User/Order DB)    |   |   (Catalog JSON)  |   |    API Cloud   |
   +--------------------+   +-------------------+   +----------------+
```

### 🧰 Technology Stack
- **Frontend:** React 18 (Vite), Bootstrap 5, React Router DOM 6, React Icons, Custom CSS (Flipkart Theme).
- **Backend:** Node.js, Express.js, Mongoose, JSON Web Token (JWT), Bcrypt.js, Native Fetch (Gemini API).
- **Database:** MongoDB Atlas (Cloud NoSQL Cluster).
- **AI Engine:** Google Gemini API (`gemini-1.5-flash` model) with local fallback.

---

## 🎨 Design System — Flipkart Theme

- **Primary Blue:** `#2874f0` — High-trust e-commerce header & accent.
- **Yellow Action Buttons:** `#ff9f00` — High-visibility CTA ("Add to Cart").
- **Orange Action Buttons:** `#fb641b` — Immediate action ("Buy Now", "Proceed to Checkout").
- **Rating Badges:** Green badge (`#388e3c`) with ★ rating icon.
- **Micro-animations:** Smooth pulse animation on the KathaaAI floating button and slide-up modal window.

---

## 📂 Project Structure

```
bs3-electronics/
├── backend/
│   ├── config/
│   │   ├── database.js      # MongoDB Atlas & local JSON fallback connection
│   │   └── gemini.js        # Google Gemini API & KathaaAI Intelligence Engine
│   ├── controllers/         # authController, productController, chatController
│   ├── middleware/          # JWT authMiddleware
│   ├── models/              # User, Product, Category, Order Mongoose schemas
│   ├── data/                # products.json (Comprehensive electronics dataset)
│   ├── routes/              # authRoutes, productRoutes, chatRoutes
│   ├── server.js            # Main Express server & API routes
│   └── seed.js              # Database seeder script
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, Hero, ProductCard, KathaaAIWidget...
│   │   ├── context/         # AuthContext.jsx, CartContext.jsx
│   │   ├── hooks/           # useAuth.js, useChat.js
│   │   ├── pages/           # Home, Products, ProductDetails, Cart, Login, Orders...
│   │   ├── services/        # api.js, authService.js, chatService.js
│   │   ├── App.jsx          # Router & global KathaaAI widget wrapper
│   │   └── main.jsx         # Entry point
│   ├── index.html           # Bootstrap CDN & SEO tags
│   └── vite.config.js       # API proxy to localhost:5000
├── package.json             # Helper scripts
└── README.md                # College Submission Documentation
```

---

## 🚀 Step-by-Step Setup & Installation Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** connection URI (Already configured in `backend/.env`)
- **Google Gemini API Key** (Already configured in `backend/.env`)

### Step 1: Install Dependencies
From the `bs3-electronics/` root folder, run:
```bash
npm run install:all
```
*(This automatically installs dependencies for both `backend/` and `frontend/` directories).*

### Step 2: Seed the Database with Electronics
To populate MongoDB Atlas with Laptops, Smartphones, Audio gear, Smartwatches, TVs, and Accessories:
```bash
npm run seed
```

### Step 3: Start the Backend Server (Port 5000)
Open a terminal inside `bs3-electronics/` and run:
```bash
npm run dev:backend
```
*You will see:*
```
=======================================================
 🚀 BS3 ELECTRONICS BACKEND SERVER LIVE ON PORT 5000
 🤖 KathaaAI AI Shopping Assistant Service Ready
=======================================================
```

### Step 4: Start the Frontend React App (Port 5173)
Open a second terminal inside `bs3-electronics/` and run:
```bash
npm run dev:frontend
```
Open your browser and visit:
**`http://localhost:5173`**

---

## 🎓 College Demonstration Guide (For Examiners)

When demonstrating this project during final evaluation, follow these 5 steps:

1. **Show Flipkart-Inspired Home Page:**
   - Point out the responsive sticky Navbar with search bar and Categories dropdown.
   - Show the rotating promotional Hero carousel banner (Gaming Laptops, 5G Smartphones, Noise Cancelling Audio).
2. **Demonstrate Product Filtering & Pagination:**
   - Navigate to **Products** (`/products`).
   - Show category filtering (e.g., select **Laptops** or **Smartphones**) and price sorting (**Price: Low to High**).
3. **Open Product Details Page:**
   - Click on any product (e.g., *ASUS TUF Gaming F15* or *Sony WH-1000XM5*).
   - Demonstrate thumbnail gallery image switching, 6-digit pincode delivery verification, and the comprehensive Technical Specifications table.
4. **Demonstrate KathaaAI Shopping Assistant (Key Feature):**
   - Click the pulsing circular **KathaaAI** button in the bottom right corner.
   - Ask: *"Which laptop is best for coding and B.Tech projects?"*
   - Show how KathaaAI responds with bullet points AND renders **interactive Product Cards inside the chat window** with a clickable **"Add"** button!
   - Ask about store policies: *"What is your refund and warranty policy?"*
5. **Demonstrate Auth & Cart Flow:**
   - Add items to cart and navigate to `/cart`.
   - Show the Flipkart-style **Price Details** breakdown card (18% savings, FREE delivery).
   - Click **"Use College Demo Account"** on the Login page (`tanmay@college.edu` / `KathaaAiBot@2407`).
   - Click **Proceed to Checkout** to simulate an order and view order tracking in `/orders`.

---

## 📜 College Submission Details
- **Project Title:** BS3 Electronics — Online Electronics Shopping Platform with KathaaAI
- **Domain:** Web Development & Applied Artificial Intelligence
- **Technology:** MERN Stack + Google Gemini API (`gemini-1.5-flash`)
- **Status:** Complete & Ready for Final Evaluation
