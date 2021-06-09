//node setNode.js t 6 22 35 46 5 60000 0
//
//

fs = require('fs');

var sum = function(x,y){	return x + y;	};
var square = function(x){	return x * x;	};
	
ipList = [],TO1 = [0,0,0,0,0,0],TO2 = [0,0,0,0,0,0],TO3 = [0,0,0,0,0,0];
TO1_buffer = [],TO2_buffer = [],TO3_buffer = [];
TO1_stddev = [],TO2_stddev = [],TO3_stddev = [];

	fs.readFile('result.txt', function(err, data) {
		if (err) return console.log(err);
		
		readfile = data.toString().split('\n');
		
		
		
		for(var i = 0; i < 18; i++){
			ipList[i] = readfile[i].replace(/[\r\n]/g,"");
			ipList[i] = ipList[i].split(',');
		}
		
		
		for(var i = 0; i < 6; i++){
			
			for(var j = 0; j < 6; j++){
				TO1[i] = parseInt(ipList[j][i]) + parseInt(TO1[i]);
				TO1_buffer.push( parseInt( ipList[j][i] ) );
				
				TO2[i] = parseInt(ipList[j+6][i]) + parseInt(TO2[i]);
				TO2_buffer.push( parseInt( ipList[j+6][i] ) );
				
				TO3[i] = parseInt(ipList[j+12][i]) + parseInt(TO3[i]);
				TO3_buffer.push( parseInt( ipList[j+12][i] ) );
			}
			
			TO1[i] = (TO1[i] / 6).toFixed(3);
			TO2[i] = (TO2[i] / 6).toFixed(3);
			TO3[i] = (TO3[i] / 6).toFixed(3);
			
		}
		
		//console.log(TO1);
		//console.log(TO2);
		//console.log(TO3);
		//console.log(TO1_buffer);
		//console.log(TO2_buffer);
		//console.log(TO3_buffer);
		
		TO1_arr = ont_two(TO1_buffer);
		TO2_arr = ont_two(TO2_buffer);
		TO3_arr = ont_two(TO3_buffer);
		
		
		for(var i = 0; i < 6; i++){
			TO1_stddev.push( stddevMean(TO1_arr[i]) );
			TO2_stddev.push( stddevMean(TO2_arr[i]) );
			TO3_stddev.push( stddevMean(TO3_arr[i]) );
		}
		
		//console.log(TO1_stddev);
		//console.log(TO2_stddev);
		//console.log(TO3_stddev);
		
		s1 = [],s2 = [],s3 = [];
		for(var i = 0; i < 6; i++){
			s1.push( parseFloat (TO1[i]) + parseFloat (TO1_stddev[i]) );
			s2.push( parseFloat (TO2[i]) + parseFloat (TO2_stddev[i]) + parseFloat (TO1[i]) + parseFloat (TO1_stddev[i]) );
			s3.push( parseFloat (TO3[i]) + parseFloat (TO3_stddev[i]) + parseFloat (TO2[i]) + parseFloat (TO2_stddev[i]) + parseFloat (TO1[i]) + parseFloat (TO1_stddev[i]) );
		}
		
		console.log(s1);
		console.log(s2);
		console.log(s3);
		//591.337,	310.584,	185.640,	87.808,		41.92,	21.265
		//598.912,	322.257,	203.152,	102.330,	53.464,	34.081
		//610.461,	334.223,	215.791,	115.104,	64.613,	44.959
	});
	
	
function stddevMean(TObuffer){
	//console.log("TObuffer : " + TObuffer);
	
	var sum = function(x,y){ return x + y;};　　//求和函数
	var square = function(x){ return x * x;};　　//数组中每个元素求它的平方

	var mean = ( TObuffer.reduce(sum)/TObuffer.length ).toFixed(3);
	var deviations = TObuffer.map(function(x){return x-mean;});
	var stddev = ( Math.sqrt(deviations.map(square).reduce(sum)/(TObuffer.length-1)) ).toFixed(3);
	
	//console.log("平均值：" + mean);
	//console.log("偏差：" + deviations);
	//console.log("标准差：" + stddev);
	
	return stddev;
	/*
	//var sum = TObuffer.reduce(function (a, b) {	return a + b;	}, 0);
	*/
}
	
	
function ont_two(TObuffer){
	
	var arrtemp = [];
	var arr = [];
	
	for (var i=0; i< TObuffer.length ;i++ ){
		var indextemp = i % 6;
		
		if(indextemp == 0){
			arrtemp = [];
			arr[arr.length] = arrtemp;
		}
		
		arrtemp[indextemp] = TObuffer[i];
	
	}
	
	//console.log(arr);
	
	return arr;
	
}
	