// ACL
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        elem: "tp",
        elementType: 'radio',
        elementCss : "",
        elementValues: ["E","I","U"]
      }, Base.prototype.defaults)
    });
  });
