import { data } from "./data.js";

export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(card, location = "before") {

    location === 'before' ? this._container.append(card) : this._container.prepend(card)
  }
}