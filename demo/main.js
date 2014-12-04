/* globals require, QUnit */

require([
  'js/lib/vehicle/factory/main',
  'js/lib/vehicle/factory/airbus',
  
  'js/lib/airline/lufthansa/lh440',
  'js/lib/airline/lufthansa/lh462',
  
  'js/lib/vehicle/build/aircraft',
  'js/lib/vehicle/build/train',
  'js/lib/vehicle/purpose/freight',
  'js/lib/vehicle/purpose/passenger'
], function (vehicleFactory, airbusFactory, lh440, lh462, bAircraft, bTrain, pFreight, pPassenger) {

  QUnit.module('Vehicle', {
    setup: function () {
      this.aircraftOne = vehicleFactory(bAircraft(), pFreight());
      this.aircraftTwo = vehicleFactory(bAircraft(), pFreight());
      this.trainOne = vehicleFactory(bTrain(), pPassenger());
      this.trainTwo = vehicleFactory(bTrain(), pPassenger());
    }
  });
  
  QUnit.test('vehicleFactory can return number of created vehicles', function (assert) {
    assert.equal(vehicleFactory.total(), 6); // + 4 from setup plus already created lh440 and lh462
  });

  QUnit.test('vehicleFactory is polymorphic', function (assert) {
    assert.equal(lh440.routeNumber(), 'LH440');
    assert.equal(lh462.routeNumber(), 'LH462');
  });
  
  QUnit.module('Airbus', {
    setup: function () {

      lh440.captain('Mr. Klenz');
      
      this.lh440 = lh440;
      this.lh462 = lh462;
      
      this.a380_800 = airbusFactory('A380-800');
      this.a380f = airbusFactory('A380F');
    }
  });
  
  QUnit.test('airbusFactory can return number of created models', function (assert) {
    assert.equal(airbusFactory.total('A380-800'), 3);
    assert.equal(airbusFactory.total('A380F'), 1);
    assert.equal(airbusFactory.total('A300'), 0);
  });  
  
  QUnit.test('airbusFactory can make passenger or freight airplane', function (assert) {
    assert.ok(typeof this.a380_800.seats == 'function', 'A380-800 is passenger plane so it can have seats');
    assert.ok(typeof this.a380_800.carriage == 'undefined', 'A380-800 is not freight plane so it cannot have carriage');
    
    assert.ok(typeof this.a380f.seats == 'undefined', 'A380-800 is not passenger plane so it cannot have seats');
    assert.ok(typeof this.a380f.carriage == 'function', 'A380-800 is freight plane so it can have carriage');
  });
  
  QUnit.test('all plains from airbusFactory are Airbus make', function (assert) {
    assert.equal(this.lh440.maker(), 'Airbus', 'LH440 is makde by Airbus.');
    assert.equal(this.lh462.maker(), 'Airbus', 'LH462 is makde by Airbus.');
    assert.equal(this.a380f.maker(), 'Airbus', 'A380F is makde by Airbus.');
  });    
  
  QUnit.test('is captain in plane?', function (assert) {
    assert.equal(this.lh440.captain(), 'Mr. Klenz', 'LH440 has captain.');
    assert.equal(this.lh462.captain(), undefined, 'LH462 has not captain.');
    assert.equal(this.a380f.captain(), undefined, 'A380F has not captain.');
  });
  
  
  
});