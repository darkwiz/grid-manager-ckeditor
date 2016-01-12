//Textarea.js
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        elem: 'textarea',
        rows: 3,
      }, Base.prototype.defaults)
    });
  });
