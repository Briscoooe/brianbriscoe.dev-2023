class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
          <a href="index.html" class="title">
              Brian Briscoe
          </a>
          <nav>
              <a href="index.html">Home</a>
              <a href="https://twitter.com/brianbriscoe_">Twitter</a>
              <a href="blog.html">Blog</a>
          </nav>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
