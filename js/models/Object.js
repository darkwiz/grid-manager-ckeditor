//Object.js
define(['models/Radio',
        'models/Base',
        'models/Span',
        'models/Input',
        'models/List'],
          function (Radio, Base, Span, Input, List) {
              "use strict";

              var Input = Input.Input;

              var ObjectAclReadOnly = Base.extend({
                  defaults: {
                      elem: 'objacl',
                      type: 'objacl',
                      right: _.extend({}, Radio.ReadOnlyAclRadio.prototype.defaults),
                      actor: _.extend({}, Span.prototype.defaults),
                  },
                  initialize: function(attrs, options) {
                      //TODO: qui abbiamo il PIN!!(via options.type!)
                      //Possiamo estendere dinamicamente il tipo Object!
                      //Utilizzando un'altra factory delle model
                      var actor = _.clone(this.get("actor"));
                      actor.pinValue =  options.PIN.value + ".attore" ;
                      actor.labelValue =  "Attore:";
                      this.set("actor", actor);

                      var right = _.clone(this.get("right"));
                      right.pinValue =  options.PIN.value + ".permesso" ;
                      right.labelValue = "Permesso:";
                      this.set("right", right);

                      //nested submodels approach
                      //this.children = new ObjectNodeCollection(this.get("children"), options);

                  }
              });

              var ObjectAcl = ObjectAclReadOnly.extend({
                  defaults: {
                      right: _.extend({}, Radio.AclRadio.prototype.defaults),
                      actor: _.extend({}, List.prototype.defaults)
                  },
                  initialize: function(attrs, options){
                      //Super call
                      ObjectAclReadOnly.prototype.initialize.call(this, attrs, options);
                  },
                  addOption: function(value){
                      var list = new Input(this.get("actor")),
                          list_updated = List.prototype.addOption.call(list, value);
                      this.set("actor", list_updated.attributes);
                  },
                  removeOption: function(index){
                      var list = new Input(this.get("actor")),
                          list_updated = List.prototype.removeOption.call(list, index);
                      this.set("actor", list_updated.attributes);
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
              _.defaultsDeep(ObjectAcl.prototype.defaults, ObjectAclReadOnly.prototype.defaults);

    return {
        ObjectAcl: ObjectAcl,
        ObjectAclReadOnly: ObjectAclReadOnly
    }
  });
