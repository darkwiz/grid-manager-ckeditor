var myFeature = {
    config : {
        dialogId : '#dialog',
        wrapper : '#open',
        canvas: '#mycanvas',
        uiOptions : {width: 1280, autoOpen: true, modal: true},
        rte: {
                    debug: 1,
                    ckeditor: {
                        customConfig: 'config.js'
                    }
        }
    },

    init : function(config) {
        $.extend(myFeature.config, config);
        $(myFeature.config.wrapper).find('button').
            click(function() {
                 $(myFeature.config.dialogId).dialog(myFeature.config.uiOptions);
            });
            myFeature.buildGrid();
    },

    buildGrid : function() {
       $(myFeature.config.canvas).gridmanager(myFeature.config.rte);
    },

    getContent : function($li) {
        $li.append(myFeature.config.container);
        var url = myFeature.buildUrl($li);
        $li.find(myFeature.config.container).load(url);
    },

    showContent : function($li) {
        $li.find('div').show();
        myFeature.hideContent($li.siblings());
    },

    hideContent : function($elements) {
        $elements.find('div').hide();
    }
};



$(document).ready(function() {
  myFeature.init();

  //Solve problems jquery ui dialog- ckeditor/tinymce
  $(this).on('focusin', function(e) {
                  if ($(e.target).closest(" .cke_dialog").length) {
                          e.stopImmediatePropagation();
  }
})
  });

