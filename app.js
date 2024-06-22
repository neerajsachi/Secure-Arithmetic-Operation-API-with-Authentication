require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
});

app.get('/add', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result });
});

app.get('/subtract', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.json({ result });
});

app.get('/multiply', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.json({ result });
});

app.get('/divide', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
        return res.status(400).json({ message: 'Cannot divide by zero' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    res.json({ result });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials - User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials - Password incorrect' });
        }

        const accessToken = jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


console.log("App running");
app.listen(3000);
