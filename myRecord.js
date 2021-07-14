//require("./exForAgg.js");

handle_TO1 =0
handle_TO2 =0
handle_TO3 =0
handle_TO4 = 0
TO1_Buffer = []
TO2_Buffer = []
TO3_Buffer = []
TO4_Buffer = []
Handle1_Buffer = []
Handle2_Buffer = []
Handle3_Buffer = []
Handle4_Buffer = []
DataSize1 = []
DataSize2 = []
DataSize3 = []
result = []


nonAgg_tran_Buffer1 = []
nonAgg_tran_Buffer2 = []
nonAgg_handle_Buffer1 = []
nonAgg_handle_Buffer2 = []
nonAgg_handle_Buffer3 = []

var sum = function(x,y){ 	return x + y;};　　//求和函数
var square = function(x){	 return x * x;};　　//数组中每个元素求它的平方

fileName = "timeout" + args[8] + ".txt";


function startRecordTime_Of(){
	
	//var write = "\n\n" + TOs1 + "\t" + TOs2 + "\t" + TOs3 + "\t\t" + member + "node\t" + sizeName[dataSize] + "\n\n";
	var write = "\n";
	
	//fs.appendFile("TO1.txt", write, function (err) {	if(err)	console.log(err);	})
	//fs.appendFile("TO2.txt", write, function (err) {	if(err)	console.log(err);	})
	//fs.appendFile("TO3.txt", write, function (err) {	if(err)	console.log(err);	})
	//fs.appendFile("TO1_DS.txt", write, function (err) {	if(err)	console.log(err);	})
	//fs.appendFile("TO2_DS.txt", write, function (err) {	if(err)	console.log(err);	})
	//fs.appendFile("TO3_DS.txt", write, function (err) {	if(err)	console.log(err);	})
	
}


function endRecordTime_Of(){
	
	setTimeout(function(){
		
		//console.log("要統計標準差了喔");
		
		console.log("TO1_Buffer : " + TO1_Buffer);
		console.log("TO2_Buffer : " + TO2_Buffer);
		//console.log("TO3_Buffer : " + TO3_Buffer);
		
		console.log("Handle1_Buffer : " + Handle1_Buffer);
		console.log("Handle2_Buffer : " + Handle2_Buffer);
		//console.log("Handle3_Buffer : " + Handle3_Buffer);
		//console.log("Handle4_Buffer : " + Handle4_Buffer);
		
		console.log("nonAgg_handle_Buffer3 : " + nonAgg_handle_Buffer3);
		
		
		
		stddevMean(TO1_Buffer);
		stddevMean(TO2_Buffer);
		//stddevMean(TO3_Buffer);
		
		stddevMean(Handle1_Buffer);
		stddevMean(Handle2_Buffer);
		//stddevMean(Handle3_Buffer);
		//stddevMean(Handle4_Buffer);
		
		stddevMean(nonAgg_handle_Buffer3)
		
		
		
		console.log("result : " + result);
		/*
		var write1 = stddev1.toFixed(3) + ",";
		var write2 = stddev2.toFixed(3) + ",";
		var write3 = stddev3.toFixed(3) + ",";
		var write4 = stddev4.toFixed(3) + ",";
		
		
		//fs.appendFile(fileName, write, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO1.txt", write1, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO2.txt", write2, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO3.txt", write3, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO4.txt", write4, function (err) {	if(err)	console.log(err);	})
			
		fs.appendFile("TO1_dot.txt", TO1_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO2_dot.txt", TO2_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO3_dot.txt", TO3_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO4_dot.txt", TO4_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		*/
	
		//fs.appendFile("TO1_DS.txt", DataSize1 + "\n", function (err) {	if(err)	console.log(err);	})
		//fs.appendFile("TO2_DS.txt", DataSize2 + "\n", function (err) {	if(err)	console.log(err);	})
		//fs.appendFile("TO3_DS.txt", DataSize3 + "\n", function (err) {	if(err)	console.log(err);	})
		
	},testTime);
	
}


function stddevMean(TObuffer){
	//console.log("TObuffer : " + TObuffer);
	
	var total = TObuffer.reduce(sum);
	var mean = ( parseFloat(total) / TObuffer.length ).toFixed(2);
	

		
	var deviations = TObuffer.map(function(x){return parseFloat(x) - mean;});
	var stddev = ( Math.sqrt(deviations.map(square).reduce(sum)/(TObuffer.length-1)) ).toFixed(2);
	
	
	result.push(mean);
	result.push(stddev);
	
	
	//console.log("平均值：" + mean);
	//console.log("偏差：" + deviations.toFixed(3));
	//console.log("标准差：" + stddev);
	
	//return stddev;
	/*
	//var sum = TObuffer.reduce(function (a, b) {	return a + b;	}, 0);
	*/
}


