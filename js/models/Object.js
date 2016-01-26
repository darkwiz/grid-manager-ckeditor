//Object.js
define(['models/Radio',
        'models/Base',
        'models/Span'],
          function (Radio, Base, Span) {

   var ObjectAcl = Base.extend({
      defaults: _.extend({
        elem: 'objacl',
        elementCss:"form-control",
        right: Radio.AclProto,
        actor: Span
      }, Base.prototype.defaults),


       initialize: function(attrs, options) {
        var actor = _.clone(this.get("actor"));
        actor.pinName =  options.PIN.value;
        this.set("actor", actor);

        console.log("Model up:", this.toJSON());
         //nested submodels approach
      //       this.children = new ObjectNodeCollection(this.get("children"), options);
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

    return {
      ObjectAcl: ObjectAcl
    }
  });
