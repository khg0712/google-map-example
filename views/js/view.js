(function(exports){
  'use strict';
  function View(template){
    console.log('view created!');
    this.template = template;

    this.$parkingListWrapper = document.getElementsByClassName('parking-list-wrapper')[0];
    this.$parkingList = document.getElementById('parking-list');
    this.$actionBtn = document.getElementsByClassName('action-button')[0];
    this.$createPinBtn = document.getElementById('create-pin-btn');
    this.$openMenuBtn = document.getElementsByClassName('menu-btn')[0];
    this.$drawerWrapper = document.getElementById('drawer-wrapper');
    this.$drawer = document.getElementsByClassName('drawer')[0];
    this.$parkingRecords = document.querySelectorAll('.parking-record');

    this.init();
  }

  View.prototype.init = function() {
    console.log('initialize')
    this.$openMenuBtn.addEventListener('click', () => {
      this.$drawerWrapper.className = ''
    });
    this.$drawerWrapper.addEventListener('click', () => {
      this.$drawerWrapper.className = 'hidden';
    });
    this.$drawer.addEventListener('click', event => {
      event.stopPropagation();
    });
    this.$actionBtn.addEventListener('click', () => {
      this.$parkingListWrapper.classList.toggle('visible');
    })
  }

  View.prototype.bind = function(event, handler) {
    const self = this;
    switch(event) {
      case 'create-item':
        console.log('view bind new parking item');
        self.$createPinBtn.addEventListener('click', () => {
          console.log('create-btn-clicked');
          handler({
            place: '장소',
            address: '주소',
            date: '날짜',
            position: {
              lat: '',
              lang: ''
            }
          });
        });
        break;
      default:
    }
  }

  View.prototype.render = function(viewCmd, data) {
    const self = this;
    const  viewCommands = {
      showEntries : function(){
        console.log('View.render.showEntries execute!');
        self.refreshItems(data);
      },
    };
    viewCommands[viewCmd]();
  }

  View.prototype.refreshItems = function(data){
    this.$parkingList.innerHTML = this.template.insert(data);
    this.$parkingRecords.forEach(parkingRecord => {
      console.log(1)
      parkingRecord.addEventListener('click', () => {
        console.log('item clicked');
      })
    });
  };

  exports.app = exports.app || {};
  exports.app.View = View;
})(this);