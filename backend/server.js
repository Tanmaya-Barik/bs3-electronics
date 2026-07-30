const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// Root Route - Friendly API Landing Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BS3 Electronics — API Server Live</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; max-width: 500px; border: 1px solid #334155; }
        h1 { color: #38bdf8; margin-bottom: 12px; }
        p { color: #94a3b8; line-height: 1.6; }
        .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; transition: 0.2s; }
        .btn:hover { background: #1d4ed8; }
        .status { display: inline-block; padding: 4px 12px; background: #065f46; color: #34d399; border-radius: 999px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="status">● API SERVER ONLINE</div>
        <h1>BS3 Electronics API</h1>
        <p>The backend API server &amp; <b>KathaaAI Shopping Assistant</b> are running successfully on port 5000.</p>
        <p>To view and interact with the ecommerce website, please open the Frontend Development Server:</p>
        <a class="btn" href="http://localhost:5173">Open Website (localhost:5173) ➔</a>
      </div>
    </body>
    </html>
  `);
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'BS3 Electronics API Server',
    chatbot: 'KathaaAI (Powered by Google Gemini & 3000-FAQ Dataset)',
    timestamp: new Date().toISOString()
  });
});

// Load Datasets for Live Database Inspector
const productsData = require('./data/products.json');
let questionsData = [];
try {
  questionsData = require('./data/questions.json');
} catch (e) {
  console.warn('Could not load questions.json in server.js');
}

// JSON Database API endpoint
app.get('/api/database', (req, res) => {
  res.status(200).json({
    status: 'OK',
    storageEngine: 'Mongoose ODM / Local JSON Fallback',
    metrics: {
      totalProducts: productsData.length,
      totalQuestions: questionsData.length,
      totalIntents: new Set(questionsData.map(q => q.intent)).size
    },
    products: productsData,
    questions: questionsData.slice(0, 100) // First 100 in JSON payload
  });
});

// Interactive Web Database Explorer Dashboard
app.get('/database', (req, res) => {
  const totalProducts = productsData.length;
  const totalQuestions = questionsData.length;
  const totalIntents = new Set(questionsData.map(q => q.intent)).size;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>BS3 Electronics — Live Database Explorer</title>
      <style>
        :root { --bg: #0f172a; --card: #1e293b; --accent: #38bdf8; --text: #f8fafc; --muted: #94a3b8; --border: #334155; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 24px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 24px; }
        h1 { margin: 0; color: var(--accent); font-size: 26px; }
        .stats { display: flex; gap: 16px; }
        .stat-card { background: var(--card); border: 1px solid var(--border); padding: 12px 20px; border-radius: 12px; text-align: center; }
        .stat-val { font-size: 22px; font-weight: bold; color: #34d399; }
        .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
        .tabs { display: flex; gap: 12px; margin-bottom: 20px; }
        .tab-btn { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; }
        .tab-btn.active, .tab-btn:hover { background: var(--accent); color: #0f172a; }
        .search-bar { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); background: #0b1325; color: var(--text); font-size: 15px; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; background: var(--card); border-radius: 12px; overflow: hidden; }
        th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: #0b1325; color: var(--accent); font-size: 13px; text-transform: uppercase; }
        tr:hover { background: #27354d; }
        .badge { display: inline-block; padding: 4px 10px; background: #065f46; color: #34d399; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .badge-intent { background: #1e3a8a; color: #93c5fd; }
        .price { font-family: monospace; font-size: 14px; font-weight: bold; color: #facc15; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div>
            <h1>📦 BS3 Electronics Database Explorer</h1>
            <p style="color: var(--muted); margin: 6px 0 0 0;">Live inspection of the ecommerce products catalog and KathaaAI FAQ dataset</p>
          </div>
          <div class="stats">
            <div class="stat-card">
              <div class="stat-val">${totalProducts}</div>
              <div class="stat-label">Products</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${totalQuestions}</div>
              <div class="stat-label">FAQ Questions</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${totalIntents}</div>
              <div class="stat-label">CSV Intents</div>
            </div>
          </div>
        </div>

        <div class="tabs">
          <button class="tab-btn active" onclick="switchTab('products')">📦 Products Catalog (${totalProducts})</button>
          <button class="tab-btn" onclick="switchTab('questions')">❓ KathaaAI FAQ Dataset (${totalQuestions})</button>
          <a class="tab-btn" href="http://localhost:5173" style="margin-left: auto; background: #2563eb; color: white; text-decoration: none;">➔ Open Ecommerce Website</a>
        </div>

        <div id="products-tab" class="tab-content active">
          <input type="text" id="prod-search" class="search-bar" placeholder="🔍 Filter products by ID, name, brand, or category..." onkeyup="filterTable('products-table', 'prod-search')">
          <table id="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              ${productsData.map(p => `
                <tr>
                  <td><code>${p.id}</code></td>
                  <td><b>${p.name}</b><br><small style="color: var(--muted);">${p.specs}</small></td>
                  <td><span class="badge">${p.category}</span></td>
                  <td class="price">₹${p.price.toLocaleString('en-IN')}</td>
                  <td>${p.rating} ★</td>
                  <td>${p.inStock ? '✅ In Stock' : '❌ Out of Stock'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div id="questions-tab" class="tab-content">
          <input type="text" id="quest-search" class="search-bar" placeholder="🔍 Filter FAQ questions by intent, category, or question text..." onkeyup="filterTable('questions-table', 'quest-search')">
          <table id="questions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Intent / CSV File</th>
                <th>Category</th>
                <th>Customer Question</th>
              </tr>
            </thead>
            <tbody>
              ${questionsData.slice(0, 500).map(q => `
                <tr>
                  <td><code>#${q.questionId}</code></td>
                  <td><span class="badge badge-intent">${q.intent}.csv</span></td>
                  <td>${q.category}</td>
                  <td><b>${q.question}</b></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${totalQuestions > 500 ? `<p style="text-align: center; color: var(--muted); margin-top: 16px;">Showing top 500 of ${totalQuestions} questions from the 30 CSV files.</p>` : ''}
        </div>
      </div>

      <script>
        function switchTab(tab) {
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          if (tab === 'products') {
            document.querySelectorAll('.tab-btn')[0].classList.add('active');
            document.getElementById('products-tab').classList.add('active');
          } else {
            document.querySelectorAll('.tab-btn')[1].classList.add('active');
            document.getElementById('questions-tab').classList.add('active');
          }
        }

        function filterTable(tableId, inputId) {
          const query = document.getElementById(inputId).value.toLowerCase();
          const rows = document.getElementById(tableId).getElementsByTagName('tbody')[0].getElementsByTagName('tr');
          for (let i = 0; i < rows.length; i++) {
            const text = rows[i].innerText.toLowerCase();
            rows[i].style.display = text.includes(query) ? '' : 'none';
          }
        }
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🚀 BS3 ELECTRONICS BACKEND SERVER LIVE ON PORT ${PORT}`);
  console.log(` 🤖 KathaaAI AI Shopping Assistant Service Ready`);
  console.log(`=======================================================`);
});

module.exports = app;
