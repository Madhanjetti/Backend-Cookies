const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware to parse form data and cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route to display the form
app.get('/', (req, res) => {
  res.send(`
    <h2>Enter Your Details</h2>
    <form action="/set-details" method="POST">
      <label>Enter your name:</label><br/>
      <input type="text" name="name" placeholder="e.g., John Doe" required/><br/><br/>
      <label>Enter your email:</label><br/>
      <input type="email" name="email" placeholder="e.g., john@example.com" required/><br/><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to set the name and email in cookies
app.post('/set-details', (req, res) => {
  const { name, email } = req.body;
  
  // Set cookies for name and email
  res.cookie('name', name, { maxAge: 900000, httpOnly: true });
  res.cookie('email', email, { maxAge: 900000, httpOnly: true });
  
  res.send(`Cookies set: Name = ${name}, Email = ${email}. <a href="/show-details">Check Details</a>`);
});

// Route to display the stored cookies
app.get('/show-details', (req, res) => {
  const { name, email } = req.cookies;

  if (name && email) {
    res.send(`
      <h2>Your Details</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <a href="/">Go Back</a> | <a href="/clear-details">Clear Cookies</a>
    `);
  } else {
    res.send('No details found. <a href="/">Go Back</a>');
  }
});

// Route to clear the cookies
app.get('/clear-details', (req, res) => {
  res.clearCookie('name');
  res.clearCookie('email');
  res.send('Cookies cleared. <a href="/">Go Back</a>');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
