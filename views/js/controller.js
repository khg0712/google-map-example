(function(exports){
  'use strict';
  function Controller(model, view){
    console.log('controller created!');
    this.model = model;
    this.view = view;
    const self = this;
    this.markers = [];
    //bind를 통해 레코드 변경을 자동적으로 view에 반영한다.
    this.view.bind('create-item', function() {
      self.addItem({
        position: self.position,
        address: self.address
      });
    });
    this.createMap();
    this.showAll();//initializing!
    this.initMap();
  }

  Controller.prototype.createMap = function () {
    this.map = new google.maps.Map(this.view.$map, {
      zoom: 17
    });
  }
  
  Controller.prototype.initMap = async function () {
    console.log('map init');
    const self = this;
    const { latitude, longitude } = await exports.getLocation();
    this.geocoder = new google.maps.Geocoder;
    this.position = {
      latitude,
      longitude
    };
    this.address = await this.geocodeLocation(this.geocoder, this.position);
    const myLatlng = new google.maps.LatLng(latitude, longitude);
    
    this.map.setCenter({
      lat: latitude,
      lng: longitude
    });

    this.currentLocationMarker = new google.maps.Marker({
      position: myLatlng,
      map: self.map,
      title: '현재 위치',
      draggable: true,
      zIndex: google.maps.Marker.MAX_ZINDEX
    });

    const infowindow = new google.maps.InfoWindow;
    infowindow.setContent(this.address);
    infowindow.open(self.map, this.currentLocationMarker);

    google.maps.event.addListener(this.currentLocationMarker, 'dragend', async function() {
      const { lat, lng } = self.currentLocationMarker.getPosition();
      const position = {
        latitude: lat(),
        longitude: lng()
      };
      self.position = position;
      
      const address = await self.geocodeLocation(self.geocoder, position);
      self.address = address;
      infowindow.setContent(address);
      infowindow.open(self.map, self.currentLocationMarker);
    });
  }

  Controller.prototype.geocodeLocation = function (geocoder, position) {
    const formattedPosition = {
      lat: position.latitude,
      lng: position.longitude
    };
    return new Promise((resolve, reject) => {
      geocoder.geocode({location: formattedPosition}, (results, status) => {
        if(status === 'OK') {
          if(results[0]) {
            resolve(results[0].formatted_address);
          }
        }
        reject('주소가 없습니다.');
      });
    });
  }

  Controller.prototype.showAll = async function(){
    console.log('Controller.showAll method execute!');
    const self = this;
    const res = await this.model.fetch();
    const data = await res.json();
    for (let i=0; i<data.length; i++) {
      const { latitude, longitude } = data[i].position;
      self.markers.push(new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude
        },
        map: self.map,
        label: (i+1).toString(),
      }));
    }

    this.view.render('showEntries', data);
    this.view.bind(
      'delete-item',
      () => data.map(info => () => {
        this.markers.forEach(marker => {
          marker.setMap(null)
        });
        self.deleteItem(info.id);
        this.markers=[];
      })
    );
    this.view.bind(
      'get-position',
      () => data.map(info => () => {
        const {latitude, longitude} = info.position;
        self.map.setCenter({
          lat: latitude,
          lng: longitude
        });
      })
    )
  };

  Controller.prototype.deleteItem = async function(id) {
    console.log('controller delete item');
    await this.model.delete({id});
    this.showAll();
  }

  Controller.prototype.addItem = async function(data){
    console.log('Controller.addItem method execute!');
    await this.model.create(data);
    this.showAll();
  };

  exports.app = exports.app || {};
  exports.app.Controller = Controller;
})(this);