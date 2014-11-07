app.controller('PlayController', function($scope, $timeout, $state, $ionicModal, treasureHuntContext, symbolService){

  var treasureHunt = treasureHuntContext.get();
  var clue = {};
  var state = {};
  state.clueIndex = 0;
  state.clueCount = 0;
  var music;
  var media;

  var playRiddle = function(){
     if(typeof Media != "undefined" && clue.riddleSound){
        media = new Media(clue.riddleSound, function(){
           media.release();
           $scope.riddleSoundState = 'play';
           $scope.$apply();
           music.setVolume(1);
           music.play({numberOfLoops: 10});
        },
        function(message) {
        });
        $scope.riddleSoundState = 'pause';
        music.pause();
        media.play();
     }

  }

  function init(){
    clue = treasureHunt.clues[0];
    $scope.clue = clue;
    $scope.symbols = symbolService.getAllSymbols();
    state.clueIndex = 0;
    state.clueCount = treasureHunt.clues.length;
    $scope.state = state;
    if(typeof Media != 'undefined') {
      music = new Media('protected/preview.mp3');
      music.play({numberOfLoops: 10});
    }

    $ionicModal.fromTemplateUrl('help.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.helpModal = modal;
    });

    $ionicModal.fromTemplateUrl('foundClue.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal){
      $scope.foundClue = modal;
   });
  }

  $scope.chooseSymbol = function(symbol){
    if($scope.clue.symbol === symbol){
      if(state.clueIndex == treasureHunt.clues.length - 1){
        $scope.helpModal.hide();
        stopMusic();
        $state.go('finish');
      } else {
        $scope.helpModal.hide();
        $scope.foundClue.show();
        $scope.nextClue();
      }
    } else {
      alert('Sorry wrong choice!');
      $scope.helpModal.hide();
    }
  }

  $scope.abandon = function(){
    var answer = confirm('Are you sure you want to abandon this treasurehunt?');
    if(answer){
      $state.go('details');
      stopMusic();
    }
  }

  $scope.continue = function(){
     $scope.foundClue.hide();
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
    clue = treasureHunt.clues[state.clueIndex];
    $scope.clue = clue;
  }

  $scope.nextClue = function(){
    if(state.clueIndex < treasureHunt.clues.length - 1){
      state.clueIndex++;
    }
    updateClue();
  }

  function stopMusic(){
    if(music){
      music.stop();
      music.release();
   }
  }

  $scope.playRiddle = playRiddle;
  $scope.riddleSoundState = 'play';

  init();

});
