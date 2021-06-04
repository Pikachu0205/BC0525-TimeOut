app.post('/SynReq', function(req, res){	
	if(postProcess.customVerify(req.body, 0)){
		postProcess.display(req.body);
		
		/*
		mgdb.find({
			
			height:{
				"$gte": req.body.height,
				"$lt": req.body.rH
			}
		*/
		
		}).toArray(function(err,items){
			if(err) throw err;
			//myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.rH, items, VDF);
			myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.rH, items);
		});
	}
	
	res.end();
});


app.post('/SynRes', function(req, res) {
	postProcess.display(req.body);
	if(postProcess.customVerify(req.body, 0)){
		

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
			
			
			//synH用來確定這個回傳的h比我高.有時我可能先收到更高的
			if(synH < req.body.synheight){
				synH = req.body.synheight;
				height = req.body.synheight-1;
				
				//synround為要同步到的回合 因為要從height去同步所以-1
				var synround = req.body.round-1;
				
				myMain.newHeight(synround);
			}
		
		//}
		
		res.end();
	}
});


app.post('/Vote', function(req, res) {
	if(postProcess.customVerify(req.body, 0)  &&  height > 0){
		postProcess.display(req.body);	//console.log("vote:", req.body.vote);
			
		thisLockset.push(req.body);		//將票存到lockset
		
		
		//要回傳給學弟的BlockHash
		fbBh = (req.body.vote == null) ? [] : req.body.vote.blockHash;
		fbv = {
			blockHash: fbBh,
			sender: req.body.sender,
			voteHash: req.body.blockHash,
			signature: req.body.signature
		}
		feedbackVote.push(fbv);
		
		
		if(req.body.height > height  &&  saveblock.indexOf(req.body.height) == -1)
			myDeliver.SynReqDeliver(height, round, ID, req.body.sender, req.body.height, req.body.round);
		
		else if(req.body.height >= height  &&  req.body.round > round){
			
				var istimeout = -1;		//synround為要同步到的回合
				timeOut.timeOutStop();
				
				//console.log("round > ", req.body.round);
				myMain.newRound(istimeout, req.body.round, req);
			}
		
		
		//當票達到足夠的門檻
		if( commitBlock ==null && ((mode == "t"  &&  thisLockset.length >= 4*fault+1) || (mode == "m"  &&  thisLockset.length >= 2*fault+1)) ){
			if(mode == "t")
				commitBlock = postProcess.legalVote(thisLockset, height, round, 4);
			if(mode == "m")
				commitBlock = postProcess.legalVote(thisLockset, height, round, 2);
			
			if(commitBlock != null){
				//console.log("insert", commitBlock, "to DB");
				
				saveblock.push(req.body.height);
				//mgdb.insertOne(commitBlock);
				lastBlockHash = commitBlock.blockHash;
				//console.log(commitBlock.blockHash);
				//console.log(thisLockset);
				
				//if( !newHeightTogether ){
					//myProcedure.feedbackTransaction();
					myMain.newHeight(0);
				//}
				
			}
		}
		
		
	}
	res.end();
});