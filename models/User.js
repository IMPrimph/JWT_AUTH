const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

// fire a function after a doc has been saved to database
userSchema.post('save', function (doc, next) {
    console.log('New user was created and saved')
    next()
})

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    console.log('User about to be created and saved', this)
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User;