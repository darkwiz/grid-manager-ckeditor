// List.js
// --------
define(["models/Base"], function (Base) {
    return Base.extend({
        // general state and behavior for all pinin controls elements
        defaults: _.extend({
            elem:"lookup",
            libraries: [
               // "https://code.jquery.com/jquery-2.2.0.min.js",
               // "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
               // "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
               // "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/bootstrap-tokenfield.min.js",
    ],
            source: ['apple', 'banana', 'kiwi'],
        }, Base.prototype.defaults),
        initialize: function(attrs, options) {
            Base.prototype.initialize.call(this, attrs, options);
        },
        addOption: function(value){
            var options = _.clone(this.get("source"));
            if(options[0] !== "Lista vuota")
            {
                options.push(value);
            }
            else
            {
                options.pop();
                options.push(value);
            }
            this.set("elementValues", options);

        },
        removeOption: function(index){
            var options = _.clone(this.get("elementValues"));
            options.splice(index, 1);
            this.set("elementValues", options);

        }
    });



});
