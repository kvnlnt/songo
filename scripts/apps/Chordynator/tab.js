Chordynator.Tab = (function(me, mapEvents, mediator){

    function load(){

        // listen for plot click events
        mediator.subscribe(mapEvents.plotClicked, renderPreview);
        $(".tab .fretNumberFirst").live('click', nextVariation);
        $(".tab").live('click', makeActive);

        // get session tabs
        sessionTabs = Session.chordynator.tabs;
        loadTabTemplates();

    }

    function makeActive(e){

        // remove all actives
        $('.Tab').removeClass('activeTab');

        // add class
        var tab = $(e.currentTarget).parent('.Tab');
            tab.addClass('activeTab');

    }

    function copyTab(e){

        // get / set attrs
        var tab = $(e).parent('svg');
        var name = tab.attr('name');
        var type = tab.attr('type');
        var variation = tab.attr('variation');

        // add to session
        Session.chordynator.tabs.push([name, type, variation]);
        //tab.parent('.Tab').append().removeClass('.TabPreview').addClass('.sessionTab');

        var newTab = tab.parent('.TabPreview').clone();
            newTab.find('.copyTab').remove();
            newTab.removeClass('TabPreview');
            newTab.addClass('sessionTab');
            newTab.insertAfter($('.TabPreview'));

    }

    function deleteTab(e){

        // remove tab
        $(e).parents('.sessionTab').remove();
            
    }

     function loadTabTemplates(){

        // get all tabs
        var tabs = Session.chordynator.tabs;
        var target, name, type, variation;

        // Add tab preview
        Chordynator.Dom.append('<div class="Tab TabPreview activeTab">Preview</div>');

        // loop and load each tab
        for(tab in tabs){

            // set mediator vars
            name = tabs[tab][0];
            type = tabs[tab][1];
            variation = tabs[tab][2];

            // attach dom el
            Chordynator.Dom.append('<div class="Tab sessionTab" tab="'+name+type+variation+'">Tab</div>');

            // get target
            target = '.sessionTab[tab="'+name+type+variation+'"]';

            // render tab
            renderTab(target, name, type, variation);

        }
            
    }

    function nextVariation(e){

        var tabPlot    = $(e.currentTarget);
        var tab        = tabPlot.parent("svg");
        var tabPreview = tab.parent().hasClass('TabPreview');
        var name       = tab.attr("name");
        var type       = tab.attr("type");
        var variations = tab.attr("variations");
        var variation  = tab.attr("variation") >= variations ? 0 : parseInt(tab.attr("variation"));

        mediator.name = name;
        mediator.type = type;
        mediator.variation = variation;

        if(tabPreview === true){
            renderPreview();
        } else {
            renderTab(tab.parent(), name, type, variation);
        }
    }

    function unicodeChar(c){
        var c = typeof c == 'undefined' ? '' : c;
        var match = c.match('♭|♯');
        if(match){
            return c.replace("♭","b").replace("♯","#");
        } else {
            return c;
        }
        
    }

    function renderTab(target, name, type, variation){

        var tabs = getTabs(unicodeChar(name), type);
        var tab  = tabs[variation];

        // get template
        var template   = 'scripts/apps/Chordynator/templates/tab.handlebars';

        // calc data
        var tabFilter  = [];
            tab.map(function(i){ if(i != -1 ){ tabFilter.push(i) } }); // fill filter
        var tabSort    = tabFilter.sort();
        var fretLength = tabSort.indexOf(0) == -1 ? tabSort[tabSort.length-1] - tabSort[0] + 1 : tabSort[tabSort.length-1]; // step 2: if no 0s, count frets to first fret, else to 0
        var firstFret  = tabSort[0] === 0 ? 1 : tabSort[0];
        var data       = { name:name, type:type, tab:tab, tabCount:tabs.length, firstFret:firstFret, fretLength:fretLength, current_variation:(variation+1), total_variations:tabs.length };

        // load template
        Handlebars.load(template, target, data);

    }

    function renderPreview(){

        var name = mediator.name;
        var type = mediator.type;
        var variation = mediator.variation;
        var tabs = getTabs(unicodeChar(name), type);
        var tab  = tabs[variation];

         // get map doms
        var target     = '#' + Chordynator.id + ' .activeTab' ;

        // get template
        var template   = 'scripts/apps/Chordynator/templates/tab.preview.handlebars';

        // calc data
        var tabFilter  = [];
            tab.map(function(i){ if(i != -1 ){ tabFilter.push(i) } }); // fill filter
        var tabSort    = tabFilter.sort();
        var fretLength = tabSort.indexOf(0) == -1 ? tabSort[tabSort.length-1] - tabSort[0] + 1 : tabSort[tabSort.length-1]; // step 2: if no 0s, count frets to first fret, else to 0
        var firstFret  = tabSort[0] === 0 ? 1 : tabSort[0];
        var data       = { name:name, type:type, tab:tab, tabCount:tabs.length, firstFret:firstFret, fretLength:fretLength, current_variation:(variation+1), total_variations:tabs.length };

        // load template
        Handlebars.load(template, target, data);

    }

    function getTabs(root, name){

        var tabs = Chordynator.Tab.Chords;
        var tab;
        var variations;

        // find root
        for(i in tabs){
            if(tabs[i].root.indexOf(root) != -1){
                tab = tabs[i];
                break;
            }
        }

        // find type and return variations
        for(i in tab.types){
            if(tab.types[i].name == name){
                variations = tab.types[i].variations;
                break;
            }
        }

        return variations;

    }

    function reload(){}

    // exports
    me.load = load;
    me.reload = reload;
    me.getTabs = getTabs;
    me.copyTab = copyTab;
    me.deleteTab = deleteTab;

    return me; 

}(Chordynator.Tab || {}, Chordynator.Events, Mediator));