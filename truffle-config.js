const path = require("path");

module.exports = {
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
    }
    // development: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: "*", // Match any network id
    // }, 
  }, 
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
