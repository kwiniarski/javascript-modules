/* globals define */

define(function () {
  
  return function aircraftMixin() {
    
    return {
      serviceCeiling: function (_ceiling) {
        return this.attribute('ceiling.service', _ceiling);
      },
      absoluteCeiling: function (_ceiling) {
        return this.attribute('ceiling.absolute', _ceiling);
      }
    };
    
  };

});