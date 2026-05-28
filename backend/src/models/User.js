const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please secure your account with a password'],
    minlength: 6,
    select: false // Automatically hides password fields from queries
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' // Ensures regular signups don't automatically get admin rights
  },
  resetPasswordOtp: String,
  resetPasswordExpires: Date
}, { timestamps: true });

// Document Middleware: Automatically hash passwords before saving them
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified or is a new record
  if (!this.isModified('password')) return;
  
  // No next() callback parameter needed; error propagation happens naturally
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance Method: Safely verify candidate passwords
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
