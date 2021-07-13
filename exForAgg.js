//node exForAgg.js t
//它會自動產生各個timeout  執行各種大小的blockSize
//t	5f+1 m	3f+1

child_process = require('child_process').execFile;
fs = require('fs');
args = process.argv;
myRecord = require("./myRecord.js");

workerProcess = [];
size = ["8MB", "4MB", "2MB", "1MB", "512KB", "256KB"];


testMode = args[2];
testNumOfNode = 10;
//testNumOfNode = (args[3] == 0) ? 6 : args[3]

testTime = 300000;

time_Of_TO = 1;
time_Of_DS = 6;
time_Of_NumOfNode = 6
//time_Of_NumOfNode = (args[3] == 0) ? 2 : 1;


//var cycle = testTime + testNumOfNode * 1000 * 1.2;
//var endCycle = testTime + testNumOfNode * 1000;

var cycle = testTime + 15000;
var endCycle = testTime + 9000;

var DSCycle = cycle * time_Of_TO + 9000;
var NumOfNodeCycle = DSCycle * time_Of_DS + 9000;

//==========開始==========

setMode(testMode, testNumOfNode);


function setMode(mode, numNode){
	
	numNode = 10;
	setNumOfNode(mode, numNode);
	
}


function setNumOfNode(mode, numNode){
		
	for(var c = 0; c < time_Of_NumOfNode; c++){
		
		setTimeout(function(){
			
			/*
			cycle = testTime + numNode * 1000 * 1.5;
			DSCycle = cycle * time_Of_TO + 10000;
			NumOfNodeCycle = DSCycle * time_Of_DS + 10000;
			*/
			
			setDS(mode, numNode);
			numNode = numNode + 10;
			
		},NumOfNodeCycle * c);
		
	}
	
}

function setDS(mode, numNode){	//控制data大小
	var dataSize = 5;
	//if(numNode == 6)		var T1 = 20;
	//if(numNode == 16)		var T1 = 80;
	
	for(var d = 0; d < time_Of_DS; d++){
	
		setTimeout(function(){
			
			controlTO(mode, numNode, dataSize);
			dataSize--;
			//T1 = T1 * 1.5;
			//fs.appendFile('throughput.txt', "\n\n", function (err) {	if(err)	console.log(err);	})
			
		},DSCycle * d);
		
	}
	
}


function controlTO(mode, numNode, dataSize){	//控制timeout大小
	var T1 = 2000;
	var T2 = T1 + 1000;
	var T3 = T2 + 1000;
	
	var rate = 0.6;
	//var conter = 0;
	//var buffer = 60;
	
	//var T1 = [550, 300, 150, 80, 45, 30];
	//var T2 = [45, 40, 35, 30, 25, 25];
	//var T3 = [30, 30, 25, 25, 25, 25];
	
	//var T1 = [550, 300, 150, 80, 45, 30];
	//var T2 = [45, 40, 35, 30, 25, 25];
	//var T3 = [30, 30, 25, 25, 25, 25];
	
	
	for(e = 0; e < time_Of_TO; e++){
		
		setTimeout(function(){
			
			var TO1 = T1;
			var TO2 = T2;
			var TO3 = T3;
			
			//var TO1 = T1[dataSize] * rate + 50;
			//var TO2 = TO1 + T2[dataSize];
			//var TO3 = TO2 + T3[dataSize];
			
			//var TO2 = TO1 + buffer + 5 * conter;
			//var TO3 = TO2 + buffer + 5 * conter;
			//var TO2 = TO1 + buffer * rate;
			//var TO3 = TO2 + buffer * rate;
			
			newTest(mode, numNode, dataSize, TO1, TO2, TO3);
			//rate = rate + 0.2;
			//conter = conter + 1;
			
		},cycle * e);
		
	}
	
}


function newTest(mode, numNode, dataSize, T1, T2, T3){		//[2] = mode; [3] = node數;
	
	workerProcess[0] = child_process('node', ['setNode.js', mode, numNode, T1, T2, T3, dataSize, testTime, 0],
	function (error, stdout, stderr) {
		if (error) {
			//console.log(error.stack);	console.log('Error code: '+error.code);	console.log('Signal received: '+error.signal);console.log('stdout: ' + stdout);	console.log('stderr: ' + stderr);
			}
	});


	setTimeout(function(){
		
		for(var i=1; i < numNode; i++) {
			
			workerProcess[i] = child_process('node', ['setNode.js', mode, numNode, T1, T2, T3, dataSize, testTime, i],
			function (error, stdout, stderr) {
				//console.log('stdout: ' + stdout);
				//if (error) {	console.log(error.stack);	console.log('Error code: '+error.code);	console.log('Signal received: '+error.signal);	}	console.log('stderr: ' + stderr);
			});
			
		}
		
	},100);
	
	
	setTimeout(function(){
		
		for(var i=0; i < numNode; i++)
			workerProcess[i].kill();
		
		myRecord.startRecordTime_Of();
		
	},endCycle);
	
}