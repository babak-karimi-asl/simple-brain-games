

states.game_restarted=function()
{

  game.top_container.show_background();
  game.middle_container.show_background();
  game.bottom_container.show_background();


  game.ask_new_button.enable();
  game.listen_again_button.disable();
  game.show_answer_button.disable();
  game.ready_to_answer_button.disable();

  game.asking_question_info.turn_off();
  game.ready_to_answer_caution.turn_off();

  game.piano.enable();


  game.show_answer_modal.hide();
  game.win_modal.hide();
  game.loose_modal.hide();

  game.ready_to_answer_button.disable();


  game.memory.question=[];
  game.memory.question_pos=0;
}
