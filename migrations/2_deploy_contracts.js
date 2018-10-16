var CertificateCreator = artifacts.require("./CertificateCreator.sol");

module.exports = function(deployer) {
  deployer.deploy(CertificateCreator);
};