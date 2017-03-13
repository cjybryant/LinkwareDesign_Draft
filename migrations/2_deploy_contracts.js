// module.exports = function(deployer) {
//   deployer.deploy(Stakeholder);
//
// };

var Stakeholder = artifacts.require("Stakeholder.sol");
module.exports = function(deployer) {
  deployer.deploy(Stakeholder);
};


// var ConvertLib = artifacts.require("ConvertLib.sol");
// var MetaCoin = artifacts.require("MetaCoin.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);
// };
