app.controller('PlayController', function($scope, treasureHuntRepository, $cordovaDeviceOrientation, distanceService, playDistanceColourService){
  var treasureHunt = treasureHuntRepository.getTreasureHunt();
  var currentClueIndex = 0;
  var clue = {}
  clue.current = treasureHunt.clues[currentClueIndex];
  var currentPosition = {};
  var intervalId;

  function onNewPosition(position) {
    if(position.coords && $scope.clue.current.position){
      currentPosition = position;
      updateClue();
    }
    $scope.$apply();
  }

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    clearInterval(intervalId);
  });

  $scope.nextClue = function(){
    if(currentClueIndex < treasureHunt.clues.length - 1){
      currentClueIndex++;
    }
    updateClue();
  }

  $scope.previousClue = function(){
    if(currentClueIndex > 0){
      currentClueIndex--;
    }
    updateClue();
  }

  function updateClue(){
    $scope.clue.current = treasureHunt.clues[currentClueIndex];
    $scope.clue.current.distanceTo = 0;
    //$scope.clue.current.direction = ($scope.clue.current.direction || 0) - 40;
    if(currentPosition.coords){
      $scope.clue.current.distanceTo = distanceService.calculateDistance(currentPosition.coords,$scope.clue.current.position);
    }
    $scope.distanceClass = playDistanceColourService.getColour($scope.clue.current.distanceTo);
  }

  var getCurrentPosition = function(){
    var options = { timeout: 1000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onNewPosition, function(){}, options);
  }

  var init = function(){
    intervalId = setInterval(getCurrentPosition, 2000);

    $scope.treasureHunt = treasureHunt;
    $scope.clue = clue;
    $scope.distanceClass = 's-distance';
    try {
    var options = { frequency: 1000 }; // Update every 1 second

   var watch = $cordovaDeviceOrientation.watchHeading(options);

   watch.promise.then(function(result) { /* unused */ },
     function(err) {
       // An error occurred
       alert(err);
     }, function(position) {
       if($scope.clue.current) {
         if(currentPosition && currentPosition.coords && $scope.clue.current.position){
         var current = new LatLon(currentPosition.coords.latitude, currentPosition.coords.longitude);
         $scope.currentPosition = currentPosition.coords;
         var cluePosition = $scope.clue.current.position;
         $scope.destinationPosition = $scope.clue.current.position;
         var clue = new LatLon(cluePosition.latitude, cluePosition.longitude);
         var bearing = Math.round(current.bearingTo(clue));
         $scope.bearing = bearing;
         var diff = bearing - Math.round(position.magneticHeading);
         $scope.distance = $scope.clue.current.distanceTo.toFixed(2);
         $scope.finalBearing= diff;
         $scope.clue.current.direction = diff;
         $scope.$apply();
       }
       }
     });
   }
   catch(e) { }

  }

  init();

});
