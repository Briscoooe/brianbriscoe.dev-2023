class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
          <a href="/" class="title">
              Brian Briscoe
          </a>
          <nav>
              <a href="/">Home</a>
              <a href="https://twitter.com/brianbriscoe_">Twitter</a>
              <a href="/blog">Blog</a>
              <a href="/resume">Resume</a>
          </nav>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
