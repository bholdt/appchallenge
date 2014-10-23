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
              $scope.locationText = 'Delete current Location';
          }, function(error) {
              $ionicLoading.hide();
          }, { enableHighAccuracy: true } );
  }

  var takePicture = function(){
    navigator.camera.getPicture( function(data){
      clue.image = data;
    }, function(){
    }, { quality: 50, destinationType: Camera.DestinationType.DATA_URL
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
  $scope.takePicture = takePicture;
  initialize();
});
