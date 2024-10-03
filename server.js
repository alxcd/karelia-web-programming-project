const express = require('express');
const app = express();
require('dotenv').config();

const {API_KEY} = process.env;
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

let configuration;
fetch('https://api.themoviedb.org/3/configuration', options)
  .then(response => response.json())
  .then(data => {
    console.log('Configuration data fetched:', data);
    configuration = data;
    })
  .catch(err => console.error(err));

// Middleware to check if the request is from a local IP address
// copilot, thanks
function checkLocalRequest(req, res, next) {
  const localIps = ['127.0.0.1', '::1'];
  if (localIps.includes(req.ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}

app.use(checkLocalRequest);

app.get('/api/search', (req, res) => {
  const {query, type} = req.query;
  const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}`;

  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => console.error(err));  
})

app.get('/api/configuration', (req, res) => {
  res.json(configuration);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});