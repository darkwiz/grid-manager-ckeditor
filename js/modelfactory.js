define(["backbone",
	"models/Base",
	"models/Radio",
	"models/Input",
	"models/Year",
	"models/Date",
	"models/Textarea",
	"models/Span",
	"models/Object",
	"models/Soggetto",
	"models/List",
	"models/Document",
	"models/Classifica",
	"models/Fascicolo"], function(Backbone,
								  Base,
								  Radio,
								  Input,
								  Year,
								  Date,
								  Textarea,
								  Span,
								  Object,
								  Soggetto,
								  List,
								  Document,
								  Classifica,
								  Fascicolo) {


	/*Control Factory singleton */

	var existingControls = {};

	var constructors = {
		'text': {
			in: Span,
			out: Input.Input,
			inout: Input.Input
		},
		'boolean': {
			in: Input.ReadOnlyCheckboxInput,
			out: Input.CheckboxInput,
			inout:Input.CheckboxInput
		},
		'tp': {
			in: Radio.ReadOnlyTpRadio,
			out: Radio.TpRadio,
			inout: Radio.TpRadio
		},
		'acl':{
			in: Radio.ReadOnlyAclRadio,
			out: Radio.AclRadio,
			inout: Radio.AclRadio
		},
		'cf': {
			in: Span,
			out: Input.Input,
			inout: Input.Input
		},
		'email': {
			in: Span,
			out: Input.Input,
			inout: Input.Input
		},
		'list': {
			out: List,
			inout: List
		},
		'year': {
			in: Year.ReadOnlyDate,
			out:Year,
			inout:Year
		},
		'date': {
			out:Date.Date,
			in: Date.ReadOnlyDate,
			inout: Date.Date
		},
		'textarea': {
			in: Textarea.ReadOnlyTextarea,
			out: Textarea.EditableTextarea,
			inout: Textarea.EditableTextarea
		},
		'objectacl': {
			in: Object.ObjectAclReadOnly,
			out: Object.ObjectAcl,
			inout: Object.ObjectAcl
		},
		'soggetto': {
			in: Soggetto.SoggettoReadOnly,
			out: Soggetto.Soggetto,
			inout: Soggetto.Soggetto
		},
		'document': {
			in: Document.DocumentReadOnly
		},
		'classifica': {
			in: Classifica.ClassificaReadOnly,
			out: Classifica.Classifica
		},
		'fascicolo': {
			in: Fascicolo.FascicoloReadOnly
		}
	};

	return {

		createControl: function(attrs, options){

			/*Find out if a particular obj has been created before*/

			var existingControl = existingControls[options.PIN.name +"_"+ options.type];
			if(existingControl){
				return existingControl;
			} else {
				//[text/bool...][in/out]
				var control = new constructors[options.type][options.PIN.pintype](attrs, options);

				existingControls[options.PIN.name +"_"+ options.type] =  control;

				return control;

			}

		}

	};


});
