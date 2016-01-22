// Base.js
// --------
define(function () {
  return Backbone.Model.extend({
   // general state and behavior for all pinin controls elements
    defaults: {
        pinName:"",
        labelCss:"",
        labelValue:"",
        helpCss:"help-block"
    }
});
});
