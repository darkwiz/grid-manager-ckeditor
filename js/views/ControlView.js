// ControlView.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates"],

    function($, _, Backbone, Handlebars, templates){

        "use strict";

        var ControlView = Backbone.View.extend({

            tagName:  "div",

            getTemplate: function(model){
                         var type = model.get('elem');
                         switch(type) {
                              case 'text':
                                return templates.singleSpan;
                              case'year':
                              case'date':
                                return templates.singleDate;
                              case 'textarea':
                                return templates.singleTextarea;
                              default:
                               return templates.single;
                            }

                    },
            // View Event Handlers
            events: {
                "click #resetButton": "popup"
            },


            // View constructor
            initialize: function() {
                _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here

                //questo viene fatto in automatico
                //this.$el = $(this.el);

            },

            // Renders the view's template to the UI
            render: function() {
                this.template = this.getTemplate(this.model);

                this.$el.html(this.template(this.model.toJSON()));

                return this;

            }

    });

        // Returns the View class
        return ControlView;

    }

);
