// PinInOutView.js
define(["jquery", "underscore","backbone", "handlebars", "templates/scripts"],

    function($, _, Backbone, Handlebars, Scripts){

        "use strict";

        var ScriptView = Backbone.View.extend({


            className:"dynamic-script",

            getTemplate: function(model){
                var type = model.get('elem');
                return Scripts.getTemplate(type);
            },
            // View Event Handlers
            events: {
                "click #resetButton": "popup"
            },


            // View constructor
            initialize: function() {
                _.bindAll(this); // every function that uses 'this' as the current object should be in here

                //questo viene fatto in automatico
                //this.$el = $(this.el);

            },

            // Renders the view's template to the UI
            render: function() {

                this.model.get("libraries").forEach(this.addOne, this);
                var script = document.createElement( 'script' );
                this.template = this.getTemplate(this.model);
                script.innerHTML = this.template(this.model.toJSON());
                //this.$el.html(this.template(this.model.toJSON()));

                this.$el[0].appendChild(script); //funziona con view.render

                //this.$el.html($(this.template(this.model.toJSON())));

                return this;

            },
            addOne: function(library) {
                var script = document.createElement( 'script' );
                script.src = library;
                this.$el[0].appendChild(script);
            }
        /*    remove: function() {
                this.$el.find("#"+this.model.get("elem")).remove();
                this.unbind();
                return this;
            } */

        });

        // Returns the View class
        return ScriptView;

    }

);
