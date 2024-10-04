let actor1, actor2;

document.addEventListener('DOMContentLoaded', () => {
  actor1 = new Actor('actor1');
  actor2 = new Actor('actor2');
});

async function get6Degrees() {
  console.log(actor1.data.id);
  console.log(actor2.data.id);
  const sameMovies = await checkSameMovie(actor1.data.id, actor2.data.id);
  if (sameMovies) console.log('Same movies found:', sameMovies);
  else console.log('No movies found:');
}

async function makeActorsGraph(id1, id2) {
  let apiCallCount = 0;

  const movies1 = await getPersonMovieCredits(id1);
  apiCallCount++;
  const movies2 = await getPersonMovieCredits(id2);
  apiCallCount++;

  const graph = { actors: {}, movies: {} };

  const movieCredits = movies1.cast.map(movie => {
    apiCallCount++;
    return getMovieCredits(movie.id);
  })
  const movieCreditsArray = await Promise.all(movieCredits);
  
  console.log('api calls: ', apiCallCount);
  
  for (const movieCredits of movieCreditsArray) {
    // console.log('movie id:', movie.id);
    const actorMovies = movieCredits.cast.map(actor => {
      apiCallCount++;
      return getPersonMovieCredits(actor.id);
    });
    const actorMoviesArray = await Promise.all(actorMovies);
  //   for (const actor of movieCredits.cast) {
  //     // console.log('actor id:', actor.id);
  //     const actorMovies = await getPersonMovieCredits(actor.id);
  //     for (const actorMovie of actorMovies.cast) {
  //       if (!graph.actors[actor.id]) graph.actors[actor.id] = [];
  //       if (!graph.movies[actorMovie.id]) graph.movies[actorMovie.id] = [];
  //       graph.actors[actor.id].push(actorMovie.id);
  //       graph.movies[actorMovie.id].push(actor.id);
  //     }
  //   }
  }
  console.log('api calls: ', apiCallCount);

  // console.log(graph);
}
async function checkSameMovie(id1, id2) {
  console.log('checking same movie of ids: ', id1, id2);
  const movies1 = await getPersonMovieCredits(id1);
  const movies2 = await getPersonMovieCredits(id2);
  const sameMovies = movies1.cast.filter(
    movie1 => !movie1.genre_ids.some(id => id === 99) && movies2.cast.some(
      movie2 => movie1.id === movie2.id && !movie2.genre_ids.some(id => id === 99)));
  // excluding documentary movies
  return sameMovies;
}