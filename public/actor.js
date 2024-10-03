class Actor { // wowza, this is like a component in React
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <form id="${this.containerId}_form">
        <input id="${this.containerId}_input" />
        <button type="submit">Search</button>
      </form>
      <div id="${this.containerId}_name"></div>
      <img id="${this.containerId}_photo" />
    `;
  }

  setInfo(name_string, photo_string) {
    const actorName = document.getElementById(`${this.containerId}_name`);
    const actorPhoto = document.getElementById(`${this.containerId}_photo`);
    actorName.innerHTML = `${name_string}`
    actorPhoto.src = `${photo_string}`
  }

  attachEventListeners() {
    const form = this.container.querySelector(`#${this.containerId}_form`);
    form.addEventListener('submit', (event) => searchPerson(event, this));
  }
}