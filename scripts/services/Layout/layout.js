var Layout = (function (module) {

    function getPixelRatio(){
        return window.devicePixelRatio !== undefined ? 1 : window.devicePixelRatio;
    }

    // exports
    module.getPixelRatio = getPixelRatio

    return module;

}(Layout || {})); // Layout




