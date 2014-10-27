app.controller('ListController', function($scope, $state, treasureHuntRepository){
    var treasureHunts = treasureHuntRepository.getTreasureHunts();
    $scope.treasureHunts = treasureHunts;
    $scope.isEditable = false;

    $scope.edit = function(id){
      var treasureHunt = treasureHuntRepository.getTreasureHunt(id);
      $state.go('details');
    }

    $scope.delete = function(id){
      treasureHuntRepository.delete(id);
    }

});
