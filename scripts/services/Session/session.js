var Session = (function(me){

    var id = 0;
    var name = 'test user';
    var email = 'test@user.com';
    var chordynator = { maps:["C"], tabs:["C"] };

    // exports
    me.id = id;
    me.name = name;
    me.email = email;
    me.chordynator = chordynator;

    // return object
    return me;

}(Session || {}));