/* globals define */

define([
  'js/lib/vehicle/factory/airbus',
], function (airbusFactory) {
  
  return airbusFactory('A380-800')
  
    .routeNumber('LH440')
    .routeFrom('FRA', 'Frankfurt', '9:50')
    .routeTo('IAH', 'Houston', '14:00');
  
});
