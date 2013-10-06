Chordynator.Key = (function(me){

    function charUnicode(note){
        var note = typeof note == 'undefined' ? '' : note;
        var match = note.match('x|#|b');
        if(match){
            return note.replace("b","♭").replace("#","♯");
        } else {
            return note;
        }
        
    }

    function normalizeDoubleSharp(note){

        var name = note.charAt(0);
        var name_pos = me.base.roots.indexOf(name);
        var halfsteps = me.base.steps[name_pos]; // next step

        if( halfsteps == 1){
            note = name_pos == me.base.roots.length - 1 ? me.base.roots[0] + "#" : me.base.roots[name_pos+1] + "#";
        } else {
            note = name_pos == me.base.roots.length - 1 ? me.base.roots[0] : me.base.roots[name_pos+1];
        }

        return note;

    }

    function normalizeDoubleFlat(note){

        var name = note.charAt(0);
        var name_pos = me.base.roots.indexOf(name);
        var halfsteps = name_pos == 0 ? me.base.steps[me.base.roots.length-1] : me.base.steps[name_pos-1]; // prev step

        if ( halfsteps == 1 ) {
            note = name_pos == 0 ? me.base.roots[me.base.roots.length-1] + "b" : me.base.roots[name_pos-1] + "b";
        } else {
            note = name_pos == 0 ? me.base.roots[me.base.roots.length-1] : me.base.roots[name_pos-1];
        }

        return note;

    }

    // "normalize note"...translate it from double sharp or double flat
    function normalize(note){
        //var note = charUnicode(note);
        var match = note.match('x|##|bb');
        if(!match){
            return note;
        } else {
            return match == '##' || match == 'x' ? normalizeDoubleSharp(note) : normalizeDoubleFlat(note);
        }
    }

    // sharpen note
    function sharpenNote(note){

        var name = note.charAt(0);
        var name_pos = me.base.roots.indexOf(name);
        var acc = note.charAt(1);
        var halfsteps = me.base.steps[name_pos]; // next step
        var sharpenedNote;

        // find next half step note by current notes step interval (either 1 or else 2)
        if ( halfsteps == 1 ) {

            if (acc == 'b') sharpenedNote = name; // remove flat
            if (acc == '') sharpenedNote = name_pos + 1 == me.base.roots.length ? me.base.roots[0] : me.base.roots[name_pos + 1]; // get next note
            if (acc == '#') sharpenedNote = name_pos + 1 == me.base.roots.length ? me.base.roots[0] + '#' : me.base.roots[name_pos + 1] + '#'; // add sharp

        } else {

            if (acc == 'b') sharpenedNote = name; // remove flat
            if (acc == '') sharpenedNote = name + '#'; // add sharp
            if (acc == '#') sharpenedNote = name_pos + 1 == me.base.roots.length ? me.base.roots[0] : me.base.roots[name_pos + 1]; // get next note

        }

        return sharpenedNote;

    }

    // sharpen note
    function flattenNote(note){

        var name = note.charAt(0);
        var name_pos = me.base.roots.indexOf(name);
        var acc = note.charAt(1);
        var halfsteps = name_pos == 0 ? me.base.steps[me.base.roots.length-1] : me.base.steps[name_pos-1]; // prev step
        var flattenedNote;

        // find next half step note by current notes step interval (either 1 or else 2)
        if ( halfsteps == 1 ) {

            if (acc == '#') flattenedNote = name; // remove flat
            if (acc == '') flattenedNote = name_pos == 0 ? me.base.roots[me.base.roots.length-1] : me.base.roots[name_pos - 1]; // get next note
            if (acc == 'b') flattenedNote = name_pos == 0 ? me.base.roots[me.base.roots.length-1] + 'b' : me.base.roots[name_pos - 1] + 'b'; // add sharp

        } else {

            if (acc == '#') flattenedNote = name; // remove flat
            if (acc == '') flattenedNote = name + 'b'; // add flat
            if (acc == 'b') flattenedNote = name_pos == 0 ? me.base.roots[me.base.roots.length-1] : me.base.roots[name_pos - 1]; // get prev note

        }

        return flattenedNote;

    }

    // exports
    me.sharpenNote = sharpenNote;
    me.flattenNote = flattenNote;
    me.normalize = normalize;
    me.charUnicode = charUnicode;

    // return object
    return me;

}(Chordynator.Key || {}));