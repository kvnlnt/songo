Chordynator.Events = (function(me){

    // Register Events
    var mapReady = "Chordynator:mapReady";

    // Register Listeners
    $(window).on(mapReady, Chordynator.Map.config);

    // exports
    me.mapReady = mapReady;

    return me; 

}(Chordynator.Events || {}));