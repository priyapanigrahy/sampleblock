const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'https://api.openai.com/v1/completions';
const API_KEY = process.env.API_KEY;

// Set up middleware
app.use('/', express.static('dist'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'dist'));

// Set up routes
app.get('/', (req, res) => {
  res.render('index', { prompt: '', message: '' });
});

app.post('/', (req, res) => {
  const prompt = req.body.prompt;
  var message = '';
  
  axios.post(API_URL, {
    prompt,
    model: "text-davinci-003",
    max_tokens: 200,
    temperature: 0
    
  }, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    message = response.data.choices[0].text.trim();
    res.render('index', { prompt, message });
  })
  .catch(error => {
    console.error(error);
    res.render('index', { prompt, message: 'An error occurred.' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
