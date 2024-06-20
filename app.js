// index.js

const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to restrict access during working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours();

    // Check if it's Monday to Friday and between 9 AM to 5 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9:00 AM to 5:00 PM).');
    }
};

// Middleware for serving static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home', { pageTitle: 'Home' });
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services', { pageTitle: 'Our Services' });
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact', { pageTitle: 'Contact Us' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
