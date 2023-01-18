const express = require('express');
const { PORT } = require('./data/constants');
const userRoutes = require('./routes/user.routes');
const { connectDB } = require('./utils/database');

const app = express();

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/users', userRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server started in port: ${PORT}`);
});