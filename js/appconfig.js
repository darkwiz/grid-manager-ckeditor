//OLD module
define(function () {
    return {
        dialogId : '#container',
        // wrapper : '#open',
        canvas: '#mycanvas',
        // uiOptions : {width: 1280, autoOpen: true, modal: true},
        rte: {
                    //debug: 1,
                    cssInclude:'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
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
        helper : { //TODO: cleanup unused variables
        inouts: {},
        inputs: {},
        outputs: {},
        props: {}
      }
  };
});
