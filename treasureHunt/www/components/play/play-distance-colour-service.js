app.factory('playDistanceColourService', function(){

  var getColour = function(distance){
    if(!distance){
      return 'no-distance';
    }
    if(distance < 5){
      return "xs-distance";
    }
    if(distance < 10){
      return "s-distance";
    }
    if(distance < 40){
      return "m-distance";
    }
    if(distance < 80){
      return "l-distance";
    }
    return "xl-distance";
  }

  return{ getColour: getColour };
});

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
