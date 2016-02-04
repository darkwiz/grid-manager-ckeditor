// Base.js
// --------
define(function () {
  return Backbone.Model.extend({
    //idAttribute: 'pinName',
   // general state and behavior for all pinin controls elements
    defaults: {
        pinName: "",
        labelCss:"",
        labelValue:"",
    }
});
});
