// templates.js
define(["handlebars",
        "text!templates/pinin/input.html",
        "text!templates/pinin/span.html",
        "text!templates/pinin/object.html",
        "text!templates/pinin/single.html",
        "text!templates/pinin/single-span.html",
        "text!templates/pinin/single-date.html",
        "text!templates/pinin/single-textarea.html",
        ], function(Handlebars, input, span, object, single, singleSpan, singleDate, singleTextarea){
  "use strict";

   Handlebars.registerHelper("disabledIf", function (condition) {
                return (condition) ? "disabled" : "";
            });

   Handlebars.registerPartial('spanPartial', span);

   Handlebars.registerPartial('inputPartial', input);


   return {
    "input": Handlebars.compile(single),
    "radio": Handlebars.compile(single),
    "objacl": Handlebars.compile(object),
    "text": Handlebars.compile(singleSpan),
    "date": Handlebars.compile(singleDate),
    "textarea": Handlebars.compile(singleTextarea)
   }

});
