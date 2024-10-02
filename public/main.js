function searchPerson(input_id) {
  const person = document.getElementById(input_id);
  console.log(person.value);
  searchApi(person.value, "person")
    .then(data => {console.log(data)});
}

function searchApi(query, type) {
  return fetch(`/api/search?query=${query}&type=${type}`)
    .then(response => response.json())
    .catch(err => console.error(err));  
}

function getImage() {

}