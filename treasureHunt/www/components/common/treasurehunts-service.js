app.factory('treasureHuntRepository',function(){
    var treasureHunt = { };
    treasureHunt.clues = [];

    return {
      getTreasureHunt: function(){
        return treasureHunt;
      },
      saveTreasureHunt: function(treasure){
        treasureHunt = treasure;
      }
    }
});
