app.controller('PlayController', function($scope, $timeout, $state, $ionicModal, treasureHuntContext){

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

  $scope.abandon = function(){
    var answer = confirm('Are you sure you want to abandon this treasurehunt?');
    console.log(answer);
    $state.go('details');
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
