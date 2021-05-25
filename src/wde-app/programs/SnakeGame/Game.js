export class Player{
    constructor(id=0, x=0, y=0, mapW=64, mapH=36, speed=125){
        this.id=id;
        this.x=x;
        this.y=y;
        this.mapW = mapW;
        this.mapH=mapH;
        this.direction = '';
        this.alive = true;
        this.moving;
        this.body = [];
        this.speed = speed;
    }

    eat(food){
        for(let i=0; i<food.mass; i++){
            if(this.body.length == 0){
                this.body.push(
                    {
                        x: this.x,
                        y: this.y
                    }
                );
            }else{
                this.body.push(this.body[this.body.length-1]);
            }
        }
    }

    getSize(){
        return this.body.length;
    }

    kill(){
        this.alive = false;
        this.stopMoving();
    }

    setMoving(){
        if(this.alive){
            this.moving = setInterval(()=>{
                this.move();
            }, this.speed);
        }
    }

    stopMoving(){
        clearInterval(this.moving);
        //console.log('Stop Moving');
    }

    move(){
        if(this.alive){
            for(let i=this.body.length-1; i>=0; i--){
                if(i != 0){
                    this.body[i] = this.body[i-1];
                }else{
                    this.body[i] = {
                        x: this.x,
                        y: this.y
                    }
                }
            }

            switch(this.direction){
                case 'left': 
                        if(this.x == 0){
                            this.kill();
                        }else{
                            this.x--;
                        }
                    break;
                case 'right': 
                    if(this.x == this.mapW-1){
                        this.kill();
                    }else{
                        this.x++;
                    }
                    break;
                case 'up': 
                    if(this.y == 0){
                        this.kill();
                    }else{
                        this.y--;
                    }
                    break;
                case 'down': 
                    if(this.y == this.mapH-1){
                        this.kill();
                    }else{
                        this.y++;
                    }
                    break;
            }

            for(let part of this.body){
                if(part.x == this.x && part.y == this.y) this.kill();
            }
        }
    }

    setDirection(direction){
        this.direction = direction;
    }
}

export class Food{
    constructor(mass=1, x=0, y=0){
        if(mass < 1){
            mass = 1;
        }
        this.mass = mass;
        this.x = x;
        this.y = y;
    }
}

export class Game{
    constructor(element, width=64, height=36){
        element.width = element.getBoundingClientRect().width;
        element.height = element.getBoundingClientRect().height;
        this.player;
        this.food;
        this.renderer = element;
        this.width = width;
        this.height = height;
        this.states = ['start', 'pause', 'play', 'end'];
        this.state = this.states[0];

        this.spawnPlayer();
        this.putFood();

        document.addEventListener('keydown', (event)=>{
            if(!event.repeat){
                this.player.stopMoving();
                switch(event.key){
                    case 'ArrowLeft': 
                        if(this.player.direction != 'right'){
                            if(this.state != this.states[1] && this.state != this.states[3]) this.player.direction = 'left';
                            this.startGame();
                        } 
                        break;
                    case 'ArrowRight': 
                        if(this.player.direction != 'left'){
                            if(this.state != this.states[1] && this.state != this.states[3]) this.player.direction = 'right';
                            this.startGame();
                        }
                        break;
                    case 'ArrowUp': 
                        if(this.player.direction != 'down'){
                            if(this.state != this.states[1] && this.state != this.states[3]) this.player.direction = 'up';
                            this.startGame();
                        }
                        break;
                    case 'ArrowDown': 
                        if(this.player.direction != 'up'){
                            if(this.state != this.states[1] && this.state != this.states[3]) this.player.direction = 'down';
                            this.startGame();
                        }
                        break;
                }

                if(this.state == this.states[2]){
                    this.player.move();
                    this.player.setMoving();
                }
            }
        });
    }

    startGame(){
        if(this.state == this.states[0]){
            this.state = this.states[2];
        }
    }

    switchState(){
        if(this.state == this.states[2]){
            this.state = this.states[1];
            this.player.stopMoving();
        }
        else if(this.state == this.states[1]) this.state = this.states[2];
    }

    finishGame(){
        this.state = this.states[3];

        this.setHighScore();
    }
    
    newGame(){
        this.state = this.states[0];
        this.spawnPlayer();
        this.putFood();
    }

    spawnPlayer(){
        var x = Math.trunc(Math.random() * (this.width - 0) + 0);
        var y = Math.trunc(Math.random() * (this.height - 0) + 0);

        this.player = new Player(0, x, y, this.width, this.height);
    }

    refresh(){
        this.analizeGame();
        this.render();
    }

    analizeGame(){
        if(this.player.x == this.food.x && this.player.y == this.food.y){
            this.player.eat(this.food);
            this.putFood();
        }

        if(!this.player.alive) this.finishGame();
    }

    putFood(){
        var x = 0;
        var y = 0;

        while(true){
            x = Math.trunc(Math.random() * (this.width - 0) + 0);
            y = Math.trunc(Math.random() * (this.height - 0) + 0);
            let valider = true;


            if(x != this.player.x && y != this.player.y){
                for(let item of this.player.body){
                    if(item.x == x && item.y == y) valider = false;
                }
            }

            if(valider) break;
        }

        this.food = new Food(5, x, y);
    }

    getScore(){
        return this.player.getSize();
    }

    setHighScore(){
        if(this.getScore() > this.getHighScore(false)) localStorage.setItem('SNKGHighScore', this.getScore());
    }

    getHighScore(update=true){
        var high = localStorage.getItem('SNKGHighScore') ? parseInt(localStorage.getItem('SNKGHighScore')) : 0;
        if(update){
            if(this.getScore() > high) high = this.getScore();
        }
        return high;
    }

    render(){
        var ctx = this.renderer.getContext('2d');
        var element = this.renderer.getBoundingClientRect();
        var xmultiplier = element.width / this.width;
        var ymultiplier = element.height / this.height;

        if(this.renderer.width != element.width) this.renderer.width = element.width;
        if(this.renderer.height != element.height) this.renderer.height = element.height;

        ctx.beginPath();
        ctx.clearRect(0, 0, this.renderer.width*xmultiplier, this.renderer.height*ymultiplier);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.food.x*xmultiplier, this.food.y*ymultiplier, 1*xmultiplier, 1*ymultiplier);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.player.x*xmultiplier, this.player.y*ymultiplier, 1*xmultiplier, 1*ymultiplier);
        this.player.body.forEach(item => {
            ctx.fillRect(item.x*xmultiplier, item.y*ymultiplier, 1*xmultiplier, 1*ymultiplier);
        });
    }
}