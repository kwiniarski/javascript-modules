/* globals define */

define(function () {
  
  function destination(_cityCode, _cityName, _time) {
    return {
      code: _cityCode,
      name: _cityName,
      time: _time
    };   
  }

  return function passangerMixin() {
    
    return {
      seats: function (_seats) {
        return this.attribute('seats', _seats);
      },
      routeNumber: function (_number) {
        return this.attribute('route.number', _number);
      },
      routeFrom: function () {
        return this.attribute('route.from', destination.apply({}, arguments));
      },
      routeTo: function () {
        return this.attribute('route.to', destination.apply({}, arguments));
      }
    };
    
  };

});