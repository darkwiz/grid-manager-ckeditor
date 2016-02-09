  // View.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates", "views/ControlView"],

    function($, _, Backbone, Handlebars, templates, ControlView){

        "use strict";

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
             el: 'body',
            //'div.editor',
            //model: new Model, or passed dynamically

            // template: Handlebars.compile(template),
            _viewPointers: null,

             // View Event Handlers
            events: {
                "blur .form-group": "onClose",
                "focus .form-group": "onOpen"
            },


            // View constructor
            initialize: function(options) {
              //Set el dinamically getting
                this.setElement(this.getEditorInstanceName());

                _.bindAll(this, 'render', 'addOne'); // every function that uses 'this' as the current object should be in here
                // This will be called when an item is added. pushed or unshift
                this.collection.on('add', this.addOne, this);
                // This will be called when an item is removed, popped or shifted
                this.collection.on('remove',  this.removeOne, this);
                // This will be called when an item is updated
                // var self = this;
                 this.collection.on('change', this.updateOne, this);
                //chiamato una volta on init
                // this.render();
                this._viewPointers = {};

            },

        addOne: function(control){
          console.log("add", control.toJSON() );
          var view = new ControlView({model: control});
          this._viewPointers[control.cid] = view;
          //Jquery wrapped el
          this.$el.html(view.render().el);
        },
        removeOne: function(control) {
          console.log('view removed', this._viewPointers[control.cid]);
          this._viewPointers[control.cid].remove();
        },
        updateOne: function(control) {
          var view = this._viewPointers[control.cid];
          view.render();
        },

        getEditorInstanceName: function() {
          return CKEDITOR.currentInstance.element.data('instance-elem') ;
        },

        onClose: function( event ){
              this.collection.off("add", this.addOne);
              this.collection.off('remove',  this.removeOne);
              this.collection.off('change', this.updateOne);
        },

        onOpen: function( event ){
              this.collection.on("add", this.addOne, this);
              this.collection.on('remove',  this.removeOne, this);
              this.collection.on('change', this.updateOne, this);
        }

    });

        // Returns the View class
        return View;

    }

);
