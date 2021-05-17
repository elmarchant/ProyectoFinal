import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Settings extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/settings.css">
        <div class="window">
          <div class="window-head">
            <p class="window-title">Settings</p>
          </div>
          <div class="window-body">
            <section>
              <h1>Configuración</h1>
              <hr>
              <table class="settings-table">
                <tbody>
                  <tr>
                    <td class="setting-description">Imagen de fondo de pantalla</td>
                    <td class="setting-action">
                      <div class="file-image">
                        <label id="bg-image-label" for="setBGImage" class="image-label">
                          <input type="file" id="setBGImage" accept="image/png, image/jpeg"/>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="setting-description">Ubicación del Dock</td>
                    <td class="setting-action">
                      <select class="shell-select" id="dock-position">
                        <option value="top-dock">Arriba</option>
                        <option value="bottom-dock">Abajo</option>
                        <option value="left-dock">Izquierda</option>
                        <option value="right-dock">Derecha</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Plantilla'
      },
      backgroundSettings: {
        type: Object,
        value: {
          mainComponent: document.querySelector('wde-app')
        }
      }
    };
  }

  setBackground(event){
    var parent = event.target.parentElement;
    var file = event.target.files[0];
    var reader = new FileReader();
    var component = this.backgroundSettings.mainComponent;

    reader.readAsDataURL(file);

    reader.onloadend = function(){
      localStorage.setItem('backgroundImage', JSON.stringify({
        name: file.name,
        dataURL: reader.result
      }));

      component.setBackground();
      component.showBackground();
    }

    parent.querySelector('img').src = URL.createObjectURL(file);
  }

  ready(){
    super.ready();

    var dockPosition = this.shadowRoot.querySelector('#dock-position');
    var options = dockPosition.querySelectorAll('option');

    options.forEach(item => {
      if(item.value == localStorage.getItem('dockPosition')){
        item.setAttribute('selected', '');
      }
    });

    this.shadowRoot.querySelector('#bg-image-label').innerHTML += `<img draggable="false" src="${this.backgroundSettings.mainComponent.backgroundImage.source}"/>`;
    
    this.shadowRoot.querySelector('#setBGImage').addEventListener('input', (event)=>{
      this.setBackground(event);
    });

    dockPosition.addEventListener('input', (event)=>{
      localStorage.setItem('dockPosition', dockPosition.value);
      document.querySelector('wde-app').setDockPosition();
    });
  }
}

window.customElements.define('settings-component', Settings);