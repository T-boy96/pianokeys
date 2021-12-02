function $(id){
    return document.getElementById(id);
}

var body = document.querySelector('.body');

var GRAND_PIANO = 88;
var keys = [GRAND_PIANO];
var limit;
var shifts;
var MIN;
var MAX;
var blacks;
var whiteBetweenBlacks;

var w = 0;
var bill_w = ['<','y','x','c','v','b','n','m',',', 'q','w','e','r','t','z','u','i','o','p'];
function char_w(){
    if(w === 0){
        w++;
        return 'í';
    }else return bill_w[w++];
}

var b = 0;
var bill_b = ['a','d','f','h','j','k','2','3','5','6','7','9','ö'];
function char_b(){
    return bill_b[b++];
}

function rshift(){
    shifts = shifts + 1;
    if (shifts === 6){
        shifts = 0;
    }
    
    [MIN,MAX] = limit[shifts];
    generateKeys(MIN,MAX);
}

function lshift(){
    shifts = shifts - 1;
    if (shifts === -1){
        shifts = 5;
    }
    
    [MIN,MAX] = limit[shifts];
    generateKeys(MIN,MAX);
}

function actionKeydownDisplay(note_pressed){
    var note = $(note_pressed);
    if(note.classList.contains('black')){
        note.style.backgroundColor = 'lightblue';
        note.style.color = 'lightblue';    
    }
    if(note.classList.contains('whitebot')){
        note.style.backgroundColor = 'lightblue';
        note.style.color = 'lightblue';
        $(note_pressed+"w").style.backgroundColor = 'lightblue'; 
        $(note_pressed+"w").style.color = 'lightblue';  
    }
}

function actionKeyupDisplay(note_pressed){
    var note = $(note_pressed);
    if(note.classList.contains('black')){
        note.style.backgroundColor = 'black';
        note.style.color = 'white';    
    }
    if(note.classList.contains('whitebot')){
        note.style.backgroundColor = 'white';
        note.style.color = 'black';
        $(note_pressed+"w").style.backgroundColor = 'white'; 
        $(note_pressed+"w").style.color = 'black';  
    }
    
}

function generateKeys(MIN, MAX) {
    w = 0;
    b = 0;
    $('whiteWithBlacks').innerHTML = '';
    
    for(let i = 1; i <= GRAND_PIANO; i++) {
        let div = document.createElement('div');
        
        if(blacks.includes(i)) {
            div.setAttribute('id',full_keyboard[i]);
            div.setAttribute('class','black');
            div.setAttribute('style', 'horizontal-align:middle');
            if(MIN < i && i < MAX){
                var char = char_b();
                let span = document.createElement('span');
                span.setAttribute('id',char);
                span.setAttribute('style','position:absolute;bottom:0;left:20%;');
                span.innerHTML = char;
                div.appendChild(span);
            }
        }
        else{
            div.setAttribute('id',full_keyboard[i] + "w");
            div.setAttribute('class','white');
            if(i === 1){
                div.setAttribute('style', 'margin-left:-1px');
            }
            else if(i === 88){
                div.setAttribute('style', 'width:22.5px');
            }
            else if(whiteBetweenBlacks.includes(i)){
                div.setAttribute('style', 'width:9.5px');
            }
        }
        $('whiteWithBlacks').appendChild(div);
    }

    $('whiteBottom').innerHTML = '';
    for(let i = 1; i <= GRAND_PIANO; i++) {
        
        if(!blacks.includes(i)) {
            let div2 = document.createElement('div');
            div2.setAttribute('class','whitebot');
            div2.setAttribute('id',full_keyboard[i]);
            if(i === 1){
                div2.setAttribute('style','margin-left:-1px');
            }
            if (MIN < i && i < MAX){
                let span2 = document.createElement('span');
                var char2 = char_w();
                span2.setAttribute('style','position: absolute;bottom: 0;left: 40%;');
                span2.setAttribute('id',char2);
                span2.innerHTML = char2;
                div2.appendChild(span2);
            }
            $('whiteBottom').appendChild(div2);
        }
    }
}

