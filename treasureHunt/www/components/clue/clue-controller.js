app.controller('ClueController', function($scope, $state, $stateParams, symbolService, $cordovaCamera, $ionicLoading, $ionicModal, treasureHuntRepository, treasureHuntContext){
  var clue = {};

  var init = function(){

    if($stateParams.id){
      clue = treasureHuntContext.get().clues[$stateParams.id];
    }

    $scope.clue = clue;
    $scope.symbols = symbolService.getAllSymbols();
    $scope.riddle = {};
    $scope.riddle.text = clue.riddle;
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
    if(!clue.symbol){
      alert('In order to save this clue, you need to set a symbol.');
      return;
    }
    var treasureHunt = treasureHuntContext.get();
    if($stateParams.id){
      treasureHunt.clues[$stateParams.id] = clue;
    }
    else{
      if(!treasureHunt.clues)
        treasureHunt.clues = [];
      treasureHunt.clues.push(clue);
    }
    treasureHuntRepository.saveTreasureHunt(treasureHunt);
    $state.go('edit');
  }

  $scope.showModal = function(modal){
    $ionicModal.fromTemplateUrl(modal + '.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.currentModal = modal;
      $scope.currentModal.show();
    });
  }

  $scope.cancelModal = function(){
    $scope.currentModal.hide();
    $scope.currentModal.remove();
  }

  $scope.cancel = function(){
    $state.go('edit');
  }

  $scope.saveRiddle = function(){
    clue.riddle = $scope.riddle.text;
    $scope.currentModal.hide();
    $scope.currentModal.remove();
  }

  $scope.chooseSymbol = function(symbol){
    clue.symbol = symbol;
    $scope.currentModal.hide();
    $scope.currentModal.remove();
    alert('Write this symbol on a piece of paper, so that the treasure hunters can identify it when they find this clue');
  }

  $scope.save = save;
  $scope.takePicture = takePicture;
  init();
});
