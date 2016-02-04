// Radio.js
define(['models/Base'], function (Base) {
    var Radio = Base.extend({
      defaults: _.extend({
        elem: "radio",
        elementType: "radio",
        elementCss : "",
        elementValues: {
          a:""
        }
      }, Base.prototype.defaults)
    });


  var AclRadio = Radio.extend({
    defaults: {
        type:"acl",
        elem: "radio",
        elementValues: {
          a: "NORMAL",
          b: "EDIT",
          c: "FULL"
        },
        disabled: false,
    }
  });

  var ReadOnlyAclRadio = AclRadio.extend({
    defaults: {
        disabled: true,
    }
  });

    var TpRadio = Radio.extend({
    defaults: {
        type:"tp",
        elem: "radio",
        elementValues: {
          a: "E",
          b: "I",
          c: "U"
        },
        disabled: false,
    }
  });

  var ReadOnlyTpRadio = TpRadio.extend({
    defaults: {
        disabled: true,
    }
  });

    // Uses _.defaults to allow the overriding of default values in subclass
    _.defaultsDeep(AclRadio.prototype.defaults, Radio.prototype.defaults);
    _.defaultsDeep(ReadOnlyAclRadio.prototype.defaults, AclRadio.prototype.defaults);

    _.defaultsDeep(TpRadio.prototype.defaults, Radio.prototype.defaults);
    _.defaultsDeep(ReadOnlyTpRadio.prototype.defaults, TpRadio.prototype.defaults);

  return {
    Radio: Radio,
    AclRadio : AclRadio,
    ReadOnlyAclRadio : ReadOnlyAclRadio,
    TpRadio: TpRadio,
    ReadOnlyTpRadio: ReadOnlyTpRadio
  }
  });
