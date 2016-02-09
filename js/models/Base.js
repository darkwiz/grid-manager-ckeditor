// Base.js
define(["jquery", "underscore","backbone"],
    function ($, _, Backbone) {
  return Backbone.Model.extend({
      defaults: {
          labelCss:"control-label col-sm-3",
          containerCss:"col-sm-9"
      },
      initialize: function(attrs, options) {
          options = options || {};
          if (options.PIN){
              console.log("init");
              this.set("pinValue", options.PIN.value);
              this.set("labelValue", options.PIN.label);
            }
      },
      setcontainerClass: function(width) {
          var part = 'col-sm-',
              container = this.get('containerCss'),
              label = this.get('labelCss');

          this.set('containerCss', part + width );
          width = 12 - width;
          this.set('labelCss', "control-label" + " " + part + width);
          return this;
      },
      setControlLabel: function (value) {
            value = value || this.get("labelValue");
            this.set("labelValue", value);
      }
});
});
