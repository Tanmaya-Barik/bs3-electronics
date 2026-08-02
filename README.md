# 🤖 KathaaAI — Database-Aware E-Commerce AI Shopping Assistant by BS3 Coders

**College Training Program Project Submission | Powered by Google Gemini & MERN Stack Architecture (BS3 Electronics Store)**

---

## 🌟 Project Overview

**KathaaAI** is an intelligent, database-aware conversational AI shopping assistant engineered by **BS3 Coders**. Designed to revolutionize online retail, KathaaAI uses **Retrieval-Augmented Generation (RAG)** and the **Google Gemini API** (`gemini-1.5-flash`) to deliver real-time, fact-grounded shopping guidance.

To demonstrate KathaaAI in a live production environment, **BS3 Coders** developed **BS3 Electronics**—a full-featured online electronics store built on the **MERN Stack** (MongoDB, Express.js, React, Node.js). **KathaaAI is natively integrated** into the Express backend, giving it direct access to live store inventory, Indian Rupee (₹) pricing, specifications, and a **3,000-question FAQ knowledge base**.

### 💡 Why Native KathaaAI > Traditional Rule-Based Chatbots?
1. **Live Database Awareness:** KathaaAI directly queries MongoDB Atlas in real time to check whether an item is in stock, fetch accurate prices, and verify brand warranty terms before answering.
2. **Interactive In-Chat Shopping Cards:** When KathaaAI recommends an electronics item, it renders **interactive Product Cards** directly inside the chat bubble with an instant **"Add to Cart"** button.
3. **Zero Client-Side API Key Exposure:** All Gemini AI calls are securely proxied through the Node.js/Express backend (`/api/chat`). No cloud API keys are exposed to the browser.
4. **Massive 3,000-FAQ Policy Engine:** Trained on 30 distinct shopping intents to instantly answer queries regarding 7-day refunds, EMI options, coupons, and express delivery.

---

## 🏗️ Technical Architecture & Tech Stack

```
                +---------------------------------------+
                |     KATHAAAI REACT UI (Vite)          |
                |  - Floating KathaaAI Chat Widget      |
                |  - Interactive In-Chat Product Cards  |
                |  - Flipkart-Inspired Light Theme      |
                +-------------------+-------------------+
                                    |
                                    | Express Backend Routes (Axios / Bearer JWT)
                                    v
+-----------------------------------+-----------------------------------+
|                   NODE.JS / EXPRESS.JS BACKEND SERVER                 |
|                                                                       |
|  +--------------------+   +-------------------+   +----------------+  |
|  |  Chat Controller   |   | Product Controller|   |Auth Controller |  |
|  +---------+----------+   +---------+---------+   +-------+--------+  |
+------------|------------------------|---------------------|-----------+
             |                        |                     |
             v                        v                     v
   +--------------------+   +-------------------+   +----------------+
   |   MongoDB Atlas    |   |  data/questions   |   | Google Gemini  |
   | (Live Catalog DB)  |   | (3,000 FAQ RAG KB)|   |    API Cloud   |
   +--------------------+   +-------------------+   +----------------+
```

### 🧰 Technology Stack
- **AI & NLP Engine:** Google Gemini API (`gemini-1.5-flash` model), RAG Catalog Injection, 3,000-FAQ Dataset.
- **Frontend:** React 18 (Vite), Bootstrap 5, Custom Flipkart Light Theme CSS, React Icons, Context API (`CartContext`).
- **Backend:** Node.js, Express.js Server (`/api/chat`), Native Fetch API, Mongoose ODM, JWT Authentication.
- **Database:** MongoDB Atlas (Cloud NoSQL Cluster), Local JSON Catalog.

---

## 🎨 Design System — Flipkart Light Theme

- **Primary Blue:** `#2874f0` — High-trust e-commerce header & KathaaAI accent branding.
- **Yellow Action Buttons:** `#ff9f00` — High-visibility CTA ("Add to Cart" inside chat bubbles).
- **Orange Action Buttons:** `#fb641b` — Immediate action ("Buy Now", "Proceed to Checkout").
- **Rating Badges:** Green badge (`#388e3c`) with ★ rating icon.
- **Micro-animations:** Smooth pulse animation on the KathaaAI floating button and slide-up chat window.

---

## 📂 Project Structure

