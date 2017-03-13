
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

$(document).ready(function() {
  // input from powei's value network
  var activity_input = [];
  //{ source: 1, target: 2, interaction: [{ name: 'b=c', give: 'ttt', receive: 'rrr' }] }

  var $TABLE=$("#table_v");
  var $TABLE_F=$("#table_f");

  var all_data_cal=[];
  var init_f_array=[];
  var init_f2_array=[];
  init_f_array.push(init_f2_array);
  all_data_cal.push(init_f_array);
  //add row
  $(".table-add").click(function(){
    var i=$('#table_v tr').length-1;
    var $clone=$TABLE.find('tr.hide').clone(true).removeClass('hide table-line').addClass('row_'+i);
    $TABLE.find('table').append($clone);

  });
  //remove row
  $('.table-remove').click(function(){
    $(this).parents('tr').detach();
  });
  //to lookup the flow elements
  var num_col=-1;
  $('.table-lookup').click(function(){
    var col=$(this).parents("td").parents("tr").index()-1;
    if(col==0){col++;}
    num_col=col; // 1

    var cnt_l=$('#table_f tr').length;
    // 清空右邊flow table資料
    for(i=cnt_l; i>=2; i--){
      $TABLE_F.find('tr').eq(i).detach();
    }

    // 把資料塞回去 !! 當沒有資料時會有錯誤, 但是不知道怎麼把它濾掉
    // if((all_data_cal[num_col-1][0][0])==num_col){
    //
    // };
    var j=1;
    var $clone=$TABLE_F.find('tr.hide').clone(true).removeClass('hide table-line').addClass('row_'+j);
    $TABLE_F.find('table').append($clone);
    // 沒用 GG
    $TABLE_F.find('table').children('tbody').find('tr').eq(1).find('td').eq(1).children('.f_degree').value="0";
  });

  var sum_f=0; // 總 達程度 的總和
  var sum_c=0; // 總 複雜度 的總和
  var total_cost=0 // 總 cost

  // save button
  $('#cal-btn').click(function(){
    var data_cal = [];
    var $rows = $TABLE_F.find('tr:not(:hidden)');
    $rows.shift();
    $rows.each(function () {
      var $td = $(this).find('td');
      var h = {};
      h[0]=num_col;
      h[1]=$td.find('.f_element').val();
      h[2]=$td.find('.f_degree').val();
      h[3]=$td.find('.c_degree').val();
      data_cal.push(h);
    });
    all_data_cal.splice(num_col-1,1,data_cal);
    //all_data_cal.push(data_cal);
    //var sum_f=0; // 單一變異性中的 達程度 的總和
    //var sum_c=0; // 單一變異性中的 複雜度 的總和
    // var i=0;
    // var lo_sum_f=0;
    // var lo_sum_c=0;
    // $.each(data_cal,function(){
    //   lo_sum_f+=parseInt(data_cal[i]["2"]);
    //   lo_sum_c+=parseInt(data_cal[i]["3"]);
    //   i++;
    // });
    // $('#LFEL').text(((lo_sum_f/2))-(lo_sum_c/2));
    // var LFEL_score=cal_LFEL();
    // $('#LFEL').text(LFEL_score);
    //$('#export').text(JSON.stringify(data_cal));
    cal_LFEL();
    U();
  });
  function U(){
    $('#export').text(JSON.stringify(all_data_cal));
    /*
    [ [ {"0":1,"1":"validation","2":"50","3":"50"},{"0":1,"1":"anytime service","2":"50","3":"50"} ] ,
      [ {"0":2,"1":"self service","2":"50","3":"50"} ]
    ]
    */
  };
  function cal_LFEL(){
    var sum_f=0;
    var sum_c=0;
    total_cost=$('.cost_degree').val();
    for( i=0 ; i< all_data_cal.length; i++){
      for(j=0 ; j<all_data_cal[i].length;j++){
        sum_f+=parseInt(all_data_cal[i][j][2]);
        sum_c+=parseInt(all_data_cal[i][j][3]);
      }
    }
    var LFEL_score=sum_f-(sum_c/2)-(total_cost/2);
    $('#LFEL').text(LFEL_score);
    // 分數沒有除以所有 variability的數量
  }
  //$('#LFEL').text(sum_f+" "+sum_c);
  // $(function(){
  //     $('.f_element').editableSelect();
  // });

  $('.cost_degree').change(function(){
    cal_LFEL();
  });
  // flow table opertion
  // add row
  $(".f_table-add").click(function(){
    var i=$('#table_f tr').length-1;
    var $clone=$TABLE_F.find('tr.hide').clone(true).removeClass('hide table-line').addClass('row_'+i);
    $TABLE_F.find('table').append($clone);
  });
  //remove row
  $('.f_table-remove').click(function(){
    $(this).parents('tr').detach();
  });


  //calculate importance degree
  var temp2=10;
  var weight_1=1;
  $('.b_degree').change(function(){
    var b_degree_1=$(this).val();
    var i_degree_1=(b_degree_1)/2*weight_1;
    $(this).parents().children('td:eq(4)').text(i_degree_1);
    temp2=b_degree_1;
    var $ID_RS2=$(this);
    A($ID_RS2,i_degree_1);
  });

  $('.weight').change(function(){
    weight_1=$(this).val();
    var im_degree=(temp2)/2*weight_1;
    var msg_re_strategy;
    var temp3=im_degree;
    var $ID_RS=$(this);
    A($ID_RS,temp3);
    $(this).parents().children('td:eq(4)').text(im_degree);
  });

  // recommended_strategy
  function A($ID_RS,a) {
    var msg_re_strategy;
    if (a>=25){
      msg_re_strategy=("LCA > CA > UR > CR");
    }
    else if (a>=12) {
      msg_re_strategy=("LCA > UR > CA > CR");
    }
    else{
      msg_re_strategy=("LCA > UR > CR");
    }
    $ID_RS.parents().children('td:eq(5)').text(msg_re_strategy);
  }



  // get the value
  jQuery.fn.pop = [].pop;
  jQuery.fn.shift = [].shift;
  $('#export-btn').click(function(){
    var $rows = $TABLE.find('tr:not(:hidden)');
    var data = [];
    var headers=[];
    // $rows.shift()
    $($rows.shift()).find('th:not(:empty)').each(function () {
      headers.push($(this).text().toLowerCase());
    });
    $rows.each(function () {
      var $td = $(this).find('td');
      var h = {};
      //h=[0,1,1];

      h[headers[0]]=$td.find('.v_type').val();
      h[headers[1]]=$td.find('.sub_service').val();
      h[headers[2]]=($td.find('.b_degree').val())/2;
      h[headers[3]]=$td.find('.weight').val();
      h[headers[4]]=$td.eq(4).text();
      h[headers[5]]=$td.eq(5).text();
      data.push(h);
    });
    // $('#export').text(data);
    $('#export').text(JSON.stringify(data));
  });

  // $('#export-btn').click(function () {
  //   var $rows = $TABLE.find('tr:not(:hidden)');
  //   var headers = [];
  //   var data = [];
  //
  //   // Get the headers (add special header logic here)
  //   $($rows.shift()).find('th:not(:empty)').each(function () {
  //     headers.push($(this).text().toLowerCase());
  //   });
  //
  //   // Turn all existing rows into a loopable array
  //   $rows.each(function () {
  //     var $td = $(this).find('td');
  //     var h = {};
  //
  //   // Use the headers from earlier to name our hash keys
  //     headers.forEach(function (header, i) {
  //       h[header] = $td.eq(i).text();
  //     });
  //
  //     data.push(h);
  //   });
  //
  //   // Output the result
  //   $('#export').text(JSON.stringify(data));
  // });

});

