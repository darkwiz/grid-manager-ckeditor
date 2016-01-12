//pinindef.js -- missing editor variable
define (function() {

    var editor = this.CKEDITOR;
    return { //dialog definition
        title: editor.lang.rceditor.pinin.title,
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
                                 require(['collections/ControlCollection'], function(ControlCollection){
                                      editor._controlmodels = new ControlCollection();
                                      editor._controlmodels.fetch({
                                        success: function(){
                                        editor.controlmodel = editor._controlmodels.findWhere({elementType: 'text'})
                                        }
                                      });

                                      //console.log(editor.controlmodel)
                                });
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
        //da rivedere la gerarchia di elementi html creata (il formgroup viene generato in automatico?)
            var editor = this.getParentEditor(),
                element = this.element,
                isInsertMode = !element;


            if ( isInsertMode ) {
               element = editor.document.createElement( 'span' );


            }
           // element: element ,
            var data = { element: element };

            if ( isInsertMode ){
                editor.insertElement(data.element);
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
                              self =this,
                                  dialog = this.getDialog(),
                                  editor = dialog.getParentEditor();
                                  id = dialog.getContentElement("tab-adv", "id");
                                      require(['models/ControlModel'], function(Model){

                                         //data.type = this.getValue();
                                          editor.controlmodel.set({pinLabel: self.getValue(), labelId: id})
                                        });

                                    // label.setText( this.getValue() + ": " );

                                    // label.setAttribute('for',  id.getValue() );
                            }
                        },
                        //put here other children
                     ]
                  },
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
                                        editor = dialog.getParentEditor();
                                        field = dialog.getContentElement("tab-basic", "addlabel"),
                                        //Setting model on change
                                        require(['models/ControlModel'], function(Model){
                                            editor.controlmodel = dialog.getParentEditor()._controlmodels.findWhere({elementType: selected});
                                        });
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
                                    var head = CKEDITOR.document.getHead(),
                                        dialog = this.getDialog(),
                                        editor = dialog.getParentEditor();
                                        //data.type = this.getValue();
                                     var control = getView({model: editor.controlmodel, el: editor});

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
                            }
                         }
                    ]}
                 ]
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
                              var element = data.element;
                              element.id =  this.getValue();

                            }
                    }
                ]}
            ]
        }
    });
