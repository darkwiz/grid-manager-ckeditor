define(['models/Span',
        'models/Checkbox',
        'models/Acl',
        'models/Tp',
        'models/Date',
        'models/Year',
        'models/Textarea',
        'views/View'], function (Span, Checkbox, Acl, Tp, Date, Year, Textarea,  View) {
  return Backbone.Collection.extend({
      //url: 'controls',
      model: function(attrs, options) {
        switch(options.type) {
              case 'text':
              case 'email':
              case 'cf':
                return new Span(attrs, options);
              case 'boolean':
                return new Checkbox(attrs, options);
              case 'acl':
                return new Acl(attrs, options);
              case 'tp':
                return new Tp(attrs, options);
              case'date':
                return new Date(attrs, options);
              case'year':
                return new Year(attrs, options);
              case'textarea':
                return new Textarea(attrs, options);
              default:
               throw new Error('Input type "' + options.type + '" not supported.');
            }
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
