const express = require('express');
const app = express();
require('dotenv').config();

const {API_KEY} = process.env;
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/search', (req, res) => {
  const {query, type} = req.query;
  const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));  
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});