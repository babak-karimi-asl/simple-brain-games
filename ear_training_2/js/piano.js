



var piano = {

      keys:{},
			key_names:['C','C_','D','D_','E','F','F_','G','G_','A','A_','B'],
      listeners:[],

      add_listener:function(listener)
      {
        this.listeners.push(listener);
      }
      ,
      empty_listeners:function()
      {
        this.listeners=[];
      },

			play:function(note)
			{
          this.listeners.map(function(listener){ listener.on_piano_note(note); } );
					var the_audio = document.getElementById('note_'+note);
					the_audio.pause();
					the_audio.currentTime=0;
					the_audio.play();
			},

			play_random:function()
			{
					var random_key = this.key_names.select_random();
					while(random_key===game.memory.question.last())
						random_key = this.key_names.select_random();
					this.play( random_key );
					return random_key;
			},


      init:function()
      {
  			for(var i=0;i<this.key_names.length;i++)
  			{
  				var key = this.key_names[i];
  				this.keys[  key  ] = document.getElementById( key );
  				this.keys[  key  ].game_meta={};
  				this.keys[  key  ].style.transition='all 0.5s';
  				this.keys[  key  ].game_meta={ fill:this.keys[  key  ].style.fill};
  			}
      },
      enable:function()
      {
        for(var i=0;i<this.key_names.length;i++)
        {
          var key = this.key_names[i];
          this.keys[  key  ].style.cursor='pointer';
          this.keys[  key  ].onmouseover=function() {   this.style.fill='#3487d8'; };
          this.keys[  key  ].onmouseout=function() { this.style.fill=this.game_meta['fill']; };
          this.keys[  key  ].onmousedown=function() { piano.play(this.id); };
        }
      },
      disable:function()
      {
        for(var i=0;i<this.key_names.length;i++)
        {
          var key = this.key_names[i];
          this.keys[  key  ].style.cursor='none';
          this.keys[  key  ].onmouseover=null;
          this.keys[  key  ].onmouseout=null;
          this.keys[  key  ].onmousedown=null;
        }
      },
			highlight:function(key,color='#ffa700')
			{
				piano.keys[key].style.fill=color;
				setTimeout(function(){ piano.keys[key].style.fill = piano.keys[key].game_meta.fill;  },500);
			}
};
