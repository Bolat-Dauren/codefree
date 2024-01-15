// codefree/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codefree', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Registration route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists. Choose a different one.');
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Render a success message with a button to redirect to editor.html
        return res.send(`
            <p>Registration successful!</p>
            <a href="/editor"><button>Go to Editor</button></a>
        `);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.send('Invalid username or password.');
        }

        // Render a success message with a button to redirect to editor.html
        return res.send(`
            <p>Login successful!</p>
            <a href="/editor"><button>Go to Editor</button></a>
        `);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/editor', (req, res) => {
    res.sendFile(__dirname + '/views/editor.html');
});

app.get('/education', (req, res) => {
    res.sendFile(__dirname + '/views/education.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});