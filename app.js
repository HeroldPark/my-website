const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const postModel = require('./models/postModel');
const userModel = require('./models/userModel');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Middleware to pass session to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsernameAndPassword(username, password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await userModel.createUser(username, password);
  res.redirect('/login');
});

app.get('/board', async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.render('board', { posts });
});

app.post('/board', async (req, res) => {
  const { title, content } = req.body;
  if (req.session.user) {
    await postModel.createPost(title, content, req.session.user.id);
    res.redirect('/board');
  } else {
    res.redirect('/login');
  }
});

app.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await postModel.getPostById(postId);
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
