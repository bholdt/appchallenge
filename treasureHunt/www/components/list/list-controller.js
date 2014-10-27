app.controller('ListController', function($scope, $state, treasureHuntRepository, treasureHuntContext){
    var treasureHunts = treasureHuntRepository.getTreasureHunts();
    $scope.treasureHunts = treasureHunts;
    $scope.isEditable = false;

    $scope.edit = function(id){
      var treasureHunt = treasureHuntRepository.getTreasureHunt(id);
      treasureHuntContext.set(treasureHunt);
      $state.go('details');
    }

    $scope.cancelEdit = function(){
      $scope.isEditable = false;
    }

    $scope.editList = function() {
      $scope.isEditable = true;
    }

    $scope.delete = function(id){
      treasureHuntRepository.deleteTreasureHunt(id);
    }

    $scope.create = function(){
      var treasureHunt = treasureHuntRepository.createTreasureHunt();
      treasureHuntContext.set(treasureHunt);
      $state.go('edit');
    }

});
