import { LitElement, html, css } from "/js-library/lit-all.min.js";


class Root extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  // Declare reactive properties
  name = "World";

  // Render the UI as a function of component state
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

const tagName = "app-root";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Root);
}
