Handlebars.registerHelper('setFrom', function(value){
    this.from = value;
});

Handlebars.registerHelper('isPlot', function(klass, types){
    var html = '';
    if(klass.contains('plot')){
        html = '<text class="name" x="7.75" y="7.75"></text><text class="type" x="7.75" y="12.5" options="'+types+'"></text>';
    } else {
        html += klass.contains('settings')   ? svg['settings']   : '';
        html += klass.contains('options')    ? svg['options']      : '';
        html += klass.contains('tertieries') ? svg['tertieries'] : '';
    }
    return html
});

var svg = {
    settings:'<image x="1.5" y="1.5" width="12" height="12" xlink:href="http://localhost:8080/Chordynator/gfx/cog.svg" />',
    options:'<text class="name" x="7.75" y="10"></text><image class="unavailable" x="3.75" y="3.75" width="7.5" height="7.5" xlink:href="http://localhost:8080/Chordynator/gfx/x.svg" />',
    tertieries:'<image class="unavailable" x="3.75" y="3.75" width="7.5" height="7.5" xlink:href="http://localhost:8080/Chordynator/gfx/+.svg" />' 
};