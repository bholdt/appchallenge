app.controller('ClueController', function($scope, $state, treasureHuntRepository){
  var treasureHunt = treasureHuntRepository.getTreasureHunt();
  $scope.clue = {};
  $scope.save = function(){
    var clue = { riddle: $scope.clue.riddle, image:'something.png', location: { long: 23, latitude: 23} };
    treasureHunt.clues.push(clue);
    treasureHuntRepository.saveTreasureHunt(treasureHunt);
    $state.go('edit');
  }
});
