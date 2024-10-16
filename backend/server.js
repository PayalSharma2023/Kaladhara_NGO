require('dotenv').config();

const express = require('express');
const DbConnect = require('./config/db');
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');
const adminRouter = require('./routes/adminRoutes');
const cookies = require('cookie-parser');
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
app.use(cookies());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})


//routes
app.get('/', (req, res)=>{
    res.send("<div> KALADHARA NGO </div>")
})
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.use('/admin', adminRouter);


//connecting to db and listening on port
const PORT = process.env.PORT || 3000;
DbConnect().then(
    app.listen(PORT, ()=>{
        console.log(`server is running at port ${PORT}`)
    })
)