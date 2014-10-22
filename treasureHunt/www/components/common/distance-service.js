app.factory('distanceService', function(){
  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var getDistance = function(p1, p2) {
    console.log(p1);
    console.log(p2);
    var radiusInMetres = 6378137;
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = radiusInMetres * c;
    return d;
  };

  return{ calculateDistance: getDistance };
});
