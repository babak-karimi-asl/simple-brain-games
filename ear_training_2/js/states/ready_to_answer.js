

states.ready_to_answer=function()
{
  game.ask_new_button.disable();
  game.listen_again_button.disable();
  game.show_answer_button.disable();
  game.ready_to_answer_button.disable();

  game.show_answer_modal.hide();

  game.ready_to_answer_caution.turn_on();

  game.top_container.hide_background();
  game.middle_container.hide_background();
  game.bottom_container.hide_background();


  game.memory.question_pos = 0;

  var judge = {
    on_piano_note:function(note)
    {
      //alert(`you pressed ${note} while you shold have been press ${game.memory.question[game.memory.question_pos]}`)
      if(note===game.memory.question[game.memory.question_pos])
        game.memory.question_pos+=1;
      else
        game.fire_event('wrong_answer');

      if(game.memory.question_pos===game.memory.level)
        game.fire_event('correct_answer');
    }
  }

  game.piano.add_listener(judge);

}
