//This  Manager is responsible for instantiating collections and fetching them
// Need to solve fetch sync problems :() -- see line 14,
define(["collections/Collection", "collections/DocumentCollection","collections/SimpleCollection"], function (Collection, DocumentCollection, SimpleCollection){

  var constructors = {
    'collection': Collection,
    'simple': SimpleCollection
  };
  var collections = {};

  return {
    getCollection: function(name) {
      if(!collections[name]) {
        var collection = new constructors[name]();
        //collection.fetch();
        collections[name] = collection;
      }
      return collections[name];
    }
  }

});
