CKEDITOR.plugins.add( 'formeditor', {
    icons: 'input',
    init: function( editor ) {
        editor.addCommand( 'input', new CKEDITOR.dialogCommand( 'inputDialog' ) );

        editor.ui.addButton( 'Input', {
        label: 'Insert Input',
        command: 'input',
        toolbar: 'insert'
      });
    if ( editor.contextMenu ) {
        editor.addMenuGroup( 'formeditorGroup' );
        editor.addMenuItem('inputItem', {
            label: 'Edit Input Text',
            icon: this.path + 'icons/input.png',
            command: 'input',
            group: 'formeditorGroup'
        });
    editor.contextMenu.addListener( function( element) {

        //va preso anche lo stato della label
        if( element.getAscendant( 'input', true )) {
            return { inputItem: CKEDITOR.TRISTATE_OFF };
        }
    });
    }

    CKEDITOR.dialog.add( 'inputDialog', this.path + 'dialogs/input.js' );
    }

});

