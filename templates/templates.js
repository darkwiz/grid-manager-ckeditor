// templates.js
define(["handlebars",
    "text!templates/input.html",
    "text!templates/textarea.html",
    "text!templates/date.html",
    "text!templates/span-date.html",
    "text!templates/input-alt.html",
    "text!templates/input-checkbox.html",
    "text!templates/input-list.html",
    "text!templates/span.html",
    "text!templates/soggetto.html", //Rename single-soggetto
    "text!templates/object.html",  //Rename single-obj
    "text!templates/document.html",
    "text!templates/classifica.html",
    "text!templates/fascicolo.html",
    "text!templates/single-simple.html"
], function(Handlebars, input, textarea,
            date, spanDate,  inputAlt,
            inputCheckbox, inputList,
            span, soggetto, object, document, classifica, fascicolo, singleSimple){
    "use strict";

    //Templates
    var single = Handlebars.compile(singleSimple),
        oggettotpl = Handlebars.compile(object),
        soggettotpl = Handlebars.compile(soggetto),
        documenttpl = Handlebars.compile(document),
        classificatpl = Handlebars.compile(classifica),
        fascicolotpl = Handlebars.compile(fascicolo);

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
                "document": documenttpl,
                "classifica":classificatpl,
                "fascicolo":fascicolotpl
            }[type]);
        }
    }

});
