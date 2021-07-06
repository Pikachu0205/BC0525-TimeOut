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
	
	
	console.log("送block了喔");
	
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


function fromAggregateDeliver(height, round){
	var data = {
		type: "fromAggregateVote",
		height: height, round: round, sender: ID,
		voteCollection : thisLockset
	}
	
	
	data = signature(data);
	
	for(var i in ipList)
		mesDeliver(i, data);
}


function VoteDeliver(height, round){
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
		//type: "Vote",
		type: "toAggregateVote",
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
function SynReqDeliver(recipient, myReq_Height, myReq_Round){
	//console.log("Ask for synBlock");
	
	var data = {
		type: "SynReq",
		height: height, round: round, sender: ID,
		reqH : myReq_Height,
		reqR : myReq_Round
	}
	
	
	data = signature(data);
	mesDeliver(recipient, data);
}


//function SynResDeliver(height, round, ID, junior, reqHeight, items){
function SynResDeliver(recipient, yourReq_Height, yourReq_Round){
	//console.log("Res for synBlock");
	
	var data = {
		type: "SynRes",
		height: height, round: round, sender: ID,
		//items : items,
		synHeight : height,
		synRound : round
		//synHeight : yourReq_Height
	}
	
	
	data = signature(data);
	mesDeliver(recipient, data);
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
	
	if(data.type == "Block"){
		var endHandle_TO1 = new Date().getTime();	//myMain.newHeight開始
		Handle1_Buffer.push(endHandle_TO1 - handle_TO1);
		
		data.start_TO1 = new Date().getTime();
	}
	
	
	if(data.type == "toAggregateVote"){
		var endHandle_TO2 = new Date().getTime();	//S8-5的post('/Block')開始
		Handle2_Buffer.push(endHandle_TO2 - handle_TO2);
		handle_TO2 = 0;
		
		data.start_TO2 = new Date().getTime();
	}
	
	if(data.type == "fromAggregateVote"){
		//var endHandle_TO3 = new Date().getTime();	//S8-5的post('/toAggregateVote')開始
		//Handle3_Buffer.push(endHandle_TO3 - handle_TO3);
		
		data.start_TO3 = new Date().getTime();
	}
	
	
	axios({
		method: 'post',
		//url: 'http://' + ipList[recipient].concat("/" + data.type),
		url: 'http://' + ipList[recipient].concat(":3000/" + data.type),
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
