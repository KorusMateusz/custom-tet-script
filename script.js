const next19TetStep = 63.157895
const pitchesToModify = {
48: [0],
49: [-100],
50: [-100 + next19TetStep, 1],
51: [-100 + next19TetStep, 2],
52: [-100 + next19TetStep * 2, 3],
53: [-100 + next19TetStep * 3, 4], // detune handles only up to two semitones :(
54: [-100 + next19TetStep * 3, 5],
55: [-200 + next19TetStep * 4, 5],
56: [-200 + next19TetStep * 4, 6],
57: [-400 + next19TetStep * 5, 4],
58: [-400 + next19TetStep * 5, 5],
59: [-400 + next19TetStep * 6, 5],
60: [-400 + next19TetStep * 7, 6],
61: [-400 + next19TetStep * 7, 7],
62: [-600 + next19TetStep * 8, 6],
63: [-600 + next19TetStep * 8, 7],
64: [-600 + next19TetStep * 9, 9],
65: [-700 + next19TetStep * 10, 10],
66: [-700 + next19TetStep * 10, 11],
67: [-700 + next19TetStep * 11, 12],
68: [-700 + next19TetStep * 10, 11],
69: [-700 + next19TetStep * 11, 12],

};

Object.keys(pitchesToModify).forEach(key => {
	if (Math.abs(pitchesToModify[key][0]) > 100) {
		Trace("too much detune")
		Trace(key)
		Trace(pitchesToModify[key])
	}
})


function transformEvent(event) {
    if (pitchesToModify[event.pitch]){
    if (pitchesToModify[event.pitch][0]) {
    event.detune = pitchesToModify[event.pitch][0]
    }
    if (pitchesToModify[event.pitch][1]) {
    event.pitch -= pitchesToModify[event.pitch][1]
    }
    }
    return event

}

activeNotes = {}

function HandleMIDI(event) {
	
	event.trace()

	Trace(Object.keys(event));
	Trace(event.toString())
	Trace(event.data1)
	
    originalPitch = event.pitch
  
    if (event instanceof NoteOn){
    var on = new NoteOn
    on.pitch = event.pitch
    on = transformEvent(on)
    on.send(); //send the note
    
    var off = new NoteOff(on); //make a note off using the note on to initialize 
                               //it's pitch value (to C3)
    activeNotes[originalPitch] = off
    
    } else{
    //var on = new NoteOn; //make a new note on
    //on.pitch = 48; //set it's pitch to C3
    
    off = activeNotes[originalPitch]
    delete activeNotes[originalPitch]
    Trace("sending")
    return off.send()
    }                      
}