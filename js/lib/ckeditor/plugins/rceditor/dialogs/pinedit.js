CKEDITOR.dialog.add( 'pinedit', function( editor ) {

    return { //dialog definition
        title: editor.lang.rceditor.pinedit.title,
        minWidth: 400,
        minHeight: 200,
        onLoad: function() {
            var self = this;
            require(["utils"], function(utils){
                var select = self.getContentElement('tab-basic', 'colselect'),
                    opts = utils.getColOpts();
                for ( var i = 0 ; i < opts.length ; i++){
                    var oOption = utils.addOption( select, opts[i][0], opts[i][1], editor.document);
                    // select.add(opts[i][0], opts[i][1]);
                    if ( i == 3 )
                    {
                        oOption.setAttribute('selected', 'selected');
                        oOption.selected = true;
                    }
                }
                self.getContentElement("tab-basic", "colselect").disable();
            });
        },
        onShow: function() {
            var self = this;
            require(['collectionmanager', 'views/View', 'utils'], function(CollectionManager, View, utils){
                var values = self.getContentElement('tab-basic', 'typeselect'),
                    selectedPin = editor.config.customValues.pin;

                utils.hideTabs.call(self);
                switch(selectedPin.type)
                {   case 'text':
                    case 'textRef':
                        var simpleCollection = CollectionManager.getCollection('collection');
                        optionNames = new Array("<Scegli un controllo>","Generico","Boolean","Tipo Protocollazione","ACL","Codice Fiscale", "Email", "TextArea", "Lista");
                        optionVal = new Array("none","text","boolean","tp","acl","cf","email","textarea","list");

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
                        optionNames = new Array("<Scegli un controllo>","Lista", "Autocomplete");
                        optionVal = new Array("none", "list", "autocomplete");
                        editor._collection = simpleCollection;
                        new View({collection: simpleCollection});

                        break;
                    default:
                        optionNames = new Array("<none>"),
                            optionVal = new Array("");
                    //qui vanno tutti gli altri che non hanno sotto opzioni( classifica, cartella etc.)
                }

                utils.removeAllOptions( values );

                for ( var i = 0 ; i < optionNames.length ; i++){
                    var oOption = utils.addOption( values, optionNames[ i ], optionVal[ i ], self.getParentEditor().document);
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
            if (editor._model)
                this.commitContent( data );
            else
                alert( 'Nessun controllo è stato scelto');

            //this.setupContent( 'clear' ); //TODO: Aggiungere al plugin per ripulire la tab list
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
                                    dialog = this.getDialog(),
                                    editor = dialog.getParentEditor();
                                id = dialog.getContentElement("tab-adv", "id");

                                //data.type = this.getValue();
                                editor._model.set({labelValue: this.getValue(), labelId: id.getValue()});

                                // label.setText( this.getValue() + ": " );

                                // label.setAttribute('for',  id.getValue() );
                            }
                        } //put here other children
                    ]
                },
                { //ROW 2
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
                                var self = this;
                                require(["utils"], function(utils) {
                                    var selected = self.getValue(),
                                        dialog = self.getDialog(),
                                        editor = dialog.getParentEditor()
                                    wselect = dialog.getContentElement("tab-basic", "colselect"),
                                        selectedPin = editor.config.customValues.pin;
                                    editor._model = editor._collection.add({pinValue: selectedPin.name}, {
                                        type: selected,
                                        PIN: selectedPin
                                    });
                                    utils.toggleField(wselect, selected);

                                    //TODO: Risolvere il problema del toggle delle schede in casi tipi complessi
                                    utils.toggleTabs.call(dialog, 'tab-' + selected);
                                    // if( selected == 'boolean')
                                    //       {  toggleField(checkbox, selected); }
                                    //       else {
                                    //           toggleField(checkbox, false);
                                    //           checkbox.setValue('');
                                    //        }
                                });
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
                        },{
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
                        }   //Add here on same row
                    ]}
            ]}
            ,{
                id: 'tab-adv', //Utilizzabile per Lookup
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
                ]},
            {
                id: 'tab-list',
                label: 'List Settings',
                elements: [
                    {
                        type: 'hbox',
                        widths: [ '66%', '33%' ],
                        children: [ {
                            type: 'vbox',
                            padding: 5,
                            children: [ {
                                id: 'txtOptValue',
                                type: 'text',
                                label: "Value",
                                style: 'width:100%',
                                setup: function( name ) {
                                    if ( name == 'clear' )
                                        this.setValue( '' );
                                }
                            },
                                {
                                    type: 'select',
                                    id: 'cmbValue',
                                    label: '',
                                    size: 5,
                                    style: 'width:200px;height:75px',
                                    items: [],
                                    onChange: function() {
                                        var dialog = this.getDialog(),
                                            optValue = dialog.getContentElement( 'tab-list', 'txtOptValue' );

                                        optValue.setValue( this.getValue() );

                                    },
                                    setup: function( name ) {
                                        if ( name == 'clear' )
                                            removeAllOptions( this );
                                    }
                                }]
                        }, {
                            type: 'vbox',
                            padding: 5,
                            children: [ {
                                type: 'button',
                                id: 'btnAdd',
                                label: "Aggiungi",
                                title: "Aggiungi",
                                style: 'width:100%;',
                                onClick: function() {
                                    //Add new option.
                                    var self = this;
                                    require(["utils"], function(utils) {
                                        var dialog = self.getDialog(),
                                            editor = dialog.getParentEditor(),
                                            optValue = dialog.getContentElement('tab-list', 'txtOptValue'),
                                            values = dialog.getContentElement('tab-list', 'cmbValue');
                                        utils.addOption(values, optValue.getValue(), optValue.getValue(), dialog.getParentEditor().document);

                                        console.log(optValue.getValue());
                                        editor._model.addOption(optValue.getValue());
                                        optValue.setValue('');
                                    });


                                }
                            },
                                {
                                    type: 'button',
                                    id: 'btnDelete',
                                    label: "Rimuovi Selezionati",
                                    title: "Rimuovi Selezionati",
                                    style: 'width:100%;',
                                    onClick: function() {
                                        //Delete selected option.
                                        var self = this;
                                        require(["utils"], function(utils) {
                                            var dialog = self.getDialog(),
                                                optValue = dialog.getContentElement('tab-list', 'txtOptValue'),
                                                values = dialog.getContentElement('tab-list', 'cmbValue');

                                            iIndex = utils.getSelectedIndex(values);

                                            if (iIndex >= 0) {
                                                console.log(iIndex);
                                                editor._model.removeOption(iIndex);
                                                utils.removeSelectedOptions(values);
                                            }
                                        });
                                    }
                                }
                            ]}
                        ]
                    }
                ]

            }

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
                    console.log(editor._collection.toJSON());
                    // alert( 'Clicked: ' + this.id );
                }
            } ]
    }

});

