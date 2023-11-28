const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('SkyNest flying');
})

app.listen(port, () => {
    console.log(`SkyNest is flying on port ${port}`);
})