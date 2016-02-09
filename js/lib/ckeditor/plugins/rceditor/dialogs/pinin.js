CKEDITOR.dialog.add( 'pinin', function( editor ) {
    var self = this;
    require(["utils"], function(utils){
        _.extend(self, utils);
         });

    return { //dialog definition
        title: editor.lang.rceditor.pinin.title,
        minWidth: 400,
        minHeight: 200,
        onLoad: function() {
            var select = this.getContentElement('tab-basic', 'colselect'),
                opts = getColOpts();
            for ( var i = 0 ; i < opts.length ; i++){
                var oOption = addOption( select, opts[i][0], opts[i][1], editor.document);
                // select.add(opts[i][0], opts[i][1]);
                if ( i == 3 )
                {
                    oOption.setAttribute('selected', 'selected');
                    oOption.selected = true;
                }
            }
            this.getContentElement("tab-basic", "colselect").disable();

        },
        onShow: function() {
            var self = this;
            require(['collectionmanager', 'views/View', 'viewmanager'], function(CollectionManager, View, ViewManager){
               var values = self.getContentElement('tab-basic', 'typeselect'),
                selectedPin = editor.config.customValues.pin;
                switch(selectedPin.type)
                {
                    case 'text':
                    case 'textRef':
                        var simpleCollection = CollectionManager.getCollection('collection');
                        optionNames = new Array("<Scegli un controllo>","Generico","Boolean","Tipo Protocollazione","ACL","Codice Fiscale", "Email", "TextArea");
                        optionVal = new Array("none","text","boolean","tp","acl","cf","email","textarea");

                        editor._collection = simpleCollection;
                        new View({collection: simpleCollection});

                        break;
                case 'date':
                        var simpleCollection = CollectionManager.getCollection('collection');
                        optionNames = new Array("<Scegli un controllo>","Generico","Calendar(ReadOnly)");
                        optionVal = new Array("none","date","calendar");


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
                        var simpleCollection = CollectionManager.getCollection('collection');
                        optionNames = new Array("<Scegli un controllo>","Generico");
                        optionVal = new Array("none","document");
                        //testare
                        editor._collection = simpleCollection;
                        new View({collection: simpleCollection});

                        break;
                case 'soggetto':
                        var simpleCollection = CollectionManager.getCollection('collection');
                        optionNames = new Array("<Scegli un controllo>", "Soggetto", "Soggetto/PersonaFisica", "Soggetto/PersonaGiuridica", "Soggetto/Amministrazione");
                        optionVal = new Array("none", "soggetto", "soggettopf", "soggettopg", "soggettoam");
                        editor._collection = simpleCollection;
                        new View({collection: simpleCollection});

                        break;
                case 'object':
                    optionNames = new Array("<Scegli un controllo>","Object/ACL");
                    optionVal = new Array("<none>","objectacl");
                    var objCollection = CollectionManager.getCollection('obj');

                    editor._collection = objCollection;
                    new View({collection: objCollection});
                    break;
                case 'actor':
                    var simpleCollection = CollectionManager.getCollection('collection');
                    optionNames = new Array("<Scegli un controllo>","Generico");
                    optionVal = new Array("none", "text");
                    editor._collection = simpleCollection;
                    new View({collection: simpleCollection});

                    break;
                default:
                    optionNames = new Array("<none>"),
                        optionVal = new Array("");
                    //qui vanno tutti gli altri che non hanno sotto opzioni( classifica, cartella etc.)
                }

                removeAllOptions( values );

                if (editor._model){
                    var model = editor._collection.get(editor._model);
                }
                for ( var i = 0 ; i < optionNames.length ; i++){

                    var oOption = addOption( values, optionNames[ i ], optionVal[ i ], self.getParentEditor().document);
                    //console.log("Opt val:", optionVal[ i ]);
                    //console.log("Model type:", model &&  model.get('type'));
                    if ( model && optionVal[ i ] == model.get('type') ) //TODO: check this assertion
                    {
                        oOption.setAttribute('selected', 'selected');
                        oOption.selected = true;
                    }
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
                        widths: [ '50%', '50%' ],//field = dialog.getContentElement("tab-basic", "addlabel"),
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
                                    editor._model.set({labelValue: this.getValue(), labelId: id.getValue()});

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
                                        wselect = dialog.getContentElement("tab-basic", "colselect"),
                                        selectedPin = editor.config.customValues.pin;
                                editor._model = editor._collection.add({pinValue: selectedPin.name},{type: selected, PIN: selectedPin});
                                toggleField(wselect, selected);

                                //toggleTabs.call(dialog, 'tab-'+ selected);


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
                                id: 'colselect',
                                type: 'select',
                                label: "Larghezza Controllo",
                                'default': 'none',
                                items:  [['--- Select Field Width ---',0]],
                                onChange: function() {
                                    var selected = this.getValue(),
                                        dialog = this.getDialog(),
                                        editor = dialog.getParentEditor();
                                    editor._model.setcontainerClass(selected);

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
                        //var control = editor._collection.remove(editor._model);
                        console.log(editor._collection);
                        // alert( 'Clicked: ' + this.id );
                         }
                    } ]
        }

    });

