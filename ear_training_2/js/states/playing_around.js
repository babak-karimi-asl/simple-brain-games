

states.playing_around=function()
{
  game.ask_new_button.disable();
  game.listen_again_button.enable();
  game.show_answer_button.enable();
  game.ready_to_answer_button.enable();

  game.asking_question_info.turn_off();

  game.show_answer_modal.hide();

  game.piano.enable();


  game.listen_again_button.onclick_do(function()
  {
    game.memory.question_pos = 0;
    var i=0;
    for(i=0;i<game.memory.level;i++)
        setTimeout(function(){  game.piano.play( game.memory.question[game.memory.question_pos] ); game.memory.question_pos+=1;  },game.note_play_delay*i);

    setTimeout(function(){  game.memory.question_pos = 0;  },game.note_play_delay*i);
  });

}
