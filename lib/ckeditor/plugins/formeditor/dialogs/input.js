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
                        validate: CKEDITOR.dialog.validate.notEmpty( "Label field cannot be empty." )
                    },
                    {
                        type: 'text',
                        id: 'pin',
                        label: 'Pin',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Pin field cannot be empty." )
                    }
                ]
            },
            {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'foo',
                        label: 'Foo'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var label = editor.document.createElement( 'label' );
            label.setAttribute( 'for', 'pin' );
            var value = dialog.getValueOf( 'tab-basic', 'label' );
            label.setHtml( value );
            editor.insertElement( label );
        }
    };
});
