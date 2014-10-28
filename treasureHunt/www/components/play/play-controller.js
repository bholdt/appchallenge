app.controller('PlayController', function($scope, $timeout, $state, $ionicModal, treasureHuntContext, symbolService){

  var treasureHunt = treasureHuntContext.get();
  var clue = {};
  var currentClueIndex;

  function init(){
    currentClueIndex = 0;
    clue = treasureHunt.clues[currentClueIndex];
    $scope.clue = clue;
    $scope.symbols = symbolService.getAllSymbols();

    $ionicModal.fromTemplateUrl('help.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.helpModal = modal;
    });
  }

  $scope.chooseSymbol = function(symbol){
    if($scope.clue.symbol === symbol){
      if(currentClueIndex == treasureHunt.clues.length - 1){
        $scope.helpModal.hide();
        $state.go('finish');
      } else {
        alert('Well done you got it. Next one!');
        $scope.helpModal.hide();
        $scope.nextClue();
      }
    } else {
      alert('Sorry wrong choice!');
      $scope.helpModal.hide();
    }
  }

  $scope.abandon = function(){
    var answer = confirm('Are you sure you want to abandon this treasurehunt?');
    if(answer)
      $state.go('details');
  }

  $scope.showHelp = function() {
    var helps = {};
    $scope.helps = helps;
    $scope.isHelp = true;
    $scope.helpModal.show();
  };

  $scope.cancelHelp = function() {
    $scope.helpModal.hide();
  };

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
