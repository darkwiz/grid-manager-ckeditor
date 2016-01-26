CKEDITOR.dialog.add( 'pinout', function( editor ) {
    var self = this;
    require(["utils"], function(utils){
        _.extend(self, utils);
         });

    return { //dialog definition
        title: editor.lang.rceditor.pinout.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {
            var self = this;
            require(['collectionmanager', 'views/View', 'viewmanager'], function(CollectionManager, View, ViewManager){
               var values = self.getContentElement('tab-basic', 'typeselect'),
                selectedPin = editor.config.customValues.pin;
                self.getContentElement("tab-basic", "addlabel").disable();
            switch(selectedPin.type)
                     {   case 'text':
                         case 'textRef':
                                var simpleCollection = CollectionManager.getCollection('collection');
                                optionNames = new Array("<Scegli un controllo>","Generico","Boolean","Tipo Protocollazione","ACL","Codice Fiscale", "Email", "TextArea");
                                optionVal = new Array("none","text","boolean","tp","acl","cf","email","textarea");

                                editor._collection = simpleCollection;
                                new View({collection: simpleCollection});

                                break;
                        case 'date':
                                var simpleCollection = CollectionManager.getCollection('collection');
                                optionNames = new Array("<Scegli un controllo>","Calendar","Select");
                                optionVal = new Array("none","calendar","date");
                                //testare
                                editor._collection = simpleCollection;
                                new View({collection: simpleCollection});

                                break;
                        case 'year':
                              var simpleCollection = CollectionManager.getCollection('collection');
                                optionNames = new Array("<Scegli un controllo>","Select");
                                optionVal = new Array("none","year");
                                //testare
                                editor._collection = simpleCollection;
                                new View({collection: simpleCollection});

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
                            var oOption = addOption( values, optionNames[ i ], optionVal[ i ], self.getParentEditor().document);
                            // if ( i == 0 )
                            // {
                            //     oOption.setAttribute('selected', 'selected');
                            //     oOption.selected = true;
                            // }
                        }
            });
        },
        onOk: function() {
            var editor = this.getParentEditor(),
                element = this.element,
                isInsertMode = !element;


            // if ( isInsertMode ) {
            //    element = editor.document.createElement( 'span' );


            // }
           // element: element ,
            var data = { element: element };

            // if ( isInsertMode ){
            //     editor.insertElement(data.element);
            //     }

            this.commitContent( data );

            // Element might be replaced by commitment.
            // if ( !isInsertMode )
            //     editor.getSelection().selectElement( data.element );

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
                            'default': editor.config.customValues.pin.label,
                            commit: function(data) {
                              var label = data.label,
                                  self =this,
                                  dialog = this.getDialog(),
                                  editor = dialog.getParentEditor();
                                  id = dialog.getContentElement("tab-adv", "id");

                                  //data.type = this.getValue();
                                  editor._model.set({pinLabel: this.getValue(), labelId: id.getValue()})

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
                            'default': 'none',
                            items: [ [ "<none>",    '' ] ],
                            onChange: function() {
                                    var selected = this.getValue(),
                                        dialog = this.getDialog(),
                                        editor = dialog.getParentEditor(),
                                        field = dialog.getContentElement("tab-basic", "addlabel"),
                                         selectedPin = editor.config.customValues.pin;
                                        editor._model = editor._collection.add({pinName: selectedPin.name},{type: selected, PIN: selectedPin});

                                  if( selected == 'boolean')
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

                                     /* Riga da rivedere passiamo ancora l'editor e la model al commit finale... */
                                     // var control = getView({model: editor._model, el: editor.element.$});

                            }
                        },
                          {
                            type: 'text',
                            id: 'addlabel',
                            label: 'Control Label',
                            'default': '',
                            commit: function( data ) {
                                // var element = data.element;
                                //     element.desc = this.getValue();
                                  var dialog = this.getDialog(),
                                  editor = dialog.getParentEditor();

                                  editor._model.set({labelValue: this.getValue()});
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
                        'default': editor.config.customValues.pin.value,
                        setup: function( element ) {
                            this.setValue( element.getAttribute('id'));
                        },
                        commit: function(data) {
                              var dialog = this.getDialog(),
                                  editor = dialog.getParentEditor();

                              editor._model.set({elementId: this.getValue()});

                            }
                    }
                ]}

            ],
            buttons: [
            CKEDITOR.dialog.okButton,
            CKEDITOR.dialog.cancelButton,
                {
                 type: 'button',
                 id: 'resetButton',
                 label: 'Reset',
                 title: 'My title',
                  onClick: function() {
                    // this = CKEDITOR.ui.dialog.button
                    var dialog = this.getDialog(),
                        editor = dialog.getParentEditor();
                        var control = editor._collection.remove(editor._model);
                        console.log(control);
                        // alert( 'Clicked: ' + this.id );
                         }
                    } ]
        }

    });

