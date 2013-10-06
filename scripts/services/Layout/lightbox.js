Layout.Lightbox = (function (me) {

    var id = "Lightbox";
    var dom = $("#"+id);

    $("a.close").live('click',hide);

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