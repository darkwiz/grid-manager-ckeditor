//Date.js
define(['models/Year', 'models/Base'], function (Year, Base) {
    var ReadOnlyDate = Base.extend({
        // general state and behavior for all pinin controls elements
        defaults: _.extend({
            type:"date",
            elem:"span-date",
            elementType:"text",
            elementValues: [""],
            elementCss:"form-control"
        }, Base.prototype.defaults)
    });

    var Date = Year.extend({
            defaults: _.extend({
                type:"date",
                elem: "date",
                elementValues: [""],
                elementCss : "",
            }, Year.prototype.defaults),

            initialize: function(attrs, options) {

                //Super call

                Year.prototype.initialize.call(this, attrs, options);

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

    return {
        Date: Date,
        ReadOnlyDate:ReadOnlyDate
    }
});


