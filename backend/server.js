const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("<div> KALADHARA NGO </div>")
})

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})