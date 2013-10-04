var Session = (function(module){

    var id = 0;
    var name = 'test user';
    var email = 'test@user.com';
    var chordinator = {
            maps:["C","D#"],
            tabs:["C", "D", "E"]
        };

    // exports
    module.id = id;
    module.name = name;
    module.email = email;
    module.chordinator = chordinator;

    // return object
    return module;

}(Session || {}));