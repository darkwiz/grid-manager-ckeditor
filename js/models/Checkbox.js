//Checkbox.js
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        labelCss:"checkboxcss",
        elem: "boolean",
        elementType: "checkbox",
        elementValues: [""],
        elementCss : "",
      }, Base.prototype.defaults)
    });
  });
