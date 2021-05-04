import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Applications extends PolymerElement {
  static get template() {
    return html`
        <section>
            <h1>Applications</h1>
        </section>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Plantilla'
      }
    };
  }
}

window.customElements.define('applications-component', Applications);