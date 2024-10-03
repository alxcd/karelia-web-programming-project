document.addEventListener('DOMContentLoaded', () => {
  new Actor('actor1');
  new Actor('actor2');
});

function searchPerson(event, input_id) {
  event.preventDefault();
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

function getImageUrl() {
  fetch('/api/configuration')
    .then(data => {
      const imageBaseUrl = `${data.images.secure_base_url}/${data.images.profile_sizes[0]}`;
      console.log('base image url', imageBaseUrl);
    })
}