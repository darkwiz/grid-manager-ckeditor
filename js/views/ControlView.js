// ControlView.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates"],

    function($, _, Backbone, Handlebars, Templates){

        "use strict";

        var ControlView = Backbone.View.extend({

            tagName:  "div",
            className: "div-container",

            getTemplate: function(model){
                         var type = model.get('elem');
                         return Templates.getTemplate(type);
                    },
            // View Event Handlers
            events: {
                "click #resetButton": "popup"
            },


            // View constructor
            initialize: function() {
                _.bindAll(this); // every function that uses 'this' as the current object should be in here

                this.model.on('update', this.update, this);
                //questo viene fatto in automatico
                //this.$el = $(this.el);
            },

            // Renders the view's template to the UI
            render: function() {
                this.template = this.getTemplate(this.model);

                this.$el.html(this.template(this.model.toJSON()));


                this.$label = this.$('.control-label');
                this.$control = this.$('.control-container');
                return this;

            },
            update: function () {
                this.$label.removeClass(this.$label[0].className).addClass(this.model.get('labelCss'));
                this.$control.removeClass(this.$control[0].className).addClass(this.model.get('containerCss'));
            }
    });

        // Returns the View class
        return ControlView;

    }

);
