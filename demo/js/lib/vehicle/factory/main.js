/* globals define */

define(['jquery'], function ($) {

  var COMMON_ATTRIBUTES = ['maker', 'model', 'constructionYear'];
  
  /**
   * Store number of created vehicles.
   * 
   * @private
   * @scope module
   */
  var vehicles = 0;

  /**
   * Simple function to mix to object.
   *
   * @private
   * @param _base Reference to the base object
   * @param _mixin Mixin Object
   */
  var mix = function (_base, _mixin) {
    for (var i in _mixin) {
      if (_mixin.hasOwnProperty(i)) {
        _base[i] = _mixin[i];
      }
    }
  };
  
  /**
   * Module returns factory function mixed with set
   * of static methods. Factory can accept any number of arguments.
   * Each argument should be an object containing set of methods which
   * will be mixed into new vehicle instance.
   * 
   * @param {Object} [constructor] Constructor object
   */
  return $.extend(function() {

    // Increase number of created vehicles.
    vehicles++;
    
    /**
     * Store instance attributes.
     * 
     * @privete
     * @scope factory
     */
    var attributes = {};

    /**
     * Factory prototype declaration. This methods will
     * exist in each instance of vehicle.
     * 
     * @private
     * @scope factory
     */
    var prototype = {
      
      /**
       * Set/Get an attribute of vehicle instance.
       * 
       * @public
       * @scope instance
       */
      attribute: function (_key, _value) {
        if (typeof _value != 'undefined') {
          attributes[_key] = _value;
          return this;
        } else {
          return attributes[_key];
        }    
      },
      
      /**
       * Shorthand method for setting/getting vehicle's VIN number.
       * Just for example, we could move it to the COMMON_ATTRIBUTES.
       * 
       * @public
       * @scope instance
       */
      vin: function (_vin) {
        return this.attribute('vin', _vin);
      }
      
    
    };
    
    // Dynamically extend prototype with common attributes.
    COMMON_ATTRIBUTES.forEach(function (_method) {
      prototype[_method] = function (_value) {
        return this.attribute(_method, _value);
      };      
    });
    
    /**
     * Vehicle is an array of objects which will be mixed into one.
     * 
     * @private
     * @scope factory
     */    
    var vehicle = Object.create(prototype);
    
    // Add arguments (mixtures) to the vehicle prototype
    // to create new type of vehicle.
    if (arguments.length) {
      for (var i = 0, j = arguments.length; i < j; i++) {
        mix(vehicle, arguments[i]);
      }
    }
    
    // Return mixed vehicle object.
    return vehicle;
    
  }, {
    
    /**
     * Static method which will return how many times
     * vehicle factory has been used.
     * 
     * @public
     * @static
     */
    total: function () {
      return vehicles;
    }    
    
  });
  
});