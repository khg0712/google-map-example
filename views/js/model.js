(function(exports){
  'use strict';
  function Model(storage){
    console.log('Model created!');
    this.storage = storage;
  }

  Model.prototype.create = function(data, callback){
    console.log('Model.create method execute!');
    callback = callback || function () {}; 

    this.storage.save(data, callback);
  };

  Model.prototype.read = function(callback){
    return this.storage.findAll(callback);
  };

  exports.app = exports.app || {};
  exports.app.Model = Model;
})(this);