function initMap() {
  var myLatLng = {lat: 44.8, lng: -93.25};
// = new google.maps.LatLng(39.305, -76.617);
// =

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    draggable: true,
    title: 'Hello World!'
  });
}

// function initMap() {
//   var myLatLng = {lat: 44.8, lng: -93.25};
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: myLatLng
//   });
//
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     draggable: true,
//     title: 'Hello World!'
//   });
// }
