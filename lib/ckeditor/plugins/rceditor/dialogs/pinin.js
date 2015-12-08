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

    function toggleField( field, check ) {
            field[ check ? 'enable' : 'disable' ]();
        }

    function convertDate( dateString ) {
        var date = new Date(dateString);
        return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    }


    return { //dialog definition
        title: editor.lang.rceditor.pinin.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {
           var values = this.getContentElement('tab-basic', 'typeselect'),
            selectedPin = editor.config.customValues.picked;


             this.getContentElement("tab-basic", "label").disable();
             this.getContentElement("tab-basic", "showtime").disable();

            switch(selectedPin.type)
                     {   case 'text':
                            case 'textRef':
                                optionNames = new Array("Generico","Boolean","Data","Tipo Protocollazione","ACL");
                                optionVal = new Array("text","checkbox","datetime","tp","acl");
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
                            var oOption = addOption( values, optionNames[ i ], optionVal[ i ], this.getParentEditor().document);
                            if ( i == 0 )
                            {
                                oOption.setAttribute('selected', 'selected');
                                oOption.selected = true;
                            }
                        }
        },
        onOk: function() {
            var editor = this.getParentEditor(),
                element = this.htmlElement, //attualmente inutile, serve per gestire la modalità editing tramite menù contestuale
                label = this.label, // idem come sopra
                formgroup = this.formgroup;
                isInsertMode = !element;


            if ( isInsertMode ) {
                label = editor.document.createElement( 'label' );
                element = editor.document.createElement( 'input' );
                element.setAttribute( 'disabled', 'disabled' );
                element.addClass('form-control');
                element.disabled = true;
            }

            var data = { element: element , label: label};

            if ( isInsertMode ){
                editor.insertElement( data.label );
                editor.insertElement( data.element ); // trovare un modo per aggiungere più elementi
                //wrapping inside default div, add bootstrap class to it
                formgroup =  label.getParent() || element.getParent();
                formgroup.addClass('form-group');
                }

            this.commitContent( data );

            // Element might be replaced by commitment.
            if ( !isInsertMode )
                editor.getSelection().selectElement( data.element );

        },

        contents: [{
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                     {
                        type: 'hbox',
                        widths: [ '50%', '50%' ],
                        children: [
                        {
                            id: 'label',
                            type: 'text',
                            label: 'Label',
                            'default': editor.config.customValues.picked.label,
                            commit: function(data) {
                              var label = data.label,
                                  dialog = this.getDialog();
                                    id = dialog.getContentElement("tab-adv", "id");

                                    label.setText( this.getValue() + ": " );

                                    label.setAttribute('for',  id.getValue() );
                            }
                        },
                        {
                        type: 'checkbox',
                        id: 'editlabel',
                        label: 'Edit Label',
                        'default': '',
                         onChange: function() {
                                 //Disable/enable label editing
                                var selected = this.getValue(),
                                    dialog = this.getDialog(),
                                    labelfield = dialog.getContentElement("tab-basic", "label");

                                    toggleField(labelfield, selected);

                            }
                     }]
                  },
                        {
                        id: 'typeselect',
                        type: 'select',
                        label: "Tipo Controllo",
                        'default': 'text',
                        items: [ [ "<none>",    '' ] ],
                           onChange: function() {

                            var selected = this.getValue(),
                                dialog = this.getDialog(),
                                editor = dialog.getParentEditor(),
                                field = dialog.getContentElement("tab-basic", "showtime");


                                  if( selected == 'datetime'){
                                        toggleField(field, selected);
                                    } else if ( field.isEnabled() ) {
                                        toggleField(field, false);
                                        field.setValue('');
                                  }

                        },
                        setup: function( element ) {
                            this.setValue( element.getAttribute( 'value' ) );
                        },
                        commit: function( data ) {
                            var element = data.element,
                                self = this,
                                head = CKEDITOR.document.getHead();
                                //console.log(element); //element è l'elemento in costruzione
                            //this è l'elemento della dialog

                        var data = CKEDITOR.ajax.load( 'lib/ckeditor/schema.json' , function( response ) {
                            if( response !== null ){
                                    var schema = JSON.parse(response);
                                    switch( self.getValue() )
                                    {
                                        case 'checkbox':
                                            element.setAttribute( 'type', schema['boolean']['type'] );
                                            break;
                                        case 'datetime':
                                            element.setAttribute( 'type', schema['datetime']['type'] );
                                            element.addClass('date-pick');
                                            element.setAttribute('value', "${" + editor.config.customValues.picked.value +"}");
                                            var content = "<script type=\"text/javascript\">";
                                            content += schema['datetime']['js'];
                                            content += "</script>";
                                            content = CKEDITOR.dom.element.createFromHtml( content );
                                                head.append( content );
                                        break;
                                        case 'acl':
                                            element.setAttribute('type', schema['acl']['type']);
                                            element.setAttribute('name', "${" + editor.config.customValues.picked.value + "}");

                                            for (var i in schema['acl']['values'])
                                                {
                                            var content = "<div class=\"radio\"><label></label></div>";
                                                content = CKEDITOR.dom.element.createFromHtml( content );
                                                cln = element.clone();
                                                rlabel = content.getFirst();
                                                rlabel.append(cln);
                                                rlabel.appendText(schema['acl']['values'][i] );
                                                content.insertAfter( element );//appende all'oggetto di default :/
                                                }
                                                element.remove();
                                            break;
                                        case'tp':
                                         element.setAttribute('type', schema['tp']['type']);
                                            element.setAttribute('name', "${" + editor.config.customValues.picked.value + "}");

                                            for (var i in schema['tp']['values'])
                                                {
                                            var content = "<div class=\"radio\"><label></label></div>";
                                                content = CKEDITOR.dom.element.createFromHtml( content );
                                                cln = element.clone();
                                                rlabel = content.getFirst();
                                                rlabel.append(cln);
                                                rlabel.appendText(schema['tp']['values'][i] );
                                                content.insertAfter( element );//appende all'oggetto di default :/
                                                }
                                                element.remove();
                                            break;
                                        default:

                                    }

                                } else {
                                      console.log("Unable to get a response from the server.");
                                }
                            });



                        }
                    },
                      {
                        type: 'checkbox',
                        id: 'showtime',
                        label: 'Mostra Ora',
                        'default': '',
                        setup: function( element ) {
                            this.setValue( element.getAttribute('id'));
                        }
                     }]
                }
                ,{
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id',
                        'default': editor.config.customValues.picked.value,
                        setup: function( element ) {
                            this.setValue( element.getAttribute('id'));
                        },
                        commit: function(data) {
                              //set element id (default or )
                              var elem = data.element;

                              elem.setAttribute('id',  this.getValue() );

                            }
                    }
                ]}
            ]
        }
    });

