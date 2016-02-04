// Input.js
// --------
define(["models/Base"], function (Base) {
  var Input = Base.extend({
   // general state and behavior for all pinin controls elements
    defaults: _.extend({
        labelCss:"control-label",
        type:"text",
        elem:"input",
        elementType:"text",
        elementCss:"form-control",
        elementValues: [""],
        containerCss:""
      }, Base.prototype.defaults),

    setcontainerClass: function(width) {
              var part = 'col-sm-',
              container = this.get('containerCss'),
              label = this.get('labelCss');

              this.set('containerCss', part + width );
              width = 12 - width;
              this.set('labelCss', "control-label" + " " + part + width);
      }
  });

  var CheckboxInput = Input.extend({
    defaults: {
        labelCss: "",
        type:"boolean",
        elem: "radio",
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
