// templates.js
define(["handlebars",
    "text!templates/lookup.html",

], function(Handlebars, lookup){
    "use strict";

    Handlebars.registerHelper("getIdSelector", function (string) {
        return '"#'+ string +'"';
    });

    return {
        getTemplate: function(type){

            return ({
                "lookup": Handlebars.compile(lookup)
            }[type]);
        }
    }

});
