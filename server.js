require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { promises: fsPromises } = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Item Schema and Model
const itemSchema = new mongoose.Schema({
  employeeId: String,
  image: String,
  name: String,
  position: String,
  department: String,
  shift: String,
  email: String,
  phone: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});

const Item = mongoose.model('Item', itemSchema);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const dest = 'src/assets/';
    try {
      await fsPromises.mkdir(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, dest);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});
const upload = multer({ storage: storage });

// Routes for managing items

// Create a new item
app.post('/items', upload.single('image'), (req, res, next) => {
  const newItem = new Item({
    employeeId: req.body.employeeId,
    image: req.file ? req.file.path.replace('src', '') : null,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    shift: req.body.shift,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status || 'Pending' // Set status to 'Pending' by default
  });

  newItem.save()
    .then(item => {
      res.status(201).send(item);
    })
    .catch(next);
});


app.get('/items', (req, res, next) => {
  Item.find()
    .then(items => {
    res.send(items);
  })
  .catch(next);
});

app.get('/items/:id', (req, res, next) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    })
    .catch(next);
});

app.patch('/items/:id', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(item => {
      res.send(item);
    })
    .catch(next);
});

app.delete('/items/:id', (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ message: 'Item Deleted' });
    })
    .catch(next);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: {
      message: err.message || 'Something broken',
      stack: err.stack || null
    }
  });
});
// Routes for managing items
// Routes for managing items

// Update item status to 'Approved'
app.put('/items/:id/approve', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true })
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      item.status = 'Approved'; // Update item status in the returned object
      return item.save(); // Save the updated item in the database
    })
    .then(updatedItem => {
      res.json(updatedItem);
    })
    .catch(next);
});

// Update item status to 'Rejected'
app.put('/items/:id/reject', (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true })
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      item.status = 'Rejected'; // Update item status in the returned object
      return item.save(); // Save the updated item in the database
    })
    .then(updatedItem => {
      res.json(updatedItem);
    })
    .catch(next);
});






// Routes for user authentication
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// Route for user login
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user registration
app.post('/users/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
