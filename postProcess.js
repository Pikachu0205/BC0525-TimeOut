function customVerify(message, type){
	if(type == 0)
		publicKey = ec.keyFromPublic(publicKeyList[message.sender], 'hex');
	if(type == 1)
		publicKey = ec.keyFromPublic(publicKeyList[message.maker], 'hex');
	
	return publicKey.verify(message.messageHash, message.signature);
}


function isCommit(voteCollection, start_TO3){	//data = voteCollection[]
	
	//當票達到足夠的門檻
	if(commitBlock == null && (voteCollection.length >= coefficient * fault + 1) ){
		commitBlock = legalVote(voteCollection, height, round);
		
		if(commitBlock != null){
			
			//console.log("insert", commitBlock, "to DB");
			
			saveblock.push(height);	//紀錄已經commit了這個height的block
			mgdb.insertOne(commitBlock);
			lastBlockHash = commitBlock.messageHash;
			
			var synround = 0;
			
			//myRecord.recordTime_Of_TO3(start_TO3);
			start_TO4 = new Date().getTime();
			
			//myMain.newHeight(synround);
			//myDeliver.ReadyDeliver(ID, 0);
			
		}
		
		//myDeliver.ReadyDeliver(ID, 0);
		
	}
	
	myDeliver.ReadyDeliver(ID, 0);
	
}


function legalVote(lockset, height, round){	//找出大於cf+1張合法票的人
	var memls = [], block = [], obj={}, max=0, ahead=0;
	
	for(var i in lockset)	//論文寫說4f+1投給同一個值.目前沒寫判斷是否同一個
	
		if(memls[lockset[i].sender] == null ){		//檢查這個人的票是不是有被計算過
			if(lockset[i].vote != null &&  lockset[i].height == height  &&  lockset[i].round == round){
			
				block.push(lockset[i].vote);
				memls[lockset[i].sender] = 1;	//每人的票只被計算一次
			
			}
		}
		
	for(var i in block){  
	
		var key = block[i].blockHash; 
		
		(obj[key]) ? obj[key]++ : obj[key]=1;
		
		if(obj[key] > max){
			max =  obj[key];
			ahead = key;
			ahead2 = i;
		}
		
		if(obj[ahead] >= coefficient * fault + 1){
			for(var i in block)
				if(block[ahead2] == lockset[i].vote)
					return lockset[i];
		
		}
		
	}
	
	return null;
}


function getBlock(block){
	receiveBlock = 1;
	
	blockBody = {
		height: block.height,
		maker: block.maker,
		blockHash: block.blockHash,
		messageHash: block.messageHash,
		signature: block.signature
	}
	
	if(!isVoteLock)
		myDeliver.toAaggregateDeliver(height, round, blockBody.blockHash);
}


function getArrDifference(arr1, arr2){	//找出兩個陣列不同的值

    return arr1.concat(arr2).filter(function(v, i, arr) {

        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}


function display(item){		//show出app之間所傳的訊息
		if(item.timeout != 1)
			console.log(item.type, " height", item.height, " round", item.round, " sender", item.sender);
		else
			console.log("Timeout", " height", item.height, " round", item.round, " sender", item.sender);
}


module.exports = {
	customVerify,
	isCommit,
	legalVote,
	getBlock,
	getArrDifference,
	display
}