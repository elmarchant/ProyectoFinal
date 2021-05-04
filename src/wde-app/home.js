import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Home extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="./src/style/home.css">
      <section class="home">
          <div class="clock">
            <div class="time">[[time]]</div>
            <div class="date">[[date]]</div>
          </div>
      </section>
    `;
  }
  static get properties() {
    return {
      time: {
        type: String,
        value: ''
      },
      date: {
        type: String,
        value: ''
      }
    };
  }

  ready(){
    super.ready();

    setInterval(()=>{
      var dateData = new Date();
      var data = {
        mes: [
          'enero', 
          'febrero',
          'marzo',
          'abril',
          'mayo',
          'junio',
          'julio',
          'agosto',
          'septiembre',
          'octubre',
          'noviembre',
          'diciembre'
        ],
        dia: [
          'domingo',
          'lunes',
          'martes',
          'miércoles',
          'jueves',
          'viernes',
          'sábado'
        ]
      };
      this.time = `${dateData.getHours()}:${dateData.getMinutes().toString().padStart(2, '0')}`;
      this.date = `${data.dia[dateData.getDay()]}, ${dateData.getDate()} de ${data.mes[dateData.getMonth()]} de ${dateData.getFullYear()}`;
    });
  }

}

window.customElements.define('home-component', Home);