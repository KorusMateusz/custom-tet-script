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
57: [-400 + next19TetStep * 5, 5],
58: [-400 + next19TetStep * 5, 6],
59: [-400 + next19TetStep * 6, 7],
60: [-400 + next19TetStep * 7, 8],
61: [-400 + next19TetStep * 7, 9],
62: [-600 + next19TetStep * 8, 8],
63: [-600 + next19TetStep * 8, 9],
64: [-600 + next19TetStep * 9, 10],
65: [-700 + next19TetStep * 10, 10],
66: [-700 + next19TetStep * 10, 11],
67: [-700 + next19TetStep * 11, 12],
68: [-700 + next19TetStep * 11, 13],
69: [-700 + next19TetStep * 12, 14],
70: [-700 + next19TetStep * 12, 15],
71: [-900 + next19TetStep * 13, 14],
72: [-900 + next19TetStep * 14, 15],
73: [-900 + next19TetStep * 14, 16],
74: [-900 + next19TetStep * 15, 17],
75: [-900 + next19TetStep * 15, 18],
76: [-1100 + next19TetStep * 16, 17],
77: [-1100 + next19TetStep * 17, 18],
78: [-1100 + next19TetStep * 17, 19],
79: [-1200 + next19TetStep * 18, 19],
80: [-1200 + next19TetStep * 18, 20],
81: [-1200 + next19TetStep * 19, 21]
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