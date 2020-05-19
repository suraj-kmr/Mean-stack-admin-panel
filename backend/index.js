const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true }).
catch(error => handleError(error));
// Routers
const login = require('./routers/authRouter');
const setting = require('./routers/settingRouter');

const path = require('path')
var dir = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(dir));

// Route Lists
app.use('/admin', login);
app.use('/admin/setting', setting);
// app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))