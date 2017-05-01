var scanner = require("node-wifi-scanner");
var scanNetworks = require("./common").scanNetworks;

if (process.argv.length != 3) {
  console.error("usage: node scan.js <room>");
  return;
}

var room = process.argv[2].toLowerCase();

function scan(i) {
  scanNetworks((networks) => {
    if (!networks) return;

    console.error(`Saving scan ${i} for room ${room}`);
    const example = {room, networks};
    console.log(JSON.stringify(example)); //append this to a file

    scan(i + 1);
  });
}

scan(1);
