


var game={

  memory:{
    question:[],
    level:1,
    question_pos:0
  },

  note_play_delay:500,

  current_state:'nothing_yet',
  states:{},

  state_chain:{
    on_state:'',
    on_event:'',
    go_to_state:''
  },
  on_state:function(state)
  {

    this.state_chain.on_state =state;
    return this;
  },
  on_event:function(event_name)
  {

    this.state_chain.on_event =event_name;
    return this;
  },
  go_to_state:function(state)
  {

    this.state_chain.go_to_state =state;

    this.save_current_chain();
  }
  ,
  save_current_chain:function()
  {

    var on_state = this.state_chain.on_state;
    var on_event =  this.state_chain.on_event;
    var go_to_state =  this.state_chain.go_to_state;

    if(!this.states[on_state])
      this.states[on_state]={};

    this.states[on_state][on_event]= go_to_state;

  }
  ,
  add_state_handler:function(state_name,state_handler)
  {
    this.states[state_name]['_T_HANDLER_T_']=state_handler;
  },
  fire_event:function(event_name)
  {
    this.current_state = this.states[this.current_state][event_name] ;
    this.states[this.current_state]['_T_HANDLER_T_']();
  },
  set_state:function(state)
  {
    this.current_state = state;
  }

}
