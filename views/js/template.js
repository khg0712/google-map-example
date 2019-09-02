(function(exports){
  'use strict';
  function Template(){
    console.log('template created')
    this.defaultTemplate = `
      <li class="parking-record">
        <p class="place">{{place}}</p>
        <p class="address">{{address}}</p>
        <p class="date">{{date}}</p>
      </li>
    `;
    this.insert = function (data) {
      console.log('template insert');
      let view = '';
      for(var i = 0; i < data.length; i++){
        let template = this.defaultTemplate;
        template = template.replace('{{place}}', data[i].place);
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