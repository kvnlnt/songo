Handlebars.registerHelper('fretStart', function(fretLength, firstFret){

    var html = '';
    var fretLength = fretLength <= 2 ? 3 : fretLength;
    var fretWidth = 80 / fretLength;
    var fretX = 10;
    var fretNumber = firstFret;
    var klass = '';

    for(var i = 0; i < fretLength; i++){

        klass = i == 0 ? 'fretNumberFirst' : 'fretNumber';

        html += '<g class="'+klass+'" transform="translate('+fretX+',33.5)">';
        html += '<polygon points="0,0 0,10 '+fretWidth+',10 '+fretWidth+',0 '+fretWidth+',0"/>';
        html += '<text x="5" y="7">'+fretNumber+'</text>';
        html += '</g>';

        fretX += fretWidth;
        fretNumber += 1;

    }

    return html;

});

Handlebars.registerHelper('strings', function(tabs){

    var html = '', klass;
    var y = 13;
    var tabReversed = tabs.slice(0).reverse();

    for(var i = 0; i < tabs.length; i++){
        
        switch(tabReversed[i]) {
            case -1: klass = 'mutedString';   break;
            case 0:  klass = 'openString';    break;
            default: klass = 'string';        break;
        }

        html += '<line class="'+klass+'" x1="10" y1="'+y+'" x2="90" y2="'+y+'"/>';

        y += 4;

    }

    return html;

});

Handlebars.registerHelper('tabs', function(tabs, fretLength, firstFret){

    var html = '';
    var fretLength = fretLength <= 2 ? 3 : fretLength;
    var fretWidth = 80 / fretLength;
    var tabReversed = tabs.slice(0).reverse();
    var y = 13;
    var x;

    for(var i = 0; i < tabs.length; i++){

        if(tabReversed[i] > 0 ) {

            x = 10 + fretWidth * (tabReversed[i] + 1 - firstFret) - fretWidth/2;
            html += '<ellipse class="frettedString" cx="'+x+'" cy="'+y+'" ry="1.70" rx="1.70"/>';

        }

        y += 4; 
    }

    return html;
});

Handlebars.registerHelper('frets', function(fretLength){

    var fretLength = fretLength <= 2 ? 3 : fretLength;
    var fretWidth = 80 / fretLength;
    var html = '';
    var x = 10;

    for(var i = 0; i <= fretLength; i++){

        html += '<line x1="'+x+'" y1="13" x2="'+x+'" y2="33"/>';
        x += fretWidth; // 80 = width of tab

    }

    return html;

});

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