Layout.Resize = (function (module) {

    var t = null; 

    // reload on resize
    $(window).on('resize',resize);

    // debounce resize event for performance
    function resize(){
        clearTimeout(t);
        t = setTimeout(API.reload,100);
    }

    return module;

}(Layout.Resize || {})); // Layout