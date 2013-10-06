Chordynator.Forms = (function (me) {

    function loadForm(handlebar){
        return function(e){
            var option = $(e.currentTarget);
            var map = option.parent('svg');
            var targets = '#' + Layout.Lightbox.id;
            var template = 'scripts/apps/Chordynator/templates/'+handlebar;
            var data = {};
            Layout.Lightbox.show();
            Handlebars.load(template, targets, data);
        };
        
    }

    // exports
    me.loadForm = loadForm;

    return me;

}(Chordynator.Forms || {})); // Layout