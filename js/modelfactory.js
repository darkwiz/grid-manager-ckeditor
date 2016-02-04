define(["backbone",
  "models/Base",
	"models/Radio",
	"models/Input",
	"models/Year",
	"models/Date",
	"models/Textarea",
	"models/Span",
  "models/Object"], function(Backbone, Base, Radio, Input, Year, Date, Textarea, Span, Object) {


/*Control Factory singleton */

    var existingControls = {};

    var constructors = {
			'text': {
				'in': Span,
				'out': Input.Input
				},
			'boolean': {
				'in': Input.ReadOnlyCheckboxInput,
				'out': Input.CheckboxInput
			},
			'date': {
        'in':Date
      },
			'tp': {
        'in': Radio.ReadOnlyTpRadio,
        'out': Radio.TpRadio,
      },
			'acl':{
        'in': Radio.ReadOnlyAclRadio,
        'out': Radio.AclRadio,
      },
			'cf': {
				'in': Span,
				'out': Input.Input
				},
			'email': {
				'in': Span,
				'out': Input.Input
				},
			'year': {
        'in':Year
      },
			'textarea': {
				'in': Textarea.ReadOnlyTextarea,
				'out': Textarea.EditableTextarea
			},
      'objectacl': {
        'in': Object.ObjectAcl
      }
		};

    return {

        createControl: function(attrs, options){

        /*Find out if a particular obj has been created before*/

              var existingControl = existingControls[options.PIN.name +"_"+ options.type];
               if(existingControl){
                    console.log("Po");
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
