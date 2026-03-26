class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  render() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    const container = document.querySelector(this._selector);
    container.append(element);
  }
}

export default Section;
