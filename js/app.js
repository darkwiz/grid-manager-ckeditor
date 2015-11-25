var App = {
    config : {
        dialogId : '#dialog',
        wrapper : '#open',
        canvas: '#mycanvas',
        uiOptions : {width: 1280, autoOpen: true, modal: true},
        rte: {
                    debug: 1,
                    ckeditor: {
                        customConfig: 'config.js',
                        customValues: {
                          pins: [],
                          props: {}
                        }
                    },

        },
        url: 'settings_editor.json',
   },
   helper: {
        inouts: {},
        inputs: {},
        outputs: {},
        props: {}
   },

    init : function(config, settings) {
        $.extend(App.config, config);
        $.extend(App.settings, settings);
        $(App.config.wrapper).find('button').
            click(function() {
                 $(App.config.dialogId).dialog(App.config.uiOptions);
            });
            App.buildGrid();
            App.getProcessSettings(App.handleDesignerResponse);
    },

    buildGrid : function() {
       $(App.config.canvas).gridmanager(App.config.rte);
    },

    getProcessSettings: function(successCallBack) {
      $.ajax({
        url: App.config.url,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json'
      })
      .done(function(response) {
       if( response !== null ){
           successCallBack(response);
         } else {
          console.log("Unable to get a response from the server.");
         }
       })
      .fail(function() {
          console.log("Experiencing problems connecting to the server.");
       })
      .always(function() {
          console.log("complete");
       });
      },

    handleDesignerResponse: function(response) {
      App.helper.inputs = response.inputs;
      App.helper.outputs = response.outputs;
      App.helper.props = response.props;

      var i = 1;

      $.each(App.helper.inputs, function(ind, elem) {
        var val = elem.value;
         $.each(App.helper.outputs, function(index, el) {
             if(val === el.value){
                //creo un nuovo oggetto per i pin in/out
                el.label = "pininout" + i;
                el.pintype = "inout";
                App.config.rte.ckeditor.customValues.pins.push(el);

                //elimino i singoli pin di in e out fusi in uno inout
                delete App.helper.outputs[index];
                delete App.helper.inputs[ind];

                i++;
                return false;
              }
            });
         //Aggiungo il pin in se al termine della scansione non trovo corrispondenza su value, non posso aggiungere elem perchè non sarebbe aggiornato

       if ( App.helper.inputs[ind] !== undefined ){
         App.helper.inputs[ind].pintype = "in";
         App.config.rte.ckeditor.customValues.pins.push(App.helper.inputs[ind]);
       }
      });
      //se è rimasto almeno un pin in out li aggiungo eventualmente
      $.each(App.helper.outputs, function(index, el) {
         if ( App.helper.outputs[index] !== undefined ){
            App.helper.outputs[index].pintype = "out";
            App.config.rte.ckeditor.customValues.pins.push(el);
          }
        });
    }

};



$(document).ready(function() {
  App.init();

  //Solve problems jquery ui dialog- ckeditor/tinymce
  $(this).on('focusin', function(e) {
                  if ($(e.target).closest(" .cke_dialog").length) {
                          e.stopImmediatePropagation();
  }
})
  });

