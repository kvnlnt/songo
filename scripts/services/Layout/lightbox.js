Layout.Lightbox = (function (me) {

    var id = "Lightbox";
    var dom = $("#"+id);

    $("a.close, .formSubmit").live('click',hide);
    $("g.settings, g.tertieries").live('click', show);

    function show(){
        dom.css("display","block");
    }

    function hide(){
        dom.html('');
        dom.css("display","none");
    }

    // exports
    me.id = id;
    me.show = show;
    me.hide = hide;
    me.dom = dom;

    return me;

}(Layout.Lightbox || {})); // Layout