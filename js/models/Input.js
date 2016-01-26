// Input.js
// --------
define(["models/Base"], function (Base) {
  var Input = Base.extend({
   // general state and behavior for all pinin controls elements
    defaults: {
        labelCss:"inputcss",
        elem:"input",
        elementType:"text",
        elementValues: [""],
        elementCss:"form-control"
    }
}, Base.prototype.defaults);

  var CheckboxInput = Input.extend({
    defaults: {
        elem: "input",
        elementType: "checkbox",
        elementCss : "",
        disabled: false,
    }
  });

  var ReadOnlyCheckboxInput = Input.extend({
    defaults: {
        disabled: true,
    }
  });

    // Uses _.defaults to allow the overriding of default values in subclass
    _.defaults(CheckboxInput.prototype.defaults, Input.prototype.defaults);
    _.defaults(ReadOnlyCheckboxInput.prototype.defaults, CheckboxInput.prototype.defaults);


  return {
    Input: Input,
    CheckboxInput : CheckboxInput,
    ReadOnlyCheckboxInput : ReadOnlyCheckboxInput
  }
});
