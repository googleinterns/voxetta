import { LitElement, html, css } from 'lit-element';

export class VoxettaMain extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <main>
        Welcome to the Voxetta app
      </main>
    `;
  }
}

customElements.define('voxetta-main', VoxettaMain);