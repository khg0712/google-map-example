(function(exports){
  'use strict';
  function Template(){
    this.defaultTemplate = `
      <li class="parking-record">
        <p class="index">
          {{index}}
        </p>
        <div class="info">
          <p class="address">{{address}}</p>
          <p class="date">{{date}}</p>
        </div>
        <button class="delete-btn">
          <i class="material-icons">
            close
          </i>
        </button>
      </li>
    `;
    this.insert = function (data) {
      console.log('template insert');
      let view = '';
      for(var i=data.length-1; i>=0; i--){
        let template = this.defaultTemplate;
        template = template.replace('{{index}}', i+1);
        template = template.replace('{{address}}', data[i].address);
        template = template.replace('{{date}}', data[i].date);
        view += template;
      }
      return view;
    }
  }
  exports.app = exports.app || {};
  exports.app.Template = Template;
})(this);