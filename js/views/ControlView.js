// ControlView.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates"],

    function($, _, Backbone, Handlebars, Templates){

        "use strict";

        var ControlView = Backbone.View.extend({

            tagName:  "div",
            className: "div-container",
            //Sostituire lo switch con Templates['idtemplate']
            getTemplate: function(model){
                         var type = model.get('elem');
                         return Templates[type];
                         // switch(type) {
                         //      case 'text':
                         //        return Templates.singleSpan;
                         //      case'year':
                         //      case'date':
                         //        return Templates.singleDate;
                         //      case 'textarea':
                         //        return Templates.singleTextarea;
                         //      case 'objacl':
                         //        return Templates.objacl;
                         //      default:
                         //       return Templates.single;
                         //    }

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
