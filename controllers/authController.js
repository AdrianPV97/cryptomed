const { createUser, findUserByUsername } = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { fname, lname, password } = req.body;
    const userId = await createUser(fname, lname, password);
    res.redirect('/login');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error registering new user.');
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials.');
    }
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/login');
  });
};
