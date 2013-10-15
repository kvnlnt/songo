Chordynator.Map.Forms = (function (me) {

    function load(form){

        return function(e){

            var target = $(e.currentTarget); // get el clicked on
            var map = target.parents('.Map'); // get map
            var dom = '#' + Layout.Lightbox.id; // get lightbox el to populate
            var template = 'scripts/apps/Chordynator/templates/'+form+'.handlebars'; // get template

            // ajax load template
            Handlebars.load(template, dom, preConfig[form](map), postConfigForm);

        };
        
    }

    // get preconfig data
    var preConfig = {
        settings:function(map){     return {    type:'settings', index:map.index(), key:map.attr("key") }; },
        options:function(map){      return {    type:'options', index:map.index(), key:map.attr("key") }; },
        tertieries:function(map){   return {    type:'tertieries',   
                                                index:map.index(), 
                                                key:map.attr("key"), 
                                                tertieries:Chordynator.Key.getKey(map.attr("key")).chords.tertiery }; }
    }

    // Callback switchboard
    function postConfigForm(){
        var form = $('#' + Layout.Lightbox.id).children('form');
        postConfig[form.attr('type')](form);
    }

    // Configure form
    var postConfig = {

        settings:function(form){

            // hide delete button if they only have one map
            if($('.Map').length <= 1){  $('input[value="remove"]').hide(); }

            // set current key
            var key = form.attr('key').value;
            var option = form.find('option[value="'+key+'"]');
            option.attr('selected', 'selected');

        },

        options:function(form){},

        tertieries:function(form){

            // get values
            var name, type, map, plot, flow;

            form.find(".tertiery_list li").on('click',function(){

                name = $(this).attr("name");
                type = $(this).attr("type");
                flow = $(this).attr("flowsTo");
                map = $(".Map").eq(form.attr("index").value);
                plot = map.find("g.tertiery");
                updateTertiery(map, plot, name, type, flow);

            });

        }

    }

    function updateTertiery(map, plot, name, type, flow){

        // assign to tertiery plot
        plot.find(".name").text(name);
        plot.find(".type").text(type);
        plot.find(".type").attr('options', type);
        plot.attr('flowsTo', flow);
        plot.click();
        map.find(".plot[plot='"+flow+"']").addClass('active');
        Layout.Lightbox.hide();

    }

    function saveSettings(index, key){

        var form = $('form[name="settingsForm"]');
        var newkey = form.attr('newkey').value;

        // if key change, update session and rerender
        if(key != newkey){
            Session.chordynator.maps[index] = newkey;
            Chordynator.Map.loadMapData();
        }

    }

    function copyMap(index){

        var form = $('form[name="settingsForm"]');
        var key = form.attr('newkey').value;
        var map = $(".Map").eq(index);
        Session.chordynator.maps.push(key);
        map.parents('section').prepend(map.clone());
        Chordynator.Map.loadMapData();

    }

    function deleteMap(index){

        Session.chordynator.maps.splice(index);
        $(".Map").eq(index).remove();

    }

    // exports
    me.load = load;
    me.saveSettings = saveSettings;
    me.copyMap = copyMap;
    me.deleteMap = deleteMap;

    return me;

}(Chordynator.Map.Forms || {})); // Layout