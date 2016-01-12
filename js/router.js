define(["jquery", "backbone", "models/ControlModel", "views/View", "collections/ControlCollection"],

    function($, Backbone, ControlModel, View, ControlCollection) {

        var Router = Backbone.Router.extend({

            view: null,
            model:null,
            element:null,

            initialize: function( options ) {
                this.model = options.model;
                this.element = options.element;

                // Tells Backbone to start watching for hashchange events
                if (!Backbone.History.started)
                  Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                "view": "newInputText",
                // When there is no hash on the url, the home method is called
                 "*action": "defaultRoute",

            },

          newInputText: function() {

                console.log("Handler called")
               this.view = new View({ model: this.model, el: this.element});
               this.view.render();
           // this.entity.setElementType(this.data.type);
          },
          defaultRoute: function(action){
               console.log('Invalid. You attempted to reach:' + action);
           }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);

