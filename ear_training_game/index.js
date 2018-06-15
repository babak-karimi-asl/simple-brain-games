function play_piano_key(keyname)
{
  get_piano_key(keyname).onmousedown()
}

var piano_audio_map={
'C'     :'note1s',
'Csharp':'note2s',
'D'     :'note3s',
'Dsharp':'note4s',
'E'     :'note5s',
'F'     :'note6s',
'Fsharp':'note7s',
'G'     :'note8s',
'Gsharp':'note9s',
'A'     :'note10s',
'Asharp':'note11s',
'B'     :'note12s',
};


var piano_id_map={
'C'     :'piano-C-key',
'Csharp':'piano-Csharp-key',
'D'     :'piano-D-key',
'Dsharp':'piano-Dsharp-key',
'E'     :'piano-E-key',
'F'     :'piano-F-key',
'Fsharp':'piano-Fsharp-key',
'G'     :'piano-G-key',
'Gsharp':'piano-Gsharp-key',
'A'     :'piano-A-key',
'Asharp':'piano-Asharp-key',
'B'     :'piano-B-key',
};


var id_piano_map={
'piano-C-key':'C',
'piano-Csharp-key':'Csharp',
'piano-D-key':'D',
'piano-Dsharp-key':'Dsharp',
'piano-E-key':'E',
'piano-F-key':'F',
'piano-Fsharp-key':'Fsharp',
'piano-G-key':'G',
'piano-Gsharp-key':'Gsharp',
'piano-A-key':'A',
'piano-Asharp-key':'Asharp',
'piano-B-key':'B',
};

function get_piano_key(keyname)
{
    return document.getElementById( 'piano-'+keyname+'-key');

}

function piano_key_temp_css_class(keynam,cssclass)
{
    var keyelm = get_piano_key(keynam)
    keyelm.classList.add(cssclass)
    setTimeout(function(){
    keyelm.classList.remove(cssclass)
    },500);    
}

function piano_key_select_green(keynam)
{
    piano_key_temp_css_class(keynam,'selection-border')
}

function piano_key_select_red(keynam)
{
    piano_key_temp_css_class(keynam,'selection-border-wrong')
}


function bindMp3ToPianoKey(mp3id,keyid)
{
    var themp3elem = document.getElementById(mp3id);
    document.getElementById(keyid).onmousedown=function(){
        themp3elem.pause();
        themp3elem.currentTime=0;
        themp3elem.play();


        if(turn_state==='ANSWER')
        {
            
            if(quiz_keys.shift() === id_piano_map[keyid])
            {
                piano_key_select_green(id_piano_map[keyid]);
            }
            else
            {
                piano_key_select_red(id_piano_map[keyid]);
            }
        }

        if(quiz_keys.length<=0)
        {
            turn_state='QUESTION';
            correct_button_states();
        }

        
             
    }
}

function random_select(arr)
{
    return  arr[Math.floor( Math.random() * arr.length )]
}

/////////////////////////////////////////////////


bindMp3ToPianoKey('note1s','piano-C-key');
bindMp3ToPianoKey('note2s','piano-Csharp-key');
bindMp3ToPianoKey('note3s','piano-D-key');
bindMp3ToPianoKey('note4s','piano-Dsharp-key');
bindMp3ToPianoKey('note5s','piano-E-key');
bindMp3ToPianoKey('note6s','piano-F-key');
bindMp3ToPianoKey('note7s','piano-Fsharp-key');
bindMp3ToPianoKey('note8s','piano-G-key');
bindMp3ToPianoKey('note9s','piano-Gsharp-key');
bindMp3ToPianoKey('note10s','piano-A-key');
bindMp3ToPianoKey('note11s','piano-Asharp-key');
bindMp3ToPianoKey('note12s','piano-B-key');

var start_button = document.getElementById('game-start-id');
var played_key_1 = document.getElementById('played-key-1');
var played_key_2 = document.getElementById('played-key-2');
var play_again_button = document.getElementById('play-again-id');
var show_answer_button = document.getElementById('show-answer-id');

var piano_key_elem={
    'C':document.getElementById('piano-C-key'),
    'Csharp':document.getElementById('piano-Csharp-key'),
    'D':document.getElementById('piano-D-key'),
    'Dsharp':document.getElementById('piano-Dsharp-key'),
    'E':document.getElementById('piano-E-key'),
    'F':document.getElementById('piano-F-key'),
    'Fsharp':document.getElementById('piano-Fsharp-key'),
    'G':document.getElementById('piano-G-key'),
    'Gsharp':document.getElementById('piano-Gsharp-key'),
    'A':document.getElementById('piano-A-key'),
    'Asharp':document.getElementById('piano-Asharp-key'),
    'B':document.getElementById('piano-B-key')
};


var playalbe_keys = [
'C','Csharp',
'D','Dsharp',
'E',
'F','Fsharp',
'G','Gsharp',
'A','Asharp',
'B'
];

var played_keys = [];
var quiz_keys = [];
var turn_state = 'QUESTION';

/////////////////////////////////////////////


function correct_button_states()
{
    if(turn_state=='QUESTION')   
    {
        play_again_button.classList.add('disabled')
        show_answer_button.classList.add('disabled')

        start_button.classList.remove('disabled')
    }

    if(turn_state=='ANSWER')   
    {
        start_button.classList.add('disabled')

        play_again_button.classList.remove('disabled')
        show_answer_button.classList.remove('disabled')        
    }
}


correct_button_states();

start_button.onclick=function(){

    if(this.classList.contains('disabled'))
        return;

    quiz_keys=[];

    var tmp_key ='0';

    tmp_key = random_select(playalbe_keys)
    //played_key_1.innerText = tmp_key
    played_keys.push( tmp_key )
    quiz_keys.push(tmp_key)
    console.log(tmp_key)


    tmp_key = random_select(playalbe_keys)
    //played_key_2.innerText = tmp_key
    played_keys.push( tmp_key )
    quiz_keys.push(tmp_key)
    console.log(tmp_key)



    turn_state='QUESTION';

    correct_button_states();

    setTimeout(function(){ play_piano_key( played_keys.shift() ); },50)
    setTimeout(function(){ play_piano_key( played_keys.shift() ); turn_state='ANSWER'; correct_button_states(); },550)




}



play_again_button.onclick=function()
{

    if(this.classList.contains('disabled'))
        return;

    var tmp_turn_state = turn_state
    turn_state='PLAY_AGAIN'
    setTimeout(function(){ play_piano_key( quiz_keys[0] ); },50)
    setTimeout(function(){ play_piano_key( quiz_keys[1] ); turn_state=tmp_turn_state; },550)
}




show_answer_button.onclick=function()
{
     if(this.classList.contains('disabled'))
        return;

    var tmp_turn_state = turn_state
    turn_state='SHOW_ANSWER'
    setTimeout(function(){ play_piano_key( quiz_keys[0] );  piano_key_select_green(quiz_keys[0]); },50)
    setTimeout(function(){ play_piano_key( quiz_keys[1] );  piano_key_select_green(quiz_keys[1]); turn_state=tmp_turn_state; },550)
}








