app.factory('treasureHuntRepository',function(){
    return {
      getTreasureHunt: function(){
        var treasurehunt = JSON.parse(localStorage['treasurehunt'] || '{}');
        if(!treasurehunt.clues)
          treasurehunt.clues = []
        return treasurehunt;
      },
      saveTreasureHunt: function(treasure){
        localStorage['treasurehunt'] = JSON.stringify(treasure);
      }
    }
});
