// urls
Util.url = {

    getParams: function (){
        var params = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            params[hash[0]] = hash[1];
        }
        return params;
    },

    getParam:function(param){
    }
    
};
