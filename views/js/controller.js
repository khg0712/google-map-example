(function(exports){
  'use strict';
  function Controller(model, view){
    console.log('controller created!');
    this.model = model;
    this.view = view;
    const self = this;
    //bind를 통해 레코드 변경을 자동적으로 view에 반영한다.
    this.view.bind('create-item', function(data){
      self.addItem(data);
    });
    this.showAll();//initializing!
  }

  Controller.prototype.showAll = function(){
    console.log('Controller.showAll method execute!');
    var self = this;
    this.model.read(function(data){
      self.view.render('showEntries', data);
    });
  };

  Controller.prototype.addItem = function(data){
    console.log('Controller.addItem method execute!');
    const self = this;
    self.model.create(data);
    this.showAll();
  };

  exports.app = exports.app || {};
  exports.app.Controller = Controller;
})(this);