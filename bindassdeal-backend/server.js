const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

const JWT_SECRET = 'bindassdealKey';

app.use(bodyParser.json());
app.use(cors());

let users = [];
let items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Ball' },
  { id: 3, name: 'Cat' },
];

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).send({error:'Username already exists'});
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send({data:'User registered successfully'});
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'User not registered' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET);
  res.status(200).json({ token });
});


app.get('/items', verifyToken, (req, res) => {
  res.status(200).json(items);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(item => item.id == id);
  if (item) {
    item.name = name;
    res.status(200).json(item);
  } else {
    res.status(404).send('Item not found');
  }
});


app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id != id);
  res.status(200).send('Item deleted');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
