Handlebars.load = function (template_location, target, json, callback){

        // ajax load each template and compile
        $.ajax({
            type: 'GET',
            url: template_location,
            dataType:'text',
            context: $(target),
            success: function(template){
                var compile = Handlebars.compile(template); 
                var html = compile(json);
                this.html(html);
                if (typeof callback === 'function') callback();
            }
        });

};