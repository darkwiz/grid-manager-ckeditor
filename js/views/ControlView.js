// View.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates"],

    function($, _, Backbone, Handlebars, templates){

        "use strict";

        var ControlView = Backbone.View.extend({

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
                this.getEditorArea();
                _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here

                //questo viene fatto in automatico
                this.$el = $(this.el);

                this.render();

            },

             getEditorArea: function() {
                //per rendere più rovbusto si può assegnare un id in app
                //in base al nome istanza e poi fare lo stesso per recuperare
                //lo span qui
                var editor = CKEDITOR.currentInstance;
                this.el = editor.element.find('div.wrapper').$

                //this.el = $(editor.element.find('span');
            },
            // un-comment per far funzionare il remove
            remove: function() {
                  $(this.el).find('div').remove();
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
