// Model.js
// --------
define(["jquery","underscore", "backbone"],

    function($, _, Backbone) {

        // Creates a new Backbone Model class object
        var ControlModel = Backbone.Model.extend({

          defaults: {
                labelCss:"provacss",
                labelValue:"",
                elementType:"",
                elementValues: ["A"],
                elementCss: "form-control",
                helpCss:"help-block",
                helpValue:""
            },

            setElementType: function(newType){
                this.set({elementType: newType});
        },
        initialize: function() {

        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('Model: something got changed');
        });
      }

        });


        // Returns the Model class
        return ControlModel;

    }

);
