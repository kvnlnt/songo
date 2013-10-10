Chordynator.Map = (function(me){

    // get layout
    var layout, maps;

    function load(){

        // get data
        layout = me.getMapLayout();
        maps = Session.chordynator.maps;

        // load gui first
        loadMapTemplates(); // Load Maps from Session
        loadTabTemplates(); // Load Tabs from Session

    }

    // config map 
    function config(){

        // Load data
        loadMapData(); // configure each map

        // add events
        $(".plot").live('click', plotClicked);
        $(".settings").live('click', Chordynator.Map.Forms.load('settings'));
        $(".types").live('click', Chordynator.Map.Forms.load('types'));
        $(".tertieries").live('click', Chordynator.Map.Forms.load('tertieries'));
        $(".new").live('click', Chordynator.Map.Forms.load('new'));

        // default selected
        $('.Map:first-child .plot[plot="12"]').click();

    }

    function loadMapTemplates(){

        // attach containers for each map to dom
        for(map in maps){ Chordynator.Dom.append('<div class="Map" key="'+maps[map]+'">Map</div>'); }

        // get map doms
        var targets = '#' + Chordynator.id + ' > .Map';

        // get template
        var template = 'scripts/apps/Chordynator/templates/map.handlebars';

        // load template
        Handlebars.load(template, targets, layout, config);

    }

    function loadKeyPicker(map){
        var list = Chordynator.Key.listOfKeys;
    }

    function loadMapData(){

        // set/get params
        var key, Map, New, Settings, Types, Tertieries, chord, plot, ids = null;
        var mappings = Chordynator.Key.Mapping;

        // TODO load data for each map
        for(var map in maps){ 

            // get key data by key attr
            key = Chordynator.Key.getKey(maps[map]);

            // get map and it's objects
            Map = $(".Map").eq(map);
            Map.attr('key', maps[map]);
            Settings = Map.find('.settings');
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
                    plot.children(".name").text(Chordynator.Key.charUnicode(Chordynator.Key.normalize(chord.name)));
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
                    plot.children(".name").text(Chordynator.Key.charUnicode(Chordynator.Key.normalize(chord.name)));
                    plot.children(".type").text(chord.type );
                }
                
            }

        }

    }

    function loadTabTemplates(){

        // get all tabs
        var tabs = Session.chordynator.tabs;

        // Add tab preview
        Chordynator.Dom.append('<div class="Tab TabPreview">Preview</div>');

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

        // Change type selection to plot type
        if(plot.hasClass('primary')){
            map.find(".types .name").text(plot.find('.type').text());
            map.find(".types").addClass('active');
            map.find(".types image").addClass('unavailable');
        } else {
            map.find(".types .name").text('');
            map.find(".types image").removeClass('unavailable');
            map.find(".types").removeClass('active');
        }

    }

    // exports
    me.load = load;
    me.loadMapData = loadMapData;
    me.plotClicked = plotClicked;

    return me; 

}(Chordynator.Map || {}));