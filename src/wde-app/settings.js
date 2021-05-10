import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Settings extends PolymerElement {
  static get template() {
    return html`
        <section>
            <h1>Plantilla</h1>
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

window.customElements.define('settings-component', Settings);