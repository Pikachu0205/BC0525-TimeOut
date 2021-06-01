//
//node setNode.js t 6 200 300 400 5 6000 0
//

express = require('express');
app = express();
app.use(express.json());

MongoClient = require('mongodb').MongoClient;

fs = require('fs');
args = process.argv;
myDeliver = require("./myDeliver.js");
myRecord = require("./myRecord.js");
sizeName = ["8MB", "4MB", "2MB", "1MB", "512KB", "256KB"];

height=0, round=0, fault=0, coefficient = 0;
leader=0, aggregate=0;
ipList = [], publicKeyList = [], witnessList = [], awsUrlList = [], awsUrl = 'abc';
TO1 = 0, TO2 = 0, TimeRate = 1.5;

//手動版
/*
ID = parseInt(args[8]);
mode = args[2];
member = parseInt(args[3]);
TOs1 = parseInt(args[4]);
TOs2 = parseInt(args[5]);
TOs3 = parseInt(args[6]);
dataSize = parseInt(args[9]);	//[7] = 第幾回合.用來選擇不同大小的buffer
testTime = parseInt(args[7]);
*/

ID = parseInt(args[9]);
mode = args[2];
member = parseInt(args[3]);
TOs1 = parseInt(args[4]);
TOs2 = parseInt(args[5]);
TOs3 = parseInt(args[6]);
dataSize = parseInt(args[7]);	//[7] = 第幾回合.用來選擇不同大小的buffer
testTime = parseInt(args[8]);


global.mgdb



//=====main=====		t 5f+1, m 3f+1
node();



function node(){	
	console.log(args);
	var rfReady=0, rfpReady = 0; dbReady=0, awsReady=0;
	
	if(mode == "t"){
		fault = (member-1)/5;
		coefficient = 4;
	}
	if(mode == "m"){
		fault = (member-1)/3;
		coefficient = 2;
	}
	
	//var port = ID * 100 + 100;
		//app.listen(port);
	port = 3000;
	app.listen(port);
	
	
	
	
	
	MongoClient.connect("mongodb://localhost:27017/YourDB", {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {
		if (err) return console.log(err);
		
		db = client.db(port.toString());
		db.createCollection('collection', function (err, collection){
			
			mgdb = collection;
			
			fs.readFile('key&url.txt', function(err, data) {
				if (err) return console.log(err);
				
				readfile = data.toString().split('\n');
				
				
				for(i=0; i < member; i++)
					awsUrlList[i] = readfile[i].replace(/[\r\n]/g,"");
					//ipList[i] = readfile[i].replace(/[\r\n]/g,"");
				
				console.log("awsUrlList : " + awsUrlList);
				
				privateKey = ec.keyFromPrivate(readfile[member + 100 + ID]);
				
				
				for(i=0; i < member; i++)
					publicKeyList[i] = readfile[member + i].replace(/[\r\n]/g,"");
				
				
				myDeliver.ReadyDeliver(ID, 0);
				myRecord.endRecordTime_Of();
					
					
			});
			
		});
		
	});
	
	
}
