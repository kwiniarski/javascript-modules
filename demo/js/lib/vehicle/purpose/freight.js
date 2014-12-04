/* globals define */

define(function () {

  return function freightMixin() {

    return {
      carriage: function(_carriage) {
        var carriages;

        if (_carriage) {
          carriages = this.attribute('carriages') || [];
          carriages.push(_carriage);
        }

        return this.attribute('carriages', carriages);
      }
    };
    
  };

});