const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(schoolRoutes);

app.get('/', (req, res) => {
    res.render('index.ejs');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
