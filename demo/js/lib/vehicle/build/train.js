/* globals define */
define(function () {

  var TRACKS = {
    NORMAL: 1,
    SLIM: 2
  };
  
  return function trainMixin() {
  
    return {
      tracks: function(_tracks) {
        var tracksType = TRACKS[_tracks.toUpperCase()];
        
        if (_tracks && !tracksType) {
          throw Error('Invalid track type');
        }
        
        return this.attribute('tracks', tracksType);
      }
    };
  };

});