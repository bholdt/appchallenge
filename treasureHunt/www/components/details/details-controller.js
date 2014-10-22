app.controller('DetailsController', function($scope, treasureHuntRepository){
    var treasureHunt = treasureHuntRepository.getTreasureHunt();
    $scope.treasureHunt = treasureHunt;
});
