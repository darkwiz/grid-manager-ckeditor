// View.js
define(["jquery", "underscore","backbone", "handlebars", "templates/templates", "views/ControlView", "views/ScriptView"],

    function($, _, Backbone, Handlebars, templates, ControlView, ScriptView){
        "use strict";
        Backbone.View.prototype.close = function(){ //remove zombie views
            console.log("removing");
            this.remove();
            this.unbind();
            if (this.onClose){
                this.onClose();
            }
        }

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: 'body',
            //'div.editor',
            //model: new Model, or passed dynamically

            // template: Handlebars.compile(template),
            _viewPointers: null,

            // View Event Handlers
            events: {
            //    "blur .form-group": "onClose", //se usiamo una vista sigleton non possiamo dethachare gli eventi
            //    "focus .form-group": "onOpen"
            },


            // View constructor
            initialize: function(options) {
                //Set el dinamically getting
                _.bindAll(this);// every function that uses 'this' as the current object should be in here

                this.setElement(this.getEditorInstanceName());
                this.$scripts = $("#mycanvas");

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
                console.log('view added', this._viewPointers);
                this.setElement(this.getEditorInstanceName());
                var view = new ControlView({model: control});
                this._viewPointers[control.cid] = view;
                //Jquery wrapped el
                this.$el.html(view.render().el); // view.render returns this, so this.el refers to the div-container appended
                if(control.has("nestedModel")){
                    var nested = control.get("nestedModel");
                    var scriptview = new ScriptView({model: nested});
                    this._viewPointers[nested.cid] = scriptview;
                    this.$scripts.append(scriptview.render().el);
                    //$('#formInvio')[0].parentNode.appendChild(scriptview.render().$el[0]); Da valutare le varie soluzioni
                    //scriptview.render();                                        funzionano tutte con opportune modifiche in scriptview
                }
                //this.setElement(this.getEditorInstanceName());
            },
            removeOne: function(control) {
                console.log('view removed', this._viewPointers[control.cid]);
                this._viewPointers[control.cid].close();
                //this._viewPointers[control.cid].remove();
                if(control.has("nestedModel")){
                    var nested = control.get("nestedModel");
                    console.log('script removed', this._viewPointers[nested.cid]);
                    this._viewPointers[nested.cid].remove();
                }
            },
            updateOne: function(control) {
                console.log('view updated', this._viewPointers[control.cid]);
                var view = this._viewPointers[control.cid];
                //control.trigger('update');
                //view.render();
            },

            getEditorInstanceName: function() {
                return CKEDITOR.currentInstance.element.data('instance-elem') ;
            },

            /*  onClose: function( event ){
                console.log("close")
                this.collection.off("add", this.addOne);
                this.collection.off('remove',  this.removeOne);
                this.collection.off('change', this.updateOne);
            },


            onOpen: function( event ){
                this.collection.on("add", this.addOne, this);
                this.collection.on('remove',  this.removeOne, this);
                this.collection.on('change', this.updateOne, this);
            }

             */


            // remove: function(){
                // return Backbone.View.prototype.remove.apply(this, arguments);}
        });

        // Returns the View class
        return View;

    }

);
