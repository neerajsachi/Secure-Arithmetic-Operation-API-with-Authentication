require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.json());


app.get('/add',authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result });
})

app.get('/subtract', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.json({ result });
})

app.get('/multiply', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.json({ result });
})

app.get('/divide', authenticateToken, (req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
        return res.status(400).json({ message: 'Cannot divide by zero' });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    res.json({ result });
});

app.post('/login', (req, res) =>
{
    const username= req.body.username
    const user={ name : username }
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken : accessToken })
})


function authenticateToken(req, res, next){
    const authHeader =  req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}



app.listen(3000)