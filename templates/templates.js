// templates.js
define(["handlebars",
    "text!templates/pinin/input.html",
    "text!templates/pinin/input-alt.html",
    "text!templates/pinin/input-checkbox.html",
    "text!templates/pinin/input-list.html",
    "text!templates/pinin/span.html",
    "text!templates/pinin/soggetto.html", //Rename single-soggetto
    "text!templates/pinin/object.html",
    "text!templates/pinin/single-input.html",
    "text!templates/pinin/single-span.html",
    "text!templates/pinin/single-date.html",
    "text!templates/pinin/single-textarea.html",
        ], function(Handlebars, input, inputAlt, inputCheckbox, inputList, span, soggetto, object, singleInput, singleSpan, singleDate, singleTextarea){
  "use strict";

    //Partials
    Handlebars.registerPartial('span', span);
    Handlebars.registerPartial('input', input);
    Handlebars.registerPartial('radio', inputAlt);
    Handlebars.registerPartial('checkbox', inputCheckbox );
    Handlebars.registerPartial('list', inputList);
    Handlebars.registerPartial('selected', '<#if {{escape this.elementValues}} == ${ {{pinValue}} }> selected </#if>');

    //Helpers
    Handlebars.registerHelper("whichPartial", function (condition) {
                return condition;
            });
    Handlebars.registerHelper("disabledIf", function (condition) {
        return (condition) ? "disabled" : "";
    });

    Handlebars.registerHelper("escape", function (string) {
        return '"'+ string +'"';
    });


   return {
       "input": Handlebars.compile(singleInput),
       "radio": Handlebars.compile(singleInput),
       "list": Handlebars.compile(singleInput),
       "checkbox": Handlebars.compile(singleInput),
       "objacl": Handlebars.compile(object),
       "soggetto": Handlebars.compile(soggetto),
       "span": Handlebars.compile(singleSpan),
       "date": Handlebars.compile(singleDate),
       "textarea": Handlebars.compile(singleTextarea)
   }

});
