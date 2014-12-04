/* globals define */

define([
  'js/lib/vehicle/factory/airbus',
], function (airbusFactory) {

  return airbusFactory('A380-800')
  
    .routeNumber('LH462')
    .routeFrom('FRA', 'Frankfurt', '10:20')
    .routeTo('MIA', 'Miami', '15:50');

});