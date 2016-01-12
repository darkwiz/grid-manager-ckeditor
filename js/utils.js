//utils.js
define(function() {

  return {
     removeAllOptions: function( combo ) {
        combo = getSelect( combo );
        while ( combo.getChild( 0 ) && combo.getChild( 0 ).remove() ) {

        }
    },

    getSelect: function ( obj ) {
        if ( obj && obj.domId && obj.getInputElement().$ ) // Dialog element.
        return obj.getInputElement();
        else if ( obj && obj.$ )
            return obj;
        return false;
    },

    // Add a new option to a SELECT object (combo or list).
    addOption: function ( combo, optionText, optionValue, documentObject, index ) {
        combo = getSelect( combo );
        var oOption;
        if ( documentObject )
            oOption = documentObject.createElement( 'OPTION' );
        else
            oOption = document.createElement( 'OPTION' );

        if ( combo && oOption && oOption.getName() == 'option' ) {
            if ( CKEDITOR.env.ie ) {
                if ( !isNaN( parseInt( index, 10 ) ) )
                    combo.$.options.add( oOption.$, index );
                else
                    combo.$.options.add( oOption.$ );

                oOption.$.innerHTML = optionText.length > 0 ? optionText : '';
                oOption.$.value = optionValue;
            } else {
                if ( index !== null && index < combo.getChildCount() )
                    combo.getChild( index < 0 ? 0 : index ).insertBeforeMe( oOption );
                else
                    combo.append( oOption );

                oOption.setText( optionText.length > 0 ? optionText : '' );
                oOption.setValue( optionValue );
            }
        } else {
            return false;
        }

        return oOption;
    },

    toggleField: function ( field, check ) {
            field[ check ? 'enable' : 'disable' ]();
        },

     convertDate: function( dateString ) {
        var date = new Date(dateString);
        return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    },

    getView: function( context ) {

        require(["views/View"], function(View){
                var view = new View({model: context.model, el: context.el});
                view.render();
            });
    },
    newGetControl: function( context ){

            require(["models/ControlModel", "router"], function(Model, Router){

                var router = new Router({data: context.data});
                router.navigate("view/" + context.data.type, {trigger:true});
            });
        },
     getControl: function( context ) {
          var control,
              content,
              //definition = context.schema[context.type]),
              pin = editor.config.customValues.picked;
          var controls = {
            text: function() {
                requirejs(["models/Model", "router"], function(Module, Router){
                     var module = new Module({el: context.elem});
                     var router = new Router({entity: module});
                     router.navigate("view");
                    // var router = Router.initialize();
                    // console.log(router);
                 // view.render(); undefined (async)

                });

                // var text = new SpanControl(definition, pin, context.elem);
                // text.setDomElem(); //add class text, for now..
                // console.log(context.elem);
                // context.elem.append( text.getDomElem() );
                },
            checkbox: function () {
                var checkbox = new HTMLControl(definition, pin, context.elem);
                checkbox.setDomElem();
                context.elem.append( checkbox.getDomElem() );

            },
            datetime: function () {
                var datetime = new SpanControl(definition, pin, context.elem);
                datetime.setDomElem();
                context.elem.append( datetime.getDomElem() );

                var datetimejs = new DateTimeControl(definition, pin, context.elem);
                context.head.append( datetimejs.getJS() );

            },
            acl: function () {
                for (var i in definition.values){
                    context.elem.desc = definition.values[i];
                    var acl = new HTMLControl(definition, pin, context.elem);
                    acl.setDomElem();
                    context.elem.append( acl.getDomElem() );
                 }
             },
            tp: function () {
              for (var i in definition.values){
                    context.elem.desc = definition.values[i];
                    var tp = new HTMLControl(definition, pin, context.elem);
                    tp.setDomElem();
                    context.elem.append( tp.getDomElem() );

                 }
            },
            cf: function() {
                 var cf = new SpanControl(definition, pin, context.elem);
                 cf.setDomElem();
                 context.elem.append( cf.getDomElem() );
            },
            textarea: function() {
                 var textarea = new TextAreaControl(definition, pin, context.elem);
                 textarea.setDomElem();
                 context.elem.append( textarea.getDomElem() );
            },
            email: function() {
                 var email = new SpanControl(definition, pin, context.elem);
                 email.setDomElem();
                 context.elem.append( email.getDomElem() );
            },
            anno: function() {
                 var anno = new SpanControl(definition, pin, context.elem);
                 anno.setDomElem();
                 context.elem.append( anno.getDomElem() );
            }

  };
  // invoke it
  (controls[context.type])();


  // return built chosen control, for debug purpose
  return  control;
}

  }
} )
