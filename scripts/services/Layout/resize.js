Layout.Resize = (function (me) {

    var t = null; 

    // reload on resize
    $(window).on('resize',resize);

    // debounce resize event for performance
    function resize(){
        clearTimeout(t);
        t = setTimeout(API.reload,100);
    }

    return me;

}(Layout.Resize || {})); // Layout