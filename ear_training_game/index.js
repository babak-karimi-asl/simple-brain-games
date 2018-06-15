var piano = {
  path: 'piano_ogg/',
  keys: {
    'c': {sound: 'C.ogg'},
    'csharp': {sound: 'Csharp.ogg'},
    'd': {sound: 'D.ogg'},
    'dsharp': {sound: 'Dsharp.ogg'},
    'e': {sound: 'E.ogg'},
    'f': {sound: 'F.ogg'},
    'fsharp': {sound: 'Dsharp.ogg'},
    'g': {sound: 'G.ogg'},
    'gsharp': {sound: 'Dsharp.ogg'},
    'a': {sound: 'A.ogg'},
    'asharp': {sound: 'Dsharp.ogg'},
    'b': {sound: 'B.ogg'},
  },
  create_sound_sources: function () {
    for (var key in this.keys) {
      if (this.keys.hasOwnProperty(key)) {
        this.keys[key].element = this.create_sound_element(this.keys[key].sound );
      }
    }
  },
  create_sound_element: function (sound) {
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    source.src = this.path + sound;
    source.type = 'audio/ogg';
    audio.appendChild(source);
    document.getElementById('sounds').appendChild(audio);
    return audio;
  },
  play: function (key) {
    this.keys[key].element.pause();
    this.keys[key].element.currentTime = 0;
    this.keys[key].element.play();
  }
};
var keyboard = {
  flash_time: 500, // milliseconds
  keys: {},
  init: function () {
    // get all elements that has [data-key]
    var elements = document.querySelectorAll('[data-key]');

    // iterate and bind events
    for (var element of elements) {
      var _key = element.dataset.key; // the note stored in data-key
      this.keys[_key] = element;
      element.addEventListener('mousedown', function () { // bind mouse down to key
        var key = this.dataset.key; // the note stored in data-key
        piano.play(key); // play the note from piano object.
        game.check(key);
      });
    }
  },
  flash: function (key, css_class) {
    var element = this.keys[key];
    element.classList.add(css_class);
    setTimeout(function () {
      element.classList.remove(css_class)
    }, this.flash_time);
  },
  reset_state: function () {

  }
};
var game = {
  state: 'QUESTION',
  quiz_keys: [],
  played_keys: [],
  playable_keys: [
    'c', 'csharp',
    'd', 'dsharp',
    'e',
    'f', 'fsharp',
    'g', 'gsharp',
    'a', 'asharp',
    'b'
  ],

  start_button: null,
  played_key_1: null,
  played_key_2: null,
  play_again_button: null,
  show_answer_button: null,

  number_of_key_played: 2,

  init: function () {
    // set main buttons to variables
    this.start_button = document.getElementById('game-start-id');
    this.played_key_1 = document.getElementById('played-key-1');
    this.played_key_2 = document.getElementById('played-key-2');
    this.play_again_button = document.getElementById('play-again-id');
    this.show_answer_button = document.getElementById('show-answer-id');

    // bind actions
    this.start_button.addEventListener('click', this.play_game);
    this.play_again_button.addEventListener('click', this.play_again);
    this.show_answer_button.addEventListener('click', this.show_answer);

    this.reset_button_states();
  },
  check: function (key_index) {
    if (this.state === 'ANSWER') {
      if (this.quiz_keys.shift() === key_index) {
        keyboard.flash(key_index, 'correct');
      }
      else {
        keyboard.flash(key_index, 'wrong');
      }
    }

    if (this.quiz_keys.length <= 0) {
      this.state = 'QUESTION';
      this.reset_button_states();
    }
  },
  reset_button_states: function () {
    if (this.state === 'QUESTION') {
      this.play_again_button.classList.add('disabled');
      this.show_answer_button.classList.add('disabled');

      this.start_button.classList.remove('disabled')
    }

    if (this.state === 'ANSWER') {
      this.start_button.classList.add('disabled');

      this.play_again_button.classList.remove('disabled');
      this.show_answer_button.classList.remove('disabled');
    }
  },
  play_game: function () {
    var _t = game;
    if (this.classList.contains('disabled'))
      return;

    _t.quiz_keys = [];

    var tmp_key = '0';

    for (var i = 0; i < _t.number_of_key_played; i++) {
      tmp_key = random_select(_t.playable_keys);
      //played_key_1.innerText = tmp_key
      _t.played_keys.push(tmp_key);
      _t.quiz_keys.push(tmp_key);
      console.log(tmp_key);
    }

    _t.state = 'QUESTION';

    _t.reset_button_states();

    _t.play(false,"ANSWER");
  },
  play_again: function () {
    var _t = game;
    if (this.classList.contains('disabled'))
      return;

    var tmp_turn_state = _t.state;
    _t.state = 'PLAY_AGAIN';

    _t.play(false,tmp_turn_state);
  },
  show_answer: function () {
    var _t = game;
    if (this.classList.contains('disabled'))
      return;

    var tmp_turn_state = this.turn;
    _t.state = 'SHOW_ANSWER';

    _t.play(true,tmp_turn_state);
  },
  play:function(flash,tmp_turn_state){
    var _t = this;
    for(var i = 0;i < _t.number_of_key_played; i++) {
      var delay = 50 + (500 * i);
      setTimeout((function(n){
        return function () {
          piano.play(_t.quiz_keys[n]);
          if(flash)
            keyboard.flash(_t.quiz_keys[n], 'correct');
          if(n === _t.number_of_key_played - 1) {
            _t.state = tmp_turn_state;
            _t.reset_button_states();
          }
        }
      })(i), delay);
    }
  }
};

function init() {
  piano.create_sound_sources();
  keyboard.init();
  game.init();
}

function random_select(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// initialize the game.
init();