function recoedThroughput(){	//10min 600000	20min 1200000	30min 1800000	ihr 3600000	
		
	setTimeout(function(){
		
		var throughput = (height*size[dataSize] / (testTime / 1000) ).toFixed(5);
		
		var write = TOs1 + "\t" + TOs2 + "\t" + TOs3 + "\t" + height + "\t\t" + throughput + "\t" + sizeName[dataSize] + "\n";
		var write2 = throughput + ", ";
		
		fs.appendFile('throughput.txt', write, function (err) {	if(err)	console.log(err);	})
		
		fs.appendFile('throughput2.txt', write2, function (err) {	if(err)	console.log(err);	})
		
	//console.log("01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789");
	
	},testTime);
}


function recordTime_Of_Height(){
	endTime = new Date().getTime();
		
	heightTime = endTime - nowTime;
	
	var write = height + "," + heightTime + "\n";
	fs.appendFile('time_height.txt', write, function (err) {	if(err)	console.log(err);	})
		
	var write2 = heightTime + ", ";
	fs.appendFile('time_height2.txt', write2, function (err) {	if(err)	console.log(err);	})
	
	nowTime = new Date().getTime();
}


function recordTime_Of_TO1(start_TO1){
	//handle_TO2 = new Date().getTime();
	var end_TO1 = new Date().getTime();
	
	//console.log("第一個timeout");
	//console.log(typeof(end_TO1 - start_TO1));
	TO1_Buffer.push(end_TO1 - start_TO1);
	
}


function recordTime_Of_TO2(start_TO2){
	//handle_TO3 = new Date().getTime();
	var end_TO2 = new Date().getTime();
	
	//console.log("第二個timeout");
	
	TO2_Buffer.push(end_TO2 - start_TO2);
	
}


function recordTime_Of_TO3(start_TO3){
	//handle_TO4 = new Date().getTime();
	var end_TO3 = new Date().getTime();
	
	//console.log("第三個timeout");
	
	TO3_Buffer.push(end_TO3 - start_TO3);
	
}


function recordTime_Of_TO4(){
	var end_TO4 = new Date().getTime();
	
	TO4_Buffer.push(end_TO4 - start_TO4);
}


module.exports = {
	startRecordTime_Of,
	endRecordTime_Of,
	recordTime_Of_TO1,
	recordTime_Of_TO2,
	recordTime_Of_TO3,
	recordTime_Of_TO4,
	recoedThroughput,
	recordTime_Of_Height
}

//console.log("TO1_Stddev : " + stddev1);
		//console.log("TO2_Stddev : " + stddev2);
		//console.log("TO3_Stddev : " + stddev3);
		//stddev4 = stddevMean(TO4_Buffer);
		
		/*
		console.log("TO1_Buffer : " + TO1_Buffer + "\nTO2_Buffer : " + TO2_Buffer + "\nTO3_Buffer : " + TO3_Buffer + "\nTO4_Buffer : " + TO4_Buffer);
		console.log("stddev1 : " + stddev1);		console.log("stddev2 : " + stddev2);		console.log("stddev3 : " + stddev3);		console.log("stddev4 : " + stddev4);
		*/
		/*
		var write = 
			"TO1 : " + stddev1[0] + "\t\t" + stddev1[1] + "\t\t" + stddev1[2] + "\t\t" + stddev1[3] + "\t\t" + stddev1[4] + 
			"\nTO2 : " + stddev2[0] + "\t\t" + stddev2[1] + "\t\t" + stddev2[2] + "\t\t" + stddev2[3] + "\t\t" + stddev2[4] + 
			"\nTO3 : " + stddev3[0] + "\t\t" + stddev3[1] + "\t\t" + stddev3[2] + "\t\t" + stddev3[3] + "\t\t" + stddev3[4] + 
			"\nTO4 : " + stddev4[0] + "\t\t" + stddev4[1] + "\t\t" + stddev4[2]	+ "\t\t" + stddev4[3] + "\t\t" + stddev4[4] + 
			"\nthroughput : " + height + "\t\t" + (height*size[dataSize] / (testTime / 1000) ).toFixed(5);
		*/
		/*
		var write = 
			"TO1 : " + stddev1.toFixed(3) + 
			"\nTO2 : " + stddev2.toFixed(3) + 
			"\nTO3 : " + stddev3.toFixed(3) + 
			//"\nTO4 : " + stddev4.toFixed(3) + 
			"\nthroughput : " + height + "\t\t" + (height*size[dataSize] / (testTime / 1000) ).toFixed(5) + "\n";
		*/