const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');
const articleRoutes = require('./routes/articleRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const blogRoutes = require('./routes/blogRoutes');
const adsRoutes = require('./routes/adsRoutes');

const seoRoutes = require('./routes/seoRoutes')
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();
const app = express();
// Connect to MongoDB
connectToMongoDB();

// Create admin
// createAdmin();

// Middleware
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

// game routes
app.use('/api/games', gameRoutes);

// user Routes
app.use('/users', signupRoutes);
app.use('/auth', loginRoutes);
// blog routes
app.use('/blogs', blogRoutes);


// ads routes
app.use('/ads', adsRoutes);

// article routesZ
app.use('/articles', articleRoutes);

//seo routes
app.use('/seo', seoRoutes)


app.get("/", ((req, res) => {
    res.json({
        message: "backend is running"
    })
}))
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
