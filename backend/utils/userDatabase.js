const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory and default seeded accounts exist
const ensureDatabaseExists = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const salt = bcrypt.genSaltSync(10);
    const defaultUsers = [
      {
        _id: 'usr_admin_01',
        name: 'BS3 Admin',
        email: 'admin@bs3electronics.in',
        password: bcrypt.hashSync('admin123', salt),
        role: 'admin',
        createdAt: new Date('2026-07-01T10:00:00.000Z').toISOString(),
        storageSource: 'Local Database (users.json)'
      },
      {
        _id: 'usr_tanmay_02',
        name: 'Tanmay Sharma',
        email: 'tanmay@bs3electronics.in',
        password: bcrypt.hashSync('tanmay123', salt),
        role: 'user',
        createdAt: new Date('2026-07-15T14:30:00.000Z').toISOString(),
        storageSource: 'Local Database (users.json)'
      },
      {
        _id: 'usr_customer_03',
        name: 'Kathaa AI Demo Customer',
        email: 'customer@bs3electronics.in',
        password: bcrypt.hashSync('customer123', salt),
        role: 'user',
        createdAt: new Date('2026-07-20T09:15:00.000Z').toISOString(),
        storageSource: 'Local Database (users.json)'
      }
    ];

    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultUsers, null, 2), 'utf8');
    console.log('✅ Local User Database initialized at:', DATA_FILE);
  }
};

const getLocalUsers = () => {
  try {
    ensureDatabaseExists();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading local users DB:', error.message);
    return [];
  }
};

const saveLocalUsers = (users) => {
  try {
    ensureDatabaseExists();
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing local users DB:', error.message);
  }
};

const findLocalUserByEmail = (email) => {
  if (!email) return null;
  const users = getLocalUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

const findLocalUserById = (id) => {
  if (!id) return null;
  const users = getLocalUsers();
  return users.find(u => u._id === id);
};

const createLocalUser = ({ name, email, password, role = 'user' }) => {
  const users = getLocalUsers();

  // Check if exists
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return existing;
  }

  // Hash password using bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = {
    _id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role: role || 'user',
    createdAt: new Date().toISOString(),
    storageSource: 'Local Database (users.json)'
  };

  users.push(newUser);
  saveLocalUsers(users);
  return newUser;
};

module.exports = {
  getLocalUsers,
  findLocalUserByEmail,
  findLocalUserById,
  createLocalUser
};
