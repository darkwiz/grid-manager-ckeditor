CKEDITOR.plugins.add( 'formeditor', {
    icons: 'input',
    init: function( editor ) {
        editor.addCommand( 'input', new CKEDITOR.dialogCommand( 'inputDialog' ) );

    editor.ui.addButton( 'Input', {
    label: 'Insert Input',
    command: 'input',
    toolbar: 'insert'
  });

    CKEDITOR.dialog.add( 'inputDialog', this.path + 'dialogs/input.js' );
    }
});

