var svm = require("node-svm");
var _ = require("lodash");
var readline = require("readline");
var scanNetworks = require("./common").scanNetworks;

var MIN_STR = -90;
var MAX_STR = -30;

/* transform {room: <name>, networks: {<mac>: <rssi>, ...}}
 * to [[0, 0, 0.9, 0.5, 0, ...], <name>]
 */
function normalizeExample(example, dimensions, roomNames) {
  var point = normalizeNetworksToPoint(example.networks, dimensions);
  return [point, roomNames.indexOf(example.room)];
}

function normalizeNetworksToPoint(networks, dimensions) {
  return _.map(dimensions, (mac) => {
    var rssi = networks[mac];
    return rssi ? normalizeRssi(rssi) : 0;
  });
}

function normalizeRssi(rssi) {
  return (clamp(rssi, MIN_STR, MAX_STR) - MIN_STR) / (MAX_STR - MIN_STR);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

var rl = readline.createInterface({
  input: process.stdin,
  output: null,
  terminal: false
});

var examples = [];
console.log("waiting for input on stdin");

rl.on("line", (line) => {
  examples.push(JSON.parse(line));
});

rl.on("close", () => {
  var dimensions = _.uniq(_.flatMap(examples, (example) => _.keys(example.networks)));
  var roomNames = _.uniq(_.map(examples, (example) => example.room));
  var normalizedData = _.map(examples, (example) => normalizeExample(example, dimensions, roomNames));

  var clf = new svm.CSVC();
  clf.train(normalizedData).done(() => {
    console.log("model building completed");
    predictLoop(clf);
  });

  function predictLoop(clf) {
    scanNetworks((networks) => {
      if (!networks) return console.error("Failed to scan networks");

      var point = normalizeNetworksToPoint(networks, dimensions);
      var roomIndex = clf.predictSync(point);

      console.log(roomNames[roomIndex]);
      predictLoop(clf);
    });
  }
});