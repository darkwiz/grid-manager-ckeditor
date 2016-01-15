// Collection.js
// -------------
define(["jquery","backbone","models/ControlModel"],

  function($, Backbone, ControlModel) {

    // Creates a new Backbone Collection class object
    var ControlCollection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: ControlModel,
      url: '/controls',

      initialize: function() {
         // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
            console.log('something got added');
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
            console.log('something got removed');
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('something got changed:', model.changedAttributes());
        });
      }

    });

    // Returns the Model class
    return ControlCollection;

  }

);
