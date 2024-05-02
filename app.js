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
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const attendanceRouter = require('./routes/attendance.routes');


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
app.use('/attendance', attendanceRouter);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));


// Item Schema and Model
const itemSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  image: String,
  name: String,
  position: String,
  department: String,
  shift: String,
  email: String,
  phone: String,
  date:String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  leaveStartDate: String,
  leaveEndDate: String,
  numberOfDays: Number,
  leaveType:String,
  salary: Number,
  bonus: Number,
  totalcompensation: Number,
}
,{
  timestamps:true
}
);



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
    date:req.body.date,
    leaveStartDate: req.body.leaveStartDate,
    leaveEndDate: req.body.leaveEndDate,
    numberOfDays: req.body.numberOfDays,
    leaveType:req.body.leaveType,
    salary:req.body.salary,
    bonus:req.body.bonus,
    totalcompensation:req.body.totalcompensation,
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

app.patch('/items/:id', upload.single('image'), (req, res, next) => {
  const itemId = req.params.id;
  
  // Find the item by ID
  Item.findById(itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Update item fields based on request body
      item.employeeId = req.body.employeeId;
      item.name = req.body.name;
      item.position = req.body.position;
      item.department = req.body.department;
      item.shift = req.body.shift;
      item.email = req.body.email;
      item.phone = req.body.phone;
      item.date = req.body.date;
      item.leaveStartDate = req.body.leaveStartDate;
      item.leaveEndDate = req.body.leaveEndDate;
      item.numberOfDays = req.body.numberOfDays;
      item.leaveType = req.body.leaveType;
      item.status = req.body.status || 'Pending';

      // Update image if provided
      if (req.file) {
        item.image = req.file.path.replace('src', '');
      }

      // Save the updated item
      return item.save();
    })
    .then(updatedItem => {
      res.send(updatedItem);
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


// Scheems for employee training
const TrainingSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: String,
  department: String,
  trainingprogram:  String,
  certification:String,
  completiondate:String
});
const  EmployeeTraining=mongoose.model('EmployeeTraining', TrainingSchema);
// create a new  record of employee training
app.post("/trainings", (req,res)=>{
  const  employeeTrainingRecord=new EmployeeTraining({
    employeeId : req.body.employeeId ,
    name: req.body.name,
    department: req.body.department,
    trainingprogram: req.body.trainingprogram,
    certification:req.body.certification,
    completiondate:req.body.completiondate
  });
  employeeTrainingRecord.save()
   .then(Training=>{
    res.status(201).json(Training);
   })

});

// get all records of employee training
app.get( "/trainings" , (req,res) =>{
  EmployeeTraining.find()
    .then(Training =>{
      res.send(Training);
    })
});


// Get all trainings of an employee

// Schema for employee recruitment
const RecruitmentSchema = new mongoose.Schema({
  jobtitle: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  posteddate: { type: String, required: true },
  status: { type: String, required: true }
});

const EmployeesRecruitment = mongoose.model('EmployeesRecruitment', RecruitmentSchema);

// Endpoint to create a new record of employee recruitment
app.post("/recruitments", (req, res) => {
  const employeesRecruitmentRecord = new EmployeesRecruitment({
    jobtitle: req.body.jobtitle,
    department: req.body.department,
    location: req.body.location,
    posteddate: req.body.posteddate,
    status: req.body.status
  });

  employeesRecruitmentRecord.save()
    .then(Recruitment => {
      res.status(201).json(Recruitment);
    })
    
});

// Endpoint to get all records of employee recruitment
app.get("/recruitments", (req, res) => {
  EmployeesRecruitment.find()
    .then(Recruitment => {
      res.send(Recruitment);
    })
    
});



// Routes for managing items




// Routes for managing items

// Define nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hospital.hrm.00@gmail.com',
    pass: 'jazq ulbx nzme naes'
  }
});
// Function to send email
function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'hospital.hrm.00@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Update item status to 'Approved' and send email notification
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
      // Send email notification
      const to = updatedItem.email; // Retrieve email from the updated item
      const subject = 'Leave Request Status Notification';
      const text = `
        Subject: Leave Request Status Notification\n\n
        Dear ${updatedItem.name},\n\n
        Your leave request has been Approved.\n\n
        Details:\n
        - leave Start Date:- ${updatedItem.leaveStartDate}
        - leave End Date:- ${updatedItem.leaveEndDate}
        - Type:- ${updatedItem.leaveType}
        - Duration:- ${updatedItem.numberOfDays} Days \n\n
        Thank you.\n\n
        Best Regards,\n
        Hospital hrms
      `;
      sendEmail(to, subject, text);

      res.json(updatedItem);
    })
    .catch(next);
});

// Update item status to 'Rejected' and send email notification
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
      // Send email notification
      const to = updatedItem.email; // Retrieve email from the updated item
      const subject = 'Leave Request Status Notification';
      const text = `
        Subject: Leave Request Status Notification\n\n
        Dear ${updatedItem.name},\n\n
        Your leave request has been Rejected.\n\n
        Details:\n
        - leave Start Date:- ${updatedItem.leaveStartDate}
        - leave End Date:- ${updatedItem.leaveEndDate}
        - Type:- ${updatedItem.leaveType}
        - Duration:- ${updatedItem.numberOfDays} Days \n\n
        Thank you.\n\n
        Best Regards,\n
        Hospital hrms
      `;
      sendEmail(to, subject, text);

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
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate and return JWT token
  const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Route for fetching user details
// Route for fetching user data without authentication
// Route for fetching user data without authentication
app.get('/user', (req, res) => {
  // Fetch user data from the database or any other source
  // For example, if you're using MongoDB:
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});



// Logout route (optional)
app.post('/logout', (req, res) => {
  // Your logout logic here (if any)
  res.sendStatus(200);
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

// Route for initiating password reset
app.post('/users/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Generate a one-time password
    const otp = speakeasy.totp({
      secret: 'your_secret_key', // Replace with your secret key or generate one dynamically
      digits: 6, // Number of digits for the OTP
      step: 60 * 5 // Time step in seconds (5 minutes expiry)
    });

    // Set the OTP and expiry in the user document
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 300000; // 5 minutes expiry
    await user.save();
    
    // Send email with the OTP
    const mailOptions = {
      from: 'hospital.hrm.00@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nYour OTP (One-Time Password) is: ${otp}\n\nPlease use this OTP to reset your password. To reset your password, send a POST request to /users/reset-password/${otp} with the new password.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//// Route for resetting password using OTP
app.post('/users/reset-password/:otp', async (req, res) => {
  try {
    const { otp } = req.params;
    const { newPassword } = req.body;
    // Validate OTP
    const isValidOTP = speakeasy.totp.verify({
      secret: 'your_secret_key', // Replace with your secret key
      encoding: 'base32',
      token: otp,
      window: 6 // Allow a time window of 6 intervals (30 seconds each) for OTP validation
    });
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Reset password
    const user = await User.findOne({ resetPasswordOTP: otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    // Set new password and clear reset OTP fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOTP = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});










// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
