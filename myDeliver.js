axios = require('axios');

require("./S8-5.js");
require("./post.js");


function BlockDeliver(height, round, ID){
	var data = {
		type: "Block",
		height: height, round: round, sender: ID, maker: ID,
		lockset: lastLockset
	}
	
	if(lastRoundBlock == null)	//創新block
		data.transaction = buffer1024[dataSize];
		//data.transaction = transaction123;	//連接學弟的
	else
		data.maker = lastRoundBlock.maker;
	
	data = signature(data);	//產生blockHash和signature
	data.blockHash = (lastRoundBlock == null) ? data.messageHash : lastRoundBlock.blockHash;
	
	for(var i in ipList)
		mesDeliver(i, data);
}


function toAaggregateDeliver(height, round, blockHash){
	isVoteLock = 1;
	
	var data = {
		type: "toAggregateVote",
		height: height, round: round, sender: ID,
		vote : blockHash
	}
	
	data = signature(data);
	lastRoundVote = data.vote;
	
	mesDeliver(aggregate, data);
}


function fromAggregateDeliver(height, round, ID){
	var data = {
		type: "fromAggregateVote",
		height: height, round: round, sender: ID,
		voteCollection : thisLockset
	}
	
	data = signature(data);
	
	for(var i in ipList)
		mesDeliver(i, data);
}


function VoteDeliver(height, round, ID){
	isVoteLock = 1;
	
	var data = {
		type: "Vote",
		height: height, round: round, sender: ID,
		vote : blockBody
	}
	
	data = signature(data);
	lastRoundVote = data.vote;
	
	for(var i in ipList)
		mesDeliver(i, data);
}


function TimeOutVoteDeliver(height, round, ID){
	isVoteLock = 1;
	console.log("lastRoundVote : ", lastRoundVote);
	
	var data = {
		type: "Vote",
		height: height, round: round, sender: ID,
		vote : lastRoundVote,	//投上回合的投的票
		timeout: 1
	}
	
	//console.log("Time Out Vote: ", data.vote);
	
	data = signature(data);
	
	for(var i in ipList)
		mesDeliver(i, data);
}


//senior為請求syn的人
function SynReqDeliver(height, round, ID, senior, reqHeight, reqRound){
	//console.log("Ask for synBlock");
	
	var data = {
		type: "SynReq",
		height: height, round: round, sender: ID,
		rH : reqHeight,
		rR : reqRound
	}
	
	data = signature(data);
	mesDeliver(senior, data);
}


function SynResDeliver(height, round, ID, junior, reqHeight, items){
	//console.log("Res for synBlock");
	
	var data = {
		type: "SynRes",
		height: height, round: round, sender: ID,
		items : items,
		synheight : reqHeight
	}
	
	data = signature(data);
	mesDeliver(junior, data);
}


function ReadyDeliver(ID, i){
	var data = {	type: "Ready", height: 0, round: 0, sender: ID	}
	
	data = signature(data);
	
	if(i == 1)
		for(var j = 1; j < ipList.length; j++)
			mesDeliver(j, data);
	else
		mesDeliver(i, data);

}


function signature(data){
	const messageHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
	const signature = privateKey.sign(messageHash, 'base64').toDER('hex');
	
	data.messageHash = messageHash;
	data.signature = signature;
	
	return data;
}


function mesDeliver(recipient, data){
	
	if(data.type == "Block")
		data.start_TO1 = new Date().getTime();
	
	if(data.type == "toAggregateVote")
		data.start_TO2 = new Date().getTime();
	
	if(data.type == "fromAggregateVote")
		data.start_TO3 = new Date().getTime();
	
	
	axios({
		method: 'post',
		url: ipList[recipient].concat("/" + data.type),
		//url: 'http://' + awsUrlList[recipient].concat(":100/" + data.type),
		data: data
	}).then(function(res){/*console.log(res);*/}).catch(function(err){/*console.log(err);*/});
	
	
}

module.exports = {
	BlockDeliver,
	toAaggregateDeliver,
	fromAggregateDeliver,
	VoteDeliver,
	TimeOutVoteDeliver,
	SynReqDeliver,
	SynResDeliver,
	ReadyDeliver
}
