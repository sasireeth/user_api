const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');

const app = express();
app.use(bodyParser.json());

let users = [];
let idCounter = 1;
const apiKey = '12345';

const apiKeyValidation = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key && key === apiKey) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};


const validateUserData = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
    } else if (!validator.isEmail(email)) {
      res.status(400).json({ error: 'Invalid email format' });
    } else {
      next();
    }
  };


const checkUsernameUnique = (req, res, next) => {
    const { name } = req.body;
    const existingUser = users.find(u => u.name === name && u.id !== req.params.id);
    if (existingUser) {
      res.status(409).json({ error: 'Username already exists' });
    } else {
      next();
    }
};  

const checkUserExists = (req, res, next) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    req.user = user; 
    next();
  }
};

app.use(apiKeyValidation); 

// Create User
app.post('/users', [validateUserData,checkUsernameUnique], (req, res, next) => {
  try {
    const user = { id: idCounter++, ...req.body };
    users.push(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Read User
app.get('/users/:id', checkUserExists, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

// Update User
app.put('/users/:id', [checkUserExists, validateUserData,checkUsernameUnique], (req, res, next) => {
  try {
    const updatedUser = { id: req.user.id, ...req.body };
    users = users.map(u => (u.id === req.user.id ? updatedUser : u));
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// Delete User
app.delete('/users/:id', checkUserExists, (req, res, next) => {
  try {
    users = users.filter(u => u.id !== req.user.id);
    res.status(200).json({message:"User deleted successfully"});
  } catch (err) {
    next(err);
  }
});


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({
    error: {
      message,
      stack: err.stack,
    }
  });
};

app.use(errorHandler); 

app.listen(3000, () => console.log('Server running on port 3000'));
