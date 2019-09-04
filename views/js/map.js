let map;
(async function initMap() {
  const { latitude, longitude } = await getLocation();
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17
  });

  const pos = {
    lat: latitude,
    lng: longitude
  };
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: '현재 위치',
    draggable: true,
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<span>현재 위치</span>'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    console.log(marker.getPosition().lat())
    console.log(marker.getPosition().lng())
  });

  map.setCenter(pos);
  app.view.$createPinBtn.addEventListener('click', () => {
    const { lat, lng } = marker.getPosition();
    const position = {
      latitude: lat(),
      longitude: lng()
    };
    console.log(position);
  })
})();

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