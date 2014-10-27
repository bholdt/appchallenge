app.controller('PlayController', function($scope, $timeout, $ionicModal, treasureHuntContext){

  var treasureHunt = treasureHuntContext.get();
  var clue = {};
  var currentClueIndex;

  function init(){
    currentClueIndex = 0;
    clue = treasureHunt.clues[currentClueIndex];
    $scope.clue = clue;

    $ionicModal.fromTemplateUrl('help.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.helpModal = modal;
    });
  }

  $scope.showHelp = function() {
    var helps = {};
    $scope.helps = helps;
    $scope.isHelp = true;
    $scope.helps.distanceTo = 300;
    $scope.helps.bearingTo = 20;
    $scope.helpModal.show();
  };

  $scope.cancelHelp = function() {
    $scope.helpModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  function updateClue(){
    clue = treasureHunt.clues[currentClueIndex];
    $scope.clue = clue;
  }

  var getCurrentPosition = function(){
    var options = { timeout: 4000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onNewPosition, function(error){ alert('Something went wrong: ' + error.message); }, options);
  }

  function onNewPosition(position){
    console.log(position);
  }

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

  init();

});
