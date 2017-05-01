var scanner = require("node-wifi-scanner");
var _ = require("lodash");

module.exports.scanNetworks = function(cb) {
  scanner.scan((err, networks) => {
    if (err || networks.length == 0) {
      cb(null);
    } else {
      const out = {};
      networks.forEach((network) => {
        out[network.mac] = network.rssi;
      });
      cb(out);
    }
  });
};
