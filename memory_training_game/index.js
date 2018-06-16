var doc = {
    get:function(id) { return document.getElementById(id); },
    add:function(tag) { return document.createElement(tag); }
};

Object.prototype.addkid = function(elm){ this.appendChild(elm); }
Object.prototype.listen = function(evn,fnc){ this.addEventListener(evn,fnc); }
Array.prototype.random_select = function()
{
    return this[Math.floor( Math.random()* this.length) ];
}

/////////////////////////////////////////////////////

function button(caption,onclick)
{
    this.caption=caption;
    this.div = doc.add('div');
    this.div.classList.add('button');
    this.div.innerText = this.caption;
    this.div.onclick=onclick;

    this.last_onclick_func = onclick; 
}




button.prototype.set_action=function(onclick)
{
    this.div.onclick=onclick;
    this.last_onclick_func = onclick;
}

button.prototype.set_caption=function(caption)
{
    this.caption=caption;
    this.div.innerText=caption;
}

button.prototype.disable=function() { this.div.onclick=null; this.div.classList.add('button-disabled'); }
button.prototype.enable=function() { this.div.onclick = this.last_onclick_func; this.div.classList.remove('button-disabled');  }

/////////////////////////////////////////////////////


function board( text ){
    this.div=doc.add('div');
    this.div.classList.add('board');
    this.div.innerText = text;
}

board.prototype.show=function(text)
{
    this.div.innerText = text;
}

board.prototype.warn=function(text)
{
    this.div.innerText = text;
    this.div.style.color='#e63d28';
    this.div.style.fontSize='1.1rem';
}



/////////////////////////////////////////////////////

function rect(round_corner,parent)
{
    this.div = doc.add('div');
    var vm = this;
    this.div.listen('click',function()
    {
        vm.flash();
    });
    this.div.classList.add( 'round-' + round_corner );
    this.div.classList.add( 'rect');
    parent.div.addkid(this.div);
    this.delay = parent.delay;
}

rect.prototype.flash=function()
{
    if(this.div.classList.contains('flash'))
        this.div.classList.remove('flash');

    this.div.classList.add('flash');
    var vm = this;
    setTimeout(function(){
        vm.div.classList.remove('flash');
    },this.delay);
}

///////////////////////////////////////////////////


var rects={
    rects:[],
    delay:500,
    border_radius:' 1rem',
    add_rect:function(corner='neither'){
        this.rects.push(new rect(corner ,this));
    },
    init:function()
    {
        this.div=doc.add('div');
        this.div.classList.add('container');
        game.div.addkid(this.div);

        this.add_rect('top-left');
        this.add_rect();
        this.add_rect('top-right');

        this.add_rect();
        this.add_rect();
        this.add_rect();

        this.add_rect('bottom-left');
        this.add_rect();
        this.add_rect('bottom-right');
    }
};


///////////////////////////////////////////////////


var game={
    level:1,
    status:'STOPPED',
    init:function()
    {
        this.div=doc.get('game');

        this.init_dev_status();
        rects.init();



        this.init_board();
        this.init_buttons();
        
    },
    init_buttons:function()
    {

        this.buttons={};
        this.buttons.div = doc.add('div');
        this.buttons.div.classList.add('container');
        this.div.addkid(this.buttons.div);


        this.buttons.play = new button('Play',this.play);
        this.buttons.div.addkid(this.buttons.play.div);

        this.buttons.prev_level = new button('-Level',this.prev_level);
        this.buttons.div.addkid(this.buttons.prev_level.div);

        this.buttons.next_level = new button('+Level',this.next_level);
        this.buttons.div.addkid(this.buttons.next_level.div);
    },
    init_board:function()
    {
        this.boards = {};
        this.boards.div=doc.add('div');
        this.boards.div.classList.add('container');
        this.div.addkid(this.boards.div);

        this.boards.game_status = new board('Game Status : ' + this.status);
        this.boards.current_level = new board('Current Level : ' + this.level);

        this.boards.div.addkid(this.boards.game_status.div);
        this.boards.div.addkid(this.boards.current_level.div);        
        
    },
    init_dev_status:function()
    {
        this.dev_status = {};
        this.dev_status.div = doc.add('div');
        this.dev_status.div.classList.add('container');
        this.div.addkid(this.dev_status.div);

        this.div.addkid(this.dev_status.div);

        this.dev_status.log = new board('');

        this.dev_status.log.warn('! This game is under development !');

        this.dev_status.div.addkid(this.dev_status.log.div);

    },
//////////////////////////////////////////////////
    play:function()      { game.status='PLAY_PRESSED';                 game.update(); },
    next_level:function(){ game.level+=1; game.status='LEVEL_CHANGED'; game.update(); },
    prev_level:function(){ game.level-=1; game.status='LEVEL_CHANGED'; game.update(); },
    stop:function()      { game.status='STOPPED';                      game.update(); },
//////////////////////////////////////////////////
    update:function(){

        this.boards.game_status.show('Game Status : ' + this.status);

        switch(this.status)
        {
///////////////////////////////////////////////////
            case 'LEVEL_CHANGED':
                if(this.level<1) this.level=1;
                this.boards.current_level.show('Current Level : ' + this.level);
            break;
///////////////////////////////////////////////////
            case 'PLAY_PRESSED':

                this.status='COMPUTER_TURN';
                this.buttons.play.set_caption('Stop');
                this.buttons.play.set_action(this.stop);

                this.buttons.next_level.disable();
                this.buttons.prev_level.disable();

                this.update();

            return;
///////////////////////////////////////////////////
            case 'PLAYER_TURN':

            break;
///////////////////////////////////////////////////
            case 'COMPUTER_TURN':

                var i=0;
                for(i=0;i<game.level;i++)
                {
                    setTimeout(function(){
                        rects.rects.random_select().flash();
                    },i*rects.delay)
                }

                setTimeout(function(){
                        game.status='PLAYER_TURN';
                        game.update();
                    },i*rects.delay);

            break;
///////////////////////////////////////////////////
            case 'STOPPED':
                this.buttons.play.set_caption('Play');
                this.buttons.play.set_action(this.play);
                this.buttons.next_level.enable();
                this.buttons.prev_level.enable();
            return;
        }
    }
};


//////////////////////////////////////////////////


game.init();
