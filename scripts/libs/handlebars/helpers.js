Handlebars.registerHelper('setFrom', function(value){
    this.from = value;
});

Handlebars.registerHelper('isPlot', function(value){
    var html = '';
    if(value.contains('plot')){
        html = '<text class="name" x="7.75" y="7.75"></text><text class="type" x="7.75" y="12.5"></text>';
    } else {
        html = '<text class="name" x="7.75" y="9.45"></text>';
        html += value.contains('settings') ? '<image x="3.75" y="3.75" width="7.5" height="7.5" xlink:href="http://localhost:8080/Chordynator/gfx/hamburger.svg" />' : '';
        html += value.contains('types') ? '<image class="unavailable" x="3.75" y="3.75" width="7.5" height="7.5" xlink:href="http://localhost:8080/Chordynator/gfx/x.svg" />' : '';
        html += value.contains('tertieries') ? '<image class="unavailable" x="3.75" y="3.75" width="7.5" height="7.5" xlink:href="http://localhost:8080/Chordynator/gfx/+.svg" />' : '';
    }
    return html
});