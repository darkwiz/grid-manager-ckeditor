//Year.js
define(['models/Base'], function (Base) {
    return Base.extend({
      defaults: _.extend({
        labelCss:"yearcss",
        elem: "year",
        elementValues: [""],
        elementCss : "",
      }, Base.prototype.defaults),

       initialize: function(options) {
            options = options || {};

            var today = new Date();

            //Schema defaults
            schema = _.extend({
              yearStart: today.getFullYear() - 100,
              yearEnd: today.getFullYear()
            }, options.schema || {});


            var yearRange = (schema.yearStart < schema.yearEnd)
              ? _.range(schema.yearStart, schema.yearEnd + 1)
              : _.range(schema.yearStart, schema.yearEnd - 1, -1);

            var yearsOptions = _.map(yearRange, function(year) {
              return year;
            });

            this.set("years", yearsOptions);
          }
    });
  });
