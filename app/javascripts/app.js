var accounts;
var account;

function hello(){
  //var MyContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_id","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]); //abi: the api of contract
  var MyContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_id","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);

  //https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.6+commit.2dabbdf0.js
  //convert the contract-Stakeholder.sol through link, get Interface code, enter in "inputs"
  // instantiate by address

  var contractInstance = MyContract.at("0x6e9b3cf3d8965abe13a864cea900ec63d6131f89");
  //var contractInstance = MyContract.at("0x235b691134bc3f61895be3414778f2cc37a43bd9");
  //after truffle migrate, we will get Stakeholder address
  //"like  Stakeholder: 0xb0adf4de4b40b08b9b46708deadced59b9ed4888" need to be recorded in mind
  //if truffle migrate, then update MyContract.at("address"), also the interface

  alert(contractInstance.register("customer",12,{from:accounts[0],gas:200000}));
  //alert(contractInstance.register("customer",12,{from:accounts[0],gas:200000
  //customer:Stakeholder's name, 12:data, accounts[0]:the first account of intial 10 accounts, gas:need to be paid
  //alert(contractInstance.getInfo.call());
  // .call(): means it doesn't need gas, without .call() need gas
}
window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    //hello();
  });
}
// can't connect to html
// var app=angular.module('testV',['ngRoute']);
// app.controller('testFunction1',function($scope){
//    $scope.name="Bryant";
// });
function calculate_important_degree(){
  b_degree=parseInt(document.getElementById('band_Degree').value);
  w=document.getElementById("weight").value;
  i_degree=b_degree*w;
  document.getElementById('important_degree').innerHTML=i_degree;
  recommended_strategy(i_degree);
}
function recommended_strategy(i){
  i_degree=i;
  if (i_degree>=25){
    document.getElementById('r_strategy').innerHTML='LCA > CA > UR > CR';
  }
  else if (i_degree>=12) {
    document.getElementById('r_strategy').innerHTML="LCA > UR > CA > CR";
  }
  else{
    document.getElementById('r_strategy').innerHTML="LCA > UR > CR";
  }
}

function show_FlowElements(){
    var str=document.getElementById('select');

    table2='<table><tr><td>Flow Element</td><td>Completeness</td></tr><tr><td>FA:Any time service</td><td>20%</td></tr></table>';

    document.getElementById('flow_table').innerHTML=table2;
    //
    // var obj=document.getElementById('flow_table');
    // var div=document.createElement('div');
    // var input=document.createElement('input');
    // input.type='text';
    //
    // div.appendChild(input);
    // obj.appendChild(div);

}

function add_data(){
  var row_num=document.getElementById("variability_table").rows.length;
  var new_tr=document.getElementById("variability_table").insertRow(row_num);

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<select><option value="V1">Arrival variability</option><option value="V2">Request variability</option><option value="V3">Capability variability</option><option value="V4">Effort variability</option><option value="V5">Subjective preference variability</option></select>';

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<input type="text" id="sub-service" style="width: 200px">';
  // innerHTML 中的 onchange 沒有作用
  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<input type="number" id="band_Degree" value="0" min="0" max="10" onchange="calculate_important_degree()" style="width: 100px;">';

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<input type="number" id="weight" value="0" min="1" max="5" onchange="calculate_important_degree()" style="width: 50px;">';

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<text id="important_degree" onchange="recommended_strategy()"></text>';

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<span id="r_strategy"></sapn>';

  td=new_tr.insertCell(new_tr.cells.length);
  td.innerHTML='<input name="select[]" type="checkbox" style="width: 25px">';
}
function remove_data(){
  var row_num2=document.getElementById("variability_table").rows.length;
  if(row_num2>2){document.getElementById("variability_table").deleteRow(-1);}
  else{alert("only one row");}
}

function myFunction(){document.getElementById("demo").innerHTML="My First JavaScript Function";}