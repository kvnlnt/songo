var Session = (function(me){

    var id = 0;
    var name = 'test user';
    var email = 'test@user.com';
    var chordinator = {
            maps:["C","Db"],
            tabs:["C"]
        };

    // exports
    me.id = id;
    me.name = name;
    me.email = email;
    me.chordinator = chordinator;

    // return object
    return me;

}(Session || {}));