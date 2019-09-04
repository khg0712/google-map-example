(function(exports) {
  'use strict';
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject('geolocation is unusable');
      function success(position) {
        const { latitude, longitude } = position.coords;
        resolve({
          latitude,
          longitude
        });
      }
      function error(err) {
        reject(err);
      }
      navigator.geolocation.getCurrentPosition(success, error);
    });
  }
  exports.getLocation = exports.getLocation || getLocation;
})(this)