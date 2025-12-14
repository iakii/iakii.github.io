import { LitElement, html, css } from "/js-library/lit-all.min.js";

class SimpleGreeting extends LitElement {
  // 虽然通常是默认的，但在某些场景下可配合其他设置使用
//   static shadowRootOptions = { mode: "close", delegatesFocus: false };

  static properties = {
    visible: { state: true },
  };

  constructor() {
    super();
    this.visible = true;
  }

     createRenderRoot() {
      return this; // 默认返回 this.attachShadow({ mode: 'open' });
    }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .bi {
      color: red;
    }
  `;

  // Declare reactive properties
  name = "World";

  // Render the UI as a function of component state
  render() {
    return html` <div class="row">
      <div class="col">
        <nav class="nav flex-column">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
          <a class="nav-link" href="#">Link</a>
          <a class="nav-link" href="#">Link</a>
          <a class="nav-link disabled">Disabled</a>
        </nav>
      </div>
      <div class="col-md-auto">Variable width content</div>
    </div>`;
  }
}

const tagName = "app-root";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, SimpleGreeting);
}
