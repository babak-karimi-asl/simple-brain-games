

states.asking_question=function()
{
    game.piano.disable();
    game.ask_new_button.disable();
    game.listen_again_button.disable();
    game.show_answer_button.disable();
    game.ready_to_answer_button.disable();

    game.asking_question_info.turn_on();

    var i=0;
    for(i=0;i<game.memory.level;i++)
        setTimeout(function(){  game.memory.question.push(game.piano.play_random() );  },game.note_play_delay*i);
    setTimeout(function(){  game.fire_event('question_asked');   },game.note_play_delay*i);

}
