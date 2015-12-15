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
                          props: {},
                          picked:{}
                        }
                    },

        },
        url: 'data.json',
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
            App.clearEditor();
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
      App.helper.inputs = response.settings.inputs;
      App.helper.outputs = response.settings.outputs;
      App.helper.props = response.settings.props;

      var i = 1;

      $.each(App.helper.inputs, function(ind, elem) {
        var val = elem.value;
        if( !elem.hidden || elem.hidden === undefined ){
         $.each(App.helper.outputs, function(index, el) {
          if( !el.hidden || el.hidden === undefined ){
            // console.log("Labelinputs:" + elem.label + "; hidden:", !elem.hidden , "; value:",  elem.value == "");
            // console.log("Labeloutputs:" + el.label + "; hidden:",  !el.hidden , "; value:",  el.value == "");

             if( val.value !== "" && el.value !== "" && val === el.value ){
                //creo un nuovo oggetto per i pin in/out
                el.label = "pininout" + i;
                el.pintype = "inout";
                el.name = index; //per non perdere il nome del pin
                App.config.rte.ckeditor.customValues.pins.push(el);

                //elimino i singoli pin di in e out fusi in uno inout
                delete App.helper.outputs[index];
                delete App.helper.inputs[ind];

                i++;
                return false;
              }
            }
            });
         //Aggiungo il pin in se al termine della scansione non trovo corrispondenza su value, non posso aggiungere elem perchè non sarebbe aggiornato

       if ( App.helper.inputs[ind] !== undefined ){
         App.helper.inputs[ind].pintype = "in";
         App.helper.inputs[ind].name = ind;
         App.config.rte.ckeditor.customValues.pins.push(App.helper.inputs[ind]);
        }
       }
      });
      //se è rimasto almeno un pin in out li aggiungo eventualmente
      $.each(App.helper.outputs, function(index, el) {
         if ( App.helper.outputs[index] !== undefined ){
          if( !el.hidden || el.hidden === undefined ){
            App.helper.outputs[index].pintype = "out";
            el.name = index;
            App.config.rte.ckeditor.customValues.pins.push(el);

          }
          }
        });
    },
    //clear divs right after initializing editor (test required)
      clearEditor: function () {
      CKEDITOR.on( 'instanceReady', function( evt ) {
        $.each(CKEDITOR.instances, function(index, instance){
        CKEDITOR.instances[index].setData('');
        });

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