var full_keyboard = [];
function generateNotes(){
    var notes = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
    var p = 9;          //Pointer for 'notes' array, initialized at "A"
    var register = 0;   //Note register
    for(let i = 1; i <= GRAND_PIANO; i++) {
        if(notes[p] == "C"){
            register++;
        }
        var note = notes[p] + register;
        full_keyboard[i] = note;
        p = ((p+1) % 12);
    }
}

function initVariables() {
    GRAND_PIANO = 88;
    keys = [GRAND_PIANO];
    limit= [[ 0, 31],[12, 43],[24, 55],[36, 67],[48, 79],[60, 89]];
    shifts = 2;
    [MIN,MAX] = limit[shifts];
    blacks = [2,5,7,10,12,14,
        17,19,22,24,26,
        29,31,34,36,38,
        41,43,46,48,50,
        53,55,58,60,62,
        65,67,70,72,74,
        77,79,82,84,86];
    whiteBetweenBlacks = [6, 11, 13, 18, 23, 25, 
        30, 35, 37, 42, 47, 
        49, 54, 59, 61, 66, 
        71, 73, 78, 83, 85];
    
    let wwb = document.createElement('div');
    let wB = document.createElement('div');
    wwb.setAttribute('class','whiteWithBlacks');
    wwb.setAttribute('id','whiteWithBlacks');

    wB.setAttribute('class','whiteBottom');
    wB.setAttribute('id','whiteBottom');
    
    $('piano').appendChild(wwb);
    $('piano').appendChild(wB);
    
    let leftB = document.createElement('input');
    leftB.setAttribute('type','button');
    leftB.setAttribute('value','←');
    leftB.setAttribute('id','shiftl');
    
    let rightB = document.createElement('input');
    rightB.setAttribute('type','button');
    rightB.setAttribute('value','→');
    rightB.setAttribute('id','shiftr');
    $('buttons').appendChild(leftB);
    $('buttons').appendChild(rightB);
}

window.onload = function(){
    const synth = new Tone.Synth().toDestination();
    
    const MIDI = new Tone.Sampler({
        urls: {
            "C1": "24.mp3",
            "C2": "36.mp3",
            "C3": "48.mp3",
            "C4": "60.mp3",
            "C5": "72.mp3",
            "C6": "84.mp3",
            "C7": "96.mp3",
            "F1": "29.mp3",
            "F2": "41.mp3",
            "F3": "53.mp3",
            "F4": "65.mp3",
            "F5": "77.mp3",
            "G5": "79.mp3",
            "E4": "64.mp3",
            "A4": "69.mp3",
        },
        attack: 0.16,
        release: 1,
        volume: -8,
        baseUrl: "https://assets.onlinepianist.com/player/sounds/",
        }).toDestination();

    initVariables();
    generateNotes();
    generateKeys(MIN, MAX);
   
    let an = '';            // 'attack note'   ->  note (that will make sound)
    let pns = new Set();    // 'prev notes'    ->  previous attack notes (that have been making sound)
    let rn = '';            // 'release note'  ->  note that is making sound and will be released
    
    body.addEventListener('keydown', e=>{
        // TODO switch effects (piano,synth,etc...) 

        let k = e.keyCode;
        switch(k) {
            // ←  →
            case 37:
                //console.log(e.key);
                pns = new Set();
                lshift();
                break;
            case 39:
                //console.log(e.key);
                pns = new Set();
                rshift();
                break;
        }

        if($(e.key) !== null){
            an = $(e.key).parentElement.id;            
            if(pns.has(an)){
                e.preventDefault();
                return;
            }
            Tone.loaded().then(()=>{
                MIDI.triggerAttack(an);
                actionKeydownDisplay(an);
                pns.add(an);
            });
        }
    },false);

    body.addEventListener('keyup', e=>{
        if($(e.key) != null){
            rn = $(e.key).parentElement.id;
            MIDI.triggerRelease(rn);
            actionKeyupDisplay(rn);
            pns.delete(rn);
        }
    },false);
}
