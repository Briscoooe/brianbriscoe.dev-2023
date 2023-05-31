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
              <a href="/resume" style="display: flex;flex-direction: row;align-items: center">
                Resume
                <img src="../assets/magic.svg" alt="magic" height="24" width="24" style="margin-left: 10px"/>
              </a>
          </nav>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
