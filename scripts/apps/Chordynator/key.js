Chordynator.Key = (function(me){

    var base = {
        roots: ['C','D','E','F','G','A','B'],
        steps: [2,2,1,2,2,2,1],
        accidentals: ['bb','b','','#','x'],
        chord_types: [ 'M,2,6,7,9,sus', 'm,m7,m9', 'm,m7', 'M,6,7,m,m6', 'M,7,9,11,13', 'm,m7,m9','*' ]
    };


    // get list of keys
    function getListOfKeys(){

        var keys = [];
        for(var i in base.roots){
            for(var j = 1; j < 4; j++){
                keys.push(base.roots[i] + base.accidentals[j]);
            }
        }

        return keys;

    }


    // Calculate key chords and notes
    function getKey(key){

        // basic params
        key = me.normalize(key);
        var name = key.charAt(0);
        var name_pos = base.roots.indexOf(name);
        var acc = key.charAt(1);
        var acc_index = base.accidentals.indexOf(acc);
        var acc_offset = acc_index - 2 < 0 ? 3 + acc_index : acc_index - 2;
        var acc_pos = 2;
        var primary_chords = {};
        var notes = [];

        // copy original arrays for manipulation
        var dataAcc = base.accidentals.slice(0); 
        var dataRoots = base.roots.slice(0);
        var dataSteps = base.steps.slice(0);

        // create internal array maps
        var accMap = dataAcc.concat(dataAcc.splice(0,acc_offset)); // rearrange so accidental is in middle
        var noteMap = dataRoots.concat(dataRoots.splice(0,name_pos)); // rearrange so notes are in order
        var stepMap = dataSteps.concat(dataSteps.splice(0,name_pos)); // rearrange to steps map new note order

        // populate primary chords and notes
        for(var i = 0; i < noteMap.length; i++){

            // compare current step to original
            var offset = base.steps[i] - stepMap[i];

            // get data
            var name = noteMap[i];
            var accidental = accMap[acc_pos];
            var type = base.chord_types[i].split(',')[0];

            // add to arrays
            primary_chords[i+1] = { name:name + accidental, type:type, types:base.chord_types[i] };
            notes.push(noteMap[i] + accMap[acc_pos]);

            // update accidental position
            acc_pos = acc_pos + offset;

        }

        // calculate secondary chords (mainly secondary dominants)
        var secondary_chords = {
            01: { name:notes[05], type:'7', types:'7,9,b9' }, // VI7
            02: { name:notes[01], type:'7', types:'7,9,b9' }, // II7
            03: { name:notes[06], type:'7', types:'7,9,b9' }, // VII7
            04: { name:me.sharpenNote(notes[00]), type:'*7', types:'*7' }, // #I dim7
            05: { name:me.sharpenNote(notes[01]), type:'*7', types:'*7' }, // #II dim7
            06: { name:me.sharpenNote(notes[04]), type:'*7', types:'*7'}, // #V dim7
            07: { name:notes[02],  type:'7', types:'7,9,b9' }, // III7
            08: { name:me.sharpenNote(notes[03]), type:'m*7b5', types:'m*7b5' }, // sIVm dim 7b5
            09: { name:notes[02],  type:'m7b5', types:'m7b5' }, // IIIm 7b5
            10: { name:me.sharpenNote(notes[03]), type:'m7b5', types:'m7b5' }, // #IV m7b5
            11: { name:me.sharpenNote(notes[00]), type:'*7', types:'*7' }, // #I dim7
            12: { name:notes[00],  type:'7', types:'7,9,b9' } // I 7
        };

        // calculate tertiery chords
        var tertiery_chords  = {
            01: { name:notes[02], type:'m7b5' }, // III m7b5
            02: { name:notes[03], type:'m7b5' }, // #IV m7b5
            03: { name:notes[04], type:'m7' }, // V m7
            04: { name:notes[00], type:'m6' }, // I m6
            05: { name:notes[04].charAt(0) + "/" + notes[01].charAt(0), type:'m7b5' }, // V/2 m7b5
            06: { name:me.flattenNote(notes[05]), type:'M' }, // bVI
            07: { name:me.flattenNote(notes[06]), type:'9' }, // bVII 9
            08: { name:notes[03].charAt(0) + "/" + notes[00].charAt(0), type:'M' }, // IV/I
            09: { name:notes[04].charAt(0) + "/" + notes[00].charAt(0), type:'M' }, // V/I
            10: { name:notes[00].charAt(0) + "/" + notes[04].charAt(0), type:'M' }, // I/5
            11: { name:notes[03], type:'m7b5' }, // #IV m7b5
            12: { name:notes[06], type:'9' }, // bVII 9
            13: { name:notes[05], type:'7' }, // bVI 7
            14: { name:notes[00], type:'*b3' }, // I *b3
            15: { name:notes[02], type:'m7b5' }, // III m7b5
            16: { name:notes[06], type:'m7b5' }, // VII m7b5
            17: { name:notes[00], type:'7' }, // bII 7
            18: { name:notes[03], type:'m7' }, // IV m7
            19: { name:notes[00].charAt(0) + "/" + notes[02].charAt(0), type:'7' }, // I/3 7
        }

        return { 
            primary_chords: primary_chords,
            secondary_chords: secondary_chords,
            tertiery_chords: tertiery_chords,
            notes: notes 
        };

    }

    // exports
    me.getKey = getKey;
    me.listOfKeys = getListOfKeys();
    me.base = base;

    // return object
    return me;

}(Chordynator.Key || {}));