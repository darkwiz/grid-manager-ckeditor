define(["jquery", "underscore", "backbone", "handlebars", "text!templates/simpleinput.html"], function($, _, Backbone, Handlebars, template) {

  var BasicControlModel = Backbone.Model.extend();

    var BasicControlCollection = Backbone.Collection.extend({
      model: BasicControlModel,
      url: "schema1.json"
    });


  var BasicControlView = Backbone.View.extend({

        /*el: {}, Here we'll have the dom element to which we'll append the control built with handlebars+backbone.model  */
        //model: new BasicControlModel(),  We also could pass the model dinamically when a new view is created

        template: Handlebars.compile(template),

        initialize: function() {
           _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
         // var model = new Item();
          var self = this;
          this.collection = new BasicControlCollection();
          this.collection.fetch({
                  success: function(response,xhr) {
                    console.log("Inside success");
                    self.render();
                  },
                  error: function (errorResponse) {
                    console.log(errorResponse)
                  }
                });
          this.collection.bind("change", this.render, this);



        },
        render: function() {
        //  console.log(this.collection.get(1).toJSON());

          var domelem = CKEDITOR.dom.element.createFromHtml( this.template(this.collection.get(1).toJSON()) );
          this.el.append(domelem);
          return this;
        }
  });


    return BasicControlView;

  // return {
  //   view: BasicControlView
  //   model: BasicControlModel
  //   }
});
