app.controller('ClueController', function($scope, $state, $stateParams, $ionicLoading, treasureHuntRepository){
  var clue = {};

  var initialize = function(){
    $scope.locationText = 'Mark current location';

    if($stateParams.id){
      clue = treasureHuntRepository.getTreasureHunt().clues[$stateParams.id];
      $scope.clue = clue;
    }

    $scope.clue = clue;
  }

  var markCurrentLocation = function(){
    $scope.loading = $ionicLoading.show({
              content: 'Getting current location...',
              showBackdrop: false
          });
    navigator.geolocation.getCurrentPosition(function(pos) {
              $ionicLoading.hide();
              clue.position = pos.coords;
              console.log(clue);
              $scope.locationText = 'Delete current Location';
          }, function(error) {
              $ionicLoading.hide();
              console.log('Unable to get position: ' + error);
          });
  }

  var save = function(){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    if($stateParams.id){
      treasureHunt.clues[$stateParams.id] = clue;
    }
    else{
      treasureHunt.clues.push(clue);
    }
    treasureHuntRepository.saveTreasureHunt(treasureHunt);
    $state.go('edit');
  }

  $scope.markCurrentLocation = markCurrentLocation;
  $scope.save = save;
  initialize();
});
