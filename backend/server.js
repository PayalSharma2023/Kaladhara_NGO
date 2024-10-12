require('dotenv').config();

const express = require('express');
const Connection = require('./config/db');
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRoutes');
const volunteerRouter = require('./routes/volunteerRoutes');
const cors = require('cors');
const cookies = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const fileUplaod = require('express-fileupload');
const path = require('path');

//express app setup
const app = express()


app.use(fileUplaod({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
}))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookies());

//connecting to db and listening on port
Connection.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`app running on http://localhost:${PORT}`)
    })
})

//routes
app.get('*', checkUser)
app.get('/', (req, res)=>{
    res.send("<div> KALADHARA NGO </div>")
})
app.use(authRouter);
app.use( '/volunteer', volunteerRouter);
