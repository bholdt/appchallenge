app.controller('PlayController', function($scope, treasureHuntRepository, distanceService){
  var treasureHunt = treasureHuntRepository.getTreasureHunt();
  $scope.treasureHunt = treasureHunt;
  var currentClueIndex = 0;
  var clue = {}
  $scope.clue = clue;
  clue.current = treasureHunt.clues[currentClueIndex];
  var currentPosition = {};

  function onSuccess(position) {
    currentPosition = position;
    $scope.clue.current.distanceTo = distanceService.calculateDistance(currentPosition.coords,$scope.clue.current.position);
  }

  function onError(error) {
    $scope.message = 'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n';
  }

  var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 1000 });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    navigator.geolocation.clearWatch(watchID);
  });

  $scope.nextClue = function(){
    if(currentClueIndex < treasureHunt.clues.length - 1){
      currentClueIndex++;
    }
    $scope.clue.current = treasureHunt.clues[currentClueIndex];
    $scope.clue.current.distanceTo = distanceService.calculateDistance(currentPosition.coords,$scope.clue.current.position);
  }

  $scope.previousClue = function(){
    if(currentClueIndex > 0){
      currentClueIndex--;
    }
    $scope.clue.current = treasureHunt.clues[currentClueIndex];
    $scope.clue.current.distanceTo = distanceService.calculateDistance(currentPosition,$scope.clue.current.position);
  }


});
