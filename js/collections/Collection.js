define(['models/Span', 'models/Checkbox', 'models/Acl', 'models/Tp', 'views/View'], function (Span, Checkbox, Acl, Tp, View) {
  return Backbone.Collection.extend({
      //url: 'controls',
      model: function(attrs, options) {
        switch(attrs.elem) {
              case 'text':
                return new Span(attrs, options);
              case 'boolean':
                return new Checkbox(attrs, options);
              case 'acl':
                return new Acl(attrs, options);
              case 'tp':
                return new Tp(attrs, options);
              case'textarea':
                return new TextArea(attrs, options);
              default:
               alert("kernel panic");
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
        console.log(control);
        console.log(this);
        view = new View({model: control});
        view.render();
       // this._viewPointers[control.cid] = view;
      },
      removeOne: function(control) {
        this._viewPointers[control.cid].remove();
      }
  });
});
