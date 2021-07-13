lastLockset = [], thisLockset = [];
blockBody=null, lastRoundBlock=null, lastRoundVote={};
isVoteLock = 0, synH = 0, transaction123 = '';
size = [8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625];
require("./S8-5.js");
require("./post.js");
require("./setNode.js");
msigDeliver = require("./msigDeliver.js");
msigProcedure = require("./msigProcedure.js");

fs = require('fs');



function firstBlock(){	//決定leader要送什麼block
	//getTransaction();
	
	if(mode == "t"){
		
		if(round == 1)
			myDeliver.BlockDeliver(height, round, ID);
		
		else if(lastLockset.length >= coefficient * fault + 1){
			lastRoundBlock = maxVotesBlock(lastLockset, 2, fault);
			myDeliver.BlockDeliver(height, round, ID);
		}
		
	}
	
	if(mode == "m"){
		
		if(round == 1)
			msigDeliver.leaderToWitDeliver(height, round, ID, witnessList);
	
		else if(lastLockset.length >= coefficient * fault + 1){
			
			//msig檢查票是不是都null
			if( !msigProcedure.msigNull(lastLockset, height, round) )	
				//如果不全為null.則票block的Round最大
				lastRoundBlock = msigProcedure.msigMaxRoundVote(lastLockset);
				
			msigDeliver.leaderToWitDeliver(height, round, ID, witnessList);
		}
		
	}
	
}


function maxVotesBlock(lockset, c, fault){	//選出上回合最多人支持的block
	var result = {};
	var max = 0;
	var mark = null;
	
	lockset = lockset.sort();
	
	for(var i in lockset)	//看這張票是不是加到result裡面了
		(result[lockset[i]]) ? result[lockset[i]]++ : result[lockset[i]] = 1;
	
	for(var i in lockset){
		
		if(result[lockset[i]] > max){
			max = result[lockset[i]];
			mark = lockset[i];
		}
		
	}
	
	return (max >= c*fault+1) ? mark.vote : null;
}


function setLockset(){
	lastLockset.length = 0;
	
	for(var i = 0; i < thisLockset.length; i++){
		var c = thisLockset[i];
		lastLockset.push(c);
	}
	
	thisLockset.length = 0;
	if(round > 1)
		feedbackVote.length = 0;
}


module.exports = {
	firstBlock,
	maxVotesBlock,
	setLockset
}