//Classifica.js
define(['models/Base',
        'models/Span',
        'models/Lookup',
        'models/Input'],
    function (Base, Span, Lookup, Input) {
        "use strict";       //TODO: se due pin hanno lo stesso nome l'algoritmo non funziona bene, invertire classifica/readonly

        var Input = Input.Input;
        var ClassificaReadOnly = Base.extend({
            defaults: {
                type:"classifica",
                elem:"classifica",
                classifica: _.extend({}, Span.prototype.defaults), //per out e in/out tipo lookup
                des_titolario: _.extend({}, Span.prototype.defaults),
                parent_classifica: _.extend({}, Span.prototype.defaults)
            },
            initialize: function(attrs, options) {

                Base.prototype.initialize.call(this, attrs, options);

                this.classifica = _.clone(this.get("classifica"));
                this.classifica.labelValue =  "CLASSIFICA:";
                this.classifica.pinValue =  options.PIN.value + ".CLASSIFICA" ;
                this.set("classifica", this.classifica);

                this.des_titolario = _.clone(this.get("des_titolario"));
                this.des_titolario.labelValue = "DES_TITOLARIO:";
                this.des_titolario.pinValue =  options.PIN.value + ".DES_TITOLARIO" ;
                this.set("des_titolario", this.des_titolario);

                this.parent_classifica = _.clone(this.get("parent_classifica"));
                this.parent_classifica.labelValue = "PARENT_CLASSIFICA:";
                this.parent_classifica.pinValue =  options.PIN.value + ".PARENT_CLASSIFICA" ;
                this.set("parent_classifica", this.parent_classifica);

            }

        });
        var Classifica = ClassificaReadOnly.extend({
            defaults: {
                classifica: _.extend({}, Input.prototype.defaults),
                des_titolario: _.extend({}, Input.prototype.defaults), //-> Hidden C'è bisogno di rimandare con la post il nuovo valore?
                parent_classifica: _.extend({}, Input.prototype.defaults)
            },
            initialize: function(attrs, options){
                //Super call

                ClassificaReadOnly.prototype.initialize.call(this, attrs, options);

                this.nestedModel = new Lookup({elementId: options.PIN.value});
                this.set("nestedModel", this.nestedModel);


                this.classifica.labelValue =  options.PIN.label;
                this.classifica.elementId = options.PIN.value;
                this.set("classifica", this.classifica);

                this.des_titolario.labelValue = "";
                this.des_titolario.elementType = "hidden";
                this.set("des_titolario", this.des_titolario);

                this.parent_classifica.labelValue = "";
                this.parent_classifica.elementType = "hidden";
                this.set("parent_classifica", this.parent_classifica);

            },
            addOption: function(value) { //TODO: refresh lookup source data on add url/options
                Lookup.prototype.addOption.call(this.nestedModel, value);
            }

        /*    setcontainerClass: function(width) {
            //Inutile, spostato nella view(come logico)

            var classifica = new Input(this.get("classifica"));
            var classifica_updated = Input.prototype.setcontainerClass.call(this, width);
            //Richiede il return this in Base
            this.set("classifica", classifica_updated.attributes);
        }*/
        });

        // Uses _.defaults to allow the overriding of default values in subclass
        _.defaultsDeep(Classifica.prototype.defaults, ClassificaReadOnly.prototype.defaults);


        return {
            ClassificaReadOnly: ClassificaReadOnly,
            Classifica: Classifica
        }


    });