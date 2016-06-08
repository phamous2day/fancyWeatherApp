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
  4990729,
  5856195
];
//
// var newArray = cityIds.map(function (element){
//   return element;
// });
//
// var cityArray = newArray.join("\n");
// console.log(cityArray);

var API_KEY = 'eac2948bfca65b78a8c5564ecf91d00e';
var myApp = angular.module("myModule", []);

myApp.controller('myController', function($scope, $http){
  var mapDiv= document.getElementById("map");
  var map= new google.maps.Map(mapDiv, {
    center: {
      lat: 33.748995, lng: -84.387982},
      zoom: 5
    });
  $http({
    url: 'http://api.openweathermap.org/data/2.5/group',
    params: {
      units:"imperial",
      id: cityIds.join(","),
      APPID: API_KEY
    }
  })
  .success(function(data) {
    console.log(data);
    var results = data.list;
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var position = {
        lat: result.coord.lat,
        lng: result.coord.lon
      };
      var image = "http://openweathermap.org/img/w/" + result.weather[0].icon+ ".png";
      var marker = new google.maps.Marker({
        position: position,
        title: result.name,
        map: map,
        icon: {
          url: image,
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 25)
        }
      });
      marker.append(url);
    }
  });
// myApp.controller('sidebarController', function($scope, $http) {
//
// });
