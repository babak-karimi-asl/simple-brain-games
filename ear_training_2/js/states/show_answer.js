

states.show_answer=function()
{
  game.show_answer_modal.hide();
  game.piano.disable();


  game.memory.question_pos = 0;
  var delay_for_modal_hide = 500;
  var i=0;
  for(i=0;i<game.memory.level;i++)
      setTimeout(function(){
         game.piano.highlight( game.memory.question[game.memory.question_pos] );
         game.piano.play( game.memory.question[game.memory.question_pos] );
         game.memory.question_pos+=1;
       }
       ,game.note_play_delay*i+delay_for_modal_hide);

  setTimeout(function(){  game.memory.question_pos = 0;  },game.note_play_delay*i+delay_for_modal_hide);


  i+=1;
  setTimeout(function(){  game.fire_event('answer_showed');  },game.note_play_delay*i+delay_for_modal_hide);


}
