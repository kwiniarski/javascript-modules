/* globals define */

define([
  'jquery',
  'js/lib/vehicle/factory/main',
  'js/lib/vehicle/build/aircraft',
  'js/lib/vehicle/purpose/passenger',
  'js/lib/vehicle/purpose/freight'
], function ($, vehicleFactory, aircraftMixin, passengerMixin, freightMixin) {

  var MAKER = 'Airbus';  
  
  /**
   * It will store total number of created models.
   * 
   * @private
   */
  var models = {};
  
  /**
   * List of common properties, each created object should have.
   * 
   * @private
   */
  var airbusCommonProperties = {
    captain: function(_name) {
      return this.attribute('captain', _name);
    }
  };
  
  /**
   * Method which will return prefabricated object of aircrat.
   * 
   * @private
   */
  var airbusAircraftFactory = function (_typeMixin) {
    return vehicleFactory(aircraftMixin(), _typeMixin(), airbusCommonProperties).maker(MAKER);
  };
  
  
  /**
   * Register model by adding it to the list of manufactured
   * models.
   * 
   * @private
   */
  var register = function (_aircraft) {
    var model = _aircraft.model();
    
    models[model] = models[model] || [];
    models[model].push(_aircraft);
    
    return _aircraft;
  };

  /**
   * Return factory function which will take as an argument
   * model number. Factory should implement needed strategy
   * to construct required model. Before leaving factory model
   * should be registred.
   * 
   * Factory function is mixed with set of static methods.
   * For now we have only total method which will return
   * number of created models.
   */
  return $.extend(function airbusFactory(_model) {
    
    var model = _model.toUpperCase();
    var aircraft = null;
    
    switch(model) {
    
        case 'A380-800':
        
          aircraft = airbusAircraftFactory(passengerMixin)
            .model(model)
            .absoluteCeiling(13.136)
            .serviceCeiling(13.136)
            .seats(526);
        
          break;
        
        case 'A380F':
        
          aircraft = airbusAircraftFactory(freightMixin)
            .model(model)
            .absoluteCeiling(13.136)
            .serviceCeiling(13.136)
            .carriage(12);          

          break;
        
        default:
          aircraft = airbusAircraftFactory()
            .model(model);
        
          break;
        
    }

    return register(aircraft);

  }, {
    total: function (_model) {
      return models[_model] ? models[_model].length : 0;
    }
  });

});