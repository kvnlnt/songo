var Chordynator = (function(me){

    var id = "Chordynator";
    var Dom = $("#"+id);

    // load app on page render
    function load(){
        Chordynator.Map.load();
        Chordynator.Tab.load();
    }

    // reload applicaiton
    function reload(){
        Chordynator.Map.reload();
        Chordynator.Tab.reload();
    }

    // exports
    me.id = id;
    me.Dom = Dom;
    me.load = load;
    me.reload = reload;

    return me; 

}(Chordynator || {}));