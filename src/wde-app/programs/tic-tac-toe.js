import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class TicTacToe extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/tic-tac-toe.css">
        <div class="window">
            <div class="window-head">
                <p class="window-title">Tic Tac Toe</p>
            </div>
            <div class="window-body">
                <table>
                    <tbody>
                        <tr>
                            <td>{{board}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
  }
  
    static get properties() {
        return {
                board: {
                type: Array,
                value: [
                    ['X', '0', 'X'],
                    ['0', '0', '0'],
                    ['X', '0', 'X']
                ],
            }
        };
    }

    ready(){
        super.ready();
    }
}

window.customElements.define('tic-tac-toe-app', TicTacToe);