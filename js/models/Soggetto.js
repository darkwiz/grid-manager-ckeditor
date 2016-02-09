//Soggetto.js
define(['models/Base','models/Input','models/Span'],
    function (Base, Input, Span) {
        "use strict";

        var Input = Input.Input;
        var Soggetto = Base.extend({
            defaults: {
                elem: 'soggetto',
                type: 'soggetto',
                elementCss:"form-control",
                name: _.extend({}, Input.prototype.defaults),
                IndirizzoTelematico: _.extend({}, Input.prototype.defaults) //TODO:This should be an email
            },
            initialize: function(attrs, options) {
                console.log(this.get("name"));
                var name = _.clone(this.get("name"));
                name.pinValue =  options.PIN.value + ".name" ;
                name.labelValue =  "Nome Soggetto";
                this.set("name", name);

                var email = _.clone(this.get("IndirizzoTelematico"));
                email.pinValue =  options.PIN.value + ".IndirizzoTelematico" ;
                email.labelValue = "IndirizzoTelematico";
                this.set("IndirizzoTelematico", email);

                //nested submodels approach
                //       this.children = new ObjectNodeCollection(this.get("children"), options);
            },
            setcontainerClass: function(width) {
                //Funziona ma forse va invocata solo in caso di form horizontal

                var name = new Input(this.get("name"));
                var email = new Input(this.get("IndirizzoTelematico"))
                var name_updated = Input.prototype.setcontainerClass.call(name, width);
                var email_updated = Input.prototype.setcontainerClass.call(email, width);

                this.set("name", name_updated.attributes);
                this.set("IndirizzoTelematico", email_updated.attributes);
            }
        });

        var SoggettoReadOnly = Soggetto.extend({
            defaults: {
                name: _.extend({}, Span.prototype.defaults),
                IndirizzoTelematico: _.extend({}, Span.prototype.defaults)
            },
            initialize: function(attrs, options){
                //Super call
                Soggetto.prototype.initialize.call(this, attrs, options);
            }
        });


        // Uses _.defaults to allow the overriding of default values in subclass
        _.defaultsDeep(SoggettoReadOnly.prototype.defaults, Soggetto.prototype.defaults);


        return {
            Soggetto: Soggetto,
            SoggettoReadOnly: SoggettoReadOnly
        }
    });