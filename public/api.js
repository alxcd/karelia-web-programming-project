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
      actorInstance.setData(personData);
      if (personData.profile_path) actorInstance.setPhoto(`${baseImageUrl}/${personData.profile_path}`);
    });
}

function searchApi(query, type) {
  return fetch(`/api/search?query=${query}&type=${type}`)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function getImageBaseUrl(type) {
  return fetch('/api/configuration')
    .then(response => response.json())
    .then(data => {
      const imageBaseUrl = type === 'movie' 
        ? `${data.images.secure_base_url}${data.images.poster_sizes[1]}`
        : `${data.images.secure_base_url}${data.images.profile_sizes[1]}`;
      console.log('base image url', imageBaseUrl);
      return imageBaseUrl;
    });
}

function getPerson(personId) {
  return fetch(`/api/person/${personId}`)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function getPersonMovieCredits(personId) {
  return fetch(`/api/person/${personId}/movie_credits`)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function getMovie(movieId) {
  return fetch(`/api/movie/${movieId}`)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function getMovieCredits(movieId) {
  return fetch(`/api/movie/${movieId}/credits`)
    .then(response => response.json())
    .catch(err => console.error(err));
}