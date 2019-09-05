(function(exports){
  'use strict';
  function Model(storage){
    this.storage = storage;
  }

  Model.prototype.create = function(data){
    console.log('Model.create method execute!');
    return fetch('http://127.0.0.1:3000/park', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  };

  Model.prototype.read = function(callback){
    return this.storage.findAll(callback);
  };

  Model.prototype.fetch = function() {
    return fetch('http://127.0.0.1:3000/park')
  }

  Model.prototype.delete = function(data) {
    return fetch('http://127.0.0.1:3000/park', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }

  exports.app = exports.app || {};
  exports.app.Model = Model;
})(this);