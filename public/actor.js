class Actor { // wowza, this is like a component in React
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.data = null;
    this.photoUrl = null;
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <form id="${this.containerId}_form">
        <input id="${this.containerId}_input" />
        <button type="submit">Search</button>
        <div class="actor-info">
          <div id="${this.containerId}_name" class="actor-name"></div>
          <img id="${this.containerId}_photo" class="actor-photo"/>
        </div>
      </form>
    `;
  }

  setPhoto(photo_string) {
    this.photoUrl = photo_string;
    const actorPhoto = document.getElementById(`${this.containerId}_photo`);
    actorPhoto.src = photo_string;
  }

  setData(data) {
    this.data = data;
    const actorName = document.getElementById(`${this.containerId}_name`);
    actorName.innerHTML = `${data.name}`;
    renderCheckButton();
  }

  attachEventListeners() {
    const form = this.container.querySelector(`#${this.containerId}_form`);
    form.addEventListener('submit', (event) => searchPerson(event, this));
  }
}