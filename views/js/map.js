let map, infoWindow;
async function initMap() {
  infoWindow = new google.maps.InfoWindow();
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
    title: '현재 위치'
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<span>any html goes here</span>'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  map.setCenter(pos);
  btn.addEventListener('click', () => {
    var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: true,
      title: 'Drag me!'
    });
  });
}

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