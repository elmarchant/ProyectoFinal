import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class WebNotepad extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/web-notepad.css">
        <div class="window">
            <div class="window-head">
                <p class="window-title">Web Notepad - [[filename]]</p>
            </div>
            <div class="window-body">
                <nav class="simple-menu">
                    <div class="simple-item item-div">
                        <input type="text" class="text-field" on-input="setName" id="file-name"/>
                    </div>
                    <label for="file-open" class="simple-item item-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-symlink-fill" viewBox="0 0 16 16">
                            <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3zM2.19 3c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3H2.19zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
                        </svg>
                        <input type="file" on-input="openFile" id="file-open" accept="text/*"/>
                    </label>
                    <button class="simple-item item-button" on-click="saveFile" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16">
                            <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/>
                        </svg>
                    </button>
                </nav>
                <textarea id="workspace" wrap="off" class="workspace"></textarea>
            </div>
        </div>
    `;
  }
  
    static get properties() {
        return {
            filename: {
                type: String,
                value: 'Nuevo documento de texto.txt'
            }
        };
    }

    setName(event){
        this.filename = event.target.value;
    }

    openFile(event){
        var file = event.target.files[0];
        var reader = new FileReader();
        var workspace = this.shadowRoot.querySelector('#workspace');

        this.filename = file.name;
        this.setInputFileName();

        reader.readAsText(file);

        reader.onloadend = function(){
            workspace.value = reader.result;
        }
    }

    saveFile(){
        var file = new Blob([this.shadowRoot.querySelector('#workspace').value], {type: 'text/plain'});
        var downloader = document.createElement('a');

        downloader.setAttribute('href', URL.createObjectURL(file));
        downloader.setAttribute('download', this.filename);
        downloader.click();
        downloader.remove();
    }

    setInputFileName(){
        this.shadowRoot.querySelector('#file-name').value = this.filename;
    }

    ready(){
        super.ready();

        var workspace = this.shadowRoot.querySelector('#workspace');
        this.setInputFileName();

        workspace.addEventListener('keydown', (event)=>{
            if(event.key == 'Tab'){
                event.preventDefault();
                var start = workspace.selectionStart;
                var str1 = workspace.value.substring(start, 0);
                var str2 = workspace.value.substring(start);
                
                workspace.value = str1+'\t'+str2;
                workspace.selectionStart = start+1;
                workspace.selectionEnd = start+1;
            }
        });
    }
}

window.customElements.define('web-notepad-app', WebNotepad);