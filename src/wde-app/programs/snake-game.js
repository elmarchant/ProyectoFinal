import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { Game } from './SnakeGame/Game.js';
import '@polymer/polymer/lib/elements/dom-if.js';

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
                <section class="stats">
                    <div class="controls">
                        <button type="button" on-click="pausePlay">
                            <template is="dom-if" if="{{pause}}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>
                            </template>
                            <template is="dom-if" if="{{!pause}}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                                </svg>
                            </template>
                        </button>
                        <button type="button" on-click="restart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="score">
                        <h1>Puntos: [[score]]</h1>
                        <h1>Puntuación máxima: [[maxScore]]</h1>
                    </div>
                </section>
            </div>
        </div>
    `;
  }
  
    static get properties() {
        return {
                game: {
                type: Object,
                value: {}
            },
            score: {
                type: Number,
                value: 0
            },
            maxScore: {
                type: Number,
                value: 0
            },
            pause: {
                type: Boolean,
                value: false
            }
        };
    }

    pausePlay(handler=true){
        if(handler) this.game.switchState();
        if(this.game.state == 'pause'){
            this.pause = true;
        }else{
            this.pause = false;
        }
    }

    restart(){
        this.game.newGame();
    }

    ready(){
        super.ready();

        var screenRenderer = this.shadowRoot.getElementById('screenRenderer');
        this.game = new Game(screenRenderer);

        setInterval(()=>{
            this.game.refresh();
            this.score = this.game.getScore();
            this.maxScore = this.game.getHighScore();
            if(this.game.state == 'pause') this.pause == true;
            if(this.game.state == 'play') this.pause == false;
        });

        document.addEventListener('keydown', (event)=>{
            if(!event.repeat){
                if(event.key == 'r') this.restart();
                if(event.key == ' ') this.pausePlay();
            }
        });
    }
}

window.customElements.define('snake-game-app', SnakeGame);