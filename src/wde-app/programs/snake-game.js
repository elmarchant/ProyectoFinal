import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { Game } from './SnakeGame/Game.js';

/**
 * @customElement
 * @polymer
 */
class SnakeGame extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/snake-game.css">
        <div class="window">
            <div class="window-head">
                <p class="window-title">Snake Game</p>
            </div>
            <div class="window-body">
                <div class="screen">
                    <canvas id="screenRenderer"></canvas>
                </div>
            </div>
        </div>
    `;
  }
  
    static get properties() {
        return {
                game: {
                type: Object,
                value: {}
            }
        };
    }

    ready(){
        super.ready();

        var screenRenderer = this.shadowRoot.getElementById('screenRenderer');
        this.game = new Game(screenRenderer);

        setInterval(()=>{
            this.game.refresh();
            if(this.game.state == 'end') this.game.newGame();
        });
    }
}

window.customElements.define('snake-game-app', SnakeGame);