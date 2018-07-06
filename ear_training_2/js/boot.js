


game.on_state( 'nothing_yet' ).on_event('boot_game').go_to_state('game_inited');
game.on_state( 'game_inited' ).on_event('ask_new_pressed').go_to_state('asking_question');
game.on_state( 'game_restarted' ).on_event('ask_new_pressed').go_to_state('asking_question');

game.on_state( 'asking_question' ).on_event('question_asked').go_to_state('playing_around');

game.on_state( 'playing_around' ).on_event('ready_to_answer_pressed').go_to_state('ready_to_answer');
game.on_state( 'playing_around' ).on_event('show_answer_pressed').go_to_state('show_answer_confirmation');

game.on_state( 'show_answer_confirmation' ).on_event('yes_pressed').go_to_state('show_answer');
game.on_state( 'show_answer_confirmation' ).on_event('no_pressed').go_to_state('playing_around');

game.on_state( 'show_answer' ).on_event('answer_showed').go_to_state('game_restarted');

game.on_state( 'ready_to_answer' ).on_event('correct_answer').go_to_state('game_win');
game.on_state( 'ready_to_answer' ).on_event('wrong_answer').go_to_state('game_loose');

game.on_state( 'game_win' ).on_event('play_same_level_pressed').go_to_state('game_restarted');

game.on_state( 'game_win' ).on_event('play_next_level_pressed').go_to_state('game_go_to_next_level');

game.on_state( 'game_go_to_next_level' ).on_event('level_increased').go_to_state('game_restarted');

game.on_state( 'game_loose' ).on_event('play_same_level_pressed').go_to_state('game_restarted');






game.add_state_handler('nothing_yet',states.nothing_yet);
game.add_state_handler('game_inited',states.game_inited);
game.add_state_handler('asking_question',states.asking_question);
game.add_state_handler('playing_around',states.playing_around);
game.add_state_handler('show_answer_confirmation',states.show_answer_confirmation);
game.add_state_handler('show_answer',states.show_answer);
game.add_state_handler('ready_to_answer',states.ready_to_answer);
game.add_state_handler('game_win',states.game_win);
game.add_state_handler('game_loose',states.game_loose);
game.add_state_handler('game_restarted',states.game_restarted);
game.add_state_handler('game_go_to_next_level',states.game_go_to_next_level);




game.set_state('nothing_yet');
game.fire_event('boot_game');




///
