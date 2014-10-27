app.factory('treasureHuntContext', function(){
  var treasurehunt = {};
  return {
    get:function(){
      return treasurehunt;
    },
    set: function(val){
      treasurehunt = val;
    }
  }
});