```
bs3-electronics/
├── backend/
│   ├── config/
│   │   ├── database.js      # MongoDB Atlas & catalog connection
│   │   └── gemini.js        # Google Gemini API & KathaaAI RAG Engine
│   ├── controllers/         # chatController, productController, authController
│   ├── middleware/          # JWT authMiddleware
│   ├── models/              # Product, User, Category, Order Mongoose schemas
│   ├── data/                # products.json & questions.json (3,000-FAQ RAG dataset)
│   ├── routes/              # chatRoutes, productRoutes, authRoutes
│   ├── server.js            # Express server & KathaaAI API endpoints
│   └── seed.js              # Database seeder script
├── frontend/
│   ├── src/
│   │   ├── components/      # KathaaAIWidget, ProductCard, Navbar, Footer, Hero...
│   │   ├── context/         # CartContext.jsx, AuthContext.jsx
│   │   ├── hooks/           # useChat.js, useAuth.js
│   │   ├── pages/           # Home, Products, ProductDetails, Cart, Login, Orders...
│   │   ├── services/        # chatService.js, api.js, authService.js
│   │   ├── App.jsx          # Router & global KathaaAI widget wrapper
│   │   └── main.jsx         # Entry point
│   ├── index.html           # Bootstrap CDN & SEO tags
│   └── vite.config.js       # Backend proxy to localhost:5000
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

### Step 2: Seed the Database with Electronics & FAQs
To populate MongoDB Atlas with KathaaAI's product catalog and FAQ knowledge base:
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

When demonstrating KathaaAI and the BS3 Electronics platform during final evaluation, follow these 5 steps:

1. **Demonstrate KathaaAI Shopping Assistant (Core Contribution):**
   - Click the pulsing circular **KathaaAI** button in the bottom right corner of the homepage.
   - Ask a complex recommendation query: *"Which laptop is best for coding and B.Tech projects under ₹60,000?"*
   - Show how KathaaAI retrieves live MongoDB catalog prices AND renders **interactive Product Cards inside the chat window** with a clickable **"Add to Cart"** button!
2. **Demonstrate KathaaAI's 3,000-FAQ Policy Engine:**
   - Ask KathaaAI: *"What is your refund and warranty policy?"* or *"Do you offer EMI on laptops?"*
   - Show how it instantly responds with accurate store policies (Free express delivery above ₹1,000, 7-day replacement, 1-year brand warranty).
3. **Show Flipkart-Inspired E-Commerce Platform:**
   - Point out the clean Light Theme, sticky Navbar with category dropdowns, and the Hero carousel banner.
   - Show category filtering (**Laptops / Smartphones**) and price sorting (**Low to High**).
4. **Open Product Details Page:**
   - Click on any product (e.g., *ASUS TUF Gaming F15* or *Sony WH-1000XM5*).
   - Show thumbnail gallery switching, pincode delivery verification, and technical specifications.
5. **Demonstrate In-Chat 'Add to Cart' & Checkout Flow:**
   - Click **"Add to Cart"** directly inside KathaaAI's chat bubble and watch the cart count update instantly.
   - Navigate to `/cart` and check out using the **"Use College Demo Account"** button (`tanmay@college.edu` / `KathaaAiBot@2407`).

---

## 🔮 Future Roadmap (SaaS Expansion & Next-Gen Features)

1. **KathaaAI as a Plug-and-Play SaaS Provider:** In the future, **BS3 Coders** will package KathaaAI as an independent Software-as-a-Service (SaaS) chatbot that any online retail store can integrate into their website with a simple `<script>` tag.
2. **Visual Product Search via Camera:** Shifting toward multimodal AI by allowing shoppers to open their camera in the chat bubble, snap a photo of any gadget, and let KathaaAI visually identify and recommend matching store items.
3. **CRM & VIP Customer Integration:** Linking KathaaAI to backend CRM tools to remember individual customer preferences, past orders, and automatically route VIP support tickets.
4. **In-Chat UPI & Online Payment:** Enabling customers to complete their entire UPI or debit card payment directly inside the KathaaAI chat bubble without redirecting to a checkout page.

---

## 📜 College Submission Details
- **Project Title:** KathaaAI — Database-Aware E-Commerce AI Shopping Assistant (by BS3 Coders)
- **Domain:** Web Development & Applied Artificial Intelligence
- **Technology:** MERN Stack + Google Gemini API (`gemini-1.5-flash`)
- **Status:** Complete & Ready for Final Evaluation

## 👥 Contributors For the project:
| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **Sabhya Ranjan Sethy** | 👑 **Group Leader** | Project management and evaluation coordination |
| **Tanmaya Barik** | 💻 **Developer** | Full-stack MERN development, Express server, and KathaaAI Gemini integration |
| **Bighnesh Pradhan** | 🔍 **Research & Data Integration** | 3,000-question FAQ dataset curation and MongoDB catalog RAG pipeline |
| **Saswat Das** | 🎨 **UI/UX Designer** | Flipkart-inspired light theme, chat bubble interface, and interactive cards |
| **Sritam Mahanta** | 🧪 **Quality Assurance (QA) & Documentation** | Testing chat accuracy, UI responsiveness, report writing, and documentation |
