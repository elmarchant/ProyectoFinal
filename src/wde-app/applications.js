import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Applications extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/applications.css">
        <section class="applications">
            <div class="centered-block">
              <h1 style="text-align: center;">Aplicaciones</h1>
              <hr>
              <div class="inner-block">
              </div>
            </div>
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