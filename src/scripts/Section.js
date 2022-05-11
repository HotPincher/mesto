export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(`${containerSelector}`);
  }

  addItem(item, order = 'before') {
    order === 'before' ? this._container.append(card) : this._container.prepend(card);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

}