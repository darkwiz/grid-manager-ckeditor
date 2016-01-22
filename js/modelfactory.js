define(["backbone", "models/Base",
	"models/Acl",
	"models/Tp",
	"models/Checkbox",
	"models/Year",
	"models/Date",
	"models/Textarea",
	"models/Span"], function(Backbone, Base, Acl, Tp, Checkbox, Year, Date, Textarea, Span) {
	var constructors = {
		'text': Span,
		'boolean': Checkbox,
		'date': Date,
		'tp': Tp,
		'acl':Acl,
		'cf': Span,
		'email': Span,
		'year': Year,
		'textarea': Textarea
	};
  var models = {};

	return {
		getModel: function(name) {
			if(!models[name]) {
			var model = new constructors[name]();
			models[name] = model;
			model.trigger('newmodel');
			}
			return models[name];
		}
	}

	});
