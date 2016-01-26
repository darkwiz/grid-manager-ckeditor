define(['modelfactory'], function (Factory) {
  return Backbone.Collection.extend({

      model: function(attrs, options) {
          return Factory.createControl(attrs, options);
      },

       add: function(models, options){
        var duplicates = this.filter(function(_models) {
        //  console.log("LabelID:", _models.get('pinName'), "(== : !=) ", models.pinName);
            return _models.get('pinName') == models.pinName;

        });

        if (! _(duplicates).length > 0) {
            this.remove(duplicates, {silent:true});
        }

       return Backbone.Collection.prototype.add.call(this, models, options);
    }
  });
});
