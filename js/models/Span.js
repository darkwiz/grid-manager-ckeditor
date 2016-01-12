// Span.js
// --------
define(["models/Base"], function (Base) {
  return Base.extend({
   // general state and behavior for all pinin controls elements
    defaults: {
        labelCss:"spancss",
        elem:"text",
        elementType:"text",
        elementValues: [""],
        elementCss:"form-control"
    }
}, Base.prototype.defaults);
});
