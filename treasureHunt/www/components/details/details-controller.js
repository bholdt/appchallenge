app.controller('DetailsController', function($scope, $state, $ionicModal, treasureHuntRepository, treasureHuntContext){
    var treasureHunt;

    function init(){
        treasureHunt = treasureHuntContext.get();
        $scope.treasureHunt = treasureHunt;
        $scope.isEditable = ($state.current.name === 'edit');
    }

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

    $scope.showModal = function(modal){
      $ionicModal.fromTemplateUrl(modal + '.html', {
        scope: $scope,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.currentModal = modal;
        $scope.currentModal.show();
      });
    }

    $scope.back = function(){
      if(!treasureHunt.name){
          $scope.showModal('treasureTitle');
      } else{
        $state.go('list');
      }
    }

    $scope.saveTitle = function(){
      if(treasureHunt.name){
        $scope.currentModal.hide();
        $scope.currentModal.remove();
        treasureHuntRepository.saveTreasureHunt(treasureHunt);

        $state.go('list');
      } else{
        alert('Please enter a title');
      }
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

    $scope.show

    init();
});
