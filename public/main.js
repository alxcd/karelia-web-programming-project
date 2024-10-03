document.addEventListener('DOMContentLoaded', () => {
  const actor1 = new Actor('actor1');
  const actor2 = new Actor('actor2');
});

let baseImageUrl;
getImageBaseUrl().then(url => {
  baseImageUrl = url;
});

function searchPerson(event, actorInstance) {
  event.preventDefault();
  const input = document.getElementById(`${actorInstance.containerId}_input`);

  console.log(input.value);
  searchApi(input.value, "person")
    .then(data => {
      console.log(data);
      const personData = data.results[0];
      actorInstance.setInfo(personData.name, `${baseImageUrl}/${personData.profile_path}`);
    });

  
}

function searchApi(query, type) {
  return fetch(`/api/search?query=${query}&type=${type}`)
    .then(response => response.json())
    .catch(err => console.error(err));  
}

function getImageBaseUrl() {
  return fetch('/api/configuration')
    .then(response => response.json())
    .then(data => {
      const imageBaseUrl = `${data.images.secure_base_url}${data.images.profile_sizes[1]}`;
      console.log('base image url', imageBaseUrl);
      return imageBaseUrl;
    })
}