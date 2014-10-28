app.factory('symbolService', function(){
  var symbols = ['heart','star','cloud','pizza','happy','jet','record','play'];
  return {
    getAllSymbols: function() {return symbols;}
  };
});
