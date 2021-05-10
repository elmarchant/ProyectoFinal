import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { program } from './programs.js';

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
            <h1 class="formattedH1">Aplicaciones</h1>
            <hr>
            <div class="inner-block">
              <ul class="app-list">
                <dom-repeat items="{{apps}}">
                  <template>
                    <li>
                      <a aria-label="{{item.name}}" draggable="false" href="{{item.uri}}">
                        <div class="icon">
                          <img draggable="false" src="{{item.icon}}" />
                        </div>
                        <div class="text">{{item.name}}</div>
                      </a>
                    </li>
                  </template>
                </dom-repeat>
              </ul>
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
      },
      apps: {
        type: Array,
        value: program
      }
    };
  }
}

window.customElements.define('applications-component', Applications);