// function calculate_important_degree(){
//   b_degree=parseInt(document.getElementById('band_Degree').value);
//   w=document.getElementById("weight").value;
//   i_degree=b_degree*w;
//   document.getElementById('important_degree').innerHTML=i_degree;
//   recommended_strategy(i_degree);
// }
// function recommended_strategy(i){
//   i_degree=i;
//   if (i_degree>=25){
//     document.getElementById('r_strategy').innerHTML='LCA > CA > UR > CR';
//   }
//   else if (i_degree>=12) {
//     document.getElementById('r_strategy').innerHTML="LCA > UR > CA > CR";
//   }
//   else{
//     document.getElementById('r_strategy').innerHTML="LCA > UR > CR";
//   }
// }
//
// function show_FlowElements(){
//     var str=document.getElementById('select');
//
//     table2='<table><tr><td>Flow Element</td><td>Completeness</td></tr><tr><td>FA:Any time service</td><td>20%</td></tr></table>';
//
//     document.getElementById('flow_table').innerHTML=table2;
//     //
//     // var obj=document.getElementById('flow_table');
//     // var div=document.createElement('div');
//     // var input=document.createElement('input');
//     // input.type='text';
//     //
//     // div.appendChild(input);
//     // obj.appendChild(div);
//
// }

// function add_data(){
//   var row_num=document.getElementById("variability_table").rows.length;
//   var new_tr=document.getElementById("variability_table").insertRow(row_num);
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<select><option value="V1">Arrival variability</option><option value="V2">Request variability</option><option value="V3">Capability variability</option><option value="V4">Effort variability</option><option value="V5">Subjective preference variability</option></select>';
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<input type="text" id="sub-service" style="width: 200px">';
//   // innerHTML 中的 onchange 沒有作用
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<input type="number" id="band_Degree" value="0" min="0" max="10" onchange="calculate_important_degree()" style="width: 100px;">';
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<input type="number" id="weight" value="0" min="1" max="5" onchange="calculate_important_degree()" style="width: 50px;">';
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<text id="important_degree" onchange="recommended_strategy()"></text>';
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<span id="r_strategy"></sapn>';
//
//   td=new_tr.insertCell(new_tr.cells.length);
//   td.innerHTML='<input name="select[]" type="checkbox" style="width: 25px">';
// }
//
// function remove_data(){
//   var row_num2=document.getElementById("variability_table").rows.length;
//   if(row_num2>2){document.getElementById("variability_table").deleteRow(-1);}
//   else{alert("only one row");}
// }
