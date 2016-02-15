//Fascicolo.js
define(['models/Radio',
        'models/Base',
        'models/Year',
        'models/Span',
        "models/Classifica"],
    function (Radio, Base, Year, Span, Classifica) {
        "use strict";

        var FascicoloReadOnly = Base.extend({
            defaults: {
                type: 'fascicolo',
                elem: 'fascicolo',
                classifica: _.extend({}, Span.prototype.defaults),
                des_fascicolo: _.extend({}, Span.prototype.defaults),
                progr_fascicolo: _.extend({}, Span.prototype.defaults),
                anno_fascicolo:_.extend({}, Span.prototype.defaults)
            },
            initialize: function(attrs, options) {

                var classifica = _.clone(this.get("classifica"));
                classifica.pinValue = options.PIN.value + ".CLASSIFICA";
                this.set("classifica", classifica);

                var des_fascicolo = _.clone(this.get("des_fascicolo"));
                des_fascicolo.pinValue =  options.PIN.value + ".DES_FASCICOLO";
                this.set("des_fascicolo", des_fascicolo);

                var progr_fascicolo = _.clone(this.get("progr_fascicolo"));
                progr_fascicolo.pinValue =  options.PIN.value + ".PROGR_FASCICOLO" ;
                this.set("progr_fascicolo", progr_fascicolo);

                var anno_fascicolo = _.clone(this.get("anno_fascicolo"));
                anno_fascicolo.pinValue =  options.PIN.value + ".ANNO_FASCICOLO" ;
                this.set("anno_fascicolo", anno_fascicolo);

            }

        });

        return {
            FascicoloReadOnly: FascicoloReadOnly
        }


    });
