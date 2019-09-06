(function(exports){
  'use strict';
  function App(){
    this.model = new app.Model();
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.controller = new app.Controller(this.model, this.view);
  }
  exports.app = new App();
})(this);