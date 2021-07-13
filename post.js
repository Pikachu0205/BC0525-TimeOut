app.post('/Vote', function(req, res) {
	if(postProcess.customVerify(req.body, 0)  &&  height > 0){
		//postProcess.display(req.body);	//console.log("vote:", req.body.vote);
		
		myRecord.recordTime_Of_TO2(req.body.start_TO2);
		
		if(thisLockset.length == 0)
			handle_TO3 = new Date().getTime();

		thisLockset.push(req.body);		//將票存到lockset
		postProcess.isCommit(thisLockset);
		/*
		//要回傳給學弟的BlockHash
		fbBh = (req.body.vote == null) ? [] : req.body.vote.blockHash;
		fbv = {
			blockHash: fbBh,
			sender: req.body.sender,
			voteHash: req.body.blockHash,
			signature: req.body.signature
		}
		feedbackVote.push(fbv);
		*/
		
		//同步height
		//if(req.body.height > height  &&  saveblock.indexOf(req.body.height) == -1)
		//	myDeliver.SynReqDeliver(height, round, req.body.sender, req.body.height, req.body.round);
		
		//同步round
		/*
		else if(req.body.height >= height  &&  req.body.round > round){
			
			var istimeout = -1;		//synround為要同步到的回合
			timeOut.timeOutStop();
			
			//console.log("round > ", req.body.round);
			myMain.newRound(istimeout, req.body.round, req);
		}
		*/
		
		
		/*
		else{
			postProcess.isCommit(req.body.voteCollection);
		}
		*/
		
	}
	
	res.end();
});


app.post('/SynReq', function(req, res){	
	if(postProcess.customVerify(req.body, 0)){
		postProcess.display(req.body);
		
		/*
		mgdb.find({
			
			height:{
				"$gte": req.body.height,
				"$lt": req.body.reqH
			}
		
		}).toArray(function(err,items){
			if(err) throw err;
			//myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.reqH, items, VDF);
			myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.reqH, items);
		});
		*/
		myDeliver.SynResDeliver(req.body.sender, req.body.reqH);
		
	}
	
	res.end();
});


app.post('/SynRes', function(req, res) {
	if(postProcess.customVerify(req.body, 0)){
		postProcess.display(req.body);
		
		/*
		for(var j in req.body.items){
					
			verifyblock = {
				height: req.body.items[j].height,
				maker: req.body.items[j].maker,
				blockHash: req.body.items[j].blockHash,
				signature: req.body.items[j].signature
			}
				
			if(saveblock.indexOf(req.body.items[j].height) == -1){
				saveblock.push(req.body.items[j].height);
				lastBlockHash = req.body.items[j].blockHash;
				//console.log("~~~~~Commit the syn block~~~~~");
				//mgdb.insertOne(verifyblock);
			}
				
		}
		*/
			
		//synH用來確定這個回傳的h比我高.有時我可能先收到更高的
		if(synH < req.body.synHeight){
			synH = req.body.synHeight;
			height = req.body.synHeight-1;
			
			aheadBlock = req.body;
			
			//synround為要同步到的回合 因為要從height去同步所以-1
			//var synround = req.body.round-1;
			
			myMain.newHeight();
		}
		
		//}
		
	}
	
	res.end();
});
