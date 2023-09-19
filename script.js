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


pitchesToModifyNew = {}

for (let i = 48; i < 82; i++) {
	pitchesToModifyNew[i - 24] = [...pitchesToModify[i]]
	pitchesToModifyNew[i - 24][1] -= 24
}
pitchesToModifyNew[24] = [0, -24]
pitchesToModifyNew[25] = [-100, -24]
pitchesToModifyNew[58] = [pitchesToModifyNew[57][0], pitchesToModifyNew[57][1] + 1] // double last note
pitchesToModifyNew[59] = [-100 + next19TetStep, -2]
pitchesToModifyNew[60] = [-100 + next19TetStep * 2, -1]
pitchesToModifyNew[61] = [-100 + next19TetStep * 2, 0]
pitchesToModifyNew[62] = [-100 + next19TetStep * 3, 1]
pitchesToModifyNew[63] = [-100 + next19TetStep * 3, 2]
pitchesToModifyNew[64] = [-200 + next19TetStep * 4, 2]
pitchesToModifyNew[65] = [-400 + next19TetStep * 5, 1]
pitchesToModifyNew[66] = [-400 + next19TetStep * 5, 2]
pitchesToModifyNew[67] = [-400 + next19TetStep * 6, 3]
pitchesToModifyNew[68] = [-400 + next19TetStep * 6, 4]
pitchesToModifyNew[69] = [-400 + next19TetStep * 7, 5]
pitchesToModifyNew[70] = [-400 + next19TetStep * 7, 6]
pitchesToModifyNew[71] = [-600 + next19TetStep * 8, 5]
pitchesToModifyNew[72] = [-600 + next19TetStep * 9, 6]
pitchesToModifyNew[73] = [-600 + next19TetStep * 9, 7]
pitchesToModifyNew[74] = [-700 + next19TetStep * 10, 7]
pitchesToModifyNew[75] = [-700 + next19TetStep * 10, 8]
pitchesToModifyNew[76] = [-700 + next19TetStep * 11, 9]
pitchesToModifyNew[77] = [-700 + next19TetStep * 12, 10]
pitchesToModifyNew[78] = [-700 + next19TetStep * 12, 11]
pitchesToModifyNew[79] = [-900 + next19TetStep * 13, 10]
pitchesToModifyNew[80] = [-900 + next19TetStep * 13, 11]
pitchesToModifyNew[81] = [-900 + next19TetStep * 14, 12]
pitchesToModifyNew[82] = [-900 + next19TetStep * 14, 13]
pitchesToModifyNew[83] = [-900 + next19TetStep * 15, 14]
pitchesToModifyNew[84] = [-1100 + next19TetStep * 16, 13]
pitchesToModifyNew[85] = [-1100 + next19TetStep * 16, 14]
pitchesToModifyNew[86] = [-1100 + next19TetStep * 17, 15]
pitchesToModifyNew[87] = [-1100 + next19TetStep * 17, 16]
pitchesToModifyNew[88] = [-1200 + next19TetStep * 18, 16]
pitchesToModifyNew[89] = [-1200 + next19TetStep * 19, 17]
pitchesToModifyNew[90] = [-1200 + next19TetStep * 19, 18]




Object.keys(pitchesToModify).forEach(key => {
	if (Math.abs(pitchesToModify[key][0]) > 100) {
		Trace("too much detune")
		Trace(key)
		Trace(pitchesToModify[key])
	}
})

Object.keys(pitchesToModifyNew).forEach(key => {
	if (Math.abs(pitchesToModifyNew[key][0]) > 100) {
		Trace("too much detune")
		Trace(key)
		Trace(pitchesToModify[key])
	}
})

function transformEvent(event) {
    if (pitchesToModifyNew[event.pitch]){
    Trace("modifying")
    if (pitchesToModifyNew[event.pitch][0]) {
    event.detune = pitchesToModifyNew[event.pitch][0]
    }
    if (pitchesToModifyNew[event.pitch][1]) {
    event.pitch -= pitchesToModifyNew[event.pitch][1]
    }
    }
    return event

}

activeNotes = {}

function HandleMIDI(event) {
	
	event.trace()
/*
	Trace(Object.keys(event));
	Trace(event.toString())
	Trace(event.data1)
	*/
	
    originalPitch = event.pitch
  
    if (event instanceof NoteOn){
    var on = new NoteOn
    on.pitch = event.pitch
    on.velocity = event.velocity
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