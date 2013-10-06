var Layout = (function (me) {

    function getPixelRatio(){
        return window.devicePixelRatio !== undefined ? 1 : window.devicePixelRatio;
    }

    // exports
    me.getPixelRatio = getPixelRatio

    return me;

}(Layout || {})); // Layout




