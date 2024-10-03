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
      <img id="${this.containerId}_photo" />
      <div id="${this.containerId}_name"></div>
    `;
  }

  attachEventListeners() {
    const form = this.container.querySelector(`#${this.containerId}_form`);
    form.addEventListener('submit', (event) => searchPerson(event, `${this.containerId}_input`));
  }
}