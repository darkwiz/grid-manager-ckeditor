//Checkbox.js
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        labelCss:"checkboxcss",
        elem: "boolean",
        elementValues: [""],
        elementType: "checkbox",
        elementCss : "",
      }, Base.prototype.defaults)
    });
  });
