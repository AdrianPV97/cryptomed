const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});