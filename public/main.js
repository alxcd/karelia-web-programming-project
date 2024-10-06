let actor1, actor2;

document.addEventListener('DOMContentLoaded', () => {
  actor1 = new Actor('actor1');
  actor2 = new Actor('actor2');
});

function renderCheckButton() {
  if (document.getElementById('6degrees') == null && actor1.data && actor2.data) {
    const actorsContainer = document.querySelector('.actors');
    const checkButton = document.createElement('button');
    checkButton.id = '6degrees';
    checkButton.textContent = 'Check';
    checkButton.onclick = () => get6Degrees();
    actorsContainer.insertBefore(checkButton, actorsContainer.children[1]);
  }
}

async function get6Degrees() {
  console.log(actor1.data.id);
  console.log(actor2.data.id);
  const sameMovies = await checkSameMovie(actor1.data.id, actor2.data.id);
  if (sameMovies) {
    console.log('Same movies found:', sameMovies);
  }
  else {
    const path = await makeActorsGraph(actor1.data.id, actor2.data.id);
    if (path && path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        if (i % 2 === 0) {
          result = (await getPerson(path[i])).name;
        }
        else {
          result = (await getMovie(path[i])).title;
        }
        console.log(result);
      }
    }
    else console.log("no movies found");
  }
}

async function makeActorsGraph(id1, id2) {
  let apiCallCount = 0;

  const graph = { actors: {}, movies: {} };

  // Update graph with initial actors' movies recursively
  await updateGraphRecursively(graph, id1, 0, 1, apiCallCount);
  await updateGraphRecursively(graph, id2, 0, 1, apiCallCount);

  const path = findShortestPath(graph, id1, id2);
  console.log(path);
  console.log(graph);

  return path;
}

async function updateGraphRecursively(graph, actorId, depth = 0, maxDepth = 1, apiCallCount = 0) {
  if (depth > maxDepth) return;
  // smallest depth is actor > movies > actor
  // so with depth 1 it should be actor > movies > actor > movies > actor

  const movies = await getPersonMovieCredits(actorId);
  const filteredMovies = movies.cast.filter(movie => !movie.genre_ids.includes(99));
  apiCallCount++;
  
  // Add actor's movies to the graph
  for (const movie of filteredMovies.slice(0, 5)) {
    if (!graph.actors[actorId]) graph.actors[actorId] = [];
    if (!graph.movies[movie.id]) graph.movies[movie.id] = [];
    graph.actors[actorId].push(movie.id);
    graph.movies[movie.id].push(actorId);
    
    const movieCredits = filteredMovies.slice(0, 5).map(movie => {
      apiCallCount++;
      return getMovieCredits(movie.id);
    });

    // get main(top5) cast of all actor's movies
    const movieCreditsArray = await Promise.all(movieCredits);
    const actorPromises = [];
    for (const movieCredits of movieCreditsArray) {
      for (const actor of movieCredits.cast.slice(0, 5)) {
        if (!graph.actors[actor.id]) {
          actorPromises.push(updateGraphRecursively(graph, actor.id, depth + 1, maxDepth, apiCallCount));
        }
      }
    }
    await Promise.all(actorPromises);
    console.log('api calls: ', apiCallCount);
  }
}

async function checkSameMovie(id1, id2) {
  console.log('checking same movie of ids: ', id1, id2);
  const movies1 = await getPersonMovieCredits(id1);
  const movies2 = await getPersonMovieCredits(id2);
  const sameMovies = movies1.cast.filter(
    movie1 => !movie1.genre_ids.some(id => id === 99) && movies2.cast.some(
      movie2 => movie1.id === movie2.id && !movie2.genre_ids.some(id => id === 99)));
  // excluding documentary movies
  return sameMovies.length > 0 ? sameMovies : null;
}

// this a copypaste from copilot. sorry. might be even wrong
function findShortestPath(graph, startActorId, targetActorId) {
  if (startActorId === targetActorId) return [startActorId];

  const queue = [startActorId];
  const visited = new Set();
  const paths = { [startActorId]: [startActorId] };

  while (queue.length > 0) {
    const currentActorId = queue.shift();
    const currentPath = paths[currentActorId];

    // Get all movies the current actor has acted in
    const movies = graph.actors[currentActorId] || [];

    for (const movieId of movies) {
      // Get all actors in the same movie
      const actors = graph.movies[movieId] || [];

      for (const actorId of actors) {
        if (visited.has(actorId)) continue;

        // Create a new path to this actor
        const newPath = [...currentPath, movieId, actorId];
        paths[actorId] = newPath;

        // If we found the target actor, return the path
        if (actorId === targetActorId) {
          return newPath;
        }

        // Mark the actor as visited and add to the queue
        visited.add(actorId);
        queue.push(actorId);
      }
    }
  }

  return null;
}