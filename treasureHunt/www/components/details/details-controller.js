app.controller('DetailsController', function($scope, $state, treasureHuntRepository){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    $scope.treasureHunt = treasureHunt;
    $scope.isEditable = false;

    $scope.deleteClue = function(index){
      treasureHunt.clues.splice(index, 1);
    }

    $scope.addClue = function(){
      $state.go('create-clue');
    }

    $scope.save = function(){
      treasureHuntRepository.saveTreasureHunt(treasureHunt);
      $scope.isEditable = false;
    }

    $scope.edit = function(){
      $scope.isEditable = true;
    }

    $scope.editClue = function(index){
      $state.go('edit-clue', {id:index});
    }

    $scope.cancel = function(){
      $scope.isEditable = false;
    }

    $scope.play = function() {
      $state.go('play');
    }
});
