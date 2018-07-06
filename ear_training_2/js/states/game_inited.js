
states.game_inited=function()
{

			var app_div = new div('app');
			//var piano = new div('piano');
			piano.init();
			piano.enable();
			var top_container = new container();
			var middle_container = new container();
			var bottom_container = new container();

			var ask_new_button = new button('Ask New',function(){ game.fire_event('ask_new_pressed');  });
			var listen_again_button = new button('Listen Again');
			var show_answer_button = new button('Show Answer',function(){ game.fire_event('show_answer_pressed'); });

			var ready_to_answer_button = new button('Ready To Answer',function(){ game.fire_event('ready_to_answer_pressed'); });
			var ready_to_answer_caution = new light_bubble('!','warning');
			var asking_question_info = new light_bubble('?','info');



			var loose_modal = new modal('Wrong!');
			var win_modal = new modal('Correct!');

			var win_light_bubble = new light_bubble('*','success');
			var loose_light_bubble = new light_bubble('X','error');
			var loose_light_bubble_2 = new light_bubble('X','error');

			win_light_bubble.turn_on();
			loose_light_bubble.turn_on();
			loose_light_bubble_2.turn_on();


			var play_same_level = new button('Again',function(){ game.fire_event('play_same_level_pressed'); })
			var play_next_level = new button('Next Level',function(){ game.fire_event('play_next_level_pressed'); })

			var play_same_level_2 = new button('Play Again',function(){ game.fire_event('play_same_level_pressed'); })


			loose_modal.append_action(loose_light_bubble);
			loose_modal.append_action(play_same_level_2);
			loose_modal.append_action(loose_light_bubble_2);

			win_modal.append_action(play_same_level);
			win_modal.append_action(win_light_bubble);
			win_modal.append_action(play_next_level);

			win_modal.hide();
			loose_modal.hide();

			app_div.append(win_modal);
			app_div.append(loose_modal);


			var level_shower_container= new container();
			level_shower_container.be_pure();
			level_shower_container.show_border();


			var level_title = new title('Level');
			level_shower_container.append(level_title);


			var level_number = new title( '#' + game.memory.level);
			level_shower_container.append(level_number);

			game.level_number = level_number;

			game.level_shower_container = level_shower_container;


			var show_answer_modal  = new modal('Are You Sure?');
			var show_answer_yes_button  = new button('Yes',function(){ game.fire_event('yes_pressed'); });
			var show_answer_no_button  = new button('No',function(){ game.fire_event('no_pressed'); });

			var piano_lumps_container = new container();
			piano_lumps_container.be_vertical();
			piano_lumps_container.be_pure();


			show_answer_modal.append_action(show_answer_yes_button);
			show_answer_modal.append_action(show_answer_no_button);
			show_answer_modal.hide();


			app_div.append(show_answer_modal);

			app_div.append(top_container);
			app_div.append(level_shower_container);
			app_div.append(middle_container);
			app_div.append(bottom_container);



			listen_again_button.disable();
			show_answer_button.disable();
			ready_to_answer_button.disable();

			top_container.append(ask_new_button);
			top_container.append(listen_again_button);
			top_container.append(show_answer_button);

			middle_container.append(piano_lumps_container);
			middle_container.div.appendChild(document.getElementById('piano'));


			piano_lumps_container.append(asking_question_info);
			piano_lumps_container.append(ready_to_answer_caution);

			bottom_container.append(ready_to_answer_button);




			game.win_modal = win_modal;
			game.loose_modal = loose_modal;

			game.show_answer_modal  = show_answer_modal;
			game.show_answer_yes_button  = show_answer_yes_button;
			game.show_answer_no_button  = show_answer_no_button;
			game.piano_lumps_container = piano_lumps_container;


			game.app_div = app_div ;
			game.piano = piano;
			game.top_container = top_container;
			game.middle_container = middle_container;
			game.bottom_container = bottom_container;

			game.ask_new_button = ask_new_button;
			game.listen_again_button = listen_again_button;
			game.show_answer_button = show_answer_button;

			game.ready_to_answer_button = ready_to_answer_button;
			game.ready_to_answer_caution = ready_to_answer_caution;
			game.asking_question_info = asking_question_info;

}
