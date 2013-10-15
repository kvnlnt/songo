Chordynator.Tab = (function(me, mapEvents, mediator){

    function load(){
        mediator.subscribe(mapEvents.plotClicked, function(arg){
            var plot = arguments[0];
            var map = arguments[1];
            var name = plot.find(".name").text();
            var type = plot.find(".type").text();
            renderPreview(name, type);
        });
    }

    function renderPreview(name, type){
        console.log("Render=", name, type);
        var tab = getTab(name, type);
    }

    function getTab(name, type, version){
        version = typeof version !== 'undefined' ? version : 0;
    }

    function reload(){}

    // exports
    me.load = load;
    me.reload = reload;

    return me; 

}(Chordynator.Tab || {}, Chordynator.Events, Mediator));