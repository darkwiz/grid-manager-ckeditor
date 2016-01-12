requirejs.config({
baseUrl: "js",
paths :{
  "jquery": "lib/jquery.min",
  "jquery.bootstrap": "lib/bootstrap.min",
  "jquery.ui": "lib/jquery-ui.min",
  "underscore": "lib/underscore-min",
  "backbone": "lib/backbone.min",
  "text": "lib/text",
  "domReady":"lib/domready",
  "handlebars":"lib/handlebars",
  "ckeditor.core": "lib/ckeditor/ckeditor",
  "ckeditor.jquery": "lib/ckeditor/adapters/jquery",
  "gridmanager": "lib/jquery.gridmanager.min",
  "templates":"../templates",
  "plugin":"lib/ckeditor/plugins/rceditor"
},
shim: {
  "jquery.bootstrap": {
      deps: ["jquery"]
  },
  "handlebars": {
    exports: 'Handlebars'
  },
  "ckeditor.jquery": { deps: ["jquery", "ckeditor.core" ]},
  "gridmanager": { deps: ["jquery.ui","ckeditor.jquery" ]},
  "app":{ deps: ["gridmanager"]}
}
});

requirejs(["app", "jquery.bootstrap", "gridmanager","domReady!"], function(App) {

  App.init();

  //async module loading -- OLD
  // require(['appconfig'], function(config){
  //   App.init(config);
  // });

  //Solve problems jquery ui dialog- ckeditor/tinymce

         $(this.document).on('focusin', function(e) {
                  if ($(e.target).closest(" .cke_dialog").length) {
                          e.stopImmediatePropagation();
        }
        });
});


/*L'idea è quella di esporre dei metodi utilizzando il pattern amd e  requirejs nel plugin. (vedi osymani) Altrimenti con il plugin si utilizza solo handlebar e i template, da verificare se si riesce a unire le cose
L'altra è create view backbone che verranno utilizzate nel dispatcher dei pinin, pinout, etc. al posto dei new Control...
Sempre utilizzando require js per ottenere le viste*/

