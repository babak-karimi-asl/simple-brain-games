

states.game_go_to_next_level=function()
{

  game.memory.level+=1;
  game.level_number.text('#' + game.memory.level );
  game.fire_event('level_increased');


}
