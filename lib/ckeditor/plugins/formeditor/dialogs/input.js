CKEDITOR.dialog.add( 'inputDialog', function( editor ) {
    return {
        title: 'Input Text Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'label',
                        label: 'Label',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Label field cannot be empty." ),
                        setup: function( element ) {
                            this.setValue( element.getValue() );
                        }
                    },
                    {
                        type: 'text',
                        id: 'pin',
                        label: 'Pin',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Pin field cannot be empty." ),
                        setup: function( element ) {
                            this.setValue( element.getAttribute( 'value') );
                        }
                    }
                ]
            },
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
                ]
            }
        ],
        onShow: function() {
            //code executed when a dialog window is loaded
            var selection = editor.getSelection();

            var element = selection.getStartElement();

            if(element)
                element = element.getAscendant('input', true );
            if(!element || element.getName() != 'input' ) {
                element = editor.document.createElement();
                this.insertMode = true;
            } else
                this.insertMode = false;

            this.element = element;
            if ( !this.insertMode )
                this.setupContent( element );

        },
        onOk: function() {
            var dialog = this;
            this.insertMode = true;


            var label = editor.document.createElement( 'label' );

            label.setAttribute( 'for', 'pin' );
            var value = dialog.getValueOf( 'tab-basic', 'label' );
            label.setHtml( value + ': ' );
            editor.insertElement( label );

            var input = editor.document.createElement( 'input' );
            var inputvalue = dialog.getValueOf( 'tab-basic', 'pin' );
            input.setAttribute( 'value', inputvalue );

            editor.insertElement( input );

        }
    };
});
