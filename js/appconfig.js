//OLD module
define(function () {
    return {
        dialogId : '#container',
        // wrapper : '#open',
        canvas: '#mycanvas',
        // uiOptions : {width: 1280, autoOpen: true, modal: true},
        rte: {
                    //debug: 1,
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
