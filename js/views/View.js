// View.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates"],

    function($, _, Backbone, Handlebars, templates){

        "use strict";

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: CKEDITOR.editor.element.$,
            //'div.editor',
            //model: new Model, or passed dinamically

            // template: Handlebars.compile(template),

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

            // View constructor
            initialize: function() {
                this.getEditorArea()
                _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
                console.log(this.collection);
                //this.model.on('change', this.render, this);
                //this.collection.on('add', console.log("pippo"));
                // Calls the view's render method
                //viene chiamato in inizializzazione

            },

            // View Event Handlers
            events: {
                "click #pippo": "popup"
            },

            // Renders the view's template to the UI
            render: function() {
                console.log("render");
                this.template = this.getTemplate(this.model);

               // var domelem = CKEDITOR.dom.element.createFromHtml( this.template(this.model.toJSON()) );
                //JQuery dom manipulation lib  version
                if (this.model.get('elem') == 'date' ) {

                }
                console.log(this.model.toJSON());

                $(this.el).html(this.template(this.model.toJSON()));
                //CKEditor dom manipulation lib wrapper version
               // this.el.append(domelem);
                //if this.el è editor..this.el.container
                // Maintains chainability
                return this;

            },
            //non funziona, non si riesce a recuperare l'editor
            getEditorArea: function() {
                //var self = this;
                 for(var name in window.CKEDITOR.instances)
                   {
                            var editor = window.CKEDITOR.instances[name];
                            this.el = editor.element.$;
                           // console.log( 'The editor named ' + editor.name + ' is now focused');
                           $(editor.element.$).unbind();

                    }

            /* Funziona con  bug
                        var self = this;
                        CKEDITOR.inline('pippo1', {
                             on: {
                                instanceReady: function(e) {
                                var editor = this;
                                    self.el = editor.element.$;
                                    console.log( 'The editor named ' + e.editor.name + ' is now focused' );
                            }
                        }
             });
            */
        }
    });

        // Returns the View class
        return View;

    }

);
