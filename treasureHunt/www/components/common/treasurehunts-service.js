app.factory('treasureHuntRepository',function(){
    var treasureHunt = { title: 'wohoo' };
    treasureHunt.clues = [];
    treasureHunt.clues[0] = { title: 'clueasdfj', riddle:'sdfjaskl dfjaklsdj falksdjf alskdj fal;sd'};

    return {
      getTreasureHunt: function(){
        return treasureHunt;
      },
      saveTreasureHunt: function(treasure){
        treasureHunt = treasure;
      }
    }
});
