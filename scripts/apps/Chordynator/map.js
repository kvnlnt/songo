Chordynator.Map = (function(me){

    // get layout
    var layout, maps;

    function load(){

        // get data
        layout = me.getMapLayout();
        maps = Session.chordinator.maps;

        // load gui first
        loadMapTemplates(); // Load Maps from Session
        loadTabTemplates(); // Load Tabs from Session

    }

    // config map after template has been loaded
    function config(){

        // config plots
        $(".plot").on('click', plotClicked);

        // config
        loadMapData(); // configure each map
    }

    function loadMapTemplates(){

        // attach containers for each map to dom
        for(map in maps){ Chordynator.Dom.append('<div class="Map" key="'+maps[map]+'">Map</div>'); }

        // get map doms
        var targets = '#' + Chordynator.id + ' > .Map';

        // get template
        var template = 'scripts/apps/Chordynator/templates/map.handlebars';

        // load template
        Handlebars.load(template, targets, layout, Chordynator.Events.mapReady);

    }

    function loadKeyPicker(map){
        var list = Chordynator.Key.listOfKeys;
    }

    function loadMapData(){

        // set/get params
        var key, Map, New, Options, Types, Tertieries, chord, plot, ids = null;
        var mappings = Chordynator.Key.Mapping;

        // TODO load data for each map
        for(var map in maps){ 

            // get key data by key attr
            key = Chordynator.Key.getKey(maps[map]);

            // get map and it's objects
            Map = $(".Map").eq(map);
            Options = Map.find('.options');
            New = Map.find('.new');
            Types = Map.find('.types');
            Tertieries = Map.find('.tertieries');

            // attach primary chords
            for(var i in mappings.primary_chords) {
                chord = key.primary_chords[i];

                // loop each plot 
                for(var j in mappings.primary_chords[i]){
                    id = mappings.primary_chords[i][j];
                    plot = $(Map).find('g[plot="'+id+'"]');
                    plot.children(".name").text(Chordynator.Key.normalize(chord.name));
                    plot.children(".type").text(chord.type );
                }

            }

           // attach secondary chords
            for(var i in mappings.secondary_chords) {
                chord = key.secondary_chords[i];

                // loop each plot 
                for(var j in mappings.secondary_chords[i]){
                    id = mappings.secondary_chords[i][j];
                    plot = $(Map).find('g[plot="'+id+'"]');
                    plot.children(".name").text(Chordynator.Key.normalize(chord.name));
                    plot.children(".type").text(chord.type );
                }
                
            }

            // TODO

            // options
            Options.children(".name").text('Opt');

            // new
            New.children('.name').text('New');

            // types
            Types.children('.name').text('M');

            // tertieries
            Tertieries.children(".name").text('+');

        }

    }

    function loadTabTemplates(){

        // get all tabs
        var tabs = Session.chordinator.tabs;

        // attach containers to doms
        for(tab in tabs){ Chordynator.Dom.append('<div class="Tab">Tab</div>'); }
            
    }

    function plotClicked(e){

        // get current plot
        var plot = $(e.currentTarget);
        var map = plot.parent("svg");
        var twin = map.find('g[plot="'+plot.attr('twin')+'"]');

        // reset classes for all plots and flow arrows
        map.children(".plot").removeClass('selected active');
        map.children(".flow").removeClass('active');

        // find and collect plot (and twin) flow arrows
        var flows = map.children('.flow[from="'+plot.attr('plot')+'"], .flow[from="'+twin.attr('plot')+'"]');
        
        // find and collect plots this plot/twin flows to
        var flowToPlots = [];
        flows.each(function(){
            var flowsTo = $(this).attr('to');
            flowToPlots.push(map.children('g[plot="'+flowsTo+'"]')[0]);
        });

        // activate plot/twin
        plot.addClass('selected');
        twin.addClass('selected');
        flows.addClass('active');
        $(flowToPlots).addClass('active');

    }

    function reload(){}

    // exports
    me.load = load;
    me.config = config;
    me.reload = reload;
    me.plotClicked = plotClicked;

    return me; 

}(Chordynator.Map || {}));