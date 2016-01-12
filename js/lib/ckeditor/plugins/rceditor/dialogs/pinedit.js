CKEDITOR.dialog.add( 'pinedit', function( editor ) {

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

        function getControl ( context ) {
          var control,
              content,
              definition = context.schema[context.type],
              pin = editor.config.customValues.picked;
          var controls = {
            text: function() {
                var text = new HTMLControl(definition, pin, context.elem);
                text.setDomElem();
                context.elem.append( text.getDomElem() );
            },
            checkbox: function () {
                var checkbox = new HTMLControl(definition, pin, context.elem);
                checkbox.setDomElem();
                context.elem.append( checkbox.getDomElem() );
            },
            datetime: function () {
                var datetime = new DateTimeControl(definition, pin, context.elem);
                datetime.setDomElem();
                context.elem.append( datetime.getDomElem() );

                var datetimejs = new DateTimeControl(definition, pin, context.elem);
                context.head.append( datetimejs.getJS() );

            },
            acl: function () {
                for (var i in definition.values){
                    context.elem.desc = definition.values[i];
                    var acl = new HTMLControl(definition, pin, context.elem);
                    acl.setDomElem();
                    context.elem.append( acl.getDomElem() );
                 }
             },
            tp: function () {
              for (var i in definition.values){
                    context.elem.desc = definition.values[i];
                    var tp = new HTMLControl(definition, pin, context.elem);
                    tp.setDomElem();
                    context.elem.append( tp.getDomElem() );
                 }
            },
            cf: function() {
                 var cf = new HTMLControl(definition, pin, context.elem);
                 cf.setDomElem();
                 context.elem.append( cf.getDomElem() );
            },
            textarea: function() {
                 var textarea = new TextAreaControl(definition, pin, context.elem);
                 textarea.setDomElem();
                 context.elem.append( textarea.getDomElem() );
            },
            email: function() {
                 var email = new HTMLControl(definition, pin, context.elem);
                 email.setDomElem();
                 context.elem.append( email.getDomElem() );
            },
            anno: function() {
                 var anno = new HTMLControl(definition, pin, context.elem);
                 anno.setDomElem();
                 context.elem.append( anno.getDomElem() );
            }

  };
  // invoke it
  (controls[context.type])();


  // return built chosen control, for debug purpose
  return  control;
}



    return { //dialog definition
        title: editor.lang.rceditor.pinout.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {
           var values = this.getContentElement('tab-basic', 'typeselect'),
            selectedPin = editor.config.customValues.picked;

            this.getContentElement("tab-basic", "addlabel").disable();

            switch(selectedPin.type)
                     {   case 'text':
                            case 'textRef':
                                optionNames = new Array("Generico","Boolean","Data","Tipo Protocollazione","ACL","Codice Fiscale", "Email", "Anno", "TextArea");
                                optionVal = new Array("text","checkbox","datetime","tp","acl","cf","email","anno","textarea");
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


            //Ricorda in onOK, onshow etc..: dialog = this, mentre in onchange è this.getDialog()
            var dialog = this,
                editor = dialog.getParentEditor(),
                element = dialog.htmlElement,
                label = dialog.label,
                isInsertMode = !element;


            if ( isInsertMode ) {
                label = editor.document.createElement( 'h4' );
                element = editor.document.createElement( 'div' );
                element.addClass('controls');

            }

            var data = { element: element , label: label };

            if ( isInsertMode ){
                editor.insertElement( data.label );
                editor.insertElement( data.element ); // trovare un modo per aggiungere più elementi
                formgroup =  label.getParent() || element.getParent();
                formgroup.addClass('form-group');
            }

            dialog.commitContent( data );

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
                            label: 'PIN Label',
                            'default': editor.config.customValues.picked.label,
                            commit: function(data) {
                              var label = data.label,
                                  dialog = this.getDialog();
                                    id = dialog.getContentElement("tab-adv", "id");

                                    label.setText( this.getValue() );

                                    label.setAttribute('for',  id.getValue() );
                            }
                        }
                    ]},
                       {
                        type: 'hbox',
                        widths: [ '50%', '50%' ],
                        children: [
                         {
                            id: 'typeselect',
                            type: 'select',
                            label: "Tipo Controllo",
                            'default': 'text',
                            items: [ [ "<none>",    '' ] ],
                               onChange: function() {
                                var selected = this.getValue(),
                                    dialog = this.getDialog(),
                                    field = dialog.getContentElement("tab-basic", "addlabel");

                                    if( selected == 'checkbox')
                                    {  toggleField(field, selected); }
                                    else {
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

                            var data = CKEDITOR.ajax.load( 'schema.json' , function( response ) {
                                if( response !== null ){
                                    var schema = JSON.parse(response);
                                    var control = getControl({type: self.getValue() , elem: element, schema: schema, head: head });
                                    } else {
                                          console.log("Unable to get a response from the server.");
                                    }
                                });

                            }
                        },
                          {
                            type: 'text',
                            id: 'addlabel',
                            label: 'Control Label',
                            'default': '',
                            commit: function( data ) {
                                var element = data.element;
                                    element.desc = this.getValue();
                                //console.log(element.getAttribute('id'));
                                //this.setValue( element.getAttribute('id'));
                            }
                         }
                         ]
                       }
               ]}
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
         };
      });
