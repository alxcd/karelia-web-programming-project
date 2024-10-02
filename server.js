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

const configuration = fetch('https://api.themoviedb.org/3/configuration', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


console.log(configuration);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});