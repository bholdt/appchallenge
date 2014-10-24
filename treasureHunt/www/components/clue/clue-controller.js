app.controller('ClueController', function($scope, $state, $stateParams, $cordovaCamera, $ionicLoading, treasureHuntRepository){
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

  var takePicture = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        clue.image = imageData;
    }, function(err) {
        alert('Something went wrong: ' + err.message);
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
