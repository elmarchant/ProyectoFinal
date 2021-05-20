import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class WebPaint extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/web-paint.css">
        <div class="window">
            <div class="window-head">
                <p class="window-title">Web Paint - [[title]]</p>
            </div>
            <div class="window-body">
                <section class="controls">
                    <button class="option-btn" on-click="switchMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </button>
                    <label for="upload-image" class="option-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <input type="file" accept="image/png, image/jpeg, image/bmp" id="upload-image">
                    </label>
                    <button on-click="saveImage" class="option-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16">
                            <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/>
                        </svg>
                    </button>
                    <!--<button class="option-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>-->
                    <button class="option-btn" on-click="clearImage">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </button>
                </section>
                <section id="workspace" class="workspace">
                    <canvas id="canvas" height="[[height]]" width="[[width]]"></canvas>
                </section>
                <section id="side-bar" class="side-bar hide-item">
                    <div class="slot">
                        <div class="slot-title">Título</div>
                        <div class="slot-body">
                            <input class="text-field" type="text" on-input="setTitle"/>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="slot-title">Anchura de imagen</div>
                        <div class="slot-body">
                            <label class="type-number-field">
                                <input id="width" type="number" min="1"/>
                                <div class="type-name">px</div>
                            </label>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="slot-title">Altura de imagen</div>
                        <div class="slot-body">
                            <label class="type-number-field">
                                <input id="height" type="number" min="1"/>
                                <div class="type-name">px</div>
                            </label>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="slot-title">Grosor del pincel</div>
                        <div class="slot-body">
                            <label class="type-number-field">
                                <input id="lineWidth" type="number" min="1"/>
                                <div class="type-name">px</div>
                            </label>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="slot-title">Color del pincel</div>
                        <div class="slot-body">
                            <input id="lineColor" class="color-field" type="color"/>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="slot-title">Tipo</div>
                        <div class="slot-body">
                            <select class="select-field">
                                <option value="brush" >Pincel</option>
                                <option value="eraser">Borrador</option>
                            </select>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
  }
    static get properties() {
        return {
            title: {
                type: String,
                value: 'Sin título'
            },
            drawing: {
                type: Boolean,
                value: false
            },
            mouse: {
                type: Object,
                value: {
                    x: 0,
                    y: 0,
                    px: 0,
                    py: 0,
                    resetPreviews(){
                        this.px = 0;
                        this.py = 0;
                    }
                }
            },
            width: {
                type: Number,
                value: 640
            },
            height: {
                type: Number,
                value: 360
            },
            options: {
                type: Object,
                value: {
                    lineWidth: 2,
                    lineColor: '#000000',
                    eraser: false,
                }
            }
        };
    }

    switchMenu(){
        var sideBar = this.shadowRoot.querySelector('#side-bar');

        if(sideBar.classList.contains('hide-item')){
            sideBar.classList.remove('hide-item');
        }else{
            sideBar.classList.add('hide-item');
        }
    }

    draw(ctx, x, y, px=0, py=0){
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = this.options.lineColor;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.lineWidth = this.options.lineWidth;
        ctx.stroke();
    }

    clearImage(){
        var canvas = this.shadowRoot.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
    }

    drawingHandle(event){
        var canvas = this.shadowRoot.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var canvasData = canvas.getBoundingClientRect();

        this.mouse.y = event.clientY - canvasData.top;
        this.mouse.x = event.clientX - canvasData.left;

        if(this.mouse.px == 0) this.mouse.px = this.mouse.x;
        if(this.mouse.py == 0) this.mouse.py = this.mouse.y;

        this.draw(ctx, this.mouse.x, this.mouse.y, this.mouse.px, this.mouse.py);

        this.mouse.px = this.mouse.x;
        this.mouse.py = this.mouse.y;
    }

    saveImage(){
        var download = document.createElement('a');
        var canvas = this.shadowRoot.getElementById('canvas');

        download.setAttribute('href', canvas.toDataURL());
        download.setAttribute('download', this.title);
        download.click();
        download.remove();
    }

    setTitle(event){
        this.title = event.target.value;
    }

    ready(){
        super.ready();

        var widthInput = this.shadowRoot.querySelector('#width');
        var heightInput = this.shadowRoot.querySelector('#height');
        var lineWidthInput = this.shadowRoot.querySelector('#lineWidth');
        var lineColorInput = this.shadowRoot.querySelector('#lineColor');

        widthInput.value = this.width;
        heightInput.value = this.height;
        lineWidthInput.value = this.options.lineWidth;
        lineColorInput.value = this.options.lineColor;

        widthInput.addEventListener('change', ()=>{
            if(widthInput.value < 1){
                widthInput.value = 1;
            }

            this.width = parseInt(widthInput.value);
        });

        heightInput.addEventListener('change', ()=>{
            if(heightInput.value < 1){
                widthInput.value = 1;
            }

            this.height = parseInt(heightInput.value);
        });

        lineWidthInput.addEventListener('input', ()=>{
            if(lineWidthInput.value < 1){
                widthInput.value = 1;
            }

            this.options.lineWidth = parseInt(lineWidthInput.value);
        });

        lineColorInput.addEventListener('input', ()=>{
            this.options.lineColor = lineColorInput.value;
        });

        var canvas = this.shadowRoot.getElementById('canvas');

        canvas.addEventListener('mousedown', (event)=>{
            this.drawing = true;
            this.drawingHandle(event);
        });
    
        document.addEventListener('mouseup', ()=>{
            this.drawing = false;
            this.mouse.resetPreviews();
        });
    
        document.addEventListener('mousemove', (event)=>{
            if(this.drawing){
                this.drawingHandle(event);
            }
        });
    }
}

window.customElements.define('web-paint-app', WebPaint);