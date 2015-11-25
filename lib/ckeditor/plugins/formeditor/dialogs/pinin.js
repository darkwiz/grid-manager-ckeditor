CKEDITOR.dialog.add( 'pinin', function( editor ) {

    function removeAllOptions( combo ) {
        combo = getSelect( combo );
        while ( combo.getChild( 0 ) && combo.getChild( 0 ).remove() ) {

        }
    }

    function getSelect( obj ) {
        if ( obj && obj.domId && obj.getInputElement().$ ) // Dialog element.
        return obj.getInputElement();
        else if ( obj && obj.$ )
            return obj;
        return false;
    }


    return { //dialog definition
        title: editor.lang.formeditor.pinin.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {

        console.log("PINS:", editor.config.customValues.pins);



        },
        onOk: function() {
            var dialog = this;


        },

        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'select',
                            id: 'pin-in',
                            label: 'Pin IN',
                            items: [['Select a PIN', 0]].concat(return_s_function(editor.config.customValues.pins, ['value', 'type'])),
                                validate: CKEDITOR.dialog.validate.notEmpty( "Pin field cannot be empty." ),
                                onChange : function() {
                                    //this = CKEDITOR.ui.dialog.select
                                    //da qui si può  gestire il cambiamento di tipo pin :))))
                                   // alert('content changed' + this.getValue());
                                   var dialog = this.getDialog(),
                                    values = dialog.getContentElement('tab-basic', 'type')
                                    selectedType = this.getValue();

                                    switch(selectedType)
                                    {
                                        case 'textRef':
                                            optionNames = new Array("Email", "ACL");
                                            optionVal = new Array("email", "acl");
                                            break;
                                        case 'document':
                                            optionNames = new Array("Other");
                                            optionVal = new Array("other");
                                            break;
                                        default:
                                            optionsNames = new Array("<none>"),
                                            optionsValues = new Array("");
                                    }
                                    console.log(optionNames);
                                    removeAllOptions( values );

                                    //TODO restart from here, dynamic select..

                                },
                                setup: function( element ) {
                                    this.setValue( element.getAttribute( 'value') );

                            }
                    },
                    {
                        id: 'type',
                        type: 'select',
                        label: "Tipo Controllo",
                        'default': 'text',
                        items: [
                            [ "Email",    'email' ],
                            [ "ACL",     'acl' ],
                            [ "Codice Fiscale",   'cf' ],
                            [ "AutoComplete",      'search' ],
                            [ "Anno",      'year' ],
                            [ "Progr_fascicolo",      'url' ],
                            [ "Classifica",      'url' ],
                            [ "Folder_id",      'url' ]
                        ],
                       setup: function( element ) {
                            this.setValue( element.getAttribute( 'type' ) );
                        },
                        commit: function( data ) {


                        }
                    },
             ]},

        {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id',
                        setup: function( element ) {
                            this.setValue( element.getAttribute('id'));
                        }
                    }
                ]},
    ]};


    /**
    * Funzione per la formattazione dell'array dei PIN
    *
    * @method addButtonCommand
    * @param {Array} data Array contenente i pin
    * @param {String} field stringa che indica il campo sul quale si intende effettuare il filtraggio dei dati
    */
   function return_s_function( data, field ){
    var arr = [];
    if ( data[0] !== undefined ){
        return Object.keys(data).map(function(key){
            arr[0] = data[key][field[0]];
            arr[1] = data[key][field[1]];
            return arr;
        });
    } else
        return arr;

    };
});
