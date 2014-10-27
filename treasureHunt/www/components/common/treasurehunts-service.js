app.factory('treasureHuntRepository',function(guidGenerator){
    var treasurehunts = JSON.parse(localStorage['treasurehunts'] || '{}');

    function save(){
        localStorage['treasurehunts'] = JSON.stringify(treasurehunts);
      }

    return {
      getTreasureHunts: function(){
        return treasurehunts;
      },
      getTreasureHunt: function(id){
        return treasurehunts[id];
      },
      deleteTreasureHunt: function(id){
        delete treasurehunts[id];
        save();
      },
      saveTreasureHunt: function(treasure){
        if(!treasurehunts[treasure.id])
          treasurehunts[treasure.id] = treasure;
        save();
      },
      createTreasureHunt: function(){
        var treasurehunt = {};
        treasurehunt.clues = [];
        treasurehunt.id = guidGenerator.create();
        return treasurehunt;
      }
    }
});
