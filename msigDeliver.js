//傳給其他node
function msigDeliver(thisBlock){
	console.log('Broadcast msig');
	
	var data = {
		type: "Block",
		height: height, round: round, sender: ID,
		maker: thisBlock.maker,
		blockHash: thisBlock.blockHash
		//transaction: thisBlock.transaction
	}
	
	//產生blockHash和signature
	data = signature(data);
	
	for(var i in ipList)
		mesDeliver(i, data);
}


//witness互傳
function witToWitDeliver(data, notSignedWitness){	
	data.sender = ID;
	
	for(var i in notSignedWitness)
		mesDeliver(notSignedWitness[i], data);
		
}


//leader傳給witness
function leaderToWitDeliver(height, round, ID, witnessList){
	//console.log("send P to the witnesses");
	
	var data = {
		type: "Witness",
		height: height, round: round, sender: ID,
		maker: ID,
		lockset: lastLockset,
		witSig: []
	}
	
	if(lastRoundBlock == null)	//創新block
		//data.transaction = transaction123;
		data.transaction = buffer1024[dataSize];
	else
		data.maker = lastRoundBlock.maker;
	
	//產生blockHash和signature
	data = signature(data);	
	data.blockHash = (lastRoundBlock == null) ? data.messageHash : lastRoundBlock.block;
	
	for(var i in witnessList)
		mesDeliver(witnessList[i], data);
}


function signature(data){
	const messageHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
	const signature = privateKey.sign(messageHash, 'base64').toDER('hex');
	
	data.messageHash = messageHash;
	data.signature = signature;
	
	return data;
}


function mesDeliver(recipient, data){
	axios({
		method: 'post',
		url: ipList[recipient].concat("/" + data.type),
		data: data
	}).then(function(res){/*console.log(res);*/}).catch(function(err){/*console.log(err);*/});
}


module.exports = {
	leaderToWitDeliver,
	witToWitDeliver,
	msigDeliver
}