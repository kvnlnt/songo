Chordynator.Map = (function(me, events, mediator){

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
        $(".options").live('click', advanceType);
        $(".tertieries").live('click', Chordynator.Map.Forms.load('tertieries'));

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
        var key, Map, Settings, Options, Tertieries, chord, plot, ids = null;
        var mappings = Chordynator.Key.Mapping;

        // TODO load data for each map
        for(var map in maps){ 

            // get key data by key attr
            key = Chordynator.Key.getKey(maps[map]);

            // get map and it's objects
            Map = $(".Map").eq(map);
            Map.attr('key', maps[map]);
            Settings = Map.find('.settings');
            Options = Map.find('.options');
            Tertieries = Map.find('.tertieries');

            // attach primary chords
            for(var i in mappings.chords.primary) {
                chord = key.chords.primary[i];

                // loop each plot 
                for(var j in mappings.chords.primary[i]){
                    id = mappings.chords.primary[i][j];
                    plot = $(Map).find('g[plot="'+id+'"]');
                    plot.children(".name").text(Chordynator.Key.charUnicode(Chordynator.Key.normalize(chord.name)));
                    plot.children(".type").text(chord.types[0] );
                }

            }

           // attach secondary chords
            for(var i in mappings.chords.secondary) {
                chord = key.chords.secondary[i];

                // loop each plot 
                for(var j in mappings.chords.secondary[i]){
                    id = mappings.chords.secondary[i][j];
                    plot = $(Map).find('g[plot="'+id+'"]');
                    plot.children(".name").text(Chordynator.Key.charUnicode(Chordynator.Key.normalize(chord.name)));
                    plot.children(".type").text(chord.types[0] );
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

        if(plot.hasClass('tertiery')){
            if(!plot.find('.name').text().length){
                $(".tertieries").click();
            } else {
                map.find(".plot[plot='"+plot.attr('flowsTo')+"']").addClass('active'); // hack for tertiery plot click
            }
        }

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

        // update options list
        var options = plot.find(".type").attr('options').split(',');
        var type = options[0];
        if(options.length > 1){
            map.find(".options .name").text(plot.find('.type').text());
            map.find(".options").addClass('active');
            map.find(".options image").addClass('unavailable');
        } else {
            map.find(".options .name").text('');
            map.find(".options image").removeClass('unavailable');
            map.find(".options").removeClass('active');
        }

        // broadcast event
        mediator.publish(events.plotClicked, plot, map); //tim, david

    }

    function advanceType(e){

        // get and set type options
        var plot = $(e.currentTarget); // options button
        var map = plot.parent("svg"); // current map
        var type = map.find('g.selected .type'); // selected type el
        var options = type.attr('options').split(','); // it's options list
        if(options.length <= 1) return false;
        var shiftOptions = options.concat(options.splice(0,1)); // shift array left, attach popped val to end
        var new_type = shiftOptions[0]; // get new val (fitem)
        var new_options = shiftOptions.join(','); // create new list of shifted array
        
         // set options list with shifted list
        type.attr('options', new_options);

        // update selected chord plot
        type.text(new_type);

        // update options plot
        plot.find('.name').text(new_type);

    }

    // exports
    me.load = load;
    me.loadMapData = loadMapData;
    me.plotClicked = plotClicked;

    return me; 

}(Chordynator.Map || {}, Chordynator.Events, Mediator));