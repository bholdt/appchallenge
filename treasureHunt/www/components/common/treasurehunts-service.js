app.factory('treasureHuntRepository',function(){
    var treasurehunts = JSON.parse(localStorage['treasurehunts'] || '[]');
    var currentTreasureHunt = {};
    currentTreasureHunt.clues = [];

    return {
      getTreasureHunts: function(){
        return treasurehunts;
      },
      getTreasureHunt: function(id){
        if(treasurehunts[id])
          currentTreasureHunt = treasurehunts[id];
        return treasurehunts[id];
      },
      getCurrentTreasureHunt: function(){
        console.log('accessing current treasure');
        console.log(currentTreasureHunt);
        return currentTreasureHunt;
      },
      saveTreasureHunt: function(treasure){
        console.log('save');
        if(!treasure.id){
          treasure.id = treasurehunts.length;
          treasurehunts.push(treasure);
          console.log(treasure);
        }
        console.log(treasurehunts);
        localStorage['treasurehunts'] = JSON.stringify(treasurehunts);
      },
      createTreasurehunt: function(){
        var treasurehunt = {};
        treasurehunt.clues = [];
        currentTreasureHunt = treasurehunt;
        currentTreasureHunt.clues = [];
        return treasurehunt;
      }
    }
});
