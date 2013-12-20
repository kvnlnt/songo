Chordynator.Key = (function(me){

    var base = {
        roots: ['C','D','E','F','G','A','B'],
        steps: [2,2,1,2,2,2,1],
        accidentals: ['bb','b','','#','x']
    };

    var chord_options = {

        primary:{
            1:['M',2,6,7,9,'sus'],
            2:['m','m7','m9'],
            3:['m','m7'],
            4:['M',6,7,'m','m6'],
            5:['M',7,9,11,13],
            6:['m','m7','m9'],
            7:['*']
        },
        secondary:{
            01: [7,9,'b9','M'], 
            02: [7,9,'b9','M'], 
            03: [7,9,'b9','M'], 
            04: ['*7'], 
            05: ['*7'], 
            06: ['*7'], 
            07: [7,9,'b9','M'], 
            08: ['m*7b5'], 
            09: ['m7b5'], 
            10: ['m7b5'], 
            11: ['*7'], 
            12: [7,9,'b9','M'] 
        }

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
        var chords = { primary:{}, secondary:{}, tertiery:{} };
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
            var types = chord_options.primary[i+1];

            // add to arrays
            chords.primary[i+1] = { name:name + accidental, types:types };
            notes.push(noteMap[i] + accMap[acc_pos]);

            // update accidental position
            acc_pos = acc_pos + offset;

        }

        // calculate secondary chords (mainly secondary dominants)
        chords.secondary = {
            01: { name:notes[05],                   types:chord_options.secondary[01] }, // VI7
            02: { name:notes[01],                   types:chord_options.secondary[02] }, // II7
            03: { name:notes[06],                   types:chord_options.secondary[03] }, // VII7
            04: { name:me.sharpenNote(notes[00]),   types:chord_options.secondary[04] }, // #I dim7
            05: { name:me.sharpenNote(notes[01]),   types:chord_options.secondary[05] }, // #II dim7
            06: { name:me.sharpenNote(notes[04]),   types:chord_options.secondary[06]}, // #V dim7
            07: { name:notes[02],                   types:chord_options.secondary[07] }, // III
            08: { name:me.sharpenNote(notes[03]),   types:chord_options.secondary[08] }, // sIVm dim 7b5
            09: { name:notes[02],                   types:chord_options.secondary[09] }, // IIIm 7b5
            10: { name:me.sharpenNote(notes[03]),   types:chord_options.secondary[10] }, // #IV m7b5
            11: { name:me.sharpenNote(notes[00]),   types:chord_options.secondary[11] }, // #I dim7
            12: { name:notes[00],                   types:chord_options.secondary[12] } // I 7
        };

        // calculate tertiery chords
        chords.tertiery  = {
            01: { name:notes[02],                                       type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[01] }, // III m7b5
            02: { name:notes[03],                                       type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[02] }, // #IV m7b5
            03: { name:notes[04],                                       type:'m7',      flowsTo:Chordynator.Key.Mapping.chords.tertiery[03] }, // V m7
            04: { name:notes[00],                                       type:'m6',      flowsTo:Chordynator.Key.Mapping.chords.tertiery[04] }, // I m6
            05: { name:notes[04].charAt(0) + "/" + notes[01].charAt(0), type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[05] }, // V/2 m7b5
            06: { name:me.flattenNote(notes[05]),                       type:'M',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[06] }, // bVI
            07: { name:me.flattenNote(notes[06]),                       type:'9',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[07] }, // bVII 9
            08: { name:notes[03].charAt(0) + "/" + notes[00].charAt(0), type:'M',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[08] }, // IV/I
            09: { name:notes[04].charAt(0) + "/" + notes[00].charAt(0), type:'M',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[09] }, // V/I
            10: { name:notes[00].charAt(0) + "/" + notes[04].charAt(0), type:'M',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[10] }, // I/5
            11: { name:notes[03],                                       type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[11] }, // #IV m7b5
            12: { name:notes[06],                                       type:'9',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[12] }, // bVII 9
            13: { name:notes[05],                                       type:'7',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[13] }, // bVI 7
            14: { name:notes[00],                                       type:'*b3',     flowsTo:Chordynator.Key.Mapping.chords.tertiery[14] }, // I *b3
            15: { name:notes[02],                                       type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[15] }, // III m7b5
            16: { name:notes[06],                                       type:'m7b5',    flowsTo:Chordynator.Key.Mapping.chords.tertiery[16] }, // VII m7b5
            17: { name:notes[00],                                       type:'7',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[17] }, // bII 7
            18: { name:notes[03],                                       type:'m7',      flowsTo:Chordynator.Key.Mapping.chords.tertiery[18] }, // IV m7
            19: { name:notes[00].charAt(0) + "/" + notes[02].charAt(0), type:'7',       flowsTo:Chordynator.Key.Mapping.chords.tertiery[19] } // I/3 7
        }

        return { 
            chords:chords,
            notes: notes 
        };

    }

    // exports
    me.getKey = getKey;
    me.listOfKeys = getListOfKeys();
    me.base = base;
    me.chord_options = chord_options;

    // return object
    return me;

}(Chordynator.Key || {}));