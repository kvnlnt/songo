Handlebars.registerHelper('setFrom', function(value){
    this.from = value;
});

Handlebars.registerHelper('isPlot', function(value){
    var html;
    if(value == 'plot'){
        html = '<text class="name" x="7.75" y="7.75"></text><text class="type" x="7.75" y="12.5"></text>';
    } else {
        html = '<text class="name" x="7.75" y="9.45"></text>';
    }
    return html
});