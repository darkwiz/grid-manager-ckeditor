//Document.js
define(['models/Radio',
        'models/Base',
        'models/Textarea',
        'models/Span'],
    function (Radio, Base, Textarea, Span) {
        "use strict";

        var DocumentReadOnly = Base.extend({
            defaults: {
                type: 'document',
                elem: 'document',
                abstract: _.extend({}, Textarea.ReadOnlyTextarea.prototype.defaults),
                docname: _.extend({}, Span.prototype.defaults),
                tipo_protocollazione:_.extend({}, Radio.ReadOnlyTpRadio.prototype.defaults),
            },
            initialize: function(attrs, options) {

                var docname = _.clone(this.get("docname"));
                docname.pinValue =  options.PIN.value + ".DOCNAME" ;
                docname.labelValue =  "DOCNAME:";
                this.set("docname", docname);

                var tipo_protocollazione = _.clone(this.get("tipo_protocollazione"));
                tipo_protocollazione.pinValue =  options.PIN.value + ".TIPO_PROTOCOLLAZIONE" ;
                tipo_protocollazione.labelValue = "TIPO_PROTOCOLLAZIONE:";
                this.set("tipo_protocollazione", tipo_protocollazione);

                var abstract = _.clone(this.get("abstract"));
                abstract.pinValue =  options.PIN.value + ".ABSTRACT" ;
                abstract.labelValue = "Abstract:";
                this.set("abstract", abstract);

                //nested submodels approach
                //this.children = new ObjectNodeCollection(this.get("children"), options);

            }
        });


        //nested submodels approach

        // var ObjectNodeCollection = Backbone.Collection.extend({
        //   model: function(attrs, options) {
        //      console.log("Attrs: ",attrs);
        //      console.log("Opts: ",options);
        //      //console.log("Factory: ",Factory); circular deps

        //          if (attrs.children) {
        //              return new ObjectAcl(attrs, options);
        //          } else {
        //              return new Radio.ReadOnlyAclRadio(attrs, options);
        //              //return Factory.createControl(attrs, options);
        //          }
        //    }
        //  });

        //_.defaultsDeep(ObjectAcl.prototype.defaults, ObjectAclReadOnly.prototype.defaults);

        return {
            DocumentReadOnly: DocumentReadOnly
        }
    });
