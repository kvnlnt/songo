// facade pattern : simplifies interface
var API = (function(api){

    function load(){

        // load widgets
        Chordynator.load();

    }

    function debug(){
        //console.log(Util.url.getParams(), Util.url.getParams()['key']);
    }

    // public 
    api.load = load;
    api.debug = debug;
    
    return api;

}(API || {}));
