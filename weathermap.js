var cityIds = [
  4180439,
  5128638,
  4560349,
  4726206,
  4671654,
  5809844,
  5368361,
  5391811,
  5308655,
  4684888,
  4887398,
  5391959,
  5392171,
  4164138,
  4273837,
  5746545,
  4699066,
  5419384,
  4990729
];

var myApp = angular.module('myModule', []);
var markerDictionary = {};
myApp.controller('myController', function($scope, $http) {
  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, {
    center: { lat: 39.099727, lng: -94.578567 },
    zoom: 3
  });
  var infoWindow = new google.maps.InfoWindow();


  $scope.openInfoWindow = function(result) {
    var html = '<h3>' + result.name + '</h3>' +
    '<p>' +
      'Weather: ' + result.weather[0].description + '<br>' +
      'Temperature: ' + result.main.temp + '°' +
    '</p>';
    infoWindow.setContent(html);
    var marker = markerDictionary[result.id];
    infoWindow.open(map, marker);
  };

  $http({
    url: 'http://api.openweathermap.org/data/2.5/group',
    params: {
      id: cityIds.join(','),
      units: 'imperial',
      APPID: 'eac2948bfca65b78a8c5564ecf91d00e'
    }
  }).success(function(data) {
    var results = data.list;
    $scope.results = results;
    var markers = results.map(function(result) {
      var position = {
        lat: result.coord.lat,
        lng: result.coord.lon
      };
      var icon = {
        url: 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
      };
      var marker = new google.maps.Marker({
        anchorPoint: new google.maps.Point(0, -8),
        position: position,
        title: result.name,
        map: map,
        icon: icon
      });
      markerDictionary[result.id] = marker;
      marker.addListener('click', function() {
        $scope.openInfoWindow(result);
      });
      return marker;
    });
  });
});
