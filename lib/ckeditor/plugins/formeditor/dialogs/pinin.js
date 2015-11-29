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

    // Add a new option to a SELECT object (combo or list).
    function addOption( combo, optionText, optionValue, documentObject, index ) {
        combo = getSelect( combo );
        var oOption;
        if ( documentObject )
            oOption = documentObject.createElement( 'OPTION' );
        else
            oOption = document.createElement( 'OPTION' );

        if ( combo && oOption && oOption.getName() == 'option' ) {
            if ( CKEDITOR.env.ie ) {
                if ( !isNaN( parseInt( index, 10 ) ) )
                    combo.$.options.add( oOption.$, index );
                else
                    combo.$.options.add( oOption.$ );

                oOption.$.innerHTML = optionText.length > 0 ? optionText : '';
                oOption.$.value = optionValue;
            } else {
                if ( index !== null && index < combo.getChildCount() )
                    combo.getChild( index < 0 ? 0 : index ).insertBeforeMe( oOption );
                else
                    combo.append( oOption );

                oOption.setText( optionText.length > 0 ? optionText : '' );
                oOption.setValue( optionValue );
            }
        } else {
            return false;
        }

        return oOption;
    }


    return { //dialog definition
        title: editor.lang.formeditor.pinin.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {

        //console.log("PINS:", editor.config.customValues.pins);



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
                            id: 'pinselect',
                            label: 'Pin IN',
                            items: [['Select a PIN', 0]].concat(return_s_function(editor.config.customValues.pins, ['value', 'type', 'pintype'])),
                                validate: CKEDITOR.dialog.validate.notEmpty( "Pin field cannot be empty." ),
                                onChange : function() {
                                    //this = CKEDITOR.ui.dialog.select
                                    //da qui si può  gestire il cambiamento di tipo pin :))))
                                   // alert('content changed' + this.getValue());
                                   var dialog = this.getDialog(),
                                    values = dialog.getContentElement('tab-basic', 'typeselect')
                                    selectedType = this.getValue();

                                    switch(selectedType)
                                    {   case 'text':
                                        case 'textRef':
                                            optionNames = new Array("Generico","Boolean","Data","Tipo Protocollazione","ACL");
                                            optionVal = new Array("text","bool","datetime","tp","acl");
                                            break;
                                        case 'document':
                                            optionNames = new Array("Other");
                                            //qui i "sottotipi" potrebbero essere presi dinamicamente
                                            // da valutare la soluzione
                                            optionVal = new Array("other");
                                            break;
                                        case 'soggetto':
                                            optionNames = new Array("soggetto/PersonaFisica", "soggetto/PersonaGiuridica", "soggetto/Amministrazione");
                                            optionVal = new Array("soggettopf", "soggettopg", "soggettoam");
                                            break;
                                        case 'object':
                                            optionNames = new Array("Object/ACL");
                                            optionVal = new Array("objectacl");
                                            break;
                                        default:
                                            optionNames = new Array("<none>"),
                                            optionVal = new Array("");
                                            //qui vanno tutti gli altri che non hanno sotto opzioni( classifica, cartella etc.)
                                    }

                                    removeAllOptions( values );

                                    for ( var i = 0 ; i < optionNames.length ; i++){
                                        var oOption = addOption( values, optionNames[ i ], optionVal[ i ], dialog.getParentEditor().document);
                                        if ( i == 0 )
                                        {
                                            oOption.setAttribute('selected', 'selected');
                                            oOption.selected = true;
                                        }
                                    }

                                },
                                setup: function( element ) {
                                    this.setValue( element.getAttribute( 'value') );

                            },
                            commit: function( data ) {
                                console.log(this.getValue());
                                data.pinselect = this.getValue();
                            }
                    },
                    {
                        id: 'typeselect',
                        type: 'select',
                        label: "Tipo Controllo",
                        'default': 'text',
                        items: [ [ "<none>",    '' ] ],
                       setup: function( element ) {
                            this.setValue( element.getAttribute( 'type' ) );
                        },
                        commit: function( data ) {
                            data.typeselect = this.getValue();
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
    if ( data[0] !== undefined){
        return Object.keys(data).map(function(key){
            var ary = [];
            if (  data[key][field[2]] == "in" ){
                ary[0] = data[key][field[0]];
                ary[1] = data[key][field[1]];
                return ary;
            }
        });
    } else
        return ['Nessun PIN definito',''];

    };
});
