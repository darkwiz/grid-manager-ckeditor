CKEDITOR.plugins.add( 'rceditor',
{
  lang: 'en,it',
   init : function( editor )
   {
      var config = editor.config,
         lang = editor.lang.format;
         // we could send via js object(through  CKEDITOR.dialog.add(...)) the pin to the dialog, when calling execCommand()
         //OLD won't work..

      var addCommand = function( commandName, dialogFile ) {
                    var def = {};
                    //dialog addCommand( "name of dialog to open", [additional command definition properties] )
                    editor.addCommand( commandName, new CKEDITOR.dialogCommand( commandName, def ) );
                    CKEDITOR.dialog.add( commandName, dialogFile );
         };

      var dialogPath = this.path + 'dialogs/';
            addCommand( 'pinin', dialogPath + 'pinin.js' );
            addCommand( 'pinout', dialogPath + 'pinout.js' );
            addCommand( 'pinedit', dialogPath + 'pinedit.js' );


      editor.ui.addRichCombo( 'rceditorCmb',
         {
            label : "Insert PIN",
            title :"Insert PIN",
            voiceLabel : "Insert PIN",
            multiSelect : false,
            //className : 'cke_combopanel',

            panel: {
                css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss )
                    //attributes: { 'aria-label': lang.panelTitle }
            },


            init : function()
            {
            this.startGroup( "PIN" );
            var self = this,
                pins =  editor.config.customValues.pins;
                for (var i in pins) {
                    self.add(pins[i].value, pins[i].label + "("+ pins[i].type +")", pins[i]);
                }
            },

            onClick : function( value )
            {
                $.each( this._.items , function(index, el){
                 if ( value == index ){
                         if ( el.pintype == "in") {
                           console.log(el.pintype);
                           config.customValues.picked = el;
                           editor.execCommand('pinin');

                           return true;
                        }
                        else if( el.pintype == "out" ){
                           console.log(el.pintype);
                            config.customValues.picked = el;
                            editor.execCommand('pinout');

                            return true;
                        }
                        else {
                           console.log(el.pintype);
                            config.customValues.picked = el;
                            editor.execCommand('pininout');

                        }
                   }
                });

            return false;

            }

         });
   }
});
