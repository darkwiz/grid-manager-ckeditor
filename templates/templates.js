// templates.js
define(["handlebars",
    "text!templates/pinin/input.html",
    "text!templates/pinin/textarea.html",
    "text!templates/pinin/date.html",
    "text!templates/pinin/span-date.html",
    "text!templates/pinin/input-alt.html",
    "text!templates/pinin/input-checkbox.html",
    "text!templates/pinin/input-list.html",
    "text!templates/pinin/span.html",
    "text!templates/pinin/soggetto.html", //Rename single-soggetto
    "text!templates/pinin/object.html",  //Rename single-obj
    "text!templates/pinin/document.html",
    "text!templates/pinin/single-single.html"
        ], function(Handlebars, input, textarea, date, spanDate,  inputAlt, inputCheckbox, inputList, span, soggetto, object, document, singleSimple){
  "use strict";

    //Templates
    var single = Handlebars.compile(singleSimple),
        oggettotpl = Handlebars.compile(object),
        soggettotpl = Handlebars.compile(soggetto),
        documenttpl = Handlebars.compile(document);

    //Partials
    Handlebars.registerPartial('span', span);
    Handlebars.registerPartial('span-date', spanDate);
    Handlebars.registerPartial('date', date);
    Handlebars.registerPartial('input', input);
    Handlebars.registerPartial('radio', inputAlt);
    Handlebars.registerPartial('checkbox', inputCheckbox );
    Handlebars.registerPartial('list', inputList);
    Handlebars.registerPartial('textarea', textarea);
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
       getTemplate: function(type){
           console.log(type);
           return ({
               "input": single,
               "radio": single,
               "list": single,
               "checkbox": single,
               "span": single,
               "span-date": single,
               "date": single,
               "textarea": single,
               "objacl": oggettotpl,
               "soggetto": soggettotpl,
               "document": documenttpl
           }[type]);
       }
   }

});
