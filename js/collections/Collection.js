define(['jquery','underscore','backbone', 'modelfactory'], function ($, _, Backbone, Factory) {
    return Backbone.Collection.extend({
        model: function(attrs, options) {
            return Factory.createControl(attrs, options);
        },

        add: function(models, options){

            var duplicates = this.filter(function(_models) {
                console.log("LabelID:", _models.get('pinValue'), "(== : !=) ", options.PIN.value);
                return _models.get('pinValue') === options.PIN.value;
            });

            if ( _(duplicates).size() > 0) {
                console.log("removed?");
                this.remove(duplicates);
                //, {silent:true});  rimozione precedente duplicata
            }

            return Backbone.Collection.prototype.add.call(this, models, options);

        }
    });
});
