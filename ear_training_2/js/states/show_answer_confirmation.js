

states.show_answer_confirmation=function()
{
  game.ask_new_button.disable();
  game.listen_again_button.disable();
  game.show_answer_button.disable();
  game.ready_to_answer_button.disable();
  game.piano.disable();

  game.show_answer_modal.show();
}
