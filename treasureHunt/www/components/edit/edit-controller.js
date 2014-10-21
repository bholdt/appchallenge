app.controller('EditController', function($scope, treasureHuntRepository){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    console.log(treasureHunt);
    $scope.treasureHunt = treasureHunt;
});
