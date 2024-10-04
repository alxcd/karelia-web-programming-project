let actor1, actor2;

document.addEventListener('DOMContentLoaded', () => {
  actor1 = new Actor('actor1');
  actor2 = new Actor('actor2');
});


async function get6Degrees() {
  console.log(actor1.data.id);
  console.log(actor2.data.id);
  const sameMovies = await checkSameMovie(actor1.data.id, actor2.data.id);
  console.log('Same movies found:', sameMovies);
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