app.controller('EditController', function($scope, $state, treasureHuntRepository){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    $scope.treasureHunt = treasureHunt;

    $scope.deleteClue = function(index){
      treasureHunt.clues.splice(index, 1);
    }

    $scope.save = function(){
      treasureHuntRepository.saveTreasureHunt(treasureHunt);
      $state.go('#/details');
    }
});
