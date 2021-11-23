module.exports = {
  contracts_directory: './src/contracts/',
  contracts_build_directory: "./src/build/contracts/",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.9",
      optimiser: {
        enabled: true,
        runs: 200
      }
    }
  }
};