//Date.js
define(['models/Year', 'models/Base'], function (Year, Base) {
    return Year.extend({
      defaults: _.extend({
        labelCss:"datecss",
        elem: "date",
        type:"date",
        elementValues: [""],
        elementCss : "",
      }, Base.prototype.defaults),

       initialize: function(options) {
           //options = options || {};

           //Super call
           Year.prototype.initialize.call(this, options);

            var Self = this.constructor;

            //Option defaults
            options = _.extend({
              monthNames: Self.monthNames,
              showMonthNames: Self.showMonthNames
            }, options);


            var datesOptions = _.map(_.range(1, 32), function(date) {
              return date;
            });

            var monthsOptions = _.map(_.range(0, 12), function(month) {

              var value = (options.showMonthNames)
                  ? options.monthNames[month]
                  : (month + 1);

              return {month: month, value: value};
            });

            this.set("dates", datesOptions);
            this.set("months", monthsOptions);
          }
    },//Statics
 {
    //Whether to show month names instead of numbers
    showMonthNames: true,

    //Month names to use if showMonthNames is true
    monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
});
  });


