pragma solidity ^0.4.4;
//need to be added due to "Source file does not specify required compiler version"

contract Stakeholder{
  address owner;

  struct stakeholderInfo{
    bytes32 name;
    uint id;  //unsigned integer
  }
  mapping(address =>stakeholderInfo) stakeholders; //list of stakeholders

  function Stakeholder(){
    owner = msg.sender;

  }

  function register(bytes32 _name, uint _id) returns(bool){
    stakeholderInfo memory temp;
    temp.name=_name;
    temp.id=_id;
    stakeholders[msg.sender]=temp;
    return true;
  }
  function getInfo() constant returns (bytes32){

    return stakeholders[msg.sender].name;
  }
}
