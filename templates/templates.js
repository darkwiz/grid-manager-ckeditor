// templates.js
define(["handlebars",
        "text!templates/pinin/single.html",
        "text!templates/pinin/single-span.html",
        "text!templates/pinin/single-date.html",
        "text!templates/pinin/single-textarea.html",
        ], function(Handlebars, single, singleSpan, singleDate, singleTextarea){
  "use strict";

   Handlebars.registerHelper("disabledIf", function (condition) {
                return (condition) ? "disabled" : "";
            });

   return {
    "single": Handlebars.compile(single),
    "singleSpan": Handlebars.compile(singleSpan),
    "singleDate": Handlebars.compile(singleDate),
    "singleTextarea": Handlebars.compile(singleTextarea)
   }

});
