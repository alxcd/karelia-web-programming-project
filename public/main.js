function searchPerson(id) {
  const person = document.getElementById(id);
  console.log(person.value);
  searchApi(person.value, "person");
}


function searchApi(query, type) {
  fetch(`/api/search?query=${query}&type=${type}`)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));  
}

