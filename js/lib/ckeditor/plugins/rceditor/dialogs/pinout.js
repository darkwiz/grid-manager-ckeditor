CKEDITOR.dialog.add( 'pinout', function( editor ) {
 var self = this;
    require(["utils"], function(utils){

        _.extend(self, utils);
        //$.extend(pinindef, self);

         });

    return { //dialog definition
        title: editor.lang.rceditor.pinout.title,
        minWidth: 400,
        minHeight: 200,


        onShow: function() {
            var self = this;
            require(['collectionmanager'], function(CollectionManager){
               var values = self.getContentElement('tab-basic', 'typeselect'),
                selectedPin = editor.config.customValues.pin;
                self.getContentElement("tab-basic", "addlabel").disable();

            switch(selectedPin.type)
                     {   case 'text':
                         case 'textRef':
                                var collection = CollectionManager.getCollection('collection');
                                optionNames = new Array("Generico","Boolean","Data","Tipo Protocollazione","ACL","Codice Fiscale", "Email", "Anno", "TextArea");
                                optionVal = new Array("text","boolean","date","tp","acl","cf","email","year","textarea");
                                //IN this way we skip the model function of the collection!
                                // collection.success(function(collection, response, options){
                                //     editor._collection = collection;
                                //     console.log("resp: \n",collection ,"resp:\n",response,"opt:\n", options );
                                //     editor._model  = editor._collection.findWhere({elem: 'text'});
                                // })
                                editor._model = collection.add({}, {type:'text'});
                                editor._collection = collection;

                                //OLD fetch
                                // collection.fetch({
                                //     success: function(collection, response, options){
                                //      //Collectionmanager.setColletion(editor);
                                //      editor._collection = collection;
                                //      editor._model  = editor._collection.findWhere({elem: 'text'});
                                //         }
                                //   });
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
                            if ( i == 0 )
                            {
                                oOption.setAttribute('selected', 'selected');
                                oOption.selected = true;
                            }
                        }
            });
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
                            'default': 'text',
                            items: [ [ "<none>",    '' ] ],
                            onChange: function() {
                                    var selected = this.getValue(),
                                        dialog = this.getDialog(),
                                        editor = dialog.getParentEditor();
                                        field = dialog.getContentElement("tab-basic", "addlabel");
                                        //Setting model on change
                                         if (editor._model)
                                            editor._collection.remove(editor._model);
                                        editor._model = editor._collection.add({},{type: selected});
                                        // console.log(editor._model);
                                        // console.log(editor._collection.toJSON());

                                        //editor._model = editor._collection.findWhere({elem: selected});

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
                                        //data.type = this.getValue();
                                        // se ci sono problemi di sync el:editor
                                        //se uso il DOM ckeditor a el passo element
                                     /* Riga da rivedere passiamo ancora l'editor e la model al commit finale... */
                                     var control = getView({model: editor._model, el: editor.element.$});

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
                              //set element id (default or )
                              // var element = data.element;
                              // element.id =  this.getValue();


                              var dialog = this.getDialog(),
                                  editor = dialog.getParentEditor();

                              editor._model.set({elementId: this.getValue()});

                            }
                    }
                ]}
            ]
        }


});
