/*
Return a new array that transforms the element's average altitude into their
orbital periods.

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on wikipedia.

The values should be rounded to the nearest whole number. The body being
orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth
is 398600.4418 km3s-2
*/

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;

  return arr.reduce(function(acc, obj) {
    var orbPeriod = Math.round(2*Math.PI*Math.sqrt(Math.pow(earthRadius + obj.avgAlt,3)/GM));
    acc.push({name: obj.name, orbitalPeriod: orbPeriod});
    return acc;
  }, []);
}
