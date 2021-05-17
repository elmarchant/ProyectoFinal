import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';

const components = ['home', 'applications', 'settings'];

/**
 * @customElement
 * @polymer
 */
class WdeApp extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="./src/style/main.css">
      <main id="background">
        <app-location route="{{route}}"></app-location>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
        <nav id="dock-bar" class="bottom-dock">
          <div class="dock-buttons">
            <!--<a role="button" href="/applications">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </a>-->
            <a draggable="false" role="button" href="/applications">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
              </svg>
            </a>
            <a draggable="false" role="button" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
              </svg>
            </a>
            <a draggable="false" role="button" href="/settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </a>
          </div>
          <div class="dock-time">
            <button id="dock-time" type="button">[[time]]</button>
          </div>
        </nav>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <home-component name="home"></home-component>
          <applications-component name="applications"></applications-component>
          <settings-component name="settings"></settings-component>
        </iron-pages>        
      </main>
    `;
  }
  static get properties() {
    return {
      dock: {
        type: Object,
        value: {
          element: document.createElement('nav'),
          autoHide: setTimeout(''),
          position: 'bottom-dock',
          hover: false,
          home: true,
          setElement: function(element){
            this.element = element;
          },
          show: function(){
            if(this.element.classList.contains('dock-hide')){
              this.element.classList.remove('dock-hide');

              return true;
            }else{
              return false;
            }
          },
          hide: function(){
            if(this.element.classList.contains('dock-hide')){
              return false;
            }else{
              this.element.classList.add('dock-hide');
              return true;
            }
          },
          resetAutoHide: function(time=1000){
            this.unsetAutoHide();
            this.setAutoHide(time);
          },
          setAutoHide: function(time=1000){
            this.autoHide = setTimeout(()=>{
              this.hide();
            }, time);
          },
          unsetAutoHide: function(){
            clearTimeout(this.autoHide);
          }
        }
      },
      backgroundImage: {
        type: Object,
        value: {
          name: 'mainBackground',
          source: '/src/assets/images/main.jpg',
        }
      },
      time: {
        type: String,
        value: ''
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    } else if (components.indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'home';
    }

    // Close a non-persistent drawer when the page & route are changed.
    /*if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }*/
  }

  _pageChanged(page) {
    switch (page) {
      case 'home':
        import('./home.js');
        break;
      case 'applications':
        import('./applications.js');
        break;
      case 'settings':
        import('./settings.js');
        break;
    }
  }

  showBackground(){
    var element = this.shadowRoot.querySelector('#background');
    element.style.backgroundImage = `url('${this.backgroundImage.source}')`;
  }

  dataURLtoFile(dataurl, filename){
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  setBackground(){
    var bgImage = localStorage.getItem('backgroundImage');
    if(bgImage){
      try{
        var data = JSON.parse(bgImage);

        this.backgroundImage.name = data.name;
        this.backgroundImage.source = URL.createObjectURL(this.dataURLtoFile(data.dataURL, data.name));
        
      }catch(exception){
        console.log(exception);
        localStorage.removeItem('backgroundImage');
      }
    }
  }

  setTime(){
    var date = new Date();
    var values = {
      year: date.getFullYear(),
      month: (date.getMonth()+1).toString().padStart(2, '0'),
      date: date.getDate().toString().padStart(2, '0'),
      hours: date.getHours(),
      minutes: date.getMinutes().toString().padStart(2, '0')
    }

    this.time = `${values.hours}:${values.minutes} ${values.date}/${values.month}/${values.year}`;
  }

  dockChange(){
    if(!this.dock.hover){
      var result = this.dock.show();

      if(result){
        this.dock.setAutoHide();
      }else{
        this.dock.resetAutoHide();
      }
    }
  }

  setDockPosition(){
    var map = new Map();

    map.set('top-dock', 'top-dock');
    map.set('bottom-dock', 'bottom-dock');
    map.set('left-dock', 'left-dock');
    map.set('right-dock', 'right-dock');

    if(localStorage.getItem('dockPosition')){
      this.dock.position = localStorage.getItem('dockPosition');
    }else{
      localStorage.setItem('dockPosition', 'bottom-dock');
    }

    if(map.get(this.dock.position)){
      this.dock.element.className = map.get(this.dock.position);
    }

    this.dock.resetAutoHide(1000);
  }

  ready(){
    super.ready();

    var dockBar = this.shadowRoot.querySelector('#dock-bar');

    this.dock.setElement(dockBar);

    this.dock.setAutoHide(2000);

    this.setDockPosition();

    dockBar.addEventListener('mouseover', ()=>{
      this.dock.hover = true;
      this.dock.unsetAutoHide();
    });

    dockBar.addEventListener('mouseleave', ()=>{
      this.dock.hover = false;
      this.dock.resetAutoHide();
    });

    document.addEventListener('touchmove', (event)=>{
      var bar = this.shadowRoot.querySelector('#dock-bar');
      var ycoords = event.touches[0].clientY / window.innerHeight * 100;
      var xcoords = event.touches[0].clientX / window.innerWidth * 100;

      if(bar.classList.contains('top-dock')){
        if(ycoords < 10) this.dockChange();
      }else if(bar.classList.contains('bottom-dock')){
        if(ycoords > 90) this.dockChange();
      }else if(bar.classList.contains('left-dock')){
        if(xcoords < 10) this.dockChange();
      }else if(bar.classList.contains('right-dock')){
        if(xcoords > 90) this.dockChange();
      }
    });

    document.addEventListener('mousemove', (event)=>{
      var bar = this.shadowRoot.querySelector('#dock-bar');
      var ycoords = event.clientY / window.innerHeight * 100;
      var xcoords = event.clientX / window.innerWidth * 100;

      if(bar.classList.contains('top-dock')){
        if(ycoords < 1) this.dockChange();
      }else if(bar.classList.contains('bottom-dock')){
        if(ycoords > 99) this.dockChange();
      }else if(bar.classList.contains('left-dock')){
        if(xcoords < 1) this.dockChange();
      }else if(bar.classList.contains('right-dock')){
        if(xcoords > 99) this.dockChange();
      }
    });

    this.setBackground();
    this.showBackground();

    setInterval(()=>{
      this.setTime();
    });
  }
}

window.customElements.define('wde-app', WdeApp);
