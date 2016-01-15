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
      initialize: function() {
           // This will be called when an item is added. pushed or unshifted
          this.on('add', this.addOne, this); //this è la collection
          // This will be called when an item is removed, popped or shifted
          this.on('remove',  function(model) {
              console.log('something got removed');
          });
          // This will be called when an item is updated
          this.on('change', function(model) {
              console.log('something got changed');
          });  //this.removeOne
      },
      addOne: function(control){
        // console.log(control);
        // console.log(this);
        view = new View({model: control});
        view.render();
        //this._viewPointers[control.cid] = view;
      },
      removeOne: function(control) {
        this._viewPointers[control.cid].remove();
      }
  });
});
