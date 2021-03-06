saveblock = [], readyMem = 0;
receiveBlock = 0, stopRecMsig = 0, broMsig = 0, notSignedWitness = [];
lastBlockHash = 0;
feedbackVote = [], aheadBlock = {};

myMain = require("./myMain.js");
myProcedure = require("./myProcedure.js");
myDeliver = require("./myDeliver.js");
timeOut = require("./timeOut.js");
myRecord = require("./myRecord.js");
postProcess = require("./postProcess.js");
	
app.post('/Block', function(req, res) {
	if(postProcess.customVerify(req.body, 0)  &&  height > 0){
		
		console.log("收到block");
	
	
	
		myRecord.recordTime_Of_TO1(req.body.start_TO1);
		handle_TO2 = new Date().getTime();	//在myDeliver.mesDeliver處理
	
		//DataSize1.push( Object.keys(req.body) );
		//DataSize1.push( postProcess.roughSizeOfObject(req.body) );	//測封包大小
	
	
	
		if(receiveBlock == null && req.body.height == height  &&  req.body.round == round)
			postProcess.getBlock(req.body);
		
		
		else if(req.body.height > height  &&  saveblock.indexOf(req.body.height) == -1)
			myDeliver.SynReqDeliver(req.body.sender, req.body.height, req.body.round);
		
	}
	
	
	res.end();
});


app.post('/toAggregateVote', function(req, res) {
	if(postProcess.customVerify(req.body, 0)  &&  height > 0){
		
		//console.log("AGG收到民眾投票 " + req.body.sender);
		
		//var nowTime = new Date().getTime();
		//console.log(nowTime);
		
		myRecord.recordTime_Of_TO2(req.body.start_TO2);
		
		if(thisLockset.length == 0  &&  ID == leader)
			handle_TO3 = new Date().getTime();	//在myDeliver.mesDeliver處理
		
		//DataSize2.push( postProcess.roughSizeOfObject(req.body) );	//測封包大小
		
		
		
		thisLockset.push(req.body);		//將票存到lockset
		
		if(thisLockset.length == member  &&  ID == leader){
			var endHandle_TO3 = new Date().getTime();
			Handle3_Buffer.push(endHandle_TO3 - handle_TO3);
		}
		
		
	}
	res.end();
});


app.post('/fromAggregateVote', function(req, res) {
	if(postProcess.customVerify(req.body, 0)  &&  height > 0){
		
		console.log("收到AGG整理好的投票");
		
		
		
		myRecord.recordTime_Of_TO3(req.body.start_TO3);
		handle_TO4 = new Date().getTime();	//在timeOut.timeOutStart處理
		
		//DataSize3.push( postProcess.roughSizeOfObject(req.body) );	//測封包大小
		
		
		
		postProcess.isCommit(req.body.voteCollection);
		
	}
	res.end();
});


app.post('/Ready', function(req, res) {
	//if(postProcess.customVerify(req.body, 0)){
		var startRound = -1;
		
		//console.log("=== 收到ready ===");
		
		//nowTime = new Date().getTime();
		//console.log(nowTime);
		
		if(ID == 0){
			readyMem++;
			
			if(readyMem == member){
				//myDeliver.ReadyDeliver(ID, 1);
				
				setTimeout(function(){
					
					myDeliver.ReadyDeliver(ID, 1);	//0為預備.1為開始
					myMain.newHeight(startRound);
					myRecord.recoedThroughput();
					
				},10);
			}
		}
		else
			myMain.newHeight(startRound);
	//}
	
	res.end();
});


app.post('/Witness', function(req, res) {
	//if(myMain.synVerify(req.body, 1)  &&  !stopRecMsig  &&  req.body.height == height  &&  req.body.round == round){
	if(req.body.height == height  &&  req.body.round == round){
		
		//檢查自己簽了沒
		if(req.body.witSig.indexOf(ID) == -1)
			req.body.witSig.push(ID);
		
		//找出還沒簽的人
		notSignedWitness = postProcess.getArrDifference(witnessList, req.body.witSig);
		delete req.body.transaction;
		req.body.sender = ID;
		
		//傳給還沒簽的人
		if(notSignedWitness.length != 0)
			msigDeliver.witToWitDeliver(req.body, notSignedWitness);	//witness互傳
		
		//大家都簽了
		else if(!broMsig){	//還沒廣播過
				broMsig = 1;
				console.log("284ru8 cl3");
				msigDeliver.msigDeliver(req.body);
		}
	}
	
	else if(req.body.height >= height  &&  req.body.round > round){
			
			//synround為要同步到的回合
			var timeout = -1, synround = req.body.round;
			
			timeOut.timeOutStop();
			
			myMain.newRound(timeout, synround, req);
		}
	
	res.end();
});