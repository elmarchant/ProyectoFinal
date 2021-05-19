import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Calculadora extends PolymerElement {
  static get template() {
    return html`
        <link rel="stylesheet" href="./src/style/calculadora.css">
        <div class="window">
            <div class="window-head">
                <p class="window-title">Calculadora</p>
            </div>
            <div class="window-body">
                <section class="input-output">[[inputOutput]]</section>
                <section class="buttons">
                    <table class="calc-buttons" draggable="false">
                        <tbody>
                            <tr>
                                <td data-value="Backspace" colspan="2" on-click="backSpace">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                                        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                                    </svg>
                                </td>
                                <td on-click="clear">C</td>
                                <td on-click="addDivision">/</td>
                            </tr>
                            <tr>
                                <td on-click="enterValue">7</td>
                                <td on-click="enterValue">8</td>
                                <td on-click="enterValue">9</td>
                                <td on-click="addMultiplication">*</td>
                            </tr>
                            <tr>
                                <td on-click="enterValue">4</td>
                                <td on-click="enterValue">5</td>
                                <td on-click="enterValue">6</td>
                                <td on-click="addSubtraction">-</td>
                            </tr>
                            <tr>
                                <td on-click="enterValue">1</td>
                                <td on-click="enterValue">2</td>
                                <td on-click="enterValue">3</td>
                                <td on-click="addOperation">+</td>
                            </tr>
                            <tr>
                                <td on-click="addResidue">R</td>
                                <td on-click="enterValue">0</td>
                                <td on-click="enterFloat">.</td>
                                <td data-value="Enter" on-click="resolve">=</td>
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
      inputOutput: {
        type: String,
        value: '0'
      },
      operation: {
          type: Object,
          value: {
            number: 0,
            type: 'none',
            on: false,
            reset: function(){
                this.number = 0;
                this.type = 'none';
            }
          }
      }
    };
  }

    backSpace(){
        var value = this.inputOutput;
        var valueArray = value.split('');

        valueArray.pop();
        value = valueArray.join('');

        if(value == '') value = '0';

        this.inputOutput = value;
    }

    resolve(){
        var factors = {
            number1: parseFloat(this.inputOutput),
            number2: this.operation.number
        };

        var result = 0;

        if(this.operation.type == 'add') result = factors.number2 + factors.number1;
        else if(this.operation.type == 'subtract') result = factors.number2 - factors.number1;
        else if(this.operation.type == 'multiply') result = factors.number2 * factors.number1;
        else if(this.operation.type == 'divide') result = factors.number2 / factors.number1;
        else if(this.operation.type == 'residue') result = factors.number2 % factors.number1;
        else result = 0;

        if(isNaN(result)) result = 0;
        
        this.operation.reset();
        this.inputOutput = result.toString();
    }

    addOperation(operation='add'){
        var operations = {
            add: 'add',
            subtract: 'subtract',
            multiply: 'multiply',
            divide: 'divide',
            residue: 'residue'
        }

        if(!operations[operation]){
            operation = 'add';
        }

        if(this.operation.type != 'none'){
            this.resolve();
        }

        this.operation.number = parseFloat(this.inputOutput);
        this.operation.type = operation;
        this.operation.on = true;
    }

    addSubtraction(){
        this.addOperation('subtract');
    }

    addMultiplication(){
        this.addOperation('multiply');
    }

    addDivision(){
        this.addOperation('divide');
    }

    addResidue(){
        this.addOperation('residue');
    }

    clear(){
        this.inputOutput = '0';
        this.operation.number = 0;
        this.operation.type = 'none';
    }

    enterValue(event){
        var value = this.inputOutput;

        var element = event.target;

        if(value == '0' || this.operation.on){
            value = element.innerText;
            this.operation.on = false;
        }else{
            value += element.innerText;
        }

        this.inputOutput = value;
    }

    enterFloat(){
        if(!this.inputOutput.includes('.')){
            this.inputOutput += '.';
        }
    }

    ready(){
        super.ready();

        var buttons = this.shadowRoot.querySelectorAll('td');

        document.addEventListener('keydown', (event)=>{
            var key = event.key;

            buttons.forEach(button => {
                if(button.innerText.toLowerCase() == key || button.dataset.value == key){
                    button.click();
                }
            });
        });
    }
}

window.customElements.define('calculadora-app', Calculadora);