app.controller('EditController', function($scope, treasureHuntRepository){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    $scope.treasureHunt = treasureHunt;
});
