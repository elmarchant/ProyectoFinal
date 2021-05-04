import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Home extends PolymerElement {
  static get template() {
    return html`
        <section>
            <h1>home</h1>
        </section>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'home'
      }
    };
  }
}

window.customElements.define('home-component', Home);