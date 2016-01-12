// ACL
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        elementType: 'radio',
        elementCss : "",
        elementValues: ["NORMAL","EDIT","FULL"]
      }, Base.prototype.defaults)
    });
  });
