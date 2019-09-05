(function(exports) {
  function Storage(name, callback) {
    console.log('store created!');
  }

  Storage.prototype.findAll = function(callback) {

  };

  Storage.prototype.save = function(updateData, callback, id) {
  
  };
  exports.app = exports.app || {};
  exports.app.Storage = Storage;
})(this);
