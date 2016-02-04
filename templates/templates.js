// templates.js
define(["handlebars",
        "text!templates/pinin/input.html",
        "text!templates/pinin/input-alt.html",
        "text!templates/pinin/span.html",
        "text!templates/pinin/object.html",
        "text!templates/pinin/single-input.html",
        "text!templates/pinin/single-span.html",
        "text!templates/pinin/single-date.html",
        "text!templates/pinin/single-textarea.html",
        ], function(Handlebars, input, inputAlt, span, object, singleInput, singleSpan, singleDate, singleTextarea){
  "use strict";

   Handlebars.registerHelper("disabledIf", function (condition) {
                return (condition) ? "disabled" : "";
            });

   Handlebars.registerPartial('spanPartial', span);

   Handlebars.registerPartial('input', input);

   Handlebars.registerPartial('radio', inputAlt);

   Handlebars.registerHelper("whichPartial", function (condition) {
                return condition;
            });

   return {
    "input": Handlebars.compile(singleInput),
    "radio": Handlebars.compile(singleInput),
    "objacl": Handlebars.compile(object),
    "text": Handlebars.compile(singleSpan),
    "date": Handlebars.compile(singleDate),
    "textarea": Handlebars.compile(singleTextarea)
   }

});
