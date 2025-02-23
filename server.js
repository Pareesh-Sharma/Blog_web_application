const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let postId = 1;

app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
      posts.push({ id: postId++, title, content });
    }
    res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
      res.render('edit', { post });
    } else {
      res.redirect('/');
    }
});
  
app.post('/posts/:id/edit', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
      post.title = req.body.title;
      post.content = req.body.content;
    }
    res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id);
    res.redirect('/');
});  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